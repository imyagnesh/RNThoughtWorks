/* eslint-disable func-names */
/* eslint-disable consistent-return */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-prototype-builtins */
import { Dimensions, PixelRatio, Platform, NativeModules } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Crashlytics } from 'react-native-fabric';
import './StyleColor';

const { StatusBarManager } = NativeModules;

export const deviceWidth = Dimensions.get('window').width;
export const deviceHeight = Dimensions.get('window').height;

const fontScale = PixelRatio.getFontScale();
const pixelRatio = PixelRatio.get();
const defaultPixel = 2;

const defaultW = Platform.OS === 'ios' ? 375 : 411;
const defaultH = Platform.OS === 'ios' ? 667 : 731;
const w2 = defaultW / defaultPixel;
const h2 = defaultH / defaultPixel;
const scale = Math.min(deviceHeight / h2, deviceWidth / w2);

export function normalizeFont(size) {
  return Math.round((size * scale) / fontScale);
}

export function normalize(size) {
  if (pixelRatio >= 2 && pixelRatio < 3) {
    // iphone 5s and older Androids
    if (deviceWidth < 360) {
      return size * 0.95;
    }
    // iphone 5
    if (deviceHeight < 667) {
      return size;
      // iphone 6-6s
    }
    if (deviceHeight >= 667 && deviceHeight <= 735) {
      return size * 1.15;
    }
    // older phablets
    return size * 1.25;
  }
  if (pixelRatio >= 3 && pixelRatio < 3.5) {
    // catch Android font scaling on small machines
    // where pixel ratio / font scale ratio => 3:3
    if (deviceWidth <= 360) {
      return size;
    }
    // Catch other weird android width sizings
    if (deviceHeight < 667) {
      return size * 1.15;
      // catch in-between size Androids and scale font up
      // a tad but not too much
    }
    if (deviceHeight >= 667 && deviceHeight <= 735) {
      return size * 1.2;
    }
    // catch larger devices
    // ie iphone 6s plus / 7 plus / mi note 等等
    return size * 1.27;
  }
  if (pixelRatio >= 3.5) {
    // catch Android font scaling on small machines
    // where pixel ratio / font scale ratio => 3:3
    if (deviceWidth <= 360) {
      return size;
      // Catch other smaller android height sizings
    }
    if (deviceHeight < 667) {
      return size * 1.2;
      // catch in-between size Androids and scale font up
      // a tad but not too much
    }
    if (deviceHeight >= 667 && deviceHeight <= 735) {
      return size * 1.25;
    }
    // catch larger phablet devices
    return size * 1.4;
  }
  // if older device ie pixelRatio !== 2 || 3 || 3.5
  return size;
}

export function Log(...params) {
  if (__DEV__) {
    console.log(...params);
  }
}

export const logError = err => {
  if (Platform.OS === 'ios') {
    Crashlytics.recordError(err.toString());
  } else {
    Crashlytics.logException(err.toString());
  }
  console.log(err);
};

export const logCustomError = ({ name, reason, stack }) => {
  Crashlytics.recordCustomExceptionName(name, reason, stack);
};

export const AsyncStorageData = key =>
  new Promise(async (resolve, reject) => {
    try {
      const res = await AsyncStorage.getItem(key);
      if (res) {
        resolve(JSON.parse(res));
      } else {
        resolve(false);
      }
    } catch (error) {
      logError(error);
      reject(error);
    }
  });

export const Api = (url, method, headers = {}, body = '') =>
  new Promise(async (resolve, reject) => {
    let options = {
      method,
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        ...headers,
      },
    };
    if (body) {
      options = { ...options, body };
    }
    try {
      const response = await fetch(url, options);
      const json = await response.json();

      if (json.status) {
        if (json.status.toUpperCase() === 'ERROR') {
          reject(json.reason);
        } else {
          resolve(json.response);
        }
      } else {
        resolve(json);
      }
    } catch (error) {
      logError(error);
      reject(error);
    }
  });

export const action = (type, payload, meta = null) => ({
  type,
  payload,
  meta,
});

export const range = N => Array.from({ length: N }, (v, k) => k + 1);

export const isEmpty = obj => {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
};

export const debounce = (func, wait, immediate) => {
  let timeout;

  return function executedFunction() {
    const context = this;
    // eslint-disable-next-line prefer-rest-params
    const args = arguments;

    const later = () => {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    const callNow = immediate && !timeout;

    clearTimeout(timeout);

    timeout = setTimeout(later, wait);

    if (callNow) func.apply(context, args);
  };
};

export const throttled = (delay, fn) => {
  let lastCall = 0;
  return function(...args) {
    const now = new Date().getTime();
    if (now - lastCall < delay) {
      return;
    }
    lastCall = now;
    return fn(...args);
  };
};

// export const debounce = (delay, fn) => {
//   let timerId;
//   return function(...args) {
//     if (timerId) {
//       clearTimeout(timerId);
//     }
//     timerId = setTimeout(() => {
//       fn(...args);
//       timerId = null;
//     }, delay);
//   };
// };

const isIphoneX = NativeModules.DeviceInfo.isIPhoneX_deprecated;

const iosStatusBarHeight = isIphoneX ? 35 : 20;

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? iosStatusBarHeight : StatusBarManager.HEIGHT;

global.FONT = normalizeFont;

global.SCALE = normalize;

global.WIDTH = deviceWidth;

global.HEIGHT = deviceHeight;

global.Log = Log;

global.StatusbarHeight = STATUSBAR_HEIGHT;

global.isIphoneX = isIphoneX;

const wait = ms => new Promise(res => setTimeout(res, ms));

global.wait = wait;

global.os = Platform.OS;

global.Api = Api;

global.AsyncStorageData = AsyncStorageData;

global.action = action;

global.isEmpty = isEmpty;

global.range = range;

// global.throttled = throttled;

global.logError = logError;

global.logCustomError = logCustomError;

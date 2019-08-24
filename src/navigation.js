import {
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator,
  createBottomTabNavigator,
} from 'react-navigation';
import SignIn from './Screens/SignIn/signIn';
import SplashScreen from './Screens/SplashScreen/splashScreen';
import Home from './Screens/Home/home';
import Register from './Screens/Register/register';
import Settings from './Screens/Settings/settings';

const HomeStack = createStackNavigator(
  {
    HomeScreen: {
      screen: Home,
    },
  },
  {},
);

const Authentication = createStackNavigator({
  Login: {
    screen: SignIn,
  },
  Register: {
    screen: Register,
  },
});

const Main = createBottomTabNavigator({
  Home: HomeStack,
  Settings: {
    screen: Settings,
  },
});

const App = createSwitchNavigator({
  Splash: SplashScreen,
  Auth: Authentication,
  App: Main,
});

export default createAppContainer(App);

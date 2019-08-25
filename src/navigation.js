import React from 'react';
import {
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator,
  createBottomTabNavigator,
  createDrawerNavigator,
} from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SignIn from './Screens/SignIn/signIn';
import SplashScreen from './Screens/SplashScreen/splashScreen';
import Home from './Screens/Home/index';
import Register from './Screens/Register/register';
import Settings from './Screens/Settings/settings';
import HomeDetails from './Screens/HomeDetails/index';

const HomeStackNavigation = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: ({ navigation }) => {
        return {
          headerTitle: 'Home',
          headerLeft: (
            <Icon
              style={{ paddingLeft: 10 }}
              onPress={() => navigation.openDrawer()}
              name="menu"
              size={30}
            />
          ),
        };
      },
    },
    HomeDetails,
  },
  {},
);

const DashboardBottomNavigation = createBottomTabNavigator({
  Home: {
    screen: HomeStackNavigation,
  },
  Settings: {
    screen: Settings,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: 'Settings',
        headerLeft: (
          <Icon
            style={{ paddingLeft: 10 }}
            onPress={() => navigation.openDrawer()}
            name="menu"
            size={30}
          />
        ),
      };
    },
  },
});

const DashboardStackNavigation = createStackNavigator(
  {
    Main: {
      screen: DashboardBottomNavigation,
    },
  },
  {
    defaultNavigationOptions: () => {
      return {
        header: null,
      };
    },
  },
);

const DashboardStack = createDrawerNavigator({
  Dashboard: {
    screen: DashboardStackNavigation,
  },
});

const AuthenticationStack = createStackNavigator({
  SignIn,
  Register,
});

const App = createSwitchNavigator({
  // SplashScreen,
  // Auth: AuthenticationStack,
  Dashboard: DashboardStack,
});

export default createAppContainer(App);

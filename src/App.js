import React from 'react';
import { SafeAreaView } from 'react-native';
// import Login from './Screens/Login/login';
import SignIn from './Screens/SignIn/signIn';
import UserContext from './context/userContext';

const App = () => {
  return (
    <UserContext>
      <SafeAreaView style={{ flex: 1 }}>
        <SignIn />
      </SafeAreaView>
    </UserContext>
  );
};

export default App;

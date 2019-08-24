import React from 'react';
// import Login from './Screens/Login/login';
import UserContext from './context/userContext';
import Navigation from './navigation';

const App = () => {
  return (
    <UserContext>
      <Navigation />
    </UserContext>
  );
};

export default App;

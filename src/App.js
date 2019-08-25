import React from 'react';
// import Login from './Screens/Login/login';
import { Provider } from 'react-redux';
import UserContext from './context/userContext';
import Navigation from './navigation';
import configureStore from './configureStore';

const store = configureStore();

const App = () => {
  return (
    <UserContext>
      <Provider store={store}>
        <Navigation />
      </Provider>
    </UserContext>
  );
};

export default App;

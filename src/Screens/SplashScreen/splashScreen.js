import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import Button from '../../Components/Button/button';

const splashScreen = ({ navigation }) => {
  return (
    <View>
      <Text>Splash Screen</Text>
      <Button
        text="Go to Login"
        onPress={() =>
          navigation.navigate('Auth', {
            user: {
              username: 'yagnesh',
              password: 'Password',
            },
          })
        }
      />
    </View>
  );
};

splashScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default splashScreen;

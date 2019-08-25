import React from 'react';
import { View, Text, Button } from 'react-native';

const index = ({ navigation }) => {
  return (
    <View>
      <Text>Home Details Page</Text>
      <Button title="Go to Register" onPress={() => navigation.navigate('Register')} />
    </View>
  );
};

export default index;

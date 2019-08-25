import React, { memo } from 'react';
import { View, Text } from 'react-native';

const child2 = ({ user }) => {
  console.warn('Child 2 Page Updated');
  return (
    <View>
      <Text>Child 2</Text>
      <Text>{user.name}</Text>
      <Text>{user.gender}</Text>
    </View>
  );
};

export default child2;

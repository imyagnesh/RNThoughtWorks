import React, { Component } from 'react';
import { Text, View } from 'react-native';

export default class child1 extends Component {
  componentDidUpdate(prevProps, prevState) {
    console.warn('Child 1 Page Updated');
  }

  render() {
    const { user } = this.props;
    return (
      <View>
        <Text>Child 1</Text>
        <Text>{user.name}</Text>
        <Text>{user.gender}</Text>
      </View>
    );
  }
}

import React, { Component } from 'react';
import { Text, View, Image, PixelRatio, StyleSheet } from 'react-native';
import commonStyle from '../../commonStyle';
import Button from '../../Components/Button/button';

export class login extends Component {
  state = {};

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#554688' }}>
        <View style={{ flex: 1.5, justifyContent: 'center', alignItems: 'center' }}>
          <Image
            source={require('../../assets/imgs/badge/badge.png')}
            style={{
              height: PixelRatio.getPixelSizeForLayoutSize(60),
              width: PixelRatio.getPixelSizeForLayoutSize(60),
            }}
          />
        </View>
        <View style={{ paddingVertical: 20, flex: 1 }}>
          <Text
            style={[
              commonStyle.title,
              {
                textAlign: 'center',
              },
            ]}
          >
            Get Engaged
          </Text>
          <Text
            style={[
              commonStyle.subTitle,
              {
                textAlign: 'center',
              },
            ]}
          >
            Tan Tock Seng Hospital
          </Text>
        </View>
        <View style={{ flex: 1, justifyContent: 'space-between' }}>
          <Button text="Login" onPress={() => {}} style={{ backgroundColor: '#AF50D3' }} />
          <Button
            text="Register"
            onPress={() => {}}
            style={{ borderWidth: StyleSheet.hairlineWidth, borderColor: 'gray' }}
          />
        </View>

        <View style={{ marginTop: 100 }}>
          <Text style={{ textAlign: 'center', fontSize: 13, color: '#9b9b9b', lineHeight: 17 }}>
            Version 1 (60)
          </Text>
        </View>
      </View>
    );
  }
}

export default login;

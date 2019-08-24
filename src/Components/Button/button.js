import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, ViewPropTypes, ActivityIndicator } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import commonStyle from '../../commonStyle';

const button = ({ onPress, text, disable, style, textStyle, loading }) => {
  return (
    <RectButton
      onPress={!disable && onPress}
      style={{
        marginHorizontal: 20,
      }}
    >
      <View
        style={[
          {
            padding: 16,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 4,
            backgroundColor: 'transparent',
          },
          { ...style },
        ]}
      >
        {loading && <ActivityIndicator size="small" animating />}
        <Text style={[commonStyle.buttonText, { ...textStyle }]}>{text}</Text>
      </View>
    </RectButton>
  );
};

button.propTypes = {
  onPress: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  disable: PropTypes.bool,
  style: ViewPropTypes.style,
  textStyle: PropTypes.object,
  loading: PropTypes.bool,
};

button.defaultProps = {
  disable: false,
  style: {},
  textStyle: {},
  loading: false,
};

export default button;

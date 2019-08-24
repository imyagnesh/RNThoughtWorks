import React from 'react';
import PropTypes from 'prop-types';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import { ErrorMessage } from 'formik';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { BorderlessButton } from 'react-native-gesture-handler';

const checkbox = ({
  field, // { name, value, onChange, onBlur }
  form: { setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
}) => {
  return (
    <View>
      {/* <TextInput
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
        value={field.value}
        onChangeText={text => setFieldValue(field.name, text)}
        onBlur={() => setFieldTouched(field.name)}
        style={{ borderColor: 'gray', borderWidth: StyleSheet.hairlineWidth }}
      /> */}
      <BorderlessButton onPress={() => setFieldValue(field.name, !field.value)}>
        {field.value ? (
          <Icon name="check-box" size={24} />
        ) : (
          <Icon name="check-box-outline-blank" size={24} />
        )}
      </BorderlessButton>
      <ErrorMessage name={field.name} component={Text} />
    </View>
  );
};

checkbox.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.shape({
    setFieldValue: PropTypes.func.isRequired,
    setFieldTouched: PropTypes.func.isRequired,
  }).isRequired,
};

export default checkbox;

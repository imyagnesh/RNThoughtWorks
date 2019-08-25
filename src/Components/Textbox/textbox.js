import React from 'react';
import PropTypes from 'prop-types';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import { ErrorMessage } from 'formik';

const textbox = ({
  field, // { name, value, onChange, onBlur }
  form: { setFieldValue, setFieldTouched }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => {
  return (
    <>
      <TextInput
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
        value={field.value}
        onChangeText={text => setFieldValue(field.name, text)}
        onBlur={() => setFieldTouched(field.name)}
        style={{ borderColor: 'gray', borderWidth: StyleSheet.hairlineWidth, height: 40 }}
      />
      <ErrorMessage name={field.name} component={Text} />
    </>
  );
};

textbox.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.shape({
    setFieldValue: PropTypes.func.isRequired,
    setFieldTouched: PropTypes.func.isRequired,
  }).isRequired,
};

export default textbox;

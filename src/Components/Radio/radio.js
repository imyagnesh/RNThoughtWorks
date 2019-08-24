import React from 'react';
import PropTypes from 'prop-types';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import { ErrorMessage } from 'formik';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { BorderlessButton } from 'react-native-gesture-handler';

const checkbox = ({
  field, // { name, value, onChange, onBlur }
  form: { setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  data,
}) => {
  return (
    <View style={{ flexDirection: 'row' }}>
      {data &&
        data.map(x => (
          <BorderlessButton key={x.id} onPress={() => setFieldValue(field.name, x.value)}>
            {field.value === x.value ? (
              <View style={{ flexDirection: 'row' }}>
                <Icon name="radio-button-checked" size={24} />
                <Text>{x.name}</Text>
              </View>
            ) : (
              <View style={{ flexDirection: 'row' }}>
                <Icon name="radio-button-unchecked" size={24} />
                <Text>{x.name}</Text>
              </View>
            )}
          </BorderlessButton>
        ))}

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
  data: PropTypes.array.isRequired,
};

export default checkbox;

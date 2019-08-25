/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Button } from 'react-native';
import { Formik, Field } from 'formik';
// import Button from '../Button/button';

const Form = ({ form, validate, onSubmit, initialValues }) => {
  return (
    <Formik initialValues={initialValues} validate={validate} onSubmit={onSubmit}>
      {({ handleSubmit, isSubmitting, errors }) => {
        return (
          <View>
            {errors.general && <Text>{errors.general}</Text>}
            {form && form.map(x => <Field {...x} />)}
            <Button title="Submit" onPress={handleSubmit} disabled={isSubmitting} />
          </View>
        );
      }}
    </Formik>
  );
};

Form.propTypes = {
  form: PropTypes.array.isRequired,
  validate: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
};

export default Form;

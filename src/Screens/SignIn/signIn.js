import React, { Component } from 'react';
import { Text, View, TextInput, StyleSheet } from 'react-native';
import { Formik, Field } from 'formik';
import Textbox from '../../Components/Textbox/textbox';
import Checkbox from '../../Components/Checkbox/checkbox';
import Button from '../../Components/Button/button';

const validate = values => {
  const errors = {};

  if (!values.username) {
    errors.username = 'Required';
  }
  if (!values.password) {
    errors.password = 'Required';
  }

  return errors;
};

const form = [
  {
    name: 'username',
    component: Textbox,
  },
  {
    name: 'password',
    component: Textbox,
  },
  {
    name: 'rememberMe',
    component: Checkbox,
  },
];

export default class signIn extends Component {
  state = {
    username: '',
    password: '',
  };

  signIn = (values, { setSubmitting }) => {
    console.warn('values', values);
    setTimeout(() => {
      setSubmitting(false);
    }, 3000);
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text> textInComponent </Text>
        <Formik
          initialValues={{ username: '', password: '', rememberMe: false }}
          validate={validate}
          onSubmit={this.signIn}
        >
          {({ handleSubmit, isSubmitting }) => {
            return (
              <View style={{ flex: 1 }}>
                {form && form.map(x => <Field key={x.username} {...x} />)}
                <Button
                  text="Submit"
                  onPress={handleSubmit}
                  loading={isSubmitting}
                  style={{ backgroundColor: 'red' }}
                />
              </View>
            );
          }}
        </Formik>
      </View>
    );
  }
}

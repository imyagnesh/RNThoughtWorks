import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Textbox from '../../Components/Textbox/textbox';
import Checkbox from '../../Components/Checkbox/checkbox';
import Radio from '../../Components/Radio/radio';
import Form from '../../Components/Form/form';
import Button from '../../Components/Button/button';

const validate = values => {
  const errors = {};

  if (!values.username) {
    errors.username = 'Required';
  }
  if (!values.password) {
    errors.password = 'Required';
  }
  if (!values.gender) {
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
  {
    name: 'gender',
    component: Radio,
    data: [
      {
        id: 1,
        name: 'Male',
        value: 'male',
      },
      {
        id: 2,
        name: 'Female',
        value: 'female',
      },
    ],
  },
];

export default class signIn extends Component {
  state = {
    username: '',
    password: '',
    rememberMe: false,
    gender: '',
  };

  signIn = (values, actions) => {
    console.log(actions);
    console.warn('values', values);
    setTimeout(() => {
      actions.setSubmitting(false);
      actions.setErrors({ general: 'Oops! something went wrong' });
      const { navigation } = this.props;
      navigation.navigate('App');
    }, 3000);
  };

  render() {
    const {
      navigation: {
        state: { params },
        getParam,
        goBack,
      },
    } = this.props;
    console.warn(params);
    console.warn(getParam('greet', 'Hellos'));
    return (
      <View style={{ flex: 1 }}>
        <Text> textInComponent </Text>
        <Button text="Go back" style={{ color: 'red' }} onPress={() => goBack()} />
        <Form form={form} validate={validate} initialValues={this.state} onSubmit={this.signIn} />
      </View>
    );
  }
}

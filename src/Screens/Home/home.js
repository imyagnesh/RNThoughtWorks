import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Button } from 'react-native';
import Form from '../../Components/Form/form';
import Textbox from '../../Components/Textbox/textbox';

const validate = values => {
  const errors = {};

  if (!values.todo) {
    errors.todo = 'Required';
  }

  return errors;
};

const form = [
  {
    key: 'todo',
    name: 'todo',
    component: Textbox,
  },
];

const home = ({ onSubmit, todos, loadTodos, onComplete }) => {
  useEffect(() => {
    loadTodos();
  }, []);
  return (
    <View style={{ flex: 1 }}>
      {/* <Text>Home page</Text> */}
      <Form form={form} initialValues={{ todo: '' }} validate={validate} onSubmit={onSubmit} />
      <View style={{ flex: 1 }}>
        {todos &&
          todos.map(x => (
            <View key={x.id} style={{ flexDirection: 'row' }}>
              <Text
                style={{
                  padding: 10,
                  flex: 1,
                  textDecorationLine: x.done ? 'line-through' : 'none',
                }}
              >
                {x.todo}
              </Text>
              <Button title="Complete Task" onPress={() => onComplete(x)} />
            </View>
          ))}
      </View>
    </View>
  );
};

home.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onComplete: PropTypes.func.isRequired,
  loadTodos: PropTypes.func.isRequired,
  todos: PropTypes.array.isRequired,
};

export default home;

// import React, { Component } from 'react';
// import { Text, View, Button } from 'react-native';
// import Child1 from './child1';
// import Child2 from './child2';

// export default class home extends Component {
//   state = {
//     user: {
//       name: 'yagnesh',
//       gender: 'male',
//     },
//   };

//   componentDidUpdate() {
//     console.warn('Main Page Updated');
//   }

//   onChange = () => {
//     const { user } = this.state;
//     // const newUser = { ...user, name: 'rohit' };
//     user.name = 'Rohit';
//     this.setState({ user: user });
//   };

//   render() {
//     const { user } = this.state;
//     console.warn('user', user);
//     return (
//       <View>
//         <Text> textInComponent </Text>
//         <Text>{user.name}</Text>
//         <Text>{user.gender}</Text>
//         <Child1 user={user} />
//         <Child2 user={user} />
//         <Button title="Change State" onPress={this.onChange} />
//       </View>
//     );
//   }
// }

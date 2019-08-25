import React from 'react';
import { View } from 'react-native';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Home from '../home';
import Form from '../../../Components/Form/form';

configure({ adapter: new Adapter() });

function setup() {
  const props = {
    todos: [],
    onSubmit: jest.fn(),
    onComplete: jest.fn(),
    loadTodos: jest.fn(),
  };

  const Wrapper = shallow(<Home {...props} />);

  return {
    props,
    Wrapper,
  };
}

describe('snapshot', () => {
  it('snapshot of items', () => {
    const { Wrapper } = setup();
    expect(Wrapper).toMatchSnapshot();
  });
});

describe('check form exist', () => {
  it('check Form exist', () => {
    const { Wrapper } = setup();
    expect(Wrapper.find(Form).exists()).toBe(true);
  });

  it('check Todo items are availbel', () => {
    const { Wrapper, props } = setup();
    expect(Wrapper.find(View).length).toBe(2);

    Wrapper.setProps({
      todos: [
        {
          id: 1,
          todo: 'mobile',
          done: false,
        },
      ],
    });
    expect(Wrapper.find(View).length).toBe(3);
  });
});

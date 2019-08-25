import { connect } from 'react-redux';
import home from './home';

const mapStateToProps = state => ({
  todos: state.todos,
});

const mapDispatchToProps = dispatch => {
  return {
    loadTodos: () => dispatch({ type: 'LOAD_TODO_REQUEST' }),
    onSubmit: (values, actions) =>
      dispatch({ type: 'ADD_TODO_REQUEST', payload: values, meta: actions }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(home);

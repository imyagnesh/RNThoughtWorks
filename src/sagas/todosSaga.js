import { all, takeEvery, call, put, takeLatest } from 'redux-saga/effects';

function* loadTodo() {
  try {
    console.warn('api started');
    const res = yield call(fetch, 'http://localhost:3004/Todos');
    const todos = yield res.json();
    yield put({ type: 'LOAD_TODO_SUCCESS', payload: todos });
  } catch (error) {
    yield put({ type: 'LOAD_TODO_FAILURE', payload: error });
  }
}

function* addTodo({ payload, meta: actions }) {
  const { resetForm, setErrors, setSubmitting } = actions;
  try {
    throw new Error('Oops! something Went Wrong!');
    const res = yield call(fetch, 'http://localhost:3004/Todos', {
      method: 'POST',
      body: JSON.stringify({ ...payload, done: false }),
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const todo = yield res.json();
    yield call(resetForm);
    yield put({ type: 'ADD_TODO_SUCCESS', payload: todo });
  } catch (error) {
    yield call(setErrors, { general: error.message });
    yield put({ type: 'ADD_TODO_FAILURE', payload: error });
  } finally {
    yield call(setSubmitting, false);
  }
}

function* loadTodosRequest() {
  yield takeLatest('LOAD_TODO_REQUEST', loadTodo);
}

function* addTodosRequest() {
  yield takeLatest('ADD_TODO_REQUEST', addTodo);
}

export default function* rootSaga() {
  yield all([loadTodosRequest(), addTodosRequest()]);
}

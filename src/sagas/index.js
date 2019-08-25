import { all } from 'redux-saga/effects';
import todo from './todosSaga';

export default function* rootSaga() {
  yield all([todo()]);
}

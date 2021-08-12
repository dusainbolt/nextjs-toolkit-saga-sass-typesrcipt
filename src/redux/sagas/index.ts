import { all, fork } from 'redux-saga/effects';
import WatchLoginSaga from './loginSaga';
import seoHomeSaga from './seoHomeSaga';

export default function* rootSaga(): any {
  yield all([fork(seoHomeSaga), fork(WatchLoginSaga)]);
}

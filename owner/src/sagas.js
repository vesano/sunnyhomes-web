import {all, fork} from 'redux-saga/effects';

import Login from './screens/Login/sagas';
import Profile from './screens/Profile/sagas';
import Calendar from './screens/Calendar/sagas';

export default function* root() {
  yield all([
    fork(Login),
    fork(Profile),
    fork(Calendar),
  ]);
}

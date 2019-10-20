import {all, fork} from 'redux-saga/effects';

import Login from './screens/Login/sagas';
import Profile from './screens/Profile/sagas';
import Owners from './screens/Owners/sagas';
import OwnerEdit from './screens/OwnerEdit/sagas';
import Admins from './screens/Admins/sagas';
import AdminEdit from './screens/AdminEdit/sagas';

export default function* root() {
  yield all([
    fork(Login),
    fork(Profile),
    fork(Owners),
    fork(OwnerEdit),
    fork(Admins),
    fork(AdminEdit),
  ]);
}

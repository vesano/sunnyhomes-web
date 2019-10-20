import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router'

import App from './App';
import Login from '../screens/Login/reducers';
import Profile from '../screens/Profile/reducers';
import Owners from '../screens/Owners/reducers';
import OwnerEdit from '../screens/OwnerEdit/reducers';
import Admins from '../screens/Admins/reducers';
import AdminEdit from '../screens/AdminEdit/reducers';

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  App,
  Login,
  Profile,
  Owners,
  OwnerEdit,
  Admins,
  AdminEdit,
});

export default createRootReducer
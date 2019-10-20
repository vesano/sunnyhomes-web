import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router'

import App from './App';
import Login from '../screens/Login/reducers';
import Profile from '../screens/Profile/reducers';
import Owners from '../screens/Owners/reducers';
import Admins from '../screens/Admins/reducers';

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  App,
  Login,
  Profile,
  Owners,
  Admins,
});

export default createRootReducer
import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';

import * as Pages from './Pages';

import Loading from '../components/Loading';
import Navigation from '../components/Navigation';
import UserNavigation from '../components/UserNavigation';
import Footer from '../components/Footer';

import Login from '../screens/Login/components';
import Profile from '../screens/Profile/components';
import Owners from '../screens/Owners/components';
import OwnerEdit from '../screens/OwnerEdit/components';
import Admins from '../screens/Admins/components';
import AdminEdit from '../screens/AdminEdit/components';

export function createRouter(store) {

  const InitialRoute = ({component: Component, ...rest}) => {

    const appState = store.getState().App

    if (appState.isLoadingVisible) {
      return <Route {...rest} render={() => (
        <Loading/>
      )}/>
    }

    return <Route {...rest} render={(props) => (
      <Component {...props}/>
    )}/>
  }

  const PrivateRoute = ({component: Component, ...rest}) => {

    const appState = store.getState().App

    if (appState.isLoadingVisible) {
      return <Route {...rest} render={() => (
        <Loading/>
      )}/>
    }

    if (appState.isAuthenticated === true) {
      return <Route {...rest} render={(props) => (
        <Component {...props}/>
      )}/>
    }

    return <Redirect to={Pages.LOGIN}/>
  }

  return <div>

    <Navigation/>

    <main id="main-content">

      <UserNavigation/>

      <div className="container">
        <Switch>
          <InitialRoute exact path={Pages.LOGIN} component={Login}/>

          <PrivateRoute exact path={Pages.PROFILE} component={Profile}/>

          <PrivateRoute exact path={Pages.ADMINS} component={Admins}/>
          <PrivateRoute exact path={Pages.ADMINS_NEW} component={AdminEdit}/>
          <PrivateRoute path={Pages.ADMINS_EDIT} component={AdminEdit}/>

          <PrivateRoute exact path={Pages.OWNERS} component={Owners}/>
          <PrivateRoute exact path={Pages.OWNERS_NEW} component={OwnerEdit}/>
          <PrivateRoute path={Pages.OWNERS_EDIT} component={OwnerEdit}/>

          <Redirect path="*" to={Pages.PROFILE}/>

        </Switch>
      </div>
    </main>

    <Footer/>

    <div className="notification-container">
      <ToastContainer/>
    </div>

  </div>
}
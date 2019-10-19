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
import Calendar from '../screens/Calendar/components';
import Booking from '../screens/Booking/components';

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

      <Switch>
        <InitialRoute exact path={Pages.LOGIN} component={Login}/>

        <PrivateRoute exact path={Pages.PROFILE} component={Profile}/>

        <PrivateRoute exact path={Pages.HOME} component={Calendar}/>

        <PrivateRoute exact path={Pages.BOOKING_NEW} component={Booking}/>
        <PrivateRoute path={Pages.BOOKING_EDIT} component={Booking}/>

        <Redirect path="*" to={Pages.HOME}/>

      </Switch>
    </main>

    <Footer/>

    <div className="notification-container">
      <ToastContainer/>
    </div>

  </div>
}
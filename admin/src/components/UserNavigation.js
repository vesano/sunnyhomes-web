import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Link, withRouter} from 'react-router-dom';
import i18n from "../i18n";
import {createStructuredSelector} from "reselect";
import {connect} from "react-redux";
import * as Pages from "../router/Pages";

class UserNavigation extends PureComponent {

  render() {

    const {isAuthenticated, user} = this.props

    if (!isAuthenticated) return null;

    return <div className="gradient-half-primary-v6">
      <div className="container space-top-1 pb-3">
        <div className="row">
          <div className="col-12">
            <h1 className="h3 text-white font-weight-medium mb-1">{i18n.t('navigation.welcome')}, {user.name || user.email}!</h1>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="d-flex justify-content-between align-items-center">
          <div
            className="u-header u-header-left-aligned-nav u-header--bg-transparent u-header--white-nav-links z-index-4">
            <div className="u-header__section bg-transparent">
              <nav className=" navbar navbar-expand u-header__navbar u-header__navbar--no-space">
                <ul className="navbar-nav u-header__navbar-nav m-0">

                  <li className="nav-item">
                    <Link className="nav-link u-header__nav-link"
                          to={Pages.ADMINS}>{i18n.t('navigation.admins')}</Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link u-header__nav-link"
                          to={Pages.OWNERS}>{i18n.t('navigation.owners')}</Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link u-header__nav-link"
                          to={Pages.PROFILE}>{i18n.t('navigation.profile')}</Link>
                  </li>

                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  }
}

UserNavigation.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  user: PropTypes.any,
}

const selectors = createStructuredSelector({
  isAuthenticated: store => store.App.isAuthenticated,
  user: store => store.App.user,
})

export default withRouter(
  connect(selectors)(UserNavigation)
);

import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Link, withRouter} from 'react-router-dom';
import i18n from "../i18n";
import {createStructuredSelector} from "reselect";
import {connect} from "react-redux";
import * as Pages from "../router/Pages";
import {LOGOUT} from "../screens/Login/actions";

class Navigation extends PureComponent {

  logout = () => {
    this.props.dispatch({
      type: LOGOUT
    })
  }

  render() {

    const {isAuthenticated} = this.props

    return <header id="header"
                   className="u-header u-header--full-container u-header--abs-top u-header--show-hide shadow-sm p-0 m-0"
                   data-header-fix-moment="500"
                   data-header-fix-effect="slide">
      <div className="u-header__section pt-3">

        <div id="logoAndNav" className="container">
          <nav className="navbar navbar-expand u-header__navbar u-header__navbar--no-space p-0">

            <a className="navbar-brand u-header__navbar-brand u-header__navbar-brand-center p-0"
               href="">
              Logo
            </a>

            <ul className="navbar-nav u-header__navbar-nav text-center">

              {!isAuthenticated && <li className="nav-item u-header__nav-item mb-1 mb-lg-0 mr-1">
                <Link className="btn btn-sm btn-primary transition-3d-hover"
                      to={Pages.LOGIN}>{i18n.t('navigation.login')}</Link>
              </li>}

              {isAuthenticated && <li className="nav-item u-header__nav-item mb-1 mb-lg-0 mr-1">
                <button className="btn btn-sm btn-outline-primary transition-3d-hover"
                        onClick={this.logout}>{i18n.t('navigation.logout')}</button>
              </li>}
            </ul>
          </nav>


        </div>
      </div>
    </header>
  }
}

Navigation.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
}

const selectors = createStructuredSelector({
  isAuthenticated: store => store.App.isAuthenticated,
})

export default withRouter(
  connect(selectors)(Navigation)
);

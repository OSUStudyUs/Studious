import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AppBar from 'material-ui/AppBar';

import auth from '../authentication';

import './navbar.scss';
const { components, selectors } = auth;
const { Login, Logout } = components;

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(auth.actions, dispatch)
});

const mapStateToProps = (state) => ({
  isAuthenticated: selectors.isAuthenticated(state),
  loginError: selectors.loginError(state),
  user: selectors.user(state)
});

const Navbar = ({ actions, loginError, isAuthenticated, user }) => (
  <AppBar
    title="Studious"
    iconElementLeft={<span />}
    iconElementRight={!isAuthenticated ?
      <Login errorMessage={loginError} onLogin={(creds) => actions.loginUser(creds)} /> :
      <div id="Navbar-logoutWrapper">
        <p id="Navbar-welcome">WELCOME, {user.firstName.toUpperCase()}</p>
        <Logout onLogout={() => actions.logoutUser()} />
      </div>
    }
  />
);

Navbar.propTypes = {
  actions: PropTypes.object.isRequired,
  loginError: PropTypes.string,
  isAuthenticated: PropTypes.bool.isRequired,
  user: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);

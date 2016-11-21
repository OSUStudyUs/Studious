import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import auth from '../authentication';

import './navbar.css';
const { components, selectors } = auth;
const { Login, Logout } = components;

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(auth.actions, dispatch)
});

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  isAuthenticated: selectors.isAuthenticated(state),
  loginError: selectors.loginError(state),
  user: selectors.user(state)
});

const Navbar = ({ actions, loginError, isAuthenticated, user }) => (
  <div className="Navbar">
    <div className="Navbar-title">
      Studious
    </div>
    {!isAuthenticated &&
      <div className="Navbar-auth">
        <Login errorMessage={loginError} onLogin={(creds) => actions.loginUser(creds)} />
      </div>
    }
    {isAuthenticated &&
      <div className="Navbar-auth">
        <p>Welcome, {user.firstName}</p>
        <Logout onLogout={() => actions.logoutUser()} />
      </div>
    }
  </div>
);

Navbar.propTypes = {
  actions: PropTypes.object.isRequired,
  loginError: PropTypes.string,
  isAuthenticated: PropTypes.bool.isRequired,
  user: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);

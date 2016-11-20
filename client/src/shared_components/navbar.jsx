import React, { PropTypes } from 'react';

import auth from '../authentication';

import './navbar.css';
const { components } = auth;
const { Login, Logout } = components;

const Navbar = ({ actions, errorMessage, isAuthenticated }) => (
  <div className="Navbar">
    <div className="Navbar-title">
      Studious
    </div>
    {!isAuthenticated &&
      <div className="Navbar-auth">
        <Login errorMessage={errorMessage} onLogin={(creds) => actions.loginUser(creds)} />
      </div>
    }
    {isAuthenticated &&
      <div className="Navbar-auth">
        <Logout onLogout={() => actions.logoutUser()} />
      </div>
    }
  </div>
);

Navbar.propTypes = {
  actions: PropTypes.object.isRequired,
  errorMessage: PropTypes.string,
  isAuthenticated: PropTypes.bool.isRequired
};

export default Navbar;

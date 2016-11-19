import React, { PropTypes } from 'react';
import auth from '../authentication';

import './navbar.css';
const { actions, components } = auth;
const { Login, Logout } = components;

const Navbar = ({ dispatch, errorMessage, isAuthenticated }) => (
  <div className="Navbar">
    <div className="Navbar-title">
      Studious
    </div>
    {!isAuthenticated &&
      <div className="Navbar-auth">
        <Login errorMessage={errorMessage} onLogin={(creds) => actions.loginUser(creds)(dispatch)} />
      </div>
    }
    {isAuthenticated &&
      <div className="Navbar-auth">
        <Logout onLogout={() => actions.logoutUser()(dispatch)} />
      </div>
    }
  </div>
);

Navbar.propTypes = {
  dispatch: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
  isAuthenticated: PropTypes.bool.isRequired
};

export default Navbar;

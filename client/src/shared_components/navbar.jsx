import React, { PropTypes } from 'react';
import auth from '../authentication';

import './navbar.css';
const { actions, components } = auth;
const { Login, Logout } = components;

const Navbar = ({ dispatch, isAuthenticated }) => (
  <div className="Navbar">
    <div className="Navbar-title">
      Studious
    </div>
    {!isAuthenticated &&
      <div className="Navbar-auth">
        <Login onLogin={(creds) => actions.loginUser(creds)(dispatch)} />
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
  isAuthenticated: PropTypes.bool.isRequired
};

export default Navbar;

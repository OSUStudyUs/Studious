import React, { PropTypes } from 'react';

const Logout = ({ onLogout }) => (
  <div className="Logout">
    <button className="Logout-button" onClick={onLogout}>Logout</button>
  </div>
);

Logout.propTypes = {
  onLogout: PropTypes.func.isRequired
};

export default Logout;

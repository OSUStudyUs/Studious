import React, { PropTypes } from 'react';
import FlatButton from 'material-ui/FlatButton';

const Logout = ({ onLogout }) => (
  <div className="Logout">
    <FlatButton label="Logout" onClick={onLogout} primary={true} />
  </div>
);

Logout.propTypes = {
  onLogout: PropTypes.func.isRequired
};

export default Logout;

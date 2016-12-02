import React, { PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const Logout = ({ onLogout }) => (
  <div className="Logout">
    <RaisedButton label="Logout" onClick={onLogout} secondary />
  </div>
);

Logout.propTypes = {
  onLogout: PropTypes.func.isRequired
};

export default Logout;

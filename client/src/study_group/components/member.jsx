import React from 'react';
import { MenuItem } from 'material-ui/Menu';

const Member = ({ user }) => (
  <MenuItem primaryText={`${user.firstName} ${user.lastName}`} />
);

export default Member;

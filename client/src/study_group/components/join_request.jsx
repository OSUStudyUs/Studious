import React from 'react';
import ContentAdd from 'material-ui/svg-icons/content/add';
import RemoveCircle from 'material-ui/svg-icons/content/remove-circle';
import { MenuItem } from 'material-ui/Menu';

const StudyGroupJoinRequest = ({ onApprove, onDeny, user }) => (
  <MenuItem
    leftIcon={<ContentAdd onClick={onApprove} />}
    primaryText={`${user.firstName} ${user.lastName} wants to join`}
    rightIcon={<RemoveCircle onClick={onDeny} />}
  />
);

export default StudyGroupJoinRequest;

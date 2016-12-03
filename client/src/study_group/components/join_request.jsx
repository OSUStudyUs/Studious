import React, { Component, PropTypes } from 'react';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import { ListItem } from 'material-ui/List';

const StudyGroupJoinRequest = ({ onApprove, onDeny, user }) => (
  <ListItem
    primaryText={`${user.firstName} ${user.lastName}`}
  />
);

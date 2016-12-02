import React, { PropTypes } from 'react';

import './join_or_leave_button.scss';

const JoinOrLeaveButton = ({ id, joinedCourseIds, loading, onClick }) => {
  let buttonText;

  if (loading) {
    buttonText = '...';
  } else if (joinedCourseIds.indexOf(id) >= 0) {
    buttonText= 'Leave';
  } else {
    buttonText = 'Join';
  }

  return (
    <button disabled={loading} onClick={onClick}>{buttonText}</button>
  );
};

JoinOrLeaveButton.propTypes = {
  id: PropTypes.number.isRequired,
  joinedCourseIds: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  loading: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};

export default JoinOrLeaveButton;

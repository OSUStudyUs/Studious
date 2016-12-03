import React from 'react';

const GroupProfile = ({ isExact, memberIds, pendingIds }) => {
  console.log(memberIds, pendingIds);

  if (!isExact) return null;

  return (
    <div className="GroupProfile">Group Profile</div>
  );
};

export default GroupProfile;

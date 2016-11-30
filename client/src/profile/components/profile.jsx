import React from 'react';

import CreateStudyGroup from '../../study_group/components/create';

const Profile = ({ isExact }) => {
  // This prop is coming from ReactRouter
  // Basically, it lets us know if this component was rendered because of a direct match or the url
  // If it isn't we don't want to render. This makes the routing outside this easier
  if (!isExact) return null;

  return (
    <div className="Profile">
      <CreateStudyGroup />
    </div>
  );
};

export default Profile;

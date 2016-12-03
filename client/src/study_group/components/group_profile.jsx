import React from 'react';

import './group_profile.scss';
import JoinRequests from './join_requests';
import Members from './members';

const GroupProfile = ({ isExact, name, params }) => {
  if (!isExact) return null;

  return (
    <div className="GroupProfile">
      <h1 style={{ textAlign: 'center' }}>{name}</h1>
      <div className="GroupProfile-container">
        <div className="GroupProfile-half">
          <JoinRequests params={params} />
        </div>
        <div className="GroupProfile-half">
          <Members params={params} />
        </div>
      </div>
    </div>
  );
};

export default GroupProfile;

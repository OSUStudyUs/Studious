import React from 'react';

import './profile.scss';
import courses from '../../courses';
import studyGroupContainers from '../../study_group/containers';

const { Container: CoursesJoinAndCreate } = courses;
const { StudyGroupSearch } = studyGroupContainers;

const Profile = ({ isExact }) => {
  // This prop is coming from ReactRouter
  // Basically, it lets us know if this component was rendered because of a direct match or the url
  // If it isn't we don't want to render. This makes the routing outside this easier
  if (!isExact) return null;

  return (
    <div className="Profile">
      <div className="Profile-divider">
        <CoursesJoinAndCreate />
      </div>
      <div className="Profile-divider">
        <StudyGroupSearch />
      </div>
    </div>
  );
};

export default Profile;

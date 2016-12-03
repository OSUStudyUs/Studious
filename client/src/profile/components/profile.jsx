import React from 'react';

import './profile.scss';
import courses from '../../courses';
import studyGroupContainers from '../../study_group/containers';

const { Container: CoursesJoinAndCreate } = courses;
const { StudyGroupCreate, StudyGroupSearch } = studyGroupContainers;

const Profile = ({ isExact }) => {
  // This prop is coming from ReactRouter
  // Basically, it lets us know if this component was rendered because of a direct match or the url
  // If it isn't we don't want to render. This makes the routing outside this easier
  if (!isExact) return null;

  return (
    <div className="Profile">
      <div className="Profile-divider">
        <h3>Join A Course</h3>
        <CoursesJoinAndCreate />
      </div>
      <div className="Profile-divider">
        <h3>Join A Study Group</h3>
        <StudyGroupSearch />
      </div>
      <div className="Profile-divider">
        <h3>Create A Study Group</h3>
        <StudyGroupCreate />
      </div>
    </div>
  );
};

export default Profile;

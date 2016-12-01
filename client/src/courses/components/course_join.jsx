import React, { PropTypes } from 'react';

import './course_join.scss';

const CourseJoin = ({ course }) => <p className="CourseJoin">{`${course.name} - ${course.department} - ${course.number}`}</p>;

CourseJoin.propTypes = {
  course: PropTypes.shape({
    department: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired
  }).isRequired
};

export default CourseJoin;

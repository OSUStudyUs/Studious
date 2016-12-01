import React, { PropTypes } from 'react';

import './course.scss';

const Course = ({ course }) => <p className="Course">{`${course.name} - ${course.department} - ${course.number}`}</p>;

Course.propTypes = {
  course: PropTypes.shape({
    department: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired
  }).isRequired
};

export default Course;

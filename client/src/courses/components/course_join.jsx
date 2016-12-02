import React, { Component, PropTypes } from 'react';

import './course_join.scss';
import JoinOrLeaveButton from './join_or_leave_button';

class CourseJoin extends Component {
  static propTypes = {
    course: PropTypes.shape({
      department: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.number.isRequired
    }).isRequired,
    joinCourse: PropTypes.func.isRequired,
    joinedCourses: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      courseUserId: PropTypes.number.isRequired
    }).isRequired).isRequired,
    leaveCourse: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      loadingAction: false
    };

    this.handleJoinOrLeaveClick = this.handleJoinOrLeaveClick.bind(this);
  }

  handleJoinOrLeaveClick() {
    const { course, joinCourse, joinedCourses, leaveCourse } = this.props;
    const joinedCourse = joinedCourses.find(jc => jc.id === course.id);
    const setLoadingToFalse = (resolveOrReject, data) => {
      this.setState({
        loadingAction: false
      });

      return resolveOrReject(data);
    };
    const setLoadingToFalseThen = setLoadingToFalse.bind(null, Promise.resolve);
    const setLoadingToFalseCatch = setLoadingToFalse.bind(null, Promise.reject);

    this.setState({
      loadingAction: true
    });

    if (joinedCourse) {
      leaveCourse(joinedCourse.courseUserId).then(setLoadingToFalseThen).catch(setLoadingToFalseCatch);
    } else {
      joinCourse(course.id).then(setLoadingToFalseThen).catch(setLoadingToFalseCatch);
    }
  }

  render() {
    const { course, joinedCourses } = this.props;

    return (
      <div className="CourseJoinContainer">
        <div className="CourseJoinContainer-courseInformation">
          <p>{course.name}</p>
          <p>{`${course.department} ${course.number}`}</p>
        </div>
        <JoinOrLeaveButton
          className="CourseJoinContainer-joinOrLeaveButton"
          id={course.id}
          joinedCourseIds={joinedCourses.map(jc => jc.id)}
          loading={this.state.loadingAction}
          onClick={this.handleJoinOrLeaveClick}
        />
      </div>
    );
  }
}

export default CourseJoin;

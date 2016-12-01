import React, { Component, PropTypes } from 'react';

import './course_join.scss';

const JoinOrLeaveButton = ({ joinedCourseIds, id, loading, onClick }) => {
  let buttonText;

  if (loading) buttonText = '...';
  else if (joinedCourseIds.indexOf(id) >= 0) buttonText= 'Leave';
  else buttonText = 'Join';

  return (
    <button disabled={loading} onClick={onClick}>{buttonText}</button>
  );
};

JoinOrLeaveButton.propTypes = {
  joinedCourseIds: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  id: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};

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
      loadingJoinOrLeave: false
    };

    this.handleJoinOrLeave = this.handleJoinOrLeave.bind(this);
  }

  handleJoinOrLeave() {
    const { course, joinCourse, joinedCourses, leaveCourse } = this.props;
    const joinedCourse = joinedCourses.find(jc => jc.id === course.id);
    const setLoadingToFalse = (resolveOrReject, data) => {
      this.setState({
        loadingJoinOrLeave: false
      });

      return resolveOrReject(data);
    };
    const setLoadingToFalseThen = setLoadingToFalse.bind(null, Promise.resolve);
    const setLoadingToFalseCatch = setLoadingToFalse.bind(null, Promise.reject);

    this.setState({
      loadingJoinOrLeave: true
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
          joinedCourseIds={joinedCourses.map(jc => jc.id)}
          id={course.id}
          loading={this.state.loadingJoinOrLeave}
          onClick={this.handleJoinOrLeave}
        />
      </div>
    );
  }
}

export default CourseJoin;

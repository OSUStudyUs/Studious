import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { CreateForm } from '../../shared_components';
import coursesContainers from '../../courses/containers';
import * as actions from '../actions';

const { CoursesSearch } = coursesContainers;

const refMap = {
  name: {
    errorText: 'Must be at least 1 character',
    type: 'text',
    validate: (val) => val.length > 0
  }
};

const mapDispatchToProps = (dispatch) => ({
  createStudyGroup: bindActionCreators(actions.createStudyGroup, dispatch)
});

class StudyGroupCreate extends Component {
  static propTypes = {
    createStudyGroup: PropTypes.func.isRequired
  }

  constructor() {
    super();

    this.state = {
      course: null
    };

    this.handleCourseClick = this.handleCourseClick.bind(this);
    this.handleCreateClick = this.handleCreateClick.bind(this);
  }

  handleCourseClick(course) {
    this.setState({
      course,
    });
  }

  handleCreateClick(studyGroup) {
    const studyGroupWithCourse = {
      ...studyGroup,
      courseId: this.state.course && this.state.course.id
    };

    this.props.createStudyGroup(studyGroupWithCourse);
  }

  render() {
    return (
      <div>
        <CoursesSearch onCourseClick={this.handleCourseClick} />
        <CreateForm
          label="Create Study Group"
          onCreate={this.handleCreateClick}
          refMap={refMap}
        />
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(StudyGroupCreate);

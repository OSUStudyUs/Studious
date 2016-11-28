import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import sidebar from '../sidebar';
import * as actions from './actions';
import * as selectors from './selectors';

const coursesHaveChanged = (oldCourses, newCourses) => {
  if (oldCourses === newCourses) return false;
  if (oldCourses === null) return true;
  for (let i = 0; i < oldCourses.length; i++) {
    if (oldCourses[i] !== newCourses[i]) return true;
  }
  return true;
};

const flashcardSetsHaveChanged = (oldFlashcardSets, newFlashcardSets) => {
  if (oldFlashcardSets === newFlashcardSets) return false;
  if (oldFlashcardSets === null) return true;
  for (let i = 0; i < oldFlashcardSets.length; i++) {
    if (oldFlashcardSets[i] !== newFlashcardSets[i]) return true;
  }
  return true;
};

const studyGroupsHaveChanged = (oldStudyGroups, newStudyGroups) => {
  if (oldStudyGroups === newStudyGroups) return false;
  if (oldStudyGroups === null) return true;
  for (let i = 0; i < oldStudyGroups.length; i++) {
    if (oldStudyGroups[i] !== newStudyGroups[i]) return true;
  }
  return true;
};

const propsHaveChanged = (oldProps, newProps) =>
  coursesHaveChanged(oldProps.courses, newProps.courses) ||
  flashcardSetsHaveChanged(oldProps.flashCardSets, newProps.flashCardSets) ||
  studyGroupsHaveChanged(oldProps.studyGroups, newProps.studyGroups);

const mapDispatchToProps = (dispatch) => ({
  loadProfile: bindActionCreators(actions.loadProfile, dispatch),
  updateSidebar: bindActionCreators(sidebar.actions.updateSidebar, dispatch)
});

const mapStateToProps = (state) => ({
  courses: selectors.courses(state),
  flashCardSets: selectors.flashCardSets(state),
  profileLoaded: selectors.profileLoaded(state),
  studyGroups: selectors.studyGroups(state)
});

class Profile extends Component {

  static propTypes = {
    courses: PropTypes.arrayOf(PropTypes.shape({
      courseId: PropTypes.number.isRequired,
      department: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.number.isRequired
    })),
    flashCardSets: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired
    })),
    profileLoaded: PropTypes.bool.isRequired,
    studyGroups: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired
    }))
  };

  componentDidMount() {
    if (!this.props.profileLoaded) {
      this.props.loadProfile(this.props.params.id);
    } else {
      this.props.updateSidebar({
        chatLink: `/users/${this.props.params.id}/chat`
      });
    }
  }

  componentWillReceiveProps(newProps) {
    if (propsHaveChanged(this.props, newProps)) {
      this.props.updateSidebar({
        chatLink: `/users/${newProps.params.id}/chat`,
        dropdownLinks: [],
        flashCardSetLinks: []
      });
    }
  }

  render() {
    return (
      <div className="Profile">
        Profile
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import { Match } from 'react-router';

import './container.scss';
import chat from '../chat';
import sidebar from '../sidebar';
import * as actions from './actions';
import * as selectors from './selectors';

const { Container: Chat } = chat;
const coursesHaveChanged = (oldCourses, newCourses) => {
  if (oldCourses === newCourses) return false;
  if (oldCourses === null) return true;
  for (let i = 0; i < oldCourses.length; i++) {
    if (oldCourses[i] !== newCourses[i]) return true;
  }
  return false;
};

const flashCardSetsHaveChanged = (oldFlashCardSets, newFlashCardSets) => {
  if (oldFlashCardSets === newFlashCardSets) return false;
  if (oldFlashCardSets === null) return true;
  for (let i = 0; i < oldFlashCardSets.length; i++) {
    if (oldFlashCardSets[i] !== newFlashCardSets[i]) return true;
  }
  return false;
};

const studyGroupsHaveChanged = (oldStudyGroups, newStudyGroups) => {
  if (oldStudyGroups === newStudyGroups) return false;
  if (oldStudyGroups === null) return true;
  for (let i = 0; i < oldStudyGroups.length; i++) {
    if (oldStudyGroups[i] !== newStudyGroups[i]) return true;
  }
  return false;
};

const propsHaveChanged = (oldProps, newProps) =>
  coursesHaveChanged(oldProps.courses, newProps.courses) ||
  flashCardSetsHaveChanged(oldProps.flashCardSets, newProps.flashCardSets) ||
  studyGroupsHaveChanged(oldProps.studyGroups, newProps.studyGroups);

const mapDispatchToProps = (dispatch) => ({
  loadProfile: bindActionCreators(actions.loadProfile, dispatch),
  updateSidebar: bindActionCreators(sidebar.actions.updateSidebar, dispatch)
});

const mapStateToProps = (state) => ({
  chatroomId: selectors.chatroomId(state),
  courses: selectors.courses(state),
  flashCardSets: selectors.flashCardSets(state),
  profileLoaded: selectors.profileLoaded(state),
  studyGroups: selectors.studyGroups(state)
});

const mapPropsToSidebarLinks = ({ flashCardSets = [], studyGroups = [] }, userId) => {
  const dropdownLinks = [{
    link: `/users/${userId}`,
    name: 'Profile'
  }];
  const flashCardSetLinks = flashCardSets.map(({ id, name }) => ({
    link: `/users/${userId}/flash-card-sets/${id}`,
    name
  }));
  dropdownLinks.concat(studyGroups.map(({ id, name }) => ({
    link: `/study-groups/${id}`,
    name
  })));

  return {
    chatLink: `/users/${userId}/chat`,
    dropdownLinks,
    flashCardSetLinks
  };
};

class Profile extends Component {

  static propTypes = {
    chatroomId: PropTypes.number,
    courses: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
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
      this.props.updateSidebar(mapPropsToSidebarLinks(this.props, this.props.params.id));
    }
  }

  componentWillReceiveProps(newProps) {
    if (propsHaveChanged(this.props, newProps)) {
      this.props.updateSidebar(mapPropsToSidebarLinks(newProps, newProps.params.id));
    }
  }

  render() {
    const { profileLoaded } = this.props;

    if (!profileLoaded) {
      return (
        <div>Loading...</div>
      );
    }

    return (
      <div className="Profile">
        Profile
        <Chat id={this.props.chatroomId} />
        {/*<Match component={Chat} exactly pattern="/users/:id/chat" />*/}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

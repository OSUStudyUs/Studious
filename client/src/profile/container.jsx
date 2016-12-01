import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import './container.scss';
import chat from '../chat';
import { MatchPassProps, sidebarUtils } from '../utils';
import sidebar from '../sidebar';
import * as actions from './actions';
import * as selectors from './selectors';
import Profile from './components/profile';

// TODO: remove
import courses from '../courses';
const { Container: Courses } = courses;

const { Container: Chat } = chat;

const updateSidebarLinks = (props) => {
  const { mapChatToLink, mapFlashCardSetsToLinks, mapStudyGroupsToLinks } = sidebarUtils;
  const chatLink = mapChatToLink('users', props.params.id);
  const flashCardSetLinks = mapFlashCardSetsToLinks(props.flashCardSets, props.params.id);
  const studyGroupLinks = mapStudyGroupsToLinks(props.studyGroups);

  if (props.shouldUpdateChatLink(chatLink)) props.updateChatLink(chatLink);
  if (props.shouldUpdateFlashCardSetLinks(flashCardSetLinks)) props.updateFlashcardSetLinks(flashCardSetLinks);
  if (props.shouldUpdateStudyGroupLinks(studyGroupLinks)) props.updateStudyGroupLinks(studyGroupLinks);
};

const mapDispatchToProps = (dispatch) => ({
  loadProfile: bindActionCreators(actions.loadProfile, dispatch),
  updateChatLink: bindActionCreators(sidebar.actions.updateChatLink, dispatch),
  updateFlashcardSetLinks: bindActionCreators(sidebar.actions.updateFlashcardSetLinks, dispatch),
  updateStudyGroupLinks: bindActionCreators(sidebar.actions.updateStudyGroupLinks, dispatch)
});

const mapStateToProps = (state) => ({
  ...selectors.profile(state),
  shouldUpdateChatLink: sidebar.selectors.shouldUpdateChatLink.bind(null, state),
  shouldUpdateFlashCardSetLinks: sidebar.selectors.shouldUpdateFlashCardSetLinks.bind(null, state),
  shouldUpdateStudyGroupLinks: sidebar.selectors.shouldUpdateStudyGroupLinks.bind(null, state)
});

class ProfileContainer extends Component {

  static propTypes = {
    chatroomId: PropTypes.number,
    courses: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      courseUserId: PropTypes.number.isRequired
    }).isRequired),
    flashCardSets: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired
    })),
    loadProfile: PropTypes.func.isRequired,
    shouldUpdateChatLink: PropTypes.func.isRequired,
    shouldUpdateFlashCardSetLinks: PropTypes.func.isRequired,
    shouldUpdateStudyGroupLinks: PropTypes.func.isRequired,
    studyGroups: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired
    })),
    updateChatLink: PropTypes.func.isRequired,
    updateFlashcardSetLinks: PropTypes.func.isRequired,
    updateStudyGroupLinks: PropTypes.func.isRequired
  };

  componentDidMount() {
    if (Object.keys(ProfileContainer.propTypes).some((key) => typeof this.props[key] === 'undefined' )) {
      this.props.loadProfile(this.props.params.id);
    } else {
      updateSidebarLinks(this.props);
    }
  }

  componentWillReceiveProps(newProps) {
    updateSidebarLinks(newProps);
  }

  render() {
    if (Object.keys(ProfileContainer.propTypes).some((key) => typeof this.props[key] === 'undefined' )) {
      return (
        <div>Loading...</div>
      );
    }

    return (
      <div className="ProfileContainer">
        <MatchPassProps component={Profile} exactly pattern="/users/:id" />
        <MatchPassProps component={Chat} exactly pattern="/users/:id/chat" id={this.props.chatroomId} />
        {/* TODO: remove this */}
        <Courses />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);

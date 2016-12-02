import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import './container.scss';
import { MatchPassProps, propUtils, sidebarUtils } from '../utils';
import chat from '../chat';
import flashCardSet from '../flash_card_set';
import Profile from './components/profile';
import sidebar from '../sidebar';
import * as actions from './actions';
import * as selectors from './selectors';
import * as flashCardSetSelectors from '../flash_card_set/selectors';
import * as studyGroupSelectors from '../study_group/selectors';

const { Container: Chat } = chat;
const { Container: FlashCardSet } = flashCardSet;

const updateSidebarLinks = (props) => {
  const { mapChatToLink } = sidebarUtils;
  const { flashCardSetLinks, studyGroupLinks } = props;
  const chatLink = mapChatToLink('users', props.params.id);

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
const mapStateToProps = (state, { params }) => {
  const { flashCardSetIds, studyGroupIds } = selectors.profile(state);

  return ({
  ...selectors.profile(state),
  flashCardSetLinks: sidebarUtils.mapFlashCardSetsToLinks(flashCardSetSelectors.byIds(state, flashCardSetIds || []), 'users', params.id),
  studyGroupLinks: sidebarUtils.mapStudyGroupsToLinks(studyGroupSelectors.byIds(state, studyGroupIds || [])),
  shouldUpdateChatLink: sidebar.selectors.shouldUpdateChatLink.bind(null, state),
  shouldUpdateFlashCardSetLinks: sidebar.selectors.shouldUpdateFlashCardSetLinks.bind(null, state),
  shouldUpdateStudyGroupLinks: sidebar.selectors.shouldUpdateStudyGroupLinks.bind(null, state)
});
};

class ProfileContainer extends Component {

  static propTypes = {
    chatroomId: PropTypes.number,
    courses: PropTypes.arrayOf(PropTypes.shape({
      courseUserId: PropTypes.number.isRequired,
      id: PropTypes.number.isRequired
    }).isRequired),
    email: PropTypes.string,
    firstName: PropTypes.string,
    flashCardSetIds: PropTypes.arrayOf(PropTypes.number.isRequired),
    flashCardSetLinks: PropTypes.arrayOf(PropTypes.shape({
      link: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })).isRequired,
    loadProfile: PropTypes.func.isRequired,
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    }).isRequired,
    lastName: PropTypes.string,
    shouldUpdateChatLink: PropTypes.func.isRequired,
    shouldUpdateFlashCardSetLinks: PropTypes.func.isRequired,
    shouldUpdateStudyGroupLinks: PropTypes.func.isRequired,
    studyGroupIds: PropTypes.arrayOf(PropTypes.number.isRequired),
    studyGroupLinks: PropTypes.arrayOf(PropTypes.shape({
      link: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })).isRequired,
    updateChatLink: PropTypes.func.isRequired,
    updateFlashcardSetLinks: PropTypes.func.isRequired,
    updateStudyGroupLinks: PropTypes.func.isRequired
  };

  componentDidMount() {
    if (!propUtils.allReceived(ProfileContainer.propTypes, this.props)) {
      this.props.loadProfile(this.props.params.id);
    } else {
      updateSidebarLinks(this.props);
    }
  }

  componentWillReceiveProps(newProps) {
    updateSidebarLinks(newProps);
  }

  render() {
    if (!propUtils.allReceived(ProfileContainer.propTypes, this.props)) {
      return (
        <div>Loading...</div>
      );
    }

    return (
      <div className="ProfileContainer">
        <MatchPassProps component={Profile} exactly pattern="/users/:id" />
        <MatchPassProps component={Chat} exactly pattern="/users/:id/chat" id={this.props.chatroomId} />
        <MatchPassProps
          component={FlashCardSet}
          createRoute={`users/${this.props.params.id}`}
          exactly
          pattern="/users/:id/flash-card-sets/:flashCardSetId"
          rootRoute="/users/:id"
        />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);

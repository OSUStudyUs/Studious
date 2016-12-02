import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { MatchPassProps, propUtils, sidebarUtils } from '../utils';
import chat from '../chat';
import sidebar from '../sidebar';
import * as actions from './actions';
import * as selectors from './selectors';

const { Container: Chat } = chat;

const updateSidebarLinks = (props) => {
  const { mapChatToLink, mapFlashCardSetsToLinks, mapStudyGroupsToLinks } = sidebarUtils;
  const chatLink = mapChatToLink('study-groups', props.params.id);
  const flashCardSetLinks = mapFlashCardSetsToLinks(props.flashCardSets, props.params.id);
  const studyGroupLinks = mapStudyGroupsToLinks([ { id: props.params.id, name: props.name }]);

  if (props.shouldUpdateChatLink(chatLink)) props.updateChatLink(chatLink);
  if (props.shouldUpdateFlashCardSetLinks(flashCardSetLinks)) props.updateFlashcardSetLinks(flashCardSetLinks);
  if (props.shouldUpdateStudyGroupLinks(studyGroupLinks)) props.updateStudyGroupLinks(studyGroupLinks);
};

const mapDispatchToProps = (dispatch) => ({
  loadStudyGroup: bindActionCreators(actions.loadStudyGroup, dispatch),
  updateChatLink: bindActionCreators(sidebar.actions.updateChatLink, dispatch),
  updateFlashcardSetLinks: bindActionCreators(sidebar.actions.updateFlashcardSetLinks, dispatch),
  updateStudyGroupLinks: bindActionCreators(sidebar.actions.updateStudyGroupLinks, dispatch)
});
const mapStateToProps = (state, { params }) => ({
  ...selectors.byId(state, params.id),
  shouldUpdateChatLink: sidebar.selectors.shouldUpdateChatLink.bind(null, state),
  shouldUpdateFlashCardSetLinks: sidebar.selectors.shouldUpdateFlashCardSetLinks.bind(null, state),
  shouldUpdateStudyGroupLinks: sidebar.selectors.shouldUpdateStudyGroupLinks.bind(null, state)
});

class StudyGroupContainer extends Component {

  static propTypes = {
    acceptingNewMembers: PropTypes.bool,
    chatroomId: PropTypes.number,
    course: PropTypes.object,
    id: PropTypes.number,
    loadStudyGroup: PropTypes.func.isRequired,
    name: PropTypes.string,
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    }).isRequired,
    shouldUpdateChatLink: PropTypes.func.isRequired,
    shouldUpdateFlashCardSetLinks: PropTypes.func.isRequired,
    shouldUpdateStudyGroupLinks: PropTypes.func.isRequired,
    updateChatLink: PropTypes.func.isRequired,
    updateFlashcardSetLinks: PropTypes.func.isRequired,
    updateStudyGroupLinks: PropTypes.func.isRequired
  };

  componentDidMount() {
    if (propUtils.notAllReceived(StudyGroupContainer.propTypes, this.props)) {
      this.props.loadStudyGroup(this.props.params.id);
    } else {
      updateSidebarLinks(this.props);
    }
  }

  componentWillReceiveProps(newProps) {
    // If we're not receiving an id in props, then this there is no links to render
    if (!(typeof newProps.id === 'undefined' || newProps === null)) {
      updateSidebarLinks(newProps);
    }
  }

  render() {
    return (
      <div className="StudyGroupContainer">
        {this.props.chatroomId &&
          <MatchPassProps component={Chat} exactly pattern="/study-groups/:id/chat" id={this.props.chatroomId} />
        }
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StudyGroupContainer);

import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { MatchPassProps, propUtils, sidebarUtils } from '../utils';
import chat from '../chat';
import flashCardSet from '../flash_card_set';
import sidebar from '../sidebar';
import * as actions from './actions';
import * as flashCardSetSelectors from '../flash_card_set/selectors';
import * as selectors from './selectors';

const { Container: Chat } = chat;
const { Container: FlashCardSet } = flashCardSet;

const updateSidebarLinks = (props) => {
  const { mapChatToLink, mapStudyGroupsToLinks } = sidebarUtils;
  const { flashCardSetLinks } = props;
  const chatLink = mapChatToLink('study-groups', props.params.id);
  const studyGroupLinks = mapStudyGroupsToLinks([ {id: props.params.id, name: props.name }]);

  if (props.shouldUpdateChatLink(chatLink)) props.updateChatLink(chatLink);
  if (props.shouldUpdateFlashCardSetLinks(flashCardSetLinks)) props.updateFlashcardSetLinks(flashCardSetLinks);
  if (props.name && props.shouldUpdateStudyGroupLinks(studyGroupLinks)) props.updateStudyGroupLinks(studyGroupLinks);
};

const mapDispatchToProps = (dispatch) => ({
  loadStudyGroup: bindActionCreators(actions.loadStudyGroup, dispatch),
  updateChatLink: bindActionCreators(sidebar.actions.updateChatLink, dispatch),
  updateFlashcardSetLinks: bindActionCreators(sidebar.actions.updateFlashcardSetLinks, dispatch),
  updateStudyGroupLinks: bindActionCreators(sidebar.actions.updateStudyGroupLinks, dispatch)
});
const mapStateToProps = (state, { params }) => {
  const flashCardSetIds = selectors.byId(state, params.id)
    ? (selectors.byId(state, params.id).flashCardSetIds || [])
    : [];

  return {
    ...selectors.byId(state, params.id),
    flashCardSetLinks: sidebarUtils.mapFlashCardSetsToLinks(flashCardSetSelectors.byIds(state, flashCardSetIds), 'study-groups', params.id),
    shouldUpdateChatLink: sidebar.selectors.shouldUpdateChatLink.bind(null, state),
    shouldUpdateFlashCardSetLinks: sidebar.selectors.shouldUpdateFlashCardSetLinks.bind(null, state),
    shouldUpdateStudyGroupLinks: sidebar.selectors.shouldUpdateStudyGroupLinks.bind(null, state)
  };
};

class StudyGroupContainer extends Component {

  static propTypes = {
    chatroomId: PropTypes.number,
    course: PropTypes.object,
    flashCardSets: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired
    })),
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
    if (!propUtils.allReceived(StudyGroupContainer.propTypes, this.props)) {
      this.props.loadStudyGroup(this.props.params.id);
    } else {
      updateSidebarLinks(this.props);
    }
  }

  componentWillReceiveProps(newProps) {
    updateSidebarLinks(newProps);
  }

  shouldComponentUpdate(newProps) {
    return this.props.id !== newProps.id || this.props.params.id !== newProps.params.id;
  }

  render() {
    return (
      <div className="StudyGroupContainer">
        {propUtils.allReceived(StudyGroupContainer.propTypes, this.props) &&
          <MatchPassProps
            component={FlashCardSet}
            createRoute={`study_groups/${this.props.params.id}`}
            exactly
            pattern="/study-groups/:id/flash-card-sets/:flashCardSetId"
            rootRoute="/study-groups/:id"
          />
        }
        {this.props.chatroomId &&
          <MatchPassProps component={Chat} exactly pattern="/study-groups/:id/chat" id={this.props.chatroomId} />
        }
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StudyGroupContainer);

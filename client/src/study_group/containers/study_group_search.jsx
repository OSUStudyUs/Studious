import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Dialog, FlatButton } from 'material-ui';

import './study_group_search.scss';
import { SearchAndCreate } from '../../shared_components';
import components from '../components';
import * as actions from '../actions';
import * as courseSelectors from '../../courses/selectors';
import * as flashCardSetSelectors from '../../flash_card_set/selectors';
import * as selectors from '../selectors';
import * as userSelectors from '../../user/selectors';

const mapDispatchToProps = (dispatch) => ({
  createStudyGroup: bindActionCreators(actions.createStudyGroup, dispatch),
  loadStudyGroups: bindActionCreators(actions.loadStudyGroups, dispatch)
});

const mapStateToProps = (state) => ({
  saturateStudyGroup: (id) => {
    const studyGroup = selectors.byId(state, id);

    return {
      ...studyGroup,
      course: studyGroup.courseId && courseSelectors.courseById(state, studyGroup.courseId),
      flashCardSets: flashCardSetSelectors.byIds(state, studyGroup.flashCardSetIds),
      users: userSelectors.byIds(state, studyGroup.userIds)
    };
  },
  studyGroupsLoading: selectors.loading(state),
  searchForStudyGroups: selectors.search.bind(null, state)
});

class StudyGroupSearch extends Component {
  static propTypes = {
    studyGroupsLoading: PropTypes.bool.isRequired,
    loadStudyGroups: PropTypes.func.isRequired,
    searchForStudyGroups: PropTypes.func.isRequired
  }

  constructor() {
    super();

    this.state = {
      showStudyGroupDialog: false,
      studyGroup: null
    };

    this.handleCloseDialog = this.handleCloseDialog.bind(this);
    this.handleItemClick = this.handleItemClick.bind(this);
  }

  handleItemClick(studyGroup) {
    this.setState({
      showStudyGroupDialog: true,
      studyGroup: this.props.saturateStudyGroup(studyGroup.id)
    });
  }

  handleCloseDialog() {
    this.setState({
      showStudyGroupDialog: false,
      studyGroup: null
    });
  }

  renderDialogBody() {
    const studyGroup = this.state.studyGroup;

    return (
      <div>
        {
          studyGroup.course &&
          <div>
            <p>Studies for {`${studyGroup.course.department} ${studyGroup.course.number} - ${studyGroup.course.name}`}</p>
            <hr />
          </div>
        }
        <h1>Members</h1>
        {
          studyGroup.users.length > 0
          ? studyGroup.users.map(user => <p key={user.id}>{`${user.firstName} ${user.lastName}`}</p>)
          : <p>No members yet!</p>
        }
      </div>
    );
  }

  render() {
    const {
      studyGroupsLoading,
      loadStudyGroups,
      searchForStudyGroups
    } = this.props;

    const actions = [
      <FlatButton
        label="Close"
        primary={true}
        onTouchTap={this.handleCloseDialog}
      />,
      <FlatButton
        label="Request to Join"
        primary={true}
        onTouchTap={this.handleCloseDialog}
      />
    ];

    return (
      <div>
        <SearchAndCreate
          itemComponent={components.StudyGroup}
          itemsLoading={studyGroupsLoading}
          loadItems={loadStudyGroups}
          name="StudyGroup"
          onItemClick={this.handleItemClick}
          searchForItems={searchForStudyGroups}
        />
        <Dialog
          actions={actions}
          autoScrollBodyContent={true}
          modal={false}
          onRequestClose={this.handleCloseDialog}
          open={this.state.showStudyGroupDialog}
          subtitle={this.state.studyGroup && this.state.studyGroup.course && this.state.studyGroup.course.name}
          title={this.state.studyGroup && this.state.studyGroup.name}
        >
          <div className="StudyGroupSearchDialog-body">{this.state.studyGroup && this.renderDialogBody()}</div>
        </Dialog>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StudyGroupSearch);

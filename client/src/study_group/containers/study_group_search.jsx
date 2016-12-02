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

const mapDispatchToProps = (dispatch) => ({
  createStudyGroup: bindActionCreators(actions.createStudyGroup, dispatch),
  loadStudyGroups: bindActionCreators(actions.loadStudyGroups, dispatch)
});

const mapStateToProps = (state) => ({
  saturateStudyGroup: (id) => {
    const studyGroup = selectors.byId(state, id);

    return {
      ...studyGroup,
      course: studyGroup.courseId && courseSelectors.byId(state, studyGroup.courseId),
      flashCardSets: studyGroup.flashCardSetIds.map(flashCardSetId => flashCardSetSelectors.byId(state, flashCardSetId))
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
          title={this.state.studyGroup && this.state.studyGroup.name}
          subtitle={this.state.studyGroup && this.state.studyGroup.course && this.state.studyGroup.course.name}
          actions={actions}
          modal={false}
          open={this.state.showStudyGroupDialog}
          onRequestClose={this.handleCloseDialog}
        >
          <div className="StudyGroupSearchContainer-dialog--">
            {this.state.studyGroup && this.state.studyGroup.name}
          </div>
        </Dialog>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StudyGroupSearch);

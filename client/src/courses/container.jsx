import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import './container.scss';
import { CreateForm, SearchAndCreate } from '../shared_components';
import components from './components';
import * as actions from './actions';
import * as profileSelectors from '../profile/selectors';
import * as selectors from './selectors';

const refMap = {
  name: {
    errorText: 'Must be at least 1 character',
    type: 'text',
    validate: (val) => val.length > 0
  },
  department: {
    errorText: 'Must be at least 1 character',
    type: 'text',
    validate: (val) => val.length > 0
  },
  number: {
    errorText: 'Must be a number',
    type: 'number',
    validate: (val) => !isNaN(parseInt(val, 10))
  }
};

const mapDispatchToProps = (dispatch) => ({
  createCourse: bindActionCreators(actions.createCourse, dispatch),
  joinCourse: bindActionCreators(actions.joinCourse, dispatch),
  leaveCourse: bindActionCreators(actions.leaveCourse, dispatch),
  loadCourses: bindActionCreators(actions.loadCourses, dispatch)
});

const mapStateToProps = (state) => ({
  coursesLoading: selectors.coursesLoading(state),
  joinedCourses: profileSelectors.profile(state).courses,
  searchForCourses: selectors.searchForCourses.bind(null, state)
});

class CoursesJoinAndCreate extends Component {
  static propTypes = {
    coursesLoading: PropTypes.bool.isRequired,
    joinCourse: PropTypes.func.isRequired,
    joinedCourses: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      courseUserId: PropTypes.number.isRequired
    }).isRequired).isRequired,
    leaveCourse: PropTypes.func.isRequired,
    loadCourses: PropTypes.func.isRequired,
    searchForCourses: PropTypes.func.isRequired
  }

  constructor() {
    super();
    this.state = {
      creating: false
    };
    this.handleCreateClick = this.handleCreateClick.bind(this);
    this.handleCreatingStateSwitch = this.handleCreatingStateSwitch.bind(this);
  }

  handleCreateClick(course) {
    this.setState({
      creating: !this.state.creating
    });
    this.props.createCourse(course);
  }

  handleCreatingStateSwitch(e) {
    e.stopPropagation();

    this.setState({
      creating: !this.state.creating
    });
  }

  render() {
    const {
      coursesLoading,
      joinCourse,
      joinedCourses,
      leaveCourse,
      loadCourses,
      searchForCourses
    } = this.props;

    return (
      <div>
        <SearchAndCreate
          creatingItem={this.state.creating}
          itemComponent={components.CourseJoin}
          itemComponentProps={{
            joinCourse: joinCourse,
            joinedCourses: joinedCourses,
            leaveCourse: leaveCourse
          }}
          itemsLoading={coursesLoading}
          handleCreatingStateSwitch={this.handleCreatingStateSwitch}
          loadItems={loadCourses}
          name="Course"
          searchForItems={searchForCourses}
        >
          <CreateForm
            label="Create Class"
            onCreate={this.handleCreateClick}
            refMap={refMap}
          />
        </SearchAndCreate>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesJoinAndCreate);

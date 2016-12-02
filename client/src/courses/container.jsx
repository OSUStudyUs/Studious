import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import './container.scss';
import { Input, SearchAndCreate } from '../shared_components';
import components from './components';
import * as actions from './actions';
import * as profileSelectors from '../profile/selectors';
import * as selectors from './selectors';

const courseFromRefs = (refs) => Object.keys(refs).reduce((acc, key) => ({ ...acc, [key]: refs[key].value() }), {});

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

    this.handleCreateClick = this.handleCreateClick.bind(this);
  }

  handleCreateClick() {
    this.props.createCourse(courseFromRefs(this.refs));
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
          itemComponent={components.CourseJoin}
          itemComponentProps={{
            joinCourse: joinCourse,
            joinedCourses: joinedCourses,
            leaveCourse: leaveCourse
          }}
          itemsLoading={coursesLoading}
          loadItems={loadCourses}
          name="Course"
          onCreateClick={this.handleCreateClick}
          searchForItems={searchForCourses}
        >
          <Input
            label="Name"
            hint="Must be at least 1 character"
            ref="name"
            type="text"
            validate={val => val.length > 0}
          />
          <Input
            label="Department"
            hint="Must be at least 1 character"
            ref="department"
            type="text"
            validate={val => val.length > 0}
          />
          <Input
            label="Number"
            hint="Must be a number"
            ref="number"
            type="number"
            validate={val => !isNaN(parseInt(val, 10))}
          />
        </SearchAndCreate>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesJoinAndCreate);

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import './container.scss';
import { Input, SearchAndCreate } from '../shared_components';
import components from './components';
import * as actions from './actions';
import * as selectors from './selectors';

const courseFromRefs = (refs) =>
  Object.keys(refs).reduce((acc, key) => {
    return {
      ...acc,
      [key]: refs[key].value()
    };
  }, {});

const mapDispatchToProps = (dispatch) => ({
  createCourse: bindActionCreators(actions.createCourse, dispatch),
  loadCourses: bindActionCreators(actions.loadCourses, dispatch)
});

const mapStateToProps = (state) => ({
  coursesLoading: selectors.coursesLoading(state),
  searchForCourses: selectors.searchForCourses.bind(null, state)
});

class CoursesJoinAndCreate extends Component {
  static propTypes = {
    coursesLoading: PropTypes.bool.isRequired,
    loadCourses: PropTypes.func.isRequired,
    searchForCourses: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);

    this.handleCreateClick = this.handleCreateClick.bind(this);
  }

  handleCreateClick() {
    this.props.createCourse(courseFromRefs(this.refs));
  }

  render() {
    const { coursesLoading, loadCourses, searchForCourses} = this.props;

    return (
      <div>
        <SearchAndCreate
          itemComponent={components.CourseJoin}
          itemsLoading={coursesLoading}
          loadItems={loadCourses}
          name="Course"
          onCreateClick={this.handleCreateClick}
          searchForItems={searchForCourses}
        >
          <Input
            label="Name"
            onEnter={() => true}
            ref="name"
            type="text"
            validate={(val) => val.length > 0}
          />
          <Input
            label="Department"
            onEnter={() => true}
            ref="department"
            type="text"
            validate={(val) => val.length > 0}
          />
          <Input
            label="Number"
            onEnter={() => true}
            ref="number"
            type="number"
            validate={() => true}
          />
        </SearchAndCreate>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesJoinAndCreate);

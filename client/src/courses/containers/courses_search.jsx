import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { SearchAndCreate } from '../../shared_components';
import components from '../components';
import * as actions from '../actions';
import * as selectors from '../selectors';

const mapDispatchToProps = (dispatch) => ({
  loadCourses: bindActionCreators(actions.loadCourses, dispatch)
});

const mapStateToProps = (state) => ({
  coursesLoading: selectors.coursesLoading(state),
  searchForCourses: selectors.searchForCourses.bind(null, state)
});

const CoursesSearch = ({ loadCourses, coursesLoading, onCourseClick, searchForCourses}) => (
  <SearchAndCreate
    itemComponent={components.Course}
    itemsLoading={coursesLoading}
    loadItems={loadCourses}
    name="Course"
    onItemClick={onCourseClick}
    searchForItems={searchForCourses}
  />
);

CoursesSearch.propTypes = {
  loadCourses: PropTypes.func.isRequired,
  coursesLoading: PropTypes.bool.isRequired,
  onCourseClick: PropTypes.func.isRequired,
  searchForCourses: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(CoursesSearch);

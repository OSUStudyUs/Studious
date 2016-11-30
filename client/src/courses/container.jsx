import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import './container.scss';
import { Search } from '../shared_components';
import components from './components';
import * as actions from './actions';
import * as selectors from './selectors';

const mapDispatchToProps = (dispatch) => ({
  loadCourses: bindActionCreators(actions.loadCourses, dispatch)
});

const mapStateToProps = (state) => ({
  coursesLoading: selectors.coursesLoading(state),
  searchForCourses: selectors.searchForCourses.bind(null, state)
});

const CoursesSearch = ({ coursesLoading, loadCourses, searchForCourses}) => (
  <Search
    itemComponent={components.Course}
    itemsLoading={coursesLoading}
    loadItems={loadCourses}
    name="Course"
    searchForItems={searchForCourses}
  >
    <p>I'm a form to create things!</p>
  </Search>
);

CoursesSearch.propTypes = {
  coursesLoading: PropTypes.bool.isRequired,
  loadCourses: PropTypes.func.isRequired,
  searchForCourses: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(CoursesSearch);

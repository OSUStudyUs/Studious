import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import './container.scss';
import { Input, Search } from '../shared_components';
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

class CoursesSearch extends Component {
  static propTypes = {
    coursesLoading: PropTypes.bool.isRequired,
    loadCourses: PropTypes.func.isRequired,
    searchForCourses: PropTypes.func.isRequired
  }

  render() {
    const { coursesLoading, loadCourses, searchForCourses} = this.props;

    return (
      <Search
        itemComponent={components.Course}
        itemsLoading={coursesLoading}
        loadItems={loadCourses}
        name="Course"
        onCreateItem={(values) => console.log(`${values.name} created`)}
        searchForItems={searchForCourses}
        values={{
          department: () => this._department,
          name: () => this._name,
          number: () => this._number
        }}
      >
        <Input
          label="Department"
          onEnter={() => true}
          ref={(ref) => { this._department = ref; }}
          type="text"
          validate={(val) => val.length > 0}
        />
        <Input
          label="Name"
          onEnter={() => true}
          ref={(ref) => { this._name = ref; }}
          type="text"
          validate={(val) => val.length > 0}
        />
        <Input
          label="Number"
          onEnter={() => true}
          ref={(ref) => { this._number = ref; }}
          type="number"
          validate={() => true}
        />
      </Search>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesSearch);

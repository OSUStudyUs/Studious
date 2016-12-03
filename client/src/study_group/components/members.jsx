import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import * as selectors from './selectors';
import * as userSelectors from '../../user/selectors';

const mapStateToProps = (state, { params }) => ({
  members: userSelectors.byIds(state, selectors.memberIds(state, params.id))
});

class StudyGroupMembers extends Component {

  static propTypes = {
    members: PropTypes.arrayOf(PropTypes.object.isRequired)
  };


}

export default connect(mapStateToProps)(StudyGroupMembers);

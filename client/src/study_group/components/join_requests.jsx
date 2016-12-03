import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { List } from 'material-ui/List';

import * as actions from './actions';
import * as selectors from './selectors';
import * as userSelectors from '../../user/selectors';
import JoinRequest from './join_request';

const mapDispatchToProps = (dispatch) => ({
  approveMembership: bindActionCreators(actions.approveMembership, dispatch),
  denyMembership: bindActionCreators(actions.denyMembership, dispatch)
});
const mapStateToProps = (state, { params }) => ({
  pendingUsers: userSelectors.byIds(selectors.pendingIds(state, params.id))
});

class StudyGroupJoinRequests extends Component {

  static propTypes = {
    approveMembership: PropTypes.func.isRequired,
    denyMembership: PropTypes.func.isRequired,
    pendingUsers: PropTypes.arrayOf(PropTypes.object)
  };

  render() {
    return (
      <List>
        {this.props.pendingUsers.map((user) =>
          <JoinRequest
            key={user.id}
            onApprove={() => this.props.approveMembership(user.membershipId)}
            onDeny={() => this.props.denyMembership(user.membershipId)}
            user={user}
          />
        )}
      </List>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StudyGroupJoinRequests);

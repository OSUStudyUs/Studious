import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Divider from 'material-ui/Divider';
import { List, ListItem } from 'material-ui/List';

import * as actions from '../actions';
import * as selectors from '../selectors';
import * as userSelectors from '../../user/selectors';
import JoinRequest from './join_request';

const mapDispatchToProps = (dispatch) => ({
  approveMembership: bindActionCreators(actions.approveMembership, dispatch),
  denyMembership: bindActionCreators(actions.denyMembership, dispatch)
});
const mapStateToProps = (state, { params }) => {
  const ids = selectors.pendingIds(state, params.id).map(({ id }) => id);

  return ({
    pendingUsers: userSelectors.byIds(state, ids)
  });
};

class StudyGroupJoinRequests extends Component {

  static propTypes = {
    approveMembership: PropTypes.func.isRequired,
    denyMembership: PropTypes.func.isRequired,
    pendingUsers: PropTypes.arrayOf(PropTypes.object)
  };

  render() {
    return (
      <List>
        <ListItem primaryText="MEMBERSHIP REQUESTS" />
        <Divider />
        {this.props.pendingUsers.map((user) =>
          <span key={user.id}>
            <JoinRequest
              onApprove={() => this.props.approveMembership(user.membershipId)}
              onDeny={() => this.props.denyMembership(user.membershipId)}
              user={user}
            />
            <Divider />
          </span>
        )}
      </List>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StudyGroupJoinRequests);

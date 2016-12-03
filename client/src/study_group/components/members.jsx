import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Divider from 'material-ui/Divider';
import { List, ListItem } from 'material-ui/List';

import * as selectors from '../selectors';
import * as userSelectors from '../../user/selectors';
import Member from './member';

const mapStateToProps = (state, { params }) => {
  const ids = selectors.memberIds(state, params.id).map(({ id }) => id);

  return ({
    members: userSelectors.byIds(state, ids)
  });
};

class StudyGroupMembers extends Component {

  static propTypes = {
    members: PropTypes.arrayOf(PropTypes.object.isRequired)
  };

  render() {
    return (
      <List>
        <ListItem
          primaryText="MEMBERS"
        />
        <Divider />
        {this.props.members.map((user) =>
          <span key={user.id}>
            <Member
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

export default connect(mapStateToProps)(StudyGroupMembers);

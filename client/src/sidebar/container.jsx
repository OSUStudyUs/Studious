import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';
import Divider from 'material-ui/Divider';
import DropDownMenu from 'material-ui/DropDownMenu';
import LibraryAdd from 'material-ui/svg-icons/av/library-add';
import { List, ListItem } from 'material-ui/List';
import MenuItem from 'material-ui/MenuItem';
import './container.scss';
import * as selectors from './selectors';
import * as authSelectors from '../authentication/selectors';

const mapStateToProps = (state) => ({
  ...selectors.sidebar(state),
  activePath: document.location.pathname,
  user: authSelectors.user()
});

class Sidebar extends Component {

  static propTypes = {
    activePath: PropTypes.string.isRequired,
    chatLink: PropTypes.string,
    flashCardSetLinks: PropTypes.arrayOf(PropTypes.shape({
      link: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })),
    router: PropTypes.object.isRequired,
    studyGroupLinks: PropTypes.arrayOf(PropTypes.shape({
      link: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })),
    user: PropTypes.shape({
      id: PropTypes.number.isRequired
    }).isRequired
  };

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, index, value) {
    this.activeDropdownLink = value;
    this.props.router.transitionTo(value);
  }

  render() {
    const { activePath, flashCardSetLinks, router, studyGroupLinks, user } = this.props;
    const userMenuItem = <MenuItem primaryText="Profile" value={`/users/${user.id}`} />;
    const flashCardSetMenuItems = (flashCardSetLinks || []).map(({ link, name }) =>
      <ListItem onClick={() => router.transitionTo(link)} primaryText={name} key={link}/>
    );
    const studyGroupMenuItems = (studyGroupLinks).map(({ link, name }) =>
      <MenuItem value={link} key={link} primaryText={name} />
    );
    const listStyle = {
      width: '100%'
    };

    return (
      <List>
        <DropDownMenu
          autoWidth={false}
          id="ProfileLinks"
          listStyle={listStyle}
          maxHeight={300}
          onChange={this.handleChange}
          value={activePath.split('/').slice(0, 3).join('/')}
        >
          {userMenuItem}
          <Divider />
          <MenuItem primaryText="Study Groups" disabled />
          {studyGroupMenuItems}
        </DropDownMenu>
        <ListItem
          onClick={() => router.transitionTo(`${activePath.split('/').slice(0, 3).join('/')}/chat`)}
          primaryText="CHAT"
          rightIcon={<CommunicationChatBubble />}
        />
        <Divider />
        <MenuItem
          primaryText="Flash Card Sets"
          disabled
        />
        {flashCardSetMenuItems}
        <ListItem
          onClick={() => router.transitionTo(`${activePath.split('/').slice(0, 3).join('/')}/flash-card-sets/new`)}
          primaryText="Create One!"
          rightIcon={<LibraryAdd />}
        />
      </List>
    );
  }
}

export default connect(mapStateToProps)(Sidebar);

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import * as selectors from './selectors';
import * as authSelectors from '../authentication/selectors';

const mapStateToProps = (state) => ({
  ...selectors.sidebar(state),
  user: authSelectors.user()
});

class Sidebar extends Component {

  static propTypes = {
    chatLink: PropTypes.string,
    flashCardSetLinks: PropTypes.arrayOf(PropTypes.shape({
      link: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })),
    studyGroupLinks: PropTypes.arrayOf(PropTypes.shape({
      link: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })),
    user: PropTypes.shape({
      id: PropTypes.number.isRequired
    }).isRequired
  };

  render() {
    const { chatLink, flashCardSetLinks, studyGroupLinks, user } = this.props;

    return (
      <div className="Sidebar">
        <ul>
          <Link to={`/users/${user.id}`}>Profile</Link>
          <hr />
          {chatLink && <Link to={chatLink}>Chat</Link>}
          <hr/>
          {flashCardSetLinks && flashCardSetLinks.length > 0 && <p>Flashcard Sets</p>}
          {flashCardSetLinks && flashCardSetLinks.length > 0 && flashCardSetLinks.map(({ link, name }) => (
            <li key={link}><Link to={link}>{name}</Link></li>
          ))}
          {studyGroupLinks && studyGroupLinks.length > 0 && <p>Study Groups</p>}
          {studyGroupLinks && studyGroupLinks.length > 0 && studyGroupLinks.map(({ link, name }) => (
            <li key={link}><Link to={link}>{name}</Link></li>
          ))}
        </ul>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Sidebar);

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import * as selectors from './selectors';

const mapStateToProps = (state) => ({
  ...selectors.sidebar(state)
});

class Sidebar extends Component {

  static propTypes = {
    chatLink: PropTypes.string,
    dropdownLinks: PropTypes.arrayOf(PropTypes.shape({
      link: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })),
    flashCardSetLinks: PropTypes.arrayOf(PropTypes.shape({
      link: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })),
    loading: PropTypes.bool.isRequired
  };

  render() {
    const { chatLink, dropdownLinks, flashCardSetLinks, loading } = this.props;

    if (loading) {
      return (
        <div className="Sidebar">Loading...</div>
      );
    }

    return (
      <div className="Sidebar">
        <ul>
          {dropdownLinks.map(({ link, name }) => (
            <li key={link}><Link to={link}>{name}</Link></li>
          ))}
          <hr />
          <Link to={chatLink}>Chat</Link>
          <hr/>
          {flashCardSetLinks.length > 0 && <p>Flashcard Sets</p>}
          {flashCardSetLinks.map(({ link, name }) => (
            <li key={link}><Link to={link}>{name}</Link></li>
          ))}
        </ul>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Sidebar);

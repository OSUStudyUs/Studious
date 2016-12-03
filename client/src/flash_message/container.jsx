import React, { Component, PropTypes } from 'react';
import Avatar from 'material-ui/Avatar';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Chip from 'material-ui/Chip';
import { red200, red800 } from 'material-ui/styles/colors';

import './container.scss';
import * as actions from './actions';
import * as selectors from './selectors';

const mapDispatchToProps = (dispatch) => ({
  clearErrors: bindActionCreators(actions.clearErrors, dispatch)
});
const mapStateToProps = (state) => ({
  ...selectors.errors(state)
});

class FlashMessage extends Component {

  static propTypes = {
    clearErrors: PropTypes.func.isRequired,
    loginError: PropTypes.string,
    status: PropTypes.number
  };

  constructor() {
    super();
    this.handleClear = this.handleClear.bind(this);
  }

  handleClear() {
    this.props.clearErrors();
  }

  render() {
    const { loginError, status } = this.props;
    let statusText = 'Sorry, there is an issue with your request';

    if (!status && !loginError) return null;

    switch (status) {
      case 401:
        statusText = `You aren't authorized to access that resource`;
        break;
      case 404:
        statusText = `Sorry, that resource doesn't exist`;
        break;
      case 500:
        statusText = `Sorry, there's a problem with our server. We are aware of the problem and are resolving the issue`;
        break;
      default:
        /* Do Nothing */
        break;
    }

    if (loginError) {
      return (
        <div className="FlashMessage">
          <Chip
            onRequestDelete={this.handleClear}
            style={{
              margin: 4,
              zIndex: 200
            }}
          >
            <Avatar size={32} color={red200} backgroundColor={red800}>
              404
            </Avatar>
            {loginError}
          </Chip>
        </div>
      );
    }

    return (
      <div className="FlashMessage">
        <Chip
          onRequestDelete={this.handleClear}
          style={{
            margin: 4,
            zIndex: 200
          }}
        >
          <Avatar size={32} color={red200} backgroundColor={red800}>
            {status}
          </Avatar>
          {statusText}
        </Chip>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FlashMessage);

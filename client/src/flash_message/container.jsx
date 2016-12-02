import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { titleCase } from 'change-case';

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
    errors: PropTypes.object,
    loginError: PropTypes.string,
    resource: PropTypes.string,
    status: PropTypes.number
  };

  render() {
    const { clearErrors, errors, loginError, resource, status } = this.props;
    let statusText = null;

    if (!errors && !resource && !status && !loginError) return null;

    switch (status) {
      case 401:
        statusText = <span>You aren't authorized to access that resource</span>;
        break;
      case 404:
        statusText = <span>Sorry, that resource doesn't exist</span>;
        break;
      case 500:
        statusText = <span>Sorry, there's a problem with our server. We are aware of the problem and are resolving the issue</span>;
        break;
      default:
        /* Do Nothing */
        break;
    }

    return (
      <div className="FlashMessage">
        {loginError && <span>{loginError}</span>}
        {resource && <span>There was a problem with your {titleCase(resource)}</span>}
        {errors &&
          <div>
            Errors:
            {Object.keys(errors).map((key) =>
              <div key={key}>
                {errors[key].map((error) => <div key={error}>{key} {error}</div>)}
              </div>
            )}
          </div>
        }
        {statusText}
        <button onClick={clearErrors}>x</button>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FlashMessage);

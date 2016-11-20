import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Match, Redirect } from 'react-router';
import { bindActionCreators } from 'redux';

import './App.css';
import { Home, LandingPage, Navbar } from './shared_components';
import authentication from './authentication';

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(authentication.actions, dispatch)
});

const mapStateToProps = ({ authentication }) => ({
  isAuthenticated: authentication.isAuthenticated,
  errorMessage: authentication.errorMessage
});

const MatchWhenAuthorized = ({ component: Component, isAuthenticated, pattern, ...rest }) => (
  <Match {...rest} pattern={pattern} render={(props) => {
    if (isAuthenticated) {
      return <Component {...props} />;
    } else {
      return <Redirect to={{ pathname: '/', state: {from: props.location }}} />;
    }
  }}
  />
);

const MatchWhenNotLoggedIn = ({ component: Component, pattern, ...rest }) => {
  return (
    <Match pattern={pattern} render={(props) => {
        if (!rest.isAuthenticated) {
          return <Component {...props} {...rest} />;
        } else {
          return <Redirect to={{ pathname: '/' }} />;
        }
    }}
    />
  )
};

const App = ({ actions, isAuthenticated, errorMessage, ...rest }) => {
  return (
  <BrowserRouter>
    {
      ({ router }) => (
        <div className="App">
          <Navbar actions={actions} isAuthenticated={isAuthenticated} errorMessage={errorMessage} />
          <MatchWhenNotLoggedIn component={LandingPage} isAuthenticated={isAuthenticated} pattern="/" />
          <MatchWhenAuthorized component={Home} isAuthenticated={isAuthenticated} pattern="/" />
        </div>
      )
    }
  </BrowserRouter>
)};

App.propTypes = {
  actions: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

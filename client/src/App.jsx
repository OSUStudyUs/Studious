import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Match, Redirect } from 'react-router';

import './App.css';
import { Home, LandingPage, Navbar } from './shared_components';


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

const App = ({ dispatch, isAuthenticated, errorMessage, ...rest }) => {
  return (
  <BrowserRouter>
    {
      ({ router }) => (
        <div className="App">
          <Navbar dispatch={dispatch} isAuthenticated={isAuthenticated} errorMessage={errorMessage} />
          <MatchWhenNotLoggedIn component={LandingPage} dispatch={dispatch} isAuthenticated={isAuthenticated} pattern="/" />
          <MatchWhenAuthorized component={Home} dispatch={dispatch} isAuthenticated={isAuthenticated} pattern="/" />
        </div>
      )
    }
  </BrowserRouter>
)};

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string
};

export default connect(mapStateToProps)(App);

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Match, Redirect } from 'react-router';

import './App.css';
import { Home, LandingPage, Navbar } from './shared_components';
import authentication from './authentication';

const { selectors } = authentication;

const mapStateToProps = (state) => (
  {
    isAuthenticated: selectors.isAuthenticated(state)
  }
);

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
  );
};

const App = ({ isAuthenticated }) => {
  return (
  <BrowserRouter>
    {
      ({ router }) => (
        <div className="App">
          <Navbar />
          <MatchWhenNotLoggedIn component={LandingPage} isAuthenticated={isAuthenticated} pattern="/" />
          <MatchWhenAuthorized component={Home} isAuthenticated={isAuthenticated} pattern="/" />
        </div>
      )
    }
  </BrowserRouter>
  );
};

App.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
};

export default connect(mapStateToProps)(App);

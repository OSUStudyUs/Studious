import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Match, Redirect } from 'react-router';
import SplitPane from 'react-split-pane';

import './App.scss';
import { Home, LandingPage, Navbar } from './shared_components';
import authentication from './authentication';
import sidebar from './sidebar';

const { selectors } = authentication;
const { Container: Sidebar } = sidebar;

const mapStateToProps = (state) => ({
    isAuthenticated: selectors.isAuthenticated(state)
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
  );
};

const App = ({ isAuthenticated }) => {
  return (
  <BrowserRouter>
    {
      ({ router }) => (
        <div className="App">
          {isAuthenticated &&
            <SplitPane split="vertical" minSize={100} maxSize={200} defaultSize={100}>
              <Sidebar />
              <div>
                <Navbar />
                <MatchWhenAuthorized component={Home} isAuthenticated={isAuthenticated} exactly pattern="/" />
              </div>
            </SplitPane>
          }
          {!isAuthenticated &&
            <MatchWhenNotLoggedIn component={LandingPage} isAuthenticated={isAuthenticated} pattern="/" />
          }
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

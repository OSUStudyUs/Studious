import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Match, Redirect } from 'react-router';
import SplitPane from 'react-split-pane';

import './App.scss';
import { LandingPage, Navbar } from './shared_components';
import authentication from './authentication';
import profile from './profile';
import sidebar from './sidebar';
import studyGroup from './study_group';

const { selectors } = authentication;
const { Container: Profile } = profile;
const { Container: Sidebar } = sidebar;
const { Container: StudyGroup } = studyGroup;

const mapStateToProps = (state) => ({
  isAuthenticated: selectors.isAuthenticated(state),
  user: selectors.user()
});

const MatchWhenAuthorized = ({ component: Component, isAuthenticated, pattern, ...rest }) => (
  <Match {...rest} pattern={pattern} render={(props) => {
    if (isAuthenticated) {
      return <Component {...props} {...rest} />;
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

const RedirectToProfile = ({ component: Component, id }) => (
  <Redirect to={{ pathname: `/users/${id}` }} />
);

const App = ({ isAuthenticated, user }) => {
  return (
    <BrowserRouter>
      {
        ({ router }) => (
          <div className="App">
            {isAuthenticated &&
              <SplitPane split="vertical" minSize={100} maxSize={200} defaultSize={100}>
                <Sidebar />
                <div className="SplitPane-wrapper">
                  <Navbar />
                  <MatchWhenAuthorized component={RedirectToProfile} id={user.id} isAuthenticated={isAuthenticated} exactly pattern="/" />
                  <MatchWhenAuthorized component={Profile} isAuthenticated={isAuthenticated} pattern="/users/:id" />
                  <MatchWhenAuthorized component={StudyGroup} isAuthenticated={isAuthenticated} pattern="/study-groups/:id" />
                </div>
              </SplitPane>
            }
            {!isAuthenticated &&
              <div>
                <Navbar />
                <MatchWhenNotLoggedIn component={LandingPage} isAuthenticated={isAuthenticated} pattern="/" />
              </div>
            }
          </div>
        )
      }
    </BrowserRouter>
  );
};

App.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  user: PropTypes.object
};

export default connect(mapStateToProps)(App);

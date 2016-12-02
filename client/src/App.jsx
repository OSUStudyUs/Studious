import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Match, Redirect } from 'react-router';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SplitPane from 'react-split-pane';

import './App.scss';
import { LandingPage, Navbar } from './shared_components';
import authentication from './authentication';
import flashMessage from './flash_message';
import profile from './profile';
import sidebar from './sidebar';
import studyGroup from './study_group';

const { selectors } = authentication;
const { Container: FlashMessage } = flashMessage;
const { Container: Profile } = profile;
const { Container: Sidebar } = sidebar;
const { Container: StudyGroup } = studyGroup;

const mapStateToProps = (state) => ({
  isAuthenticated: selectors.isAuthenticated(state),
  user: selectors.user()
});

const CheckForCorrectProfile = ({ component: Component, isAuthenticated, pattern, userId, ...rest }) => (
  <Match {...rest} pattern={pattern} render={(props) => {
    if (userId === parseInt(props.params.id, 10)) {
      return <Component {...props} {...rest} />;
    } else {
      return <Redirect to={{ pathname: `/users/${userId}`}} />;
    }
  }}
  />
);

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

class App extends Component {

  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    user: PropTypes.object
  }

  shouldComponentUpdate(newProps) {
    return this.props.isAuthenticated !== newProps.isAuthenticated;
  }

  render() {
    const { isAuthenticated, user } = this.props;

    return (
      <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
        <BrowserRouter>
          {
            ({ router }) => (
              <div className="App">
                <FlashMessage />
                {isAuthenticated &&
                  <SplitPane split="vertical" minSize={100} maxSize={200} defaultSize={100}>
                    <Sidebar />
                    <div className="SplitPane-wrapper">
                      <Navbar />
                      <MatchWhenAuthorized component={RedirectToProfile} id={user.id} isAuthenticated={isAuthenticated} exactly pattern="/" />
                      <CheckForCorrectProfile component={Profile} isAuthenticated={isAuthenticated} pattern="/users/:id" userId={user.id} />
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
      </MuiThemeProvider>
    );
  }
}

export default connect(mapStateToProps)(App);

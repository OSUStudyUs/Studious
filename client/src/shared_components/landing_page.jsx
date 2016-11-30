import React from 'react';

import auth from '../authentication';

import './landing_page.scss';

const { components } = auth;
const { Signup } = components;

const LandingPage = ({ actions }) => (
  <div className="LandingPage">
    <div className="LandingPageCenteredText">
      <p>Find academic groups. Chat. Practice flash cards.</p>
      <h1>Better Together</h1>
    </div>
    <div className="LandingPageForm">
       <Signup onSignup={(user) => actions.signupUser(user)}/>
    </div>
  </div>
);

export default LandingPage;

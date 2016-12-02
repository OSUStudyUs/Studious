import React from 'react';

import auth from '../authentication';

import './landing_page.scss';

const { components } = auth;
const { Signup } = components;

const LandingPage = ({ actions }) => (
  <div className="LandingPage">
    <h1 id="LandingPage-header">Find academic groups. Chat. Practice flash cards.</h1>
    <Signup onSignup={(user) => actions.signupUser(user)}/>
  </div>
);

export default LandingPage;

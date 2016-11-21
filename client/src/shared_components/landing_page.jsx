import React from 'react';

import auth from '../authentication';

const { components } = auth;
const { Signup } = components;

const LandingPage = ({ actions }) => (
  <div className="LandingPage">
    This is an unprotected route
    <Signup onSignup={(user) => actions.signupUser(user)}/>
  </div>
);

export default LandingPage;

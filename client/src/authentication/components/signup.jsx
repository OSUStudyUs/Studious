import React, { Component, PropTypes } from 'react';
import isEmail from 'validator/lib/isEmail';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import './signup.scss';
import * as actions from '../actions';
import * as selectors from '../selectors';
import Input from '../../shared_components/input';

const strongPassword = (str) => /^(?=(.*\d){2})(?=.*[a-zA-Z])(?=.*[!@#$%])[0-9a-zA-Z!@#$%]{8,55}/.test(str);
const validateOnlyLetters = (str) => /^[a-zA-Z]+/.test(str);
const passwordsMatch = (existingPass) => (newPass) => newPass === existingPass;

const mapDispatchToProps = (dispatch) => ({
  signupUser: bindActionCreators(actions.signupUser, dispatch)
});
const mapStateToProps = (state) => ({
  errors: selectors.signupErrors(state)
});

class Signup extends Component {

  static propTypes = {
    signupUser: PropTypes.func.isRequired,
    errors: PropTypes.object
  };

  constructor() {
    super();
    this.state = {
      password: null
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleClick() {
    const refs = Object.keys(this.refs).map((ref) => ({
      name: ref,
      ref: this.refs[ref]})
    );

    refs.forEach(({ ref }) => ref.forceValidation());
    if (refs.every(({ ref }) => ref.isValid())) {
      const newUser = refs.reduce((prev, { name, ref }) => {
        prev[name] = ref.value();
        return prev;
      }, {});

      this.props.signupUser(newUser);
    }
  }

  handleEnter() {
    this.handleClick();
  }

  handlePasswordChange(password) {
    this.setState({ password });
  }

  render() {
    const { password } = this.state;
    const { errors } = this.props;

    return (
      <div className="Signup">
        <div className="Signup-inputContainer">
          <Input
            hint="Your name must have only letters in it"
            label="First Name"
            onEnter={this.handleEnter}
            ref="firstName"
            type="text"
            validate={validateOnlyLetters}
          />
          {errors && errors.firstName &&
            <p className="Signup-errorMessage">Sorry, first name {errors.firstName[0]}</p>
          }
        </div>
        <div className="Signup-inputContainer">
          <Input
            hint="Your name must have only letters in it"
            label="Last Name"
            onEnter={this.handleEnter}
            ref="lastName"
            type="text"
            validate={validateOnlyLetters}
          />
          {errors && errors.lastName &&
            <p className="Signup-errorMessage">Sorry, last name {errors.lastName[0]}</p>
          }
        </div>
        <div className="Signup-inputContainer">
          <Input
            hint="Valid email address ex (test.user@example.com)"
            label="Email"
            onEnter={this.handleEnter}
            ref="email"
            type="email"
            validate={isEmail}
          />
          {errors && errors.email &&
            <p className="Signup-errorMessage">Sorry, email {errors.email[0]}</p>
          }
        </div>
        <div className="Signup-inputContainer">
          <Input
            hint="Password must have 2 uppercase, 1 special (!@#$&amp;*), 2 digits, 3 lowercase and length between 8 and 55"
            label="Password"
            onChange={this.handlePasswordChange}
            onEnter={this.handleEnter}
            ref="password"
            type="password"
            validate={strongPassword}
          />
          {errors && errors.password &&
            <p className="Signup-errorMessage">Sorry, password {errors.password[0]}</p>
          }
        </div>
        <div className="Signup-inputContainer">
          <Input
            hint="Passwords must match"
            label="Confirm Password"
            onEnter={this.handleEnter}
            ref="passwordConfirmation"
            type="password"
            validate={passwordsMatch(password)}
          />
        </div>
        <button onClick={this.handleClick}>Let's get Studious</button>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);

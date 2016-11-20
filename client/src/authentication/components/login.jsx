import React, { Component, PropTypes } from 'react';
import isEmail from 'validator/lib/isEmail';
import classNames from 'classnames';
import keycode from 'keycode';

import './login.css';

export default class Login extends Component {

  static propTypes = {
    errorMessage: PropTypes.string,
    onLogin: PropTypes.func.isRequired
  };

  constructor() {
    super();
    this.state = {
      invalidEmail: false,
      invalidPassword: false
    };
    this.handleCheckForEnter = this.handleCheckForEnter.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { email, password } = this.refs;

    if (!isEmail(email.value.trim()) && password.value.trim().length <= 0) {
      this.setState({
        invalidEmail: true,
        invalidPassword: true
      });
    } else if (!isEmail(email.value.trim())) {
      this.setState({
        invalidEmail: true,
        invalidPassword: false
      })
    } else if (password.value.trim().length <= 0) {
      this.setState({
        invalidEmail: false,
        invalidPassword: true
      });
    } else {
      this.setState({
        invalidEmail: false,
        invalidPassword: false
      });
      this.props.onLogin({
        email: email.value.trim(),
        password: password.value.trim()
      });
    }
  }

  handleCheckForEnter({ keyCode }) {
    if (keycode(keyCode) === 'enter') {
      this.handleClick();
    }
  }

  render() {
    const { errorMessage } = this.props;
    const { invalidEmail, invalidPassword } = this.state;
    const emailClass = classNames({
      'Login-input': true,
      'Login-invalidEmail': invalidEmail
    });
    const passwordClass = classNames({
      'Login-input': true,
      'Login-invalidPassword': invalidPassword
    });

    return (
      <div className="Login">
        <input
          className={emailClass}
          onKeyDown={this.handleCheckForEnter}
          placeholder="user@example.com"
          ref="email"
          type="text"
        />
        <input
          className={passwordClass}
          onKeyDown={this.handleCheckForEnter}
          placeholder="********"
          ref="password"
          type="password"
        />
        <button onClick={this.handleClick}>Login</button>
        {errorMessage && <p className="Login-errorMessage">{errorMessage}</p>}
      </div>
    );
  }

}

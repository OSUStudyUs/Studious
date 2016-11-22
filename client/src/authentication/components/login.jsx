import React, { Component, PropTypes } from 'react';
import isEmail from 'validator/lib/isEmail';

import './login.css';
import Input from '../../shared_components/input';

export default class Login extends Component {

  static propTypes = {
    errorMessage: PropTypes.string,
    onLogin: PropTypes.func.isRequired
  };

  constructor() {
    super();
    this.handleEnter = this.handleEnter.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const refs = Object.keys(this.refs).map((ref) => ({
      name: ref,
      ref: this.refs[ref]
    }));

    refs.forEach(({ ref }) => ref.forceValidation());
    if (refs.every(({ ref }) => ref.isValid())) {
      const creds = refs.reduce((prev, { name, ref }) => {
        prev[name] = ref.value();
        return prev;
      }, {});

      this.props.onLogin(creds);
    }
  }

  handleEnter() {
    this.handleClick();
  }

  render() {
    const { errorMessage } = this.props;

    return (
      <div className="Login">
        <Input
          hint="Valid email address ex (test.user@example.com)"
          label=""
          onEnter={this.handleEnter}
          placeholder="test.user@example.com"
          ref="email"
          type="email"
          validate={isEmail}
        />
        <Input
          hint="Your password"
          label=""
          onEnter={this.handleEnter}
          placeholder="********"
          ref="password"
          type="password"
          validate={(str) => str.length > 0}
        />
        <button onClick={this.handleClick}>Login</button>
        {errorMessage && <p className="Login-errorMessage">{errorMessage}</p>}
      </div>
    );
  }

}

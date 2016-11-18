import React, { Component, PropTypes } from 'react';

export default class Login extends Component {

  static propTypes = {
    onLogin: PropTypes.func.isRequired
  };

  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { email, password } = this.refs;

    this.props.onLogin({
      email: email.value.trim(),
      password: password.value.trim()
    });
  }

  render() {
    return (
      <div className="Login">
        <input className="Login-email" ref="email" type="text" placeholder="user@example.com" />
        <input className="Login-password" ref="password" type="password" placeholder="********" />
        <button className="Login-submit" onClick={this.handleClick}>Login</button>
      </div>
    );
  }

}

import React, { Component, PropTypes } from 'react';
import FlatButton from 'material-ui/FlatButton';
import isEmail from 'validator/lib/isEmail';
import keycode from 'keycode';
import TextField from 'material-ui/TextField';

import './login.scss';

export default class Login extends Component {

  static propTypes = {
    onLogin: PropTypes.func.isRequired
  };

  constructor() {
    super();
    this.state = {
      email: '',
      errorFields: [],
      password: ''
    };
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    Object.keys(this.refs).map((key) => this.refs[key]).forEach((ref) => {
      ref.input.addEventListener('keydown', this.handleEnter);
    });
  }

  componentWillUnmount() {
    Object.keys(this.refs).map((key) => this.refs[key]).forEach((ref) => {
      ref.input.removeEventListener('keydown', this.handleEnter);
    });
  }

  handleClick() {
    const { email, password } = this.state;

    if (isEmail(email) && password.length) {
      this.props.onLogin(this.state);
      this.setState({
        errorFields: []
      });
    } else {
      let errorFields = [];

      if (!isEmail(email)) {
        errorFields.push('email');
      } else {
        errorFields = errorFields.filter((field) => field !== 'email');
      }

      if (!password.length) {
        errorFields.push('password');
      } else {
        errorFields = errorFields.filter((field) => field !== 'password');
      }

      this.setState({
        errorFields
      });
    }
  }

  handleEmailChange({ target }) {
    this.setState({
      email: target.value
    });
  }

  handlePasswordChange({ target }) {
    this.setState({
      password: target.value
    });
  }

  handleEnter({ keyCode }) {
    if (keycode(keyCode) === 'enter') {
      this.handleClick();
    }
  }

  render() {
    const { email, errorFields, password } = this.state;
    const buttonStyle = {
      'background-color': 'white'
    };

    return (
      <div className="Login">
        <TextField
          hintText="email"
          errorText={errorFields.some((field) => field === 'email') && 'Please enter a valid email'}
          onChange={this.handleEmailChange}
          ref="email"
          type="text"
          value={email}
        />
        <TextField
          hintText="password"
          errorText={errorFields.some((field) => field === 'password') && 'Please enter a password'}
          onChange={this.handlePasswordChange}
          ref="password"
          type="password"
          value={password}
        />
        <FlatButton label="Login" onClick={this.handleClick} secondary style={buttonStyle} />
      </div>
    );
  }

}

import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Divider from 'material-ui/Divider';
import isEmail from 'validator/lib/isEmail';
import keycode from 'keycode';
import TextField from 'material-ui/TextField';
import { titleCase } from 'change-case';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

import './signup.scss';
import * as actions from '../actions';
import * as selectors from '../selectors';

const strongPassword = (str) => /^(?=(.*\d){2})(?=.*[a-zA-Z])(?=.*[!@#$%])[0-9a-zA-Z!@#$%]{8,55}/.test(str);
const validateOnlyLetters = (str) => /^[a-zA-Z]+/.test(str);
const passwordsMatch = (existingPass, newPass) => newPass === existingPass;

const refMap = {
  firstName: {
    errorText: 'Please enter a first name',
    type: 'text',
    validate: validateOnlyLetters
  },
  lastName: {
    errorText: 'Please enter a last name',
    type: 'text',
    validate: validateOnlyLetters
  },
  email: {
    errorText: 'Please enter a valid email',
    type: 'email',
    validate: isEmail
  },
  password: {
    errorText: 'Password must be strong',
    type: 'password',
    validate: strongPassword
  },
  passwordConfirmation: {
    errorText: 'Passwords must match',
    type: 'password',
    validate: passwordsMatch
  }
};

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
    const initialState = Object.keys(refMap).reduce((acc, ref) => {
      acc[ref] = '';
      return acc;
    }, {});

    this.state = {
      ...initialState,
      errors: Object.keys(refMap).reduce((acc, ref) => {
        acc[ref] = null;
        return acc;
      }, {})
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
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

  handleChange({ target }) {
    this.setState({
      [target.id]: target.value
    });
  }

  handleClick() {
    const inputKeys = Object.keys(this.state).filter((key) => key !== 'errors');

    if (inputKeys.every((key) => {
      switch (key) {
        case 'passwordConfirmation':
          return refMap[key].validate(this.state[key], this.state.password);
        default:
          return refMap[key].validate(this.state[key]);
      }
    })) {
      const newState = { ...this.state };

      delete newState.errors;

      this.props.signupUser(newState);
    } else {
      const errors = {};

      inputKeys.forEach((key) => {
        switch (key) {
          case 'passwordConfirmation':
            if (!refMap[key].validate(this.state[key], this.state.password)) {
              errors[key] = refMap[key].errorText;
            }
            break;
          default:
            if (!refMap[key].validate(this.state[key])) {
              errors[key] = refMap[key].errorText;
            }
        }
      });

      this.setState({
        errors
      });
    }
  }

  handleEnter({ keyCode }) {
    if (keycode(keyCode) === 'enter') {
      this.handleClick();
    }
  }

  handlePasswordChange(password) {
    this.setState({ password });
  }

  render() {
    const errors = (this.props.errors && this.props.errors.errors) || this.state.errors;
    const style = {
      marginLeft: 20
    };

    return (
      <div className="Signup">
        <Paper id="Signup-paper" zDepth={2}>
          {Object.keys(refMap).map((ref) => {
            const errorText = (Array.isArray(errors[ref]) && errors[ref][0])
              ? `${titleCase(ref)} ${errors[ref][0]}`
              : errors[ref];

            return (
              <span key={ref}>
                <TextField
                  id={ref}
                  hintText={titleCase(ref)}
                  errorText={errorText}
                  onChange={this.handleChange}
                  ref={ref}
                  style={style}
                  type={refMap[ref].type}
                  underlineShow={false}
                />
                <Divider />
              </span>
            );
          }
          )}
          <div className="Signup-buttonContainer">
            <RaisedButton
              label="Let's get Studious"
              onClick={this.handleClick}
              primary
              style={{
                display: 'flex'
              }}
            />
          </div>
        </Paper>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);

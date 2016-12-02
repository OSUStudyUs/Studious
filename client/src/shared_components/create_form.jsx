import React, { Component, PropTypes } from 'react';
import Divider from 'material-ui/Divider';
import keycode from 'keycode';
import TextField from 'material-ui/TextField';
import { titleCase } from 'change-case';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

// This is an example of what refMap would look like because I can't model it in propTypes

// const refMap = {
//   firstName: {
//     errorText: 'Please enter a first name',
//     type: 'text',
//     validate: validateOnlyLetters
//   },
//   lastName: {
//     errorText: 'Please enter a last name',
//     type: 'text',
//     validate: validateOnlyLetters
//   },
//   email: {
//     errorText: 'Please enter a valid email',
//     type: 'email',
//     validate: isEmail
//   },
//   password: {
//     errorText: 'Password must be strong',
//     type: 'password',
//     validate: strongPassword
//   },
//   passwordConfirmation: {
//     errorText: 'Passwords must match',
//     type: 'password',
//     validate: passwordsMatch
//   }
// };

export default class CreateForm extends Component {

  static propTypes = {
    className: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onCreate: PropTypes.func.isRequired,
    paperId: PropTypes.string.isRequired,
    refMap: PropTypes.object.isRequired,
    zDepth: PropTypes.number.isRequired
  };

  static defaultProps = {
    className: 'CreateForm',
    label: 'Submit',
    paperId: 'CreateForm-paper',
    zDepth: 2
  };

  constructor(props) {
    super(props);
    const { refMap } = props;
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
    const { refMap } = this.props;
    const inputKeys = Object.keys(this.state).filter((key) => key !== 'errors');

    if (inputKeys.every((key) => refMap[key].validate(this.state[key]))) {
      const newState = { ...this.state };

      delete newState.errors;

      this.props.onCreate(newState);
    } else {
      const errors = inputKeys.reduce((acc, key) => {
        if (!refMap[key].validate(this.state[key])) {
          acc[key] = refMap[key].errorText;
        }
        return acc;
      }, {});

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
    const { className, label, paperId, refMap } = this.props;
    const { errors } = this.state;
    const style = {
      marginLeft: 20
    };

    return (
      <div className={className}>
        <Paper id={paperId} zDepth={2}>
          {Object.keys(refMap).map((ref) => {
            const errorText = errors[ref];

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
          <div className="CreateForm-buttonContainer">
            <RaisedButton
              label={label}
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

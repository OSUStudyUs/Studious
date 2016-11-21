import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import 'hint.css/hint.min.css';

import './input.css';

export default class Input extends Component {

  static propTypes = {
    hint: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    position: PropTypes.string,
    type: PropTypes.string,
    validate: PropTypes.func.isRequired
  };

  constructor() {
    super();
    this.state = {
      entered: false,
      focused: false,
      valid: null
    };
    this.handleBlur = this.handleBlur.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
  }

  handleBlur() {
    this.setState({
      entered: true,
      focused: false,
      valid: this.props.validate(this.refs.input.value)
    });
  }

  handleChange({ target }) {
    if (this.props.onChange) {
      this.props.onChange(target.value);
    }
  }

  handleFocus() {
    this.setState({
      focused: true
    });
  }

  isValid() {
    return this.props.validate(this.refs.input.value);
  }

  value() {
    return this.refs.input.value;
  }

  render() {
    const { hint, label, position, type } = this.props;
    const { focused, entered, valid } = this.state;
    const inputClassName = classNames({
      'Input-input': true,
      'Input-input--valid': entered && valid !== null && valid,
      'Input-input--invalid': entered && valid !== null && !valid,
    });
    const hintClassNames = classNames({
      [`hint--${position || 'bottom'}`]: focused,
      'hint--always': focused,
      'hint--info': focused && !entered,
      'hint--error': focused && entered && !valid,
      'hint--success': focused && entered && valid
    });

    return (
      <div className="Input">
        <label className="Input-label">{label}</label>
        <span className={hintClassNames} data-hint={hint}>
          <input
            className={inputClassName}
            onBlur={this.handleBlur}
            onChange={this.handleChange}
            onFocus={this.handleFocus}
            ref="input"
            type={type || 'text'}
          />
        </span>
      </div>
    )
  }
}

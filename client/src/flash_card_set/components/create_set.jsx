import React, { Component, PropTypes } from 'react';

import Input from '../../shared_components/input';

class FlashCardSetCreate extends Component {
  static propTypes = {
    onCreate: PropTypes.func.isRequired
  };

  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
  }

  handleClick() {
    this.refs.name.forceValidation();

    if (this.refs.name.isValid()) {
      this.props.onCreate({
        flash_card_set: {
          name: this.refs.name.value()
        }
      });
    }
  }

  handleEnter() {
    this.handleClick();
  }

  render() {
    return (
      <div className="FlashCardSetCreate">
        <Input
          hint="Please enter a name between 1 and 20 characters"
          label="Name"
          onEnter={this.handleEnter}
          placeholder="Super Awesome New Flash Card Set"
          ref="name"
          type="text"
          validate={str => 0 < str.length && str.length < 20}
        />
        <button onClick={this.handleClick}>Create a Flash Card Set!</button>
      </div>
    );
  }
}

export default FlashCardSetCreate;

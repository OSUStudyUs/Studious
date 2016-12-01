import React, { Component, PropTypes } from 'react';

import Input from '../../shared_components/input';

class CreateFlashCard extends Component {

  static propTypes = {
    onCreate: PropTypes.func.isRequired
  };

  constructor() {
    super();
    this.handleCreate = this.handleCreate.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
  }

  handleCreate() {
    const refs = Object.keys(this.refs).map((ref) => ({
      name: ref,
      ref: this.refs[ref]
    }));

    refs.forEach(({ ref }) => ref.forceValidation());
    if (refs.every(({ ref }) => ref.isValid())) {
      this.props.onCreate(refs.reduce((prev, { name, ref }) => {
        prev[name] = ref.value();
        return prev;
      }, {}));
    }
  }

  handleEnter() {
    this.handleCreate();
  }

  render() {
    return (
      <div className="CreateFlashCard">
        <Input
          hint="Please enter a question"
          label="Question"
          onEnter={this.handleEnter}
          placeholder="What is the meaning of life?"
          ref="question"
          type="text"
          validate={str => str.length > 0}
        />
        <Input
          hint="You don't have to have an answer if you don't want to :)"
          label="Answer"
          onEnter={this.handleEnter}
          placeholder="42"
          ref="answer"
          type="text"
          validate={() => true}
        />
      <button onClick={this.handleCreate}>Create new Flash Card!</button>
      </div>
    );
  }
}

export default CreateFlashCard;

import React, { Component, PropTypes } from 'react';
import { Card, CardText } from 'material-ui';

import './card.scss';
import CreateForm from '../../shared_components/create_form';

const refMap = {
  question: {
    errorText: 'Please enter a question',
    type: 'text',
    validate: (val) => val
  },
  answer: {
    errorText: 'Please enter an answer',
    type: 'text',
    validate: () => true
  }
};

class CreateFlashCard extends Component {

  static propTypes = {
    onCreate: PropTypes.func.isRequired
  };

  constructor() {
    super();

    this.handleCreate = this.handleCreate.bind(this);
  }

  handleCreate(flashCard) {
    this.props.onCreate(flashCard);
  }

  render() {
    return (
      <Card className="CreateFlashCard">
        <CardText>
          <h1 className="CreateFlashCard-header">Create a new Flash Card</h1>
          <CreateForm
            onCreate={this.handleCreate}
            refMap={refMap}
          />
        </CardText>
      </Card>
    );
  }
}

export default CreateFlashCard;

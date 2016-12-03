import React, { Component, PropTypes } from 'react';
import { Card, CardText } from 'material-ui/Card';

import './create_set.scss';
import CreateForm from '../../shared_components/create_form';

const refMap = {
  name: {
    errorText: 'Name is less than 20 characters',
    type: 'text',
    validate: (val) => 0 < val.length && val.length < 20
  }
};

class FlashCardSetCreate extends Component {
  static propTypes = {
    onCreate: PropTypes.func.isRequired
  };

  constructor() {
    super();

    this.handleCreate = this.handleCreate.bind(this);
  }

  handleCreate(flashCardSet) {
    this.props.onCreate(flashCardSet);
  }

  render() {
    return (
      <Card className="FlashCardSetCreate">
        <CardText>
          <h1 className="FlashCardSetCreate-header">Create a new Flash Card Set</h1>
          <CreateForm
            onCreate={this.handleCreate}
            refMap={refMap}
          />
        </CardText>
      </Card>
    );
  }
}

export default FlashCardSetCreate;

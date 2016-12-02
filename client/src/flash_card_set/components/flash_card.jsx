import React, { Component, PropTypes } from 'react';
import { Card, CardText, Chip } from 'material-ui';

import './card.scss';

class FlashCard extends Component {
  static propTypes = {
    answer: PropTypes.string,
    index: PropTypes.number.isRequired,
    question: PropTypes.string.isRequired
  }

  constructor() {
    super();

    this.state = {
      flipped: false
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({
      flipped: !this.state.flipped
    });
  }

  render() {
    return (
      <Card
        className="FlashCard"
        onClick={this.handleClick}
      >
        <div className="FlashCard-container">
          <div className="FlashCard-indexChip">
            <Chip>{this.props.index + 1}</Chip>
          </div>
          <div className="FlashCard-text">
            <CardText style={{ 'font-size': '2em' }}>{this.state.flipped ? this.props.answer || 'There is no answer!' : this.props.question}</CardText>
          </div>
          <div className="FlashCard-statusChip">
            <Chip>{this.state.flipped ? 'A' : 'Q'}</Chip>
          </div>
        </div>
      </Card>
    );
  }
}

export default FlashCard;

import React, { Component, PropTypes } from 'react';
import { RaisedButton, Paper } from 'material-ui';

import './flash_card_set.scss';
import CreateFlashCard from './create_card';
import FlashCard from './flash_card';
import LoadingCard from './loading_card';

class FlashCardSet extends Component {
  static propTypes = {
    flashCards: PropTypes.arrayOf(PropTypes.shape({
      answer: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      question: PropTypes.string.isRequired
    })),
    name: PropTypes.string,
    onCreate: PropTypes.func.isRequired
  }

  constructor() {
    super();

    this.state = {
      cards: [],
      currentCardId: null,
      loading: true
    };

    this.handleLeftClick = this.handleLeftClick.bind(this);
    this.handleNewClick = this.handleNewClick.bind(this);
    this.handleRightClick = this.handleRightClick.bind(this);
  }

  componentDidMount() {
    const cards = (this.props.flashCards || [])
      .map(({ id, ...rest }, index) => ({ id, card: <FlashCard key={id} index={index} {...rest} /> }))
      .concat({ id: 'add', card: <CreateFlashCard key="add" onCreate={this.props.onCreate}/> });

    this.setState({
      cards,
      currentCardId: cards[0].id,
      loading: false
    });
  }

  componentWillReceiveProps(nextProps) {
    const cards = (nextProps.flashCards || [])
      .map(({ id, ...rest }, index) => ({ id, card: <FlashCard key={id} index={index} {...rest} /> }))
      .concat({ id: 'add', card: <CreateFlashCard key="add" onCreate={nextProps.onCreate}/> });

    const currentIdExists = cards.some(card => card.id === this.state.currentCardId);

    this.setState({
      cards,
      currentCardId: currentIdExists ? this.state.currentCardId : cards[0].id
    });
  }

  handleLeftClick() {
    const currentIndex = this.state.cards.findIndex(card => card.id === this.state.currentCardId);
    const nextIndex = currentIndex === 0 ? this.state.cards.length - 1 : currentIndex - 1;

    this.setState({
      currentCardId: this.state.cards[nextIndex].id
    });
  }

  handleNewClick() {
    this.setState({
      currentCardId: this.state.cards[this.state.cards.length - 1].id
    });
  }

  handleRightClick() {
    const currentIndex = this.state.cards.findIndex(card => card.id === this.state.currentCardId);
    const nextIndex = currentIndex === this.state.cards.length - 1 ? 0 : currentIndex + 1;

    this.setState({
      currentCardId: this.state.cards[nextIndex].id
    });
  }

  render() {
    return (
      <Paper className="FlashCardSet-paper">
        <h1 className="FlashCardSet-name">{this.props.name}</h1>
        {
          this.state.loading
          ? <LoadingCard />
          : this.state.cards.find(card => card.id === this.state.currentCardId).card
        }
        <div className="FlashCardSet-navigation">
          <RaisedButton className="FlashCardSet-navigation-left" label="&lt;--" onClick={this.handleLeftClick} secondary={true} />
          <div className="FlashCardSet-navigation-create">
            <RaisedButton onClick={this.handleNewClick} label="Create a new Flash Card" primary={true} />
          </div>
          <RaisedButton className="FlashCardSet-navigation-right" label="--&gt;" onClick={this.handleRightClick} secondary={true} />
        </div>
      </Paper>
    );
  }
}

export default FlashCardSet;

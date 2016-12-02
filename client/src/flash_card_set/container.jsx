import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from './actions';
import CreateFlashCardSet from './components/create_set';
import FlashCardSet from './components/flash_card_set';
import { MatchPassProps, propUtils } from '../utils';
import * as selectors from './selectors';

const mapDispatchToProps = (dispatch) => ({
  createFlashCard: bindActionCreators(actions.createFlashCard, dispatch),
  createFlashCardSet: bindActionCreators(actions.createFlashCardSet, dispatch),
  loadFlashCardSet: bindActionCreators(actions.loadFlashCardSet, dispatch)
});
const mapStateToProps = (state, { params }) => ({
  ...selectors.flashCardSet(state, params.flashCardSetId)
});

const shouldLoadProps = (propTypes, props) => !propUtils.allReceived(propTypes, props);

class FlashCardSetContainer extends Component {

  static propTypes = {
    createFlashCard: PropTypes.func.isRequired,
    createFlashCardSet: PropTypes.func.isRequired,
    createRoute: PropTypes.string.isRequired,
    flashCards: PropTypes.arrayOf(PropTypes.shape({
      answer: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      question: PropTypes.string.isRequired
    })),
    id: PropTypes.number,
    loadFlashCardSet: PropTypes.func.isRequired,
    name: PropTypes.string,
    params: PropTypes.shape({
      flashCardSetId: PropTypes.any.isRequired
    }).isRequired,
    rootRoute: PropTypes.string.isRequired
  };

  constructor() {
    super();
    this.handleCardCreate = this.handleCardCreate.bind(this);
    this.handleSetCreate = this.handleSetCreate.bind(this);
  }

  handleCardCreate(flashCard) {
    this.props.createFlashCard(flashCard, this.props.params.flashCardSetId);
  }

  handleSetCreate(flashCardSet) {
    this.props.createFlashCardSet(flashCardSet, `${this.props.createRoute}`);
  }

  componentDidMount() {
    if (shouldLoadProps(FlashCardSetContainer.propTypes, this.props) && this.props.params.flashCardSetId !== 'new') {
      this.props.loadFlashCardSet(this.props.params.flashCardSetId);
    }
  }

  componentWillReceiveProps(newProps) {
    if (shouldLoadProps(FlashCardSetContainer.propTypes, newProps) && newProps.params.flashCardSetId !== 'new') {
      newProps.loadFlashCardSet(newProps.params.flashCardSetId);
    }
  }

  render() {
    return (
      <div className="FlashCardSetContainer">
        {this.props.params.flashCardSetId !== 'new' &&
          <MatchPassProps
            component={FlashCardSet}
            exactly
            flashCards={this.props.flashCards}
            onCreate={this.handleCardCreate}
            pattern={`${this.props.rootRoute}/flash-card-sets/:flashCardSetId`}
          />
        }
        <MatchPassProps component={CreateFlashCardSet} onCreate={this.handleSetCreate} pattern={`${this.props.rootRoute}/flash-card-sets/new`} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FlashCardSetContainer);

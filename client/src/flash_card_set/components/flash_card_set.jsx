import React, { PropTypes } from 'react';

import FlashCard from './flash_card';
import CreateFlashCard from './create_card';

const FlashCardSet = ({ flashCards, isExact, onCreate, params }) => (
  <div className="FlashCardSet">
    {(flashCards || []).map(({ id, ...rest }) => <FlashCard key={id} {...rest} />).concat(<CreateFlashCard key="add" onCreate={onCreate}/>)}
  </div>
);

FlashCardSet.propTypes = {
  flashCards: PropTypes.arrayOf(PropTypes.shape({
    answer: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    question: PropTypes.string.isRequired
  })),
  onCreate: PropTypes.func.isRequired
};

export default FlashCardSet;

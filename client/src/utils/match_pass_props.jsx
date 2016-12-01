import React, { PropTypes } from 'react';
import { Match } from 'react-router';

const MatchPassProps = ({ component: Component, pattern, ...props }) => (
  <Match pattern={pattern} {...props} render={(matchProps) => <Component {...matchProps} {...props} />} />
);

MatchPassProps.propTypes = {
  component: PropTypes.func.isRequired,
  pattern: PropTypes.string.isRequired
};

export default MatchPassProps;

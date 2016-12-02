import React, { PropTypes } from 'react';
import { Card, CardHeader } from 'material-ui/Card';

import './study_group.scss';

const StudyGroup = ({ studyGroup }) => (
  <Card style={{ 'margin-bottom': '10px' }}>
    <CardHeader
      title={studyGroup.name}
      actAsExpander={false}
      showExpandableButton={false}
    />
  </Card>
);

StudyGroup.propTypes = {
  studyGroup: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired
};

export default StudyGroup;

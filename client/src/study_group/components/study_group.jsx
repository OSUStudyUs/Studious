import React, { PropTypes } from 'react';
import { Card, CardHeader } from 'material-ui/Card';

import './study_group.scss';

const StudyGroup = ({ studyGroup }) => (
  <div className="StudyGroup">
    <Card>
      <CardHeader
        title={studyGroup.name}
        actAsExpander={false}
        showExpandableButton={false}
      />
    </Card>
  </div>
);

StudyGroup.propTypes = {
  studyGroup: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired
};

export default StudyGroup;

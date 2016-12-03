import React, { PropTypes } from 'react';
import { Card, CardHeader } from 'material-ui/Card';

import './course.scss';

const Course = ({ course }) => (
  <div className="Course">
    <Card>
      <CardHeader
        title={course.name}
        actAsExpander={false}
        showExpandableButton={false}
      />
    </Card>
  </div>
);

Course.propTypes = {
  course: PropTypes.shape({
    id: PropTypes.number.isRequired,
    department: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired
  }).isRequired
};

export default Course;

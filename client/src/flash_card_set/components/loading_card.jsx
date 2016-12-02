import React from 'react';
import { Card, CardHeader } from 'material-ui';

import './card.scss';

const LoadingCard = () => (
  <Card
    className="LoadingCard"
  >
    <CardHeader>
      Loading...
    </CardHeader>
  </Card>
);

export default LoadingCard;

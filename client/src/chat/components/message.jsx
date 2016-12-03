import React from 'react';
import moment from 'moment';
import Chip from 'material-ui/Chip';
import {cyan500} from 'material-ui/styles/colors';

import './message.scss';

const Message = ({ createdAt, id, content, user }) => (
  <div className="Message">
    <div key={id} className="Message-header">
      <span className="Message-header--name">{user.firstName} {user.lastName} </span> 
      <span className="Message-header--time">{moment(createdAt).format("ddd MM/DD/YY h:mm A")}</span>
    </div>
    <div className="Message-content">
      <Chip backgroundColor={cyan500} style={{maxWidth: '40em', overflowX: 'hidden'}} >{content}</Chip>
    </div>
  </div>
);

export default Message;

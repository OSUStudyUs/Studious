import React from 'react';
import moment from 'moment';

import './message.scss';

const Message = ({ id, content, user, createdAt }) => (
  <div className="Message">
    <div key={id} className="Message-header">
      <span className="Message-header--name">{user.firstName} {user.lastName} </span> 
      <span className="Message-header--time">{moment(createdAt).format("ddd MM/DD/YY h:mm A")}</span>
    </div>
    <div className="Message-content">
      <p>{content}</p>
    </div>
  </div>
);

export default Message;

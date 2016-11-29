import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import './container.scss';
import { chatChannel } from '../utils';
import * as actions from './actions';
import * as selectors from './selectors';

const mapDispatchToProps = (dispatch) => ({
  createSubscription: bindActionCreators(actions.createSubscription, dispatch),
  loadMessages: bindActionCreators(actions.loadMessages, dispatch),
  receiveMessage: bindActionCreators(actions.receiveMessage, dispatch)
});

const mapStateToProps = (state, { id }) => ({
  consumer: chatChannel.selectors.consumer(state),
  messages: selectors.messagesById(state, id),
  subscription: selectors.subscriptionById(state, id)
});

class Chat extends Component {

  static propTypes = {
    consumer: PropTypes.object.isRequired,
    createSubscription: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
    messages: PropTypes.arrayOf(PropTypes.object),
    subscription: PropTypes.object
  };

  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    if (!this.props.subscription) {
      const { id, receiveMessage } = this.props;

      this.props.createSubscription(this.props.id, this.props.consumer, {
        received: function(message) {
          receiveMessage(id, message);
        },
        sendMessage: function(content) {
          return this.perform('send_message', { content });
        }
      });

      if (!this.props.messages) {
        this.props.loadMessages(this.props.id);
      }
    } else if (this.props.messages) {
      const { messagesContainer } = this.refs;

      if (messagesContainer) {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      }
    }
  }

  componentDidUpdate() {
    const { messagesContainer } = this.refs;

    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  }

  handleClick() {
    this.props.subscription.sendMessage(this.refs.message.value);
  }

  render() {
    const { messages } = this.props;

    if (!messages) {
      return (
        <div>Loading...</div>
      );
    }

    return (
      <div className="Chat">
        <div className="Chat-messages" ref="messagesContainer" >
          {/* We'll need a <Message /> component here for styling, please :)*/}
          {messages.map(({ id, content, user }) => <p key={id}>{content} (sent by {user.firstName} {user.lastName})</p>)}
        </div>
        <div className="Chat-input">
          {/* This should be a controlled component (form) at some point */}
          <input type="text" ref="message" />
          <button onClick={this.handleClick}>Send</button>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import './container.scss';
import { chatChannel } from '../utils';
import * as actions from './actions';
import * as selectors from './selectors';
import Message from './components/message';
import keycode from 'keycode';

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
    this.handleKeyDown = this.handleKeyDown.bind(this);
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
    this.refs.message.value = "";
  }

  handleKeyDown(keyCode) {
    if(keycode(keyCode) === 'enter') {
      this.handleClick();
    }
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
          { messages.map(({ createdAt, id, content, user }) => <Message createdAt={createdAt} id={id} content={content} user={user} />) }
        </div>
        <div className="Chat-input">
          {/* This should be a controlled component (form) at some point */}
          <textarea className="Chat-input--textbox" ref="message" onKeyDown={this.handleKeyDown}/>
          <button className="Chat-input--sendButton" onClick={this.handleClick}>Send</button>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);

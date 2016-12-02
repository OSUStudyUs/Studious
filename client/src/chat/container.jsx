import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import './container.scss';
import { chatChannel } from '../utils';
import * as actions from './actions';
import * as selectors from './selectors';
import Message from './components/message';

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
    this.state = {
      message: '',
      messageError: null
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleMessageChange = this.handleMessageChange.bind(this);
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
    this.refs.message.input.addEventListener('keydown', this.handleEnter);
  }

  componentDidUpdate() {
    const { messagesContainer } = this.refs;

    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  }

  handleClick() {
    const { message } = this.state;
<<<<<<< HEAD

    if (message.length) {
      this.props.subscription.sendMessage(message);
      this.setState({
        message: '',
        messageError: null
      });
    } else {
      this.setState({
        messageError: 'Please enter a message'
      });
=======

    if (message.length) {
      this.props.subscription.sendMessage(message);
      this.setState({
        message: '',
        messageError: null
      });
    } else {
      this.setState({
        messageError: 'Please enter a message'
      });
    }
  }

  handleEnter({ keyCode }) {
    if(keycode(keyCode) === 'enter') {
      this.handleClick();
>>>>>>> client: make chat more pretty
    }
  }

  handleMessageChange({ target }) {
    this.setState({
      message: target.value
    });
  }

  render() {
    const { messages } = this.props;
    const { message, messageError } = this.state;

    if (!messages) {
      return (
        <div>Loading...</div>
      );
    }

    return (
      <Paper
        style={{
<<<<<<< HEAD
          height: '100%',
          margin: '20px',
          padding: '20px'
=======
          height: '100%'
>>>>>>> client: make chat more pretty
        }}
      >
        <div className="Chat">
          <div className="Chat-messages" ref="messagesContainer" >
            {messages.map(({ createdAt, id, content, user }) =>
              <Message createdAt={createdAt} id={id} key={id} content={content} user={user} />)
            }
          </div>
          <div className="Chat-inputContainer">
            <TextField
              errorText={messageError}
<<<<<<< HEAD
              maxLength="65"
              underlineShow={false}
=======
>>>>>>> client: make chat more pretty
              hintText="message"
              id="Chat-input"
              multiLine={true}
              onChange={this.handleMessageChange}
              ref="message"
              rowsMax={4}
              style={{
<<<<<<< HEAD
                flex: '1',
                padding: '3px',
=======
                flex: '1'
>>>>>>> client: make chat more pretty
              }}
              value={message}
            />
          <div className="Chat-buttonWrapper">
            <div id="Chat-buttonMargin" />
            <RaisedButton label="Send" onClick={this.handleClick} secondary />
          </div>
          </div>
        </div>
      </Paper>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);

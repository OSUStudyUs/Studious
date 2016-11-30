import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../actions';
import Input from '../../shared_components/input';

const mapDispatchToProps = (dispatch) => ({
  createStudyGroup: bindActionCreators(actions.createStudyGroup, dispatch)
});

class CreateStudyGroup extends Component {

  static propTypes = {
    createStudyGroup: PropTypes.func.isRequired
  };

  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
  }

  handleClick() {
    this.props.createStudyGroup({
      name: this.refs.name.value(),
      accepting_new_members: this.refs.private.checked
    });
  }

  handleEnter() {
    this.handleClick();
  }

  render() {
    return (
      <div className="CreateStudyGroup">
        Create A Study Group!
        <Input
          hint="Make sure your group's name isn't empty!"
          label="Name"
          onEnter={this.handleEnter}
          placeholder="Super Awesome Webapps Study Group"
          ref="name"
          type="text"
          validate={(str) => str.length > 0}
        />
      <label>{"Public?"}</label>
        <input ref="private" type="checkbox" />
        <button onClick={this.handleClick}>Create!</button>
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(CreateStudyGroup);

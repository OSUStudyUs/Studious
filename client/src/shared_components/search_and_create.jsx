import React, { Children, Component, PropTypes } from 'react';
import { camelCase } from 'change-case';

import './search_and_create.scss';

class SearchAndCreate extends Component {
  static propTypes = {
    itemComponent: PropTypes.func.isRequired,
    itemsLoading: PropTypes.bool.isRequired,
    loadItems: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    onCreateClick: PropTypes.func,
    onItemClick: PropTypes.func,
    searchForItems: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      creatingItem: false,
      items: [],
      showDropdown: false
    };

    this.handlesItemCreation = Children.count(this.props.children) > 0;
    this.handlesItemClicks = typeof this.props.onItemClick !== 'undefined';

    this.handleChooseItemClick = this.handleChooseItemClick.bind(this);
    this.handleCreateItemClick = this.handleCreateItemClick.bind(this);
    this.handleEscapeKey = this.handleEscapeKey.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSwitchToCreatingClick = this.handleSwitchToCreatingClick.bind(this);
    this.handleFocusChange = this.handleFocusChange.bind(this);
    this.renderButton = this.renderButton.bind(this);
    this.renderDropdown = this.renderDropdown.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.renderItems = this.renderItems.bind(this);
  }

  componentDidMount() {
    this.props.loadItems();

    window.addEventListener('click', this.handleFocusChange);
    window.addEventListener('keyup', this.handleEscapeKey);
    window.addEventListener('touchend', this.handleFocusChange);
  }

  componentWillReceiveProps(nextProps) {
    const { itemsLoading } = nextProps;

    if (!itemsLoading) {
      this.setState({
        items: nextProps.searchForItems('')
      });
    }
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.handleFocusChange);
    window.removeEventListener('keyup', this.handleEscapeKey);
    window.removeEventListener('touchend', this.handleFocusChange);
  }

  handleChooseItemClick(e, item) {
    if (this.handlesItemClicks) {
      e.stopPropagation();

      this.props.onItemClick(item);
      this.setState({
        showDropdown: false
      });
    }
  }

  handleCreateItemClick(e) {
    e.stopPropagation();

    this.props.onCreateClick();
    this.setState({
      creatingItem: false
    });
  }

  handleEscapeKey(e) {
    // 27 === ESC
    if (e.keyCode === 27) {
      this.setState({
        showDropdown: false
      });
    }
  }

  handleFocusChange(e) {
    this.setState({
      showDropdown: this.refs.searchContainer.contains(e.target)
    });
  }

  handleSearchChange(e) {
    this.setState({
      creatingItem: false,
      items: this.props.searchForItems(e.target.value),
      showDropdown: true
    });
  }

  handleSwitchToCreatingClick(e) {
    e.stopPropagation();

    this.setState({
      creatingItem: true
    });
  }

  renderButton() {
    if (this.handlesItemCreation) {
      return (
        <div className="SearchAndCreateContainer-dropdown--buttonContainer">
          {
            this.state.creatingItem
            ? <button onClick={this.handleCreateItemClick}>Create this {this.props.name}</button>
            : <span>Can't find your course?&nbsp;<button onClick={this.handleSwitchToCreatingClick}>Add it!</button></span>
          }
        </div>
      );
    }

    return null;
  }

  renderDropdown() {
    return (
      <div className="SearchAndCreateContainer-dropdown">
        <div className="SearchAndCreateContainer-dropdown--mainContainer">
          {
            this.state.creatingItem
            ? <div className="SearchAndCreateContainer-dropdown--children">{this.props.children}</div>
            : this.renderItems()
          }
        </div>
        {this.renderButton()}
      </div>
    );
  }

  renderItem(Item, item) {
    return (
      <div
        className={`SearchAndCreateContainer-item${this.handlesItemClicks ? ' handlesClicks' : ''}`}
        key={item.id}
        onClick={(e) => this.handleChooseItemClick(e, item)}
      >
        <Item { ...{ [camelCase(this.props.name)]: item } } />
      </div>
    );
  }

  renderItems() {
    const { itemsLoading } = this.props;
    const { itemComponent: Item } = this.props;

    if (itemsLoading) {
      return (
        <p>Loading...</p>
      );
    }

    return this.state.items.length > 0
      ? this.state.items.map((item) => this.renderItem(Item, item))
      : this.renderNoItems();
  }

  renderNoItems() {
    return (
      <p className="SearchAndCreateContainer-noResults">No results!</p>
    );
  }

  render() {
    return (
      <div className="SearchAndCreateContainer" ref="searchContainer">
        <input
          type="text"
          onChange={this.handleSearchChange}
          placeholder={`Search for a ${this.props.name}`}
        />
        {
          this.state.showDropdown && this.renderDropdown()
        }
      </div>
    );
  }
}

export default SearchAndCreate;

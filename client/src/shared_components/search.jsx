import React, { Component, PropTypes } from 'react';
import { camelCase } from 'change-case';

import './search.scss';

const valuesToItemObject = (values) => {
  return Object.keys(values).reduce((acc, valueName) => {
    return {
      ...acc,
      [valueName]: values[valueName]().value()
    };
  }, {});
};

class Search extends Component {
  static propTypes = {
    itemComponent: PropTypes.func.isRequired,
    itemsLoading: PropTypes.bool.isRequired,
    loadItems: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    searchForItems: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      creatingItem: false,
      items: [],
      showDropdown: false
    };

    this.handleAddItemClick = this.handleAddItemClick.bind(this);
    this.handleCreateItemClick = this.handleCreateItemClick.bind(this);
    this.handleEscapeKey = this.handleEscapeKey.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.renderItems = this.renderItems.bind(this);
  }

  componentDidMount() {
    this.props.loadItems();
    window.addEventListener('click', this.handleFocus);
    window.addEventListener('keyup', this.handleEscapeKey);
    window.addEventListener('touchend', this.handleFocus);
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
    window.removeEventListener('click', this.handleFocus);
    window.removeEventListener('keyup', this.handleEscapeKey);
    window.removeEventListener('touchend', this.handleFocus);
  }

  handleAddItemClick(e) {
    e.stopPropagation();

    this.setState({
      creatingItem: true
    });
  }

  handleCreateItemClick(e) {
    e.stopPropagation();

    // console.log(React.Children.map(this.props.children, (child) => {
    //   return child.value && child.value();
    // }));

    console.log(valuesToItemObject(this.props.values));

    this.props.onCreateItem(valuesToItemObject(this.props.values));
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

  handleFocus(e) {
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

  renderItems() {
    const { itemsLoading } = this.props;
    const { itemComponent: Item } = this.props;

    if (itemsLoading) {
      return (
        <p>Loading...</p>
      );
    }

    return this.state.items.map((item) => (
      <div
        className="SearchContainer-item"
        key={item.id}
        onClick={this.handleChooseItemClick}
      >
        <Item { ...{ [camelCase(this.props.name)]: item } } />
      </div>
    ));
  }

  render() {
    return (
      <div className="SearchContainer" ref="searchContainer">
        <input
          type="text"
          onChange={this.handleSearchChange}
          placeholder={`Search for a ${this.props.name}`}
        />
        {
          this.state.showDropdown &&
          <div className="SearchContainer-dropDown">
            <div className="SearchContainer-dropDown--mainContainer">
              {
                this.state.creatingItem
                ? this.props.children
                : this.renderItems()
              }
            </div>
            <div className="SearchContainer-dropDown--buttonContainer">
              {
                this.state.creatingItem
                ? <button onClick={this.handleCreateItemClick}>Create this {this.props.name}</button>
                : <span>Can't find your course?&nbsp;<button onClick={this.handleAddItemClick}>Add it!</button></span>
              }
            </div>
          </div>
        }
      </div>
    );
  }
}

export default Search;

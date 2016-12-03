import React, { Children, Component, PropTypes } from 'react';
import { camelCase, noCase } from 'change-case';
import classNames from 'classnames';
import keycode from 'keycode';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';

import './search_and_create.scss';

class SearchAndCreate extends Component {
  static propTypes = {
    creatingItem: PropTypes.bool,
    itemComponent: PropTypes.func.isRequired,
    itemComponentProps: PropTypes.object.isRequired,
    itemsLoading: PropTypes.bool.isRequired,
    handleCreatingStateSwitch: PropTypes.func,
    loadItems: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    onItemClick: PropTypes.func,
    searchForItems: PropTypes.func.isRequired
  }

  static defaultProps = {
    itemComponentProps: {}
  }

  constructor(props) {
    super(props);

    this.state = {
      initialItemsLoaded: false,
      items: [],
      showDropdown: false,
      query: ''
    };

    this.handlesItemCreation = Children.count(this.props.children) > 0;
    this.handlesItemClicks = typeof this.props.onItemClick !== 'undefined';

    this.handleChooseItemClick = this.handleChooseItemClick.bind(this);
    this.handleEscapeKey = this.handleEscapeKey.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
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

    if (!itemsLoading && !this.state.initialItemsLoaded) {
      this.setState({
        initialItemsLoaded: true,
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
        showDropdown: false,
        query: item.name
      });
    }
  }

  handleEscapeKey(e) {
    if (keycode(e) === 'esc') {
      this.setState({
        showDropdown: false
      });
    }
  }

  handleFocusChange(e) {
    this.setState({
      showDropdown: this.refs.searchContainer.contains(e.target),
      items: this.props.searchForItems(this.state.query)
    });
  }

  handleSearchChange(e) {
    this.setState({
      items: this.props.searchForItems(e.target.value),
      showDropdown: true,
      query: e.target.value
    });
  }

  renderButton() {
    if (this.handlesItemCreation && !this.props.creatingItem) {
      return (
        <div className="SearchAndCreateContainer-dropdown--buttonContainer">
          <span>Can't find your {noCase(this.props.name)}?&nbsp;<button onClick={this.props.handleCreatingStateSwitch}>Add it!</button></span>
        </div>
      );
    }

    return null;
  }

  renderDropdown() {
    return (
      <Paper className="SearchAndCreateContainer-dropdown">
        <div className="SearchAndCreateContainer-dropdown--mainContainer">
          {
            this.props.creatingItem
            ? <div className="SearchAndCreateContainer-dropdown--children">{this.props.children}</div>
            : this.renderItems()
          }
        </div>
        {this.renderButton()}
      </Paper>
    );
  }

  renderItem(Item, item) {
    const divClassNames = classNames({
      'SearchAndCreateContainer-item': true,
      'handlesClicks': this.handlesItemClicks
    });

    return (
      <div
        className={divClassNames}
        key={item.id}
        onClick={e => this.handleChooseItemClick(e, item)}
      >
        <Item { ...{ [camelCase(this.props.name)]: item } } { ...this.props.itemComponentProps } />
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
      ? this.state.items.map(item => this.renderItem(Item, item))
      : <p className="SearchAndCreateContainer-noResults">No results!</p>;
  }

  render() {
    return (
      <div className="SearchAndCreateContainer" ref="searchContainer">
        <TextField
          hintText="Enter your query"
          onChange={this.handleSearchChange}
          type="text"
          value={this.state.query}
        />
        {
          this.state.showDropdown && this.renderDropdown()
        }
      </div>
    );
  }
}

export default SearchAndCreate;

import React, { Component } from "react";

export default class Card extends Component {
  lRef = null;
  constructor(props) {
    super(props);

    this.state = {
      enableHover: true
    };
  }

  onFocus = () => {
    const { onFocusList, searchValue } = this.props;
    this.setState({enableHover: false});
    onFocusList(searchValue);
  };

  onMouseEnter = () => {
    const { onFocusList, searchValue } = this.props;
    const { enableHover } = this.state;
    if (enableHover) {
      this.lRef.focus();
      this.setState({ enableHover: true });
      onFocusList(searchValue);
    }
  };

  onMouseLeave = () => {
    this.setState({enableHover: true});
  };

  render() {
    const { id, name, address, index, onListClick } = this.props;
    return (
      <li
        ref={ref => (this.lRef = ref)}
        className="card-container"
        tabIndex={index}
        onFocus={this.onFocus}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        onClick={onListClick}
      >
        <div className="cards">
          <p>{id}</p>
          <p>{name}</p>
          <p>{address}</p>
        </div>
      </li>
    );
  }
}

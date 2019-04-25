import React, { Component } from "react";

// components
import Card from "src/components/Cards/Card";
import NoSearchCard from "src/components/NoSearchCard/NoSearchCard";

export default class CardList extends Component {
  constructor(props) {
    super(props);
    this.listRef = React.createRef();
  }
  componentDidMount() {
    this.moveFocus();
  }

  moveFocus() {
    const { searchRef, onFocusList, typedSearch, onListClick } = this.props;
    const node = this.listRef.current;

    node.addEventListener('keydown', (e) => {
      const active = document.activeElement;
      if(e.keyCode === 40 && active.nextSibling) {
        active.nextSibling.focus();
      }
      else if(e.keyCode === 38 && active.previousSibling) {
        active.previousSibling.focus();
      } else if(e.keyCode === 13){
        onListClick();
      } else {
        onFocusList(typedSearch);
        searchRef.current.focus();
      }
    });
  }

  render() {
    const { searchResults, onFocusList, onListClick } = this.props;
    return (
      <ul className="card-list" ref={this.listRef}>
        {searchResults.length !==0 &&
          searchResults.map((result, index) => {
            const { id, name, address, searchValue } = result;
            return (
                <Card
                  id={id}
                  name={name}
                  address={address}
                  index={index}
                  onFocusList={onFocusList}
                  key={id}
                  searchValue={searchValue}
                  onListClick={onListClick}
                />
            );
          })}
        {!searchResults.length && (
          <li className="card-container">
            <NoSearchCard />
          </li>
        )}
      </ul>
    );
  }
}

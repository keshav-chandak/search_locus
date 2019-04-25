import React, { Component } from "react";

// services
import userDetails from "src/services/UserDetails";

// helpers
import { filterSearchResults } from "src/containers/SearchInput/SearchInputHelper";

// components
import CardList from "src/components/CardList/CardList";

export default class SearchInput extends Component {
  state = {
    searchText: "",
    typedSearch: "",
    searchResults: []
  };

  searchRef = React.createRef();

  componentDidMount() {
    const node = this.searchRef.current;
    node.addEventListener("keydown", e => {
      if (e.keyCode === 40 && this.searchRef.current.nextSibling) {
        this.searchRef.current.nextSibling.childNodes[0].childNodes[0].focus();
      }
    });
  }

  onChangeSearch = e => {
    const searchText = e.target.value;
    this.setState({
      searchText,
      showCards: searchText !== "",
      typedSearch: searchText,
      searchResults: filterSearchResults(searchText, userDetails)
    });
  };

  onBlurSearch = () => {
    this.setState({
        showCards: false
    });
  };

  onFocusList = (searchValue) => {
      this.setState({
        searchText: searchValue.toString()
      });
  }

  onListClick = () => {
    this.setState({
          showCards: false
      });
  }

  render() {
    const { searchText, showCards, searchResults, typedSearch } = this.state;
    return (
      <div id="searchInputContainer" onClick={this.onBlurSearch}>
        <div className="search-box-container">
          <input
            ref={this.searchRef}
            type="text"
            className="search-input"
            placeholder="&#x1f50d; search by ID, address, name"
            onChange={this.onChangeSearch}
            value={searchText}
          />
          {showCards && (
            <div className="search-card-container">
              <CardList
                searchResults={searchResults}
                searchRef={this.searchRef}
                onFocusList={this.onFocusList}
                typedSearch={typedSearch}
                onListClick={this.onListClick}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

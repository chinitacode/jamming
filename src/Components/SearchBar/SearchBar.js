import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component{
  constructor(props) {
    super(props);
    this.state = {term: ''};

    this.search = this.search.bind(this);
    this.enter = this.enter.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
  }

  search() {
    this.props.onSearch(this.state.term);
  }

  enter(e) {
    if(e.key == 'Enter') {
    this.search();
    }
  }

  handleTermChange(e) {
    this.setState({term: e.target.value});
  }

  render() {
    return (
      <div className="SearchBar">
        <input
          onChange={this.handleTermChange}
          onKeyPress={this.enter}
          placeholder="Enter A Song, Album, or Artist" />
        <a onClick={this.search}>SEARCH</a>
      </div>
    );
  }
}

export default SearchBar;

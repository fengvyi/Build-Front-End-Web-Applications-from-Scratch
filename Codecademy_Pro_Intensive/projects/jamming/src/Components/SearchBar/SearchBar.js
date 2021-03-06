import React, { Component } from 'react';
import './SearchBar.css';

class SearchBar extends Component {
  constructor(props){
    super(props);
    this.state = {
      term: ''
    }
    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
  }

  search(){
    this.props.onSearch(this.state.term);
  }

  // Listen to user's search input
  handleTermChange(event){
    this.setState({term: event.target.value});
  }


  render() {
    return (
      <div className="SearchBar">
        <input id="txtSearch" placeholder="Enter A Song, Album, or Artist"
               onChange={this.handleTermChange} onKeyDown={(event)=>{
                 if (event.keyCode === 13){
                   document.getElementById('btnSearch').click();
                 }
               }}/>
        <a id="btnSearch" onClick={this.search}>SEARCH</a>
      </div>
    );
  }
}

export default SearchBar;

import React, { Component } from 'react';
import './SearchResult.css';
import TrackList from '../TrackList/TrackList';

class SearchResult extends Component {
  render() {
    return (
      <div className="SearchResults">
        <h2>Results</h2>
        <TrackList tracks={this.props.searchReults} onAdd={this.props.onAdd} isRemoval={false} />
      </div>
    );
  }
}

export default SearchResult;

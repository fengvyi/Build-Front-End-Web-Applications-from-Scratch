import React, { Component } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import Playlist from '../Playlist/Playlist';
import SearchResult from '../SearchResult/SearchResult';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
          <SearchResult />
          <Playlist />
          </div>
        </div>
      </div>
    );
  }
}

export default App;

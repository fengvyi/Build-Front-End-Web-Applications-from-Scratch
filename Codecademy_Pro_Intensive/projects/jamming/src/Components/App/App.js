import React, { Component } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import Playlist from '../Playlist/Playlist';
import SearchResult from '../SearchResult/SearchResult';
import './App.css';
import Spotify from '../../util/Spotify';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      searchReults: [],
      playlistName: "This is a playlistName",
      playlistTracks: []
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  // Add a song from search results to user's playlist
  addTrack(track){
    if(this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)){
      return;
    }
    this.state.playlistTracks.push(track);
    this.setState({playlistTracks: this.state.playlistTracks});
  }

  // Remove a song from user's playlist
  removeTrack(track){
    this.setState({playlistTracks: this.state.playlistTracks.filter(e => e.id !== track.id)});
  }

  // Allow user to change the name of user's playlist
  updatePlaylistName(name){
    this.setState({playlistName: name});
  }

  // Save user's playlist to their Spotify account and reset the state of playlist
  savePlaylist(){
    var trackURIs = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() =>{
      this.setState(
        {
          playlistName: 'New Playlist',
          playlistTracks: []
        }
      )
    });
  }

  // Allow user to enter a search parameter and receive the search results from Spotify API
  search(term){
    Spotify.search(term).then(tracks => {
      this.setState({
        searchReults: tracks
      });
    });
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search}/>
          <div className="App-playlist">
          <SearchResult searchResults={this.state.searchReults} onAdd={this.addTrack}/>
          <Playlist playlistName={this.state.playlistName}
                    playlistTracks={this.state.playlistTracks}
                    onRemove={this.removeTrack}
                    onNameChange={this.updatePlaylistName}
                    onSave={this.savePlaylist}
                    />
          </div>
        </div>
      </div>
    );
  }
}

export default App;

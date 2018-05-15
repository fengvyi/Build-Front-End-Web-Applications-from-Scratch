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

  addTrack(track){
    if(this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)){
      return;
    }
    this.state.playlistTracks.push(track);
    this.setState({playlistTracks: this.state.playlistTracks});
  }

  removeTrack(track){
    this.setState({playlistTracks: this.state.playlistTracks.filter(e => e.id !== track.id)});
  }

  updatePlaylistName(name){
    this.setState({playlistName: name});
  }

  savePlaylist(){
    var trackURIs = [];
    trackURIs = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() =>{
      this.setState(
        {
          playlistName: 'New Playlist',
          playlistTracks: []
        }
      )
    });
  }

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

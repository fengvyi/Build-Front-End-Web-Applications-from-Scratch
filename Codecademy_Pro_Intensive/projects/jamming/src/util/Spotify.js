import React, { Component } from 'react';

var accessToken = '';
const client_id = '0b5f7cecb6d04f0e8fcb8d31e3bf9ad4'; // Your client id
const redirect_uri = 'http://localhost:3000/'; // Your redirect uri

class Spotify extends Component {

  getAccessToken(){
    if(accessToken !== ''){
      return accessToken;
    }
    /*
    $.ajax({
      url: 'https://accounts.spotify.com/authorize',
      // type: 'GET',
      // dataType: 'json',
      client_id: '0b5f7cecb6d04f0e8fcb8d31e3bf9ad4', // Your client id
      response_type: 'token',
      redirect_uri: 'http://localhost:8888/callback', // Your redirect uri
      scope: 'user-read-private user-read-email',
      success(response){
        console.log(response);
      },
      error(jqXHR, status, errorThrown){
        console.log(jqXHR);
      }
    });
    */

    accessToken = window.location.href.match(/access_token=([^&]*)/);
    var expiresIn = window.location.href.match(/expires_in=([^&]*)/);

    if(accessToken && expiresIn){
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    }
    else{
      var scope = 'playlist-modify-public';
      var url = 'https://accounts.spotify.com/authorize';
      url += '?response_type=token';
      url += '&client_id=' + encodeURIComponent(client_id);
      url += '&scope=' + encodeURIComponent(scope);
      url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
      window.location = url;
    }

    /*
    const xhr = new XMLHttpRequest();
    const url = 'https://accounts.spotify.com/authorize';
    xhr.client_id = '0b5f7cecb6d04f0e8fcb8d31e3bf9ad4';
    xhr.response_type = 'token';
    xhr.redirect_uri = 'http://localhost:8888/callback';
    xhr.scope = 'user-read-private user-read-email';
    xhr.onreadystatechange = function() {
      if(xhr.readyState === XMLHttpRequest.done){
        console.log(xhr.response);
      }
    };
    xhr.open('GET', url);
    xhr.send();
    */
  }

  search(searchTerm){
    var access_token = this.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`,
    {
      headers: {Authorization: `Bearer ${access_token}`}
    }).then(response => {
      if(response.ok){
        return response.json();
      }
      throw new Error('Request failed!');
    }, networkError => console.log(networkError.message)
    ).then(jsonResponse => {
      return jsonResponse.map(track => (
        {
          id: track.id,
          name: track.name,
          artist: track.artist[0].name,
          album: track.album.name,
          uri: track.uri
        }
      )
      );
    });
  }

  savePlaylist(playlistName, trackURIs){
    if(!playlistName || !trackURIs){
      return;
    }
    var access_token = this.getAccessToken();
    var userID;
    var playlistID;

    // GET request that returns the user's Spotify username
    fetch(`https://api.spotify.com/v1/me`,
    {
      headers: {Authorization: `Bearer ${access_token}`}
    }).then(response => {
      if(response.ok){
        return response.json();
      }
      throw new Error('Request failed!');
    }, networkError => console.log(networkError.message)
    ).then(jsonResponse => {
        userID = jsonResponse.id;
    });

    // POST request that creates a new playlist in the user's account and returns a playlist ID
    fetch(`https://api.spotify.com/v1/users/${userID}/playlists`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${access_token}`,
          //Content-Type: 'application/json'
        },
        body: JSON.stringify(
          {
            name: playlistName,
            description: "New playlist description"
          }
        )
    }).then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Request failed!');
    }, networkError => console.log(networkError.message)
    ).then(jsonResponse => {
      playlistID = jsonResponse.id;
    });

    // POST request that adds tracks to a playlist
    fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${access_token}`,
        //Content-Type: 'application/json'
      },
      body: JSON.stringify(
        {
          uris: trackURIs,
        }
      )
    }).then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Request failed!');
    }, networkError => console.log(networkError.message)
    ).then(jsonResponse => {}
    );

  }

}

export default Spotify;

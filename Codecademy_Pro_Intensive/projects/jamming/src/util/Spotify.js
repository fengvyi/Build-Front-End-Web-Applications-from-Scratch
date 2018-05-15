var accessToken = '';
const client_id = '0b5f7cecb6d04f0e8fcb8d31e3bf9ad4'; // Your client id
const redirect_uri = 'http://localhost:3000/'; // Your redirect uri

const Spotify = {

  getAccessToken(){
    if(accessToken !== ''){
      return accessToken;
    }

    var access_token = window.location.href.match(/access_token=([^&]*)/);
    var expires_in = window.location.href.match(/expires_in=([^&]*)/);

    if(access_token && expires_in){
      accessToken = access_token[1];
      var expiresIn = expires_in[1];
      console.log(accessToken);
      console.log(expiresIn);
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
  },

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
      return jsonResponse.tracks.items.map(track => (
        {
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri
        }
      )
      );
    });
  },

  savePlaylist(playlistName, trackURIs){
    if(!playlistName || !trackURIs){
      return;
    }
    var access_token = this.getAccessToken();
    var userID;
    var playlistID;

    // GET request that returns the user's Spotify username
    return fetch(`https://api.spotify.com/v1/me`,
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

        // POST request that adds tracks to a playlist
        fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${access_token}`,
            //Content-Type: 'application/json'
          },
          body: JSON.stringify(
            {
              uris: trackURIs
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

      });

    });

  }

};


export default Spotify;

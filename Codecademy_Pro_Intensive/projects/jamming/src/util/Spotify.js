var accessToken = '';
const client_id = '0b5f7cecb6d04f0e8fcb8d31e3bf9ad4';
const redirect_uri = 'https://jamming-zefengsong.surge.sh/';

const Spotify = {
  /**
  * Get a Spotify user's access token
  * Using Implicit Grant Flow to authenticate against the Spotify Accounts.
  *
  * For more information, read
  * https://beta.developer.spotify.com/documentation/general/guides/authorization-guide/
  */
  getAccessToken(){
    if(accessToken !== ''){
      return accessToken;
    }

    var access_token = window.location.href.match(/access_token=([^&]*)/);
    var expires_in = window.location.href.match(/expires_in=([^&]*)/);

    if(access_token && expires_in){
      accessToken = access_token[1];
      var expiresIn = expires_in[1];
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

  // Returns a promise that will eventually resolve to the list of tracks from the search
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

  // Write the user's playlist to theor Spotify account
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

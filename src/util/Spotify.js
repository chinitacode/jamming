let accessToken = '';
const client_id = '141316f87a3b470aa6cb7ffa3aa3e320';
      const redirect_uri = 'http://localhost:3000/';

const Spotify = {

  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }

    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/'); // This clears the parameters, allowing us to grab a new access token when it expires.
      return accessToken;
    } else {
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirect_uri}`;
      window.location = accessUrl;
    }
  },

  search(term) {
    const accessToken = Spotify.getAccessToken();
    //search return a promise which is the object containing tracks info
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(response => {
      return response.json();
    }).then(jsonResponse => {
      if (!jsonResponse.tracks) {
        return [];
      }
      return jsonResponse.tracks.items.map(track => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri
      }));
    });
  },

  savePlaylist(playlistName, trackURIs) {
    if(playlistName, trackURIs) {
      const accessToken = Spotify.getAccessToken();
      const headers = {
        Authorization:  `Bearer ${accessToken}`
      };
      const user_id = '';

  return fetch('https://api.spotify.com/v1/me', {headers: headers})
    .then(response => response.json())
      .then(jsonResponse => {
        let user_id = jsonResponse.id;
      }
      );
//should {user_id} here in the url needs to be ${user_id}?
  fetch('https://api.spotify.com/v1/users/{user_id}/playlists',
	      {headers: headers,
		     method: 'POST',
		     body: JSON.stringify({user_id: user_id})
		   },
		  )
      .then(response => response.json())
        .then(jsonResponse =>
          {
          const playlistID = jsonResponse.id;
          return playlistID;
          }
        );

    } else {return;}
  }

};

export default Spotify;

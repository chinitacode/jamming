let accessToken = '';
const client_id = '141316f87a3b470aa6cb7ffa3aa3e320';
      const redirect_uri = 'https://localhost:3000/';

let Spotify = {
  getAccessToken() {
    if(accessToken) {
      return accessToken;
    }
    const urlString = 'window.location.href';
    const accessTokenMatch = urlString.match(/access_token=([^&]*)/);
    const expiresInMatch = urlString.match(/expires_in=([^&]*)/);

    if(accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      let expiresIn = expiresInMatch[1];
      //Set the access token to expire at the value for expiration time
      //Clear the parameters from the URL, so the app doesn't try
      //grabbing the access token after it has expired
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
    } else {// do not have the token and not in  URL, so need to log in
			// redirect to the login page

      const url = 'https://accounts.spotify.com/authorize';
      const urlToGet = url + '?client_id=' + client_id +
      '&response_type=token&scope=playlist-modify-public' + '&redirect_uri=' + redirect_uri;
      window.location = urlToGet;
      // login successfuly will redirect to localhost port 3000 with get parameters in the url
    }

  },

  search(term) {
    fetch('https://api.spotify.com/v1/search?type=track&q=' + term, {
      headers: {
        Authorization:  `Bearer ${accessToken}`
      }
    }).then(response => {
      if(response.ok) {
        return response.json();
      } throw new Error('Request failed!');
    }, networkError => console.log(networkError.message)
  ).then(jsonResponse => {
      if(jsonResponse.tracks) {
	    return jsonResponse.tracks.items.map(track => {
          return {
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri};
			});
         } else {return [];}
     });
  },

  savePlaylist(playlistName, trackURIs) {
    if(playlistName, trackURIs) {
      const headers = {
        Authorization:  `Bearer ${accessToken}`
      };
      const user_id = '';

   fetch('https://api.spotify.com/v1/me', {headers: headers})
    .then(response => response.json())
      .then(jsonResponse =>
        {
        const user_id = jsonResponse.id;
        }
      );

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
          }
        );

    } else {return;}
  }

};

export default Spotify;

let accessToken = '';
const client_id = '141316f87a3b470aa6cb7ffa3aa3e320';
const redirect_uri = 'https://dreary-fold.surge.sh/';
//const redirectURI = 'http://localhost:3000/'
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
        uri: track.uri // only by searching new songs will return songs with trackURIs
      }));
    });
  },

  savePlaylist(playlistName, trackURIs) {
    //Question: can I write if(!playlistName || !trackURIs) instead?
      if (!playlistName || !trackURIs.length) {
        return;
      }
      const accessToken = Spotify.getAccessToken();
      const headers = { Authorization: `Bearer ${accessToken}` };
      let user_id;
      return fetch('https://api.spotify.com/v1/me', {headers: headers} //get spotify user id
      ).then(response => response.json()
      ).then(jsonResponse => {
        user_id = jsonResponse.id;
        console.log(jsonResponse);
        return fetch(`https://api.spotify.com/v1/users/${user_id}/playlists`, {
          headers: headers,
          contentType: 'application/json',
          method: 'POST',
          body: JSON.stringify({name: playlistName}) //add playlist
        }).then(response => response.json()
        ).then(jsonResponse => {
          const playlistId = jsonResponse.id;
          return fetch(`https://api.spotify.com/v1/users/${user_id}/playlists/${playlistId}/tracks`, {
            headers: headers,
            contentType: 'application/json',
            method: 'POST',
            body: JSON.stringify({uris: trackURIs}) //add tracks
            //Get all the trackURIs of the playlist
            //A comma-separated list of Spotify track URIs to add to a playlist.
          });
        });
});
}
};

export default Spotify;

import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {searchResults: [],
    playlistName: 'New Playlist',
    playlistTracks: []
};
  this.addTrack = this.addTrack.bind(this);
  this.removeTrack = this.removeTrack.bind(this);
  this.updatePlaylistName = this.updatePlaylistName.bind(this);
  this.savePlaylist = this.savePlaylist.bind(this);
  this.search = this.search.bind(this);
  }

  search(Term) {
    //Spotify.search return a promise which is the object containing tracks(and track.uri)
    //The data has to be received first to be ready to use
    Spotify.search(Term).then(tracks => this.setState({searchResults: tracks}));
  }

  addTrack(track) {
    if(this.state.playlistTracks.indexOf(track) === -1) {
      let tracks = this.state.playlistTracks;
      tracks.push(track);
      this.setState({playlistTracks: tracks});
    }
  }

  removeTrack(track) {
    let playlist = this.state.playlistTracks;
    playlist.splice(this.state.playlistTracks.indexOf(track), 1);
    this.setState({playlistTracks: playlist});
  }



  updatePlaylistName(name) {
    this.setState({playlistName: name});
  }

  // the promise returned by Spotify.savePlaylist() must be resolved first
  // then to change the state, or else the app will break down
  //the idea is to confirm the data has been received and ready to use
  savePlaylist() {
    let trackURIs = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() =>
        this.setState({
          playlistName: 'New Playlist',
          searchResults: []
          })
            );
        }



  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults
              onAdd={this.addTrack}
              searchResults={this.state.searchResults} />
            <Playlist
              playlistName={this.state.playlistName}
              onNameChange={this.updatePlaylistName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
              onSave={this.savePlaylist} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;

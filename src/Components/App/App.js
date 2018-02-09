import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {searchResults: [
      {
        name: 'Ruin',
        artist: 'Shawn Mendes',
        album: 'Illuminate'
      },
      {
        name: 'Something Just Like This',
        artist: 'The Chainsmokers, Coldplay',
        album: 'Memories Do Not Open'
      },
      {
        name: 'Stitches',
        artist: 'Shawn Mendes',
        album: 'Handwritten(Deluxe)'
      }
    ],
    playlistName: 'Pop',
    playlistTracks: [
      {
      name: 'Stronger',
      artist: 'Britney Spears',
      album: 'Oops!... I Did It Again'
    },
    {
      name: 'Kissing Strangers',
      artist: 'DNCE',
      album: 'Kissing Strangers'
    }
  ]
};
  this.addTrack = this.addTrack.bind(this);
  this.removeTrack = this.removeTrack.bind(this);
  this.updatePlaylistName = this.updatePlaylistName.bind(this);
  this.savePlaylist = this.savePlaylist.bind(this);
  this.search = this.search.bind(this);
  }

//Q1：Why doesn't this work?
  // search(term) {
  //    let tracks = Spotify.search(term);
	// 	 this.setState({searchResults: tracks});
  // }

  search(Term) {
    //search return a promise which is the object containing tracks
    Spotify.search(Term).then(tracks => this.setState({searchResults: tracks}));
  }

  addTrack(track) {
    if(this.state.playlistTracks.indexOf(track) === -1) {
      let tracks = this.state.playlistTracks;
      tracks.push(track);
      this.setState({playlistTracks: tracks});
    //  console.log(track);
    //  console.log(this.state.playlistTracks);
    }
  }

  // Q2： Old method: problematic as one click removes all. But why?
  // removeTrack(track) {
  //     let playlist = this.state.playlistTracks.filter(song => song.id !== track.id);
  //     this.setState({playlistTracks: playlist});
  // }


  removeTrack(track) {
    let playlist = this.state.playlistTracks;
    playlist.splice(this.state.playlistTracks.indexOf(track), 1);
    this.setState({playlistTracks: playlist});
  }



  updatePlaylistName(name) {
    this.setState({playlistName: name});
  }

  // Q3： not sure if this is right
  savePlaylist() {

    let trackURIs = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist();
    this.setState({
      playlistName: 'New Playlist',
      searchResults: []
  });
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

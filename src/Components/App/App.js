import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

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
  }

  addTrack(track) {
    if(!this.state.playlistTracks.find(song => song.id === track.id)) {
      this.setState({playlistTracks: this.state.playlistTracks.push(track)});
    }
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults
              onAdd={this.addTrack}
              searchResults={this.state.searchResults} />
            <Playlist playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;

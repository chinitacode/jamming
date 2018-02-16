import React from 'react';
import './Track.css';

class Track extends React.Component {
  constructor(props) {
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }

//write logic to toggling the add/remove icon
//the value of this.props.isRemoval is different in <Tracklist /> depending on from where
//(<SearchResults /> or <Playlist />) it is passed
  renderAction() {
    if(this.props.isRemoval) {
      return (<a className="Track-action" onClick={this.removeTrack}>-</a>);
    } else {
      return (<a className="Track-action" onClick={this.addTrack}>+</a>);
    }
  }

  addTrack() {
    this.props.onAdd(this.props.track);
  }

  removeTrack() {
    this.props.onRemove(this.props.track);
  }

  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.track.name}</h3>
          <p>{this.props.track.artist} | {this.props.track.album}</p>
        </div>
        <div className="Track-image">
          <img src={this.props.track.imageUrl} alt="album_cover_picture"/>
        </div>
        {this.renderAction()}
      </div>
    );
  }
}

export default Track;

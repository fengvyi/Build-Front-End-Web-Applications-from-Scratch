import React, { Component } from 'react';
import './TrackList.css';
import Track from '../Track/Track';

class TrackList extends Component {
  render() {
    return (
      <div className="TrackList">
        // Renders a set of Track components
        {
          this.props.tracks.map(track => {
            return <Track track={track} key={track.id} onAdd={this.props.onAdd} onRemove={this.props.onRemove} isRemoval={this.props.isRemoval} />;
          })
        }
      </div>
    );
  }
}

export default TrackList;

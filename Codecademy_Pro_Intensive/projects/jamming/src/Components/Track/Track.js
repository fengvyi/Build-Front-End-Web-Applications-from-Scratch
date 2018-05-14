import React, { Component } from 'react';
import './Track.css';

class Track extends Component {

  constructor(props){
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);


  }

  renderAction() {
    if(this.props.isRemoval){
      return <a onClick={this.removeTrack}>-</a> ;
    }
    else{
      return <a onClick={this.addTrack}>+</a>;
    }
  }

  addTrack(){
    this.props.onAdd(this.props.track);
  }

  removeTrack(){
    this.props.onRemove(this.props.track);
  }

  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.track.name}</h3>
          <p>{this.props.track.artist | this.props.track.album}</p>
        </div>
        <div className="Track-action">
          {this.renderAction()}
        </div>
      </div>
    );
  }
}

export default Track;

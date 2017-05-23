import React, { Component } from 'react';
import './DeletePlant.css';
import api from '../../api';
import FontAwesome from 'react-fontawesome';

export default class DeletePlant extends Component {

  // _handleDelete = (event) => {
  //   event.preventDefault();
  //   console.log("passing or not????", this.props.id);
  //     api.deletePlant(this.props.id)
  //     .then(() => this.props.fetchPlants)
  // }

  render(){
    console.log("DeletePlant.js render is working??????");
    return(
      <div className="delete-plant-modal">

          <h1>Delete Plant Card ?</h1>
            <button className="confirm-delete-button" onClick={this._handleDelete}><FontAwesome className='trash-icon' name='trash' size='3x' style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}/></button>
            <button className="cancel-delete-button"><a href="/"><FontAwesome className='cancel-icon' name='times' size='3x' style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}/></a></button>
      </div>
    );
  }
}

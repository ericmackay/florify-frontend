import React, { Component } from 'react';
import api from '../../api';
import './DeletePlantCard.css';
import FontAwesome from 'react-fontawesome';
// This component should be passed a prop which will be a function that
// allows the CreatePlant modal to be rendered over the Home.js

export default class DeletePlantCard extends Component {

  render() {
    let { showModal } = this.props
    return (

      <div className="delete-plant-card" onClick={showModal}>
        <button><FontAwesome className='delete-icon' name='trash' size='3x' style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}/> </button>

      </div>
    );
  }

}

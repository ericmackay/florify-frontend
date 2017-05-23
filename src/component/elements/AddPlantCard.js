import React, {Component} from 'react';
import './AddPlantCard.css';
import FontAwesome from 'react-fontawesome';

// This component should be passed a prop which will be a function that
// allows the CreatePlant modal to be rendered over the Home.js

export default class AddPlantCard extends Component {

  render() {
    let { showModal } = this.props
    return (
      <div className="add-plant-card" onClick={showModal}>
        <FontAwesome className='add-icon' name='plus' size='3x' style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}/>
        <h2> Add a plant </h2>
      </div>
    );
  }

}

import React, {Component} from 'react';
import { Link } from 'react-router';
import './PlantCard.css';
// import auth from '../../auth';
import api from '../../api';
import FontAwesome from 'react-fontawesome';
import EditPlant from '../modals/EditPlant';
import DeletePlant from '../modals/DeletePlant';

export default class PlantCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
    //isDeleteButtonClicked: false,
    showEditModal: false
    }
}



  _toggleEditModal = () => this.setState({showEditModal: !this.state.showEditModal})

  render() {
    // const isLoggedIn = auth.isLoggedIn();
    let { nickname, name, description, id, currentLux, currentTemp, currentHum, currentFertility } = this.props
    let { fetchPlants } = this.props

      return(
        <div className="plant-card">
          <Link to={`/plant/${id}`}>
              <div className="card-container">
                <div className="card-item">
                  <h2>{ nickname }</h2>
                  <p>{ name }</p>
                  <p>{ description }</p>
                </div>
                <div className="card-item2">
                  <div className='card-item-info-box'>
                    <FontAwesome className='hum-icon' name='tint' size='3x' style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}/>
                    <p>{ currentHum } %</p>
                  </div>
                  <div className='card-item-info-box'>
                    <FontAwesome className='temp-icon' name='thermometer-three-quarters' size='3x' style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}/>
                    <p>{ currentTemp } &deg;C</p>
                  </div>
                  <div className='card-item-info-box'>
                    <FontAwesome className='lux-icon' name='sun-o' size='3x' style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}/>
                    <p>{ currentLux }lux</p>
                  </div>
                  <div className='card-item-info-box'>
                    <FontAwesome className='fertility-icon' name='flask' size='3x' style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}/>
                    <p>{ currentFertility } f* </p>
                  </div>
                </div>
                </div>
            </Link>
          <div className="card-edit">
            <button className="plant-edit-button" onClick={()=>this.setState({showEditModal: true})}>
              <FontAwesome className='edit-icon' name='pencil-square-o' size='3x' style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}/>
            </button>
          </div>
            {this.state.showEditModal ? <div className="backdrop"><EditPlant fetchPlants={fetchPlants} plantData={this.props} closeModal={this._toggleEditModal}/></div> : null}


        </div>
      );
  }
} // export

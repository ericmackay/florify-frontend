import React, { Component } from 'react';
import './EditPlant.css';
import api from '../../api';
import DeletePlant from './DeletePlant';
import DeletePlantCard from '../elements/DeletePlantCard';
import FontAwesome from 'react-fontawesome';

const ENTER = 13

export default class EditPlant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.plantData.id,
      nickname: this.props.plantData.nickname,
      name: this.props.plantData.name,
      description: this.props.plantData.description,
      maxtemp: this.props.plantData.maxtemp,
      mintemp: this.props.plantData.mintemp,
      maxph: this.props.plantData.maxph,
      minph: this.props.plantData.minph,
      maxhum: this.props.plantData.maxhum,
      minhum: this.props.plantData.minhum,
      maxlux: this.props.plantData.maxlux,
      minlux: this.props.plantData.minlux,
      showDeleteModal: false
    };
  }

  _toggleDeleteModal = () => this.setState({showDeleteModal: !this.state.showDeleteModal})

  plantId = () => {
    return this.props.params.id;
  }

  _handleDelete = (event) => {
    event.preventDefault();
    api.deletePlant(this.state.id)
    //  .then(() => {this.props.fetchPlants()}).catch(console.error)}
    //  this.props.closeModal()
      .then(() => {
        this.props.fetchPlants()
      }).catch((err) => {
      console.log(err)
    })
    this.props.closeModal()
  }

  _submitCard = (event) => {
    event.preventDefault();

    let {
      name, nickname, description, maxtemp, mintemp, maxph, minph, maxhum,
      minhum, maxlux, minlux
    } = this.state;

    if(nickname){
      api.updatePlant({
        id: this.state.id,
        nickname: nickname,
        name: name,
        description: description,
        maxtemp: maxtemp,
        mintemp: mintemp,
        maxph: maxph,
        minph: minph,
        maxhum: maxhum,
        minhum: minhum,
        maxlux: maxlux,
        minlux: minlux
      })
        .then(() => {this.props.fetchPlants()}).catch(console.error)}
    this.props.closeModal()
  }


  render(){
    return (
      <div className="edit-plant-modal-wrapper">
        {!this.state.showDeleteModal ?
          <div className="edit-plant-modal">
              <h1>Edit Plant Card</h1>
              <input type="text" placeholder="Nicename" value={this.state.nickname}
                     onChange={({target})=>this.setState({nickname:target.value})}/>
              <br/>
              <input type="text" placeholder="Name" value={this.state.name}
                     onChange={({target})=>this.setState({name:target.value})}/>
              <br/>
              <input type="test" placeholder="Description" value={this.state.description}
                     onChange={({target})=>this.setState({description:target.value})}/>
              <br/>
              <div className="create__card-button">
                  <input type="test" placeholder="Maxhum" value={this.state.maxhum}
                         onChange={({target})=>this.setState({maxhum:target.value})}/>
                  <br/>
              </div>
              <input type="test" placeholder="Minhum" value={this.state.minhum}
                     onChange={({target})=>this.setState({minhum:target.value})}/>
              <div className="create__card-button">
                <span>
                  <button onClick={this._submitCard}><a href="/"><FontAwesome className='submitCard-icon' name='check' size='3x' style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}/></a></button>
                  <button onClick={this._toggleDeleteModal}><FontAwesome className='delete-icon' name='trash' size='3x' style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}/></button>
                  <button className="cancel-edit-button" onClick={this.props.closeModal}><FontAwesome className='cancel-icon' name='times' size='3x' style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}/></button>
                </span>

              </div>
          </div>
          :
          <div className="edit-plant-modal">
              <h3>Are you sure?</h3>
              <button className="confirm-delete-button" onClick={this._handleDelete}><FontAwesome className='Yes-icon' name='check' size='3x' style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}/></button>
              <button className="cancel-delete-button" onClick={this.props.closeModal}><FontAwesome className='cancel-icon' name='times' size='3x' style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}/></button>
          </div>
        }
      </div>
    )
  }

}
import React, { Component } from 'react';
import './EditPlant.css'
import api from '../../api'

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
      minlux: this.props.plantData.minlux
    };
  }

   plantId = () => {
     return this.props.params.id;
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
      }).then(() => this.props.fetchPlants())
      .catch(console.error)
    }
    this.props.closeModal()
  }

  render(){
    console.log(this.props, "this is to test if EditPlant form is rendered");
    return(
      <div className="edit-plant-modal">
          <span className="close-icon" >×</span>
          <h1>Edit Plant Card</h1>
          <input type="text" placeholder="Nicename" value={this.state.nickname}
            onChange={({target})=>this.setState({nickname:target.value})}/>
          <input type="text" placeholder="Name" value={this.state.name}
            onChange={({target})=>this.setState({name:target.value})}/>
          <input type="test" placeholder="Description" value={this.state.description}
            onChange={({target})=>this.setState({description:target.value})}/>
          <input type="test" placeholder="Maxtemp" value={this.state.maxtemp}
            onChange={({target})=>this.setState({maxtemp:target.value})}/>
          <input type="test" placeholder="Mintemp" value={this.state.mintemp}
            onChange={({target})=>this.setState({mintemp:target.value})}/>
          <input type="test" placeholder="Maxph" value={this.state.maxph}
            onChange={({target})=>this.setState({maxph:target.value})}/>
          <input type="test" placeholder="Minph" value={this.state.minph}
            onChange={({target})=>this.setState({minph:target.value})}/>
\          <input type="test" placeholder="Maxhum" value={this.state.maxhum}
            onChange={({target})=>this.setState({maxhum:target.value})}/>
          <input type="test" placeholder="Minhum" value={this.state.minhum}
            onChange={({target})=>this.setState({minhum:target.value})}/>
          <input type="test" placeholder="Maxlux" value={this.state.maxlux}
            onChange={({target})=>this.setState({maxlux:target.value})}/>
          <input type="test" placeholder="Minlux" value={this.state.minlux}
            onChange={({target})=>this.setState({minlux:target.value})}/>
          <div className="create__card-button">
            <button onClick={this._submitCard}>Submit Plant</button>
          </div>
      </div>
    );
  }

}

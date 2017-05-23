import React, {Component} from 'react';
import api from '../../api';
import PlantCard from '../elements/PlantCard';
import AddPlantCard from '../elements/AddPlantCard';
// import auth from '../../auth';
import './Home.css';
import CreatePlant from '../modals/CreatePlant';
import FontAwesome from 'react-fontawesome';

// This component is the INDEXROUTE "/"
// it is responsible for fetching the plantsdata and map it to a
// bunch of <PlantCard />'s.
//
// This component is also responsible for displaying the AddPlantCard
// button along with the PlantCards. Upon clicking the <AddPlantCard />
// this component will set it's own state to allow the <CreatePlant />
// modal to render on the page. It will also pass a function to CreatePlant
// which allows it to close itself upon submitting.

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showCreateModal: false,
      loading: true
    }
  }

  componentDidMount() {
      this._fetchPlants()
  }

  _fetchPlants = () => {
      api.getPlants(localStorage.token)
      .then(res => {
          this.setState({
            plants: res.body,
            loading: false
         })
      })

      .catch(console.error)
  }

  _toggleCreateModal = () => this.setState({showCreateModal: !this.state.showCreateModal})

  render() {
      let { plants } = this.state
      return (
          <div className="home">
            <div className="App-navbar">
              <img className="logo" src={require("../../media/florify_logo.png")} alt="logo"/>
              <i className="fa fa-cog fa-2x settings-icon"/>
            </div>
            {this.state.loading ? <h1> LOADING YR SHIT </h1>: null}
            { plants && plants.map(plant => {
                return <PlantCard
                  fetchPlants={this._fetchPlants}
                  key={plant.id}
                  id={plant.id}
                  nickname={plant.nickname}
                  name={plant.name}
                  currentLux={plant.latestLux.reading}
                  currentFertility={plant.latestPh.reading}
                  currentTemp={plant.latestTemp.reading}
                  currentHum={plant.latestHum.reading}
                />
              }
            )}

            <AddPlantCard showModal={ this._toggleCreateModal } />
            {this.state.showCreateModal &&
          <div className="backdrop">
              <CreatePlant fetchPlants={this._fetchPlants} closeModal={this._toggleCreateModal}/>
          </div>
          }
          </div>
      );
  }


 }

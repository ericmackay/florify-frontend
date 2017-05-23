import React, {Component} from 'react';
import './DetailedPlantPage.css';
import Chart from '../charts/Chart.js'
import api from '../../api';
import FontAwesome from 'react-fontawesome';
import moment from 'moment';
import * as util from '../../util';


export default class DetailedPlantPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      period: "week",
      [util.HUMIDITY]: false,
      [util.TEMPERATURE]: false,
      [util.LUX]: false,
      [util.FERTILITY]: false,
      nickname: '',
      name: '',
      description: '',
      data: '',
      currentHum: '',
      currentTemp: '',
      currentLux: '',
      currentFertility: '',
      loading: true
    };
  }

  componentDidMount() {
    // fetch data for default selection (just humidity)
    // should retrieve labels (aka x-axis)
    // and x-axis data
    // pass it through factory with the type
    // to get the datasets you want.

    // setState with the result of this process     SHOULD LOOK SOMETHING LIKE::

    this._fetchPlantCard()

  }

  _fetchPlantCard = () => {
      api.getPlantDetail(this.props.params.id, this.state.period)
      .then(res => {
        let datum = res.body
        // left hand side stuff
        let nickname = (res.body.plant.nickname)
        let name = (res.body.plant.name)
        let description = (res.body.plant.description)
        let currentHum = datum.hum[datum.hum.length-1]
        let currentTemp = datum.temp[datum.temp.length-1]
        let currentLux = datum.lux[datum.lux.length-1]
        let currentFertility = datum.ph[datum.ph.length-1]
        // datasets
        let humDataSet = util.dataSetFactory(util.HUMIDITY, datum.hum)
        let tempDataSet = util.dataSetFactory(util.TEMPERATURE, datum.temp)
        let luxDataSet = util.dataSetFactory(util.LUX, datum.lux)
        let fertilityDataSet = util.dataSetFactory(util.FERTILITY, datum.ph)
        // Labels for x axis
        let labels = res.body.timeAxis.map(el => moment(el).format('h:mm'))

        this.setState({
          // Set corresponding state
          [util.HUMIDITY]: true,
          [util.TEMPERATURE]: true,
          [util.LUX]: true,
          [util.FERTILITY]: false,
          
          // stored computed data
          labels,
          humDataSet,
          tempDataSet,
          luxDataSet,
          fertilityDataSet,
          
          //trash for the left side
          nickname: nickname,
          name: name,
          description: description,
          currentHum: Math.round(currentHum),
          currentTemp: Math.round(currentTemp),
          currentLux: Math.round(currentLux),
          currentFertility: Math.round(currentFertility),
          loading: false
         })
      })
      .catch(console.error)
  }
  
  _toggleDataSet = (type) => this.setState({ [type]: !this.state[type] })

  // _chartDataGenerator = () =>

  render() { // render chart
    // console.log(this.state)
    let { nickname, name, description, currentHum,
       currentTemp, currentLux, currentFertility } = this.state
  
    let chartStuff = this._getDataAndOptions()
    
    return(
      <div className='DetailedPlantPage'>
        <div className='DetailedPlantPage-content'>
          <div className='DetailedPlantPage-info'>
            <h1>{ nickname }</h1>
            <h4>{ name } </h4>
            <h4>{ description }</h4>
            <div className='DetailedPlantPage-info-box'
              onClick={()=>this._toggleDataSet(util.HUMIDITY)}
            >
              <FontAwesome className='hum-icon' name='tint' size='3x' style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}/>
              <p>{ currentHum } %</p>
            </div>
            <div className='DetailedPlantPage-info-box'
              onClick={()=>this._toggleDataSet(util.TEMPERATURE)}
            >
              <FontAwesome className='temp-icon' name='thermometer-three-quarters' size='3x' style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}/>
              <p>{ currentTemp } &deg;C</p>
            </div>
            <div className='DetailedPlantPage-info-box'
              onClick={()=>this._toggleDataSet(util.LUX)}
            >
              <FontAwesome className='lux-icon' name='sun-o' size='3x' style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}/>
              <p>{ currentLux }lux</p>
            </div>
            <div className='DetailedPlantPage-info-box'
              onClick={()=>this._toggleDataSet(util.FERTILITY)}
            >
              <FontAwesome className='fertility-icon' name='flask' size='3x' style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}/>
              <p>{ currentFertility } f* </p>
            </div>
          </div>
          <div className='DetailedPlantPage-chart'>
            { !this.state.loading &&
              <Chart data={ chartStuff.data } options={ chartStuff.options }/>
            }
          </div>
        </div>
      </div>
    );
  }
  
  _getDataAndOptions = () => {
    // Determine what goes into our options and datasets based on state.
    let data = { labels: this.state.labels, datasets: [] }
    let activeOptions = [];
    if (this.state[util.HUMIDITY]) {
      activeOptions.push(util.HUMIDITY);
      data.datasets.push(this.state.humDataSet)
    }
    if (this.state[util.TEMPERATURE]) {
      activeOptions.push(util.TEMPERATURE)
      data.datasets.push(this.state.tempDataSet)
    }
    if (this.state[util.LUX]) {
      activeOptions.push(util.LUX)
      data.datasets.push(this.state.luxDataSet)
    }
    if (this.state[util.FERTILITY]) {
      activeOptions.push(util.FERTILITY)
      data.datasets.push(this.state.fertilityDataSet)
    }
    let options = util.optionsFactory(activeOptions)
    // console.log(activeOptions, data.datasets)
    return { options, data }
  }
}

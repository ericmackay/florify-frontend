import React, {Component} from 'react';
import './DetailedPlantPage.css';
import Chart from '../charts/Chart.js'
import api from '../../api';
import FontAwesome from 'react-fontawesome';
import moment from 'moment';
import * as util from '../../util';
import '../../gridStyle.css';


export default class DetailedPlantPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      period: 'day',
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
        console.log(res.body)
        let datum = res.body
        // left hand side stuff
        let nickname = (res.body.plant.nickname)
        let name = (res.body.plant.name)
        let description = (res.body.plant.description)
        let currentHum = datum.hum[datum.hum.length-1]
        let currentTemp = datum.temp[datum.temp.length-1]
        let currentLux = datum.lux[datum.lux.length-1]
        let currentFertility = datum.ph[datum.ph.length-1]
        // Datasets
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
          [util.LUX]: false,
          [util.FERTILITY]: false,

          // Stored computed data
          labels,
          humDataSet,
          tempDataSet,
          luxDataSet,
          fertilityDataSet,

          // Trash for the left side
          nickname: nickname,
          name: name,
          description: description,
          currentHum: Math.round(currentHum),
          currentTemp: Math.round(currentTemp),
          currentLux: Math.round(currentLux),
          currentFertility: Math.round(currentFertility),
          loading: false,
        })
      })
      .catch(console.error)
  }

  _toggleDataSet = (type) => {
    if (type === (util.HUMIDITY)) {
      this.setState({
        [type]: !this.state[type],
        humCondition: !this.state.humCondition
      })
    }

    if (type === (util.TEMPERATURE)) {
      this.setState({
        [type]: !this.state[type],
        tempCondition: !this.state.tempCondition
      })
    }

    if (type === util.LUX) {
      this.setState({
        [type]: !this.state[type],
        luxCondition: !this.state.luxCondition
      })
    }

    if (type === (util.FERTILITY)) {
      this.setState({
        [type]: !this.state[type],
        phCondition: !this.state.phCondition
      })
      console.log(this.state.phCondition)
    }

  }


  // _chartDataGenerator = () =>

  render() { // render chart

    // console.log(this.state)
    let { nickname, name, description, currentHum,
      currentTemp, currentLux, currentFertility } = this.state

    let chartStuff = this._getDataAndOptions()



    return(
      <div className='DetailedPlantPage'>
        <div className='DetailedPlantPage-content'>
          <div className='row'>
            <div className='DetailedPlantPage-info col-large-4 col-medium-4 col-small-12'>
              <h1>{ nickname }</h1>
              <h4>{ name } </h4>
              <h4>{ description }</h4>
              <div className={ this.state[util.HUMIDITY] ? "DetailedPlantPage-info-hum-toggled" : "DetailedPlantPage-info-box" }
                   onClick={ () => {this._toggleDataSet(util.HUMIDITY)} }>
                <FontAwesome className='hum-icon' name='tint' size='3x' style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}/>
                <p>{ currentHum } %</p>
              </div>
              <div
                className={ this.state[util.TEMPERATURE] ? "DetailedPlantPage-info-temp-toggled" : "DetailedPlantPage-info-box" }
                onClick={ () => this._toggleDataSet(util.TEMPERATURE)}>
                <FontAwesome className='temp-icon' name='thermometer-three-quarters' size='3x' style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}/>
                <p>{ currentTemp } &deg;C</p>

              </div>
              <div className={ this.state[util.LUX] ? "DetailedPlantPage-info-lux-toggled" : "DetailedPlantPage-info-box" }
                   onClick={ () => this._toggleDataSet(util.LUX)}>
                <FontAwesome className='lux-icon' name='sun-o' size='3x' style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}/>
                <p>{ currentLux }lux</p>
              </div>
              <div className={ this.state[util.FERTILITY] ? "DetailedPlantPage-info-ph-toggled" : "DetailedPlantPage-info-box" }
                   onClick={ () => this._toggleDataSet(util.FERTILITY)}>
                <FontAwesome className='fertility-icon' name='flask' size='3x' style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}/>
                <p>{ currentFertility } f* </p>
              </div>
            </div>


            { this.state.loading &&
            <div className='DetailedPlantPage-chart col-large-7 col-medium-6 col-small-12'>
              <div className="spinner">
                <div className="bounce1"></div>
                <div className="bounce2"></div>
                <div className="bounce3"></div>
              </div>
            </div>
            }

            { !this.state.loading &&
            <div className='DetailedPlantPage-chart col-large-7 col-medium-6 col-small-12'>
              <Chart data={ chartStuff.data } options={ chartStuff.options }/>
              <div className='DetailedPlantPage-options'>
                <h4 onClick={ () => this.setState({period: 'day'})}> DAY </h4>
                <h4 onClick={ () => this.setState({period: 'week'})}> WEEK </h4>
              </div>
            </div>
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

    let options = util.optionsFactory(activeOptions, data.datasets)
    return { options, data }
  }
}


export const HUMIDITY = 'hum'
export const TEMPERATURE = 'temp'
export const LUX = 'lux'
export const FERTILITY = 'ph'

export const humidityColor1 = 'rgba(17, 35, 120, 0.3)'
export const humidityColor2 = 'rgba(17, 35, 120, 1)'
export const temperatureColor1 = 'rgba(229, 112, 102, 0.3)'
export const temperatureColor2 = 'rgba(229, 112, 102, 1)'
export const luxColor1 = 'rrgba(255, 209, 1, 0.3)'
export const luxColor2 = 'rgba(255, 209, 1, 1)'
export const fertilityColor1 = 'rgba(0, 178, 139, 0.3)'
export const fertilityColor2 = 'rgba(0, 178, 139, 1)'

const colorHashTable = {
  [HUMIDITY]: humidityColor2,
  [TEMPERATURE]: temperatureColor2,
  [LUX]: luxColor2,
  [FERTILITY]: fertilityColor2,
}

const unitHashTable = {
  [HUMIDITY]: "%",
  [TEMPERATURE]: " °C",
  [LUX]: " lx",
  [FERTILITY]: " f*",
}

const yAxisIdHashTable = {
  [HUMIDITY]: 'y-axis-hum',
  [TEMPERATURE]: 'y-axis-temp',
  [LUX]: 'y-axis-lux',
  [FERTILITY]: 'y-axis-ph'
}

const scaleHashTable = {
  [HUMIDITY]: '1',
  [TEMPERATURE]: '1',
  [LUX]: '1000',
  [FERTILITY]: '100'
}


export const dataSetFactory = (type, dataArray) => {
  if (type === HUMIDITY) {
    return {
      label: 'humidity',
      fill: false,
      lineTension: 0.3,
      backgroundColor: humidityColor1,
      borderColor: humidityColor2,
      data: dataArray.map(el => el),
      yAxisID: yAxisIdHashTable[type]
    }
  }
  if (type === TEMPERATURE) {
    return {
      label: 'temperature',
      fill: false,
      lineTension: 0.3,
      backgroundColor: temperatureColor1,
      borderColor: temperatureColor2,
      data: dataArray.map(el => el),
      yAxisID: yAxisIdHashTable[type]
    }
  }
  if (type === LUX) {
    return {
      label: 'Light',
      fill: false,
      lineTension: 0.3,
      backgroundColor: luxColor1,
      borderColor: luxColor2,
      data: dataArray.map(el => el),
      yAxisID: yAxisIdHashTable[type]
    }
  }
  if (type === FERTILITY) {
    return {
      label: 'pH',
      fill: false,
      lineTension: 0.3,
      backgroundColor: fertilityColor1,
      borderColor: fertilityColor2,
      data: dataArray.map(el => el),
      yAxisID: yAxisIdHashTable[type]
    }
  }
}


export function optionsFactory(typesRequestedArray, datasets) {

  const baselineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      display:false
    },
    tooltips: {
      enabled: false
    },
    elements: {
      line: {
        fill: false
      }
    },
    scales: {
      xAxes: [
        {
          display: true,
          gridLines: {
            display: false
          },
          labels: {
            show: true
          }
        }
      ],
      yAxes: []
    }
  }

  const yAxisBaseline = {
    type: 'linear',
    gridLines: {
      display: false
    },
    labels: {
      show: true
    }
  }

  let yAxesArray = typesRequestedArray.map((type, i) => {
    let minValue = Math.min(...datasets[i].data.filter(x=>x))
    let yAxisPerculiarToType = {
      position: i % 2===0 ? 'left' : 'right',
      id: yAxisIdHashTable[type],
      ticks:{
        fontColor: colorHashTable[type],
        stepSize: minValue - minValue*10,
        suggestedMin: minValue - minValue/4,
        maxTicksLimit: 10,
        callback: (value) => parseFloat(value.toFixed(2))+unitHashTable[type]
      }
    }
    return Object.assign({}, yAxisBaseline, yAxisPerculiarToType)
  })

  // console.log(yAxesArray)

  baselineOptions.scales.yAxes = yAxesArray

  return baselineOptions
}

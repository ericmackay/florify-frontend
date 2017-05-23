import React, {Component} from 'react';
import {Line} from 'react-chartjs-2';

export default class Chart extends Component {
  render() {
    return (
      <div style={{maxHeight: '400px'}}>
        <Line
          redraw
          data={this.props.data}
          width={400}
          height={400}
          options={this.props.options}
        />
      </div>
    )
  }
}

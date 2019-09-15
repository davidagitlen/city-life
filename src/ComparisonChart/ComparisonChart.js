import React, { Component } from 'react';
import Chart from 'chart.js';
import { connect } from 'react-redux';
import './ComparisonChart.scss';
let myLineChart; 

class ComparisonChart extends Component{
  chartRef = React.createRef();

  componentDidMount() {
    this.createChart();
  }

  componentDidUpdate() {
    this.createChart();
  }

  createChart = () => {
    const currentChartRef = this.chartRef.current.getContext('2d');

    myLineChart = new Chart(currentChartRef, {
      type: 'line',
      data: {
        labels: this.props.data.cityOneData.map(datum => datum.name),
        datasets: [
          {
            label: 'Testing Chart City One',
            data: this.props.data.cityOneData.map(datum => datum.score_out_of_10.toFixed(2)),
            fill: false,
            backgroundColor: this.props.data.cityOneData.map(datum => 'rgba(0, 0, 255)'),
            borderColor: this.props.data.cityOneData.map(datum => 'rgba(255, 0, 0)'),
            borderWidth: 1,
            yAxisId: 'Testing One'
          },
          {
            type: 'line',
            label: 'Testing Chart City Two',
            data: this.props.data.cityTwoData.map(datum => datum.score_out_of_10.toFixed(2)),
            fill: false,
            backgroundColor: this.props.data.cityTwoData.map(datum => 'rgba(0, 255, 0)'),
            borderColor: this.props.data.cityTwoData.map(datum => 'rgba(0, 255, 0)'),
            yAxisID: 'Testing Two',
            borderWidth: 1.5
          },
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
            id: 'Testing One',
            ticks: {
              beginAtZero: true,
            },
            scaleLabel: {
              display: true,
              labelString: 'One'
            }
          },
          {
            id: 'Testing Two',
            position: 'right',
            ticks: {
              beginAtZero: true,
            },
            scaleLabel: {
              display: true,
              labelString: 'Two'
            }
          },
          ]
        }
      }
    });
  }

  render() {
    console.log('in comparisonChart', this.props)
    return(
        <div className='ComparisonChart'>
          <canvas
            id="myChart"
            ref={this.chartRef}
          />
        </div>
    )
  }

}

export default ComparisonChart;
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
    const { data, cityOneName, cityTwoName } = this.props;
    // const { cityOneName } = this.props;
    // const { cityTwoname } = this.props;

    const currentChartRef = this.chartRef.current.getContext('2d');

    myLineChart = new Chart(currentChartRef, {
      type: 'line',
      data: {
        labels: data.cityOneData.map(datum => datum.name),
        datasets: [
          {
            label: cityOneName,
            data: data.cityOneData.map(datum => datum.score_out_of_10.toFixed(2)),
            fill: false,
            backgroundColor: data.cityOneData.map(datum => 'rgba(0, 0, 255)'),
            borderColor: data.cityOneData.map(datum => 'rgba(255, 0, 0)'),
            borderWidth: 1,
            yAxisId: 'Testing One'
          },
          {
            type: 'line',
            label: cityTwoName,
            data: data.cityTwoData.map(datum => datum.score_out_of_10.toFixed(2)),
            fill: false,
            backgroundColor: data.cityTwoData.map(datum => 'rgba(0, 255, 0)'),
            borderColor: data.cityTwoData.map(datum => 'rgba(0, 255, 0)'),
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
          }
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
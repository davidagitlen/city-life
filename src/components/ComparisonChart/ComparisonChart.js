import React, { Component } from 'react';
import Chart from 'chart.js';
import './ComparisonChart.scss';

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
    const currentChartRef = this.chartRef.current.getContext('2d');

    new Chart(currentChartRef, {
      type: 'line',
      data: {
        labels: data.cityOneData.map(datum => datum.name),
        datasets: [
          {
            label: cityOneName,
            data: data.cityOneData.map(datum => datum.score_out_of_10.toFixed(2)),
            fill: false,
            backgroundColor: data.cityOneData.map(datum => '#2E2EC9'),
            borderColor: data.cityOneData.map(datum => '#2E2EC9'),
            borderWidth: 1
          },
          {
            type: 'line',
            label: cityTwoName,
            data: data.cityTwoData.map(datum => datum.score_out_of_10.toFixed(2)),
            fill: false,
            backgroundColor: data.cityTwoData.map(datum => '#6DECAF'),
            borderColor: data.cityTwoData.map(datum => '#6DECAF'),
            borderWidth: 1.5
          },
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              suggestedMax: 10,
            },
            gridLines: {
              display: true,
              drawBorder: false
            },
            scaleLabel: {
              display: true,
              labelString: 'Score'
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
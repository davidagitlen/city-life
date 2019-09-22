import React, { Component } from 'react';
import './ComparisonChart.scss';
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';


class ComparisonChart extends Component{
  constructor (props) {
    super();
    this.chartReference = {};
  }

  componentDidUpdate() {
    this.chartReference.chartInstance.update();
  }

  getChartStuff = () => {
    const { data, cityOneName, cityTwoName } = this.props;
    
    const chartData = {
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
        ],
      };
      const chartOptions = {
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
      };
      
      return { chartData, chartOptions };
  }

  render() {
    const chartStuff = this.getChartStuff();
    return(
        <div className='ComparisonChart'>
          <Line
            ref={(reference) => this.chartReference = reference}
            data={chartStuff.chartData}
            options={chartStuff.chartOptions}
          />
        </div>
    )
  }
}

export default ComparisonChart;

ComparisonChart.propTypes = {
  cityOneName: PropTypes.string,
  cityTwoName: PropTypes.string,
  data: PropTypes.object
}
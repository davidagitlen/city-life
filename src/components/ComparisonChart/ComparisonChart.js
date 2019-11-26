import React, { Component } from 'react';
import './ComparisonChart.scss';
import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';


class ComparisonChart extends Component{
  constructor (props) {
    super();
    this.chartReference = {};
    this.myChartDataMap = [
      { chart: 'cityOneData', borderColor: '#2E2EC9', borderWidth: 1 },
      { chart: 'cityTwoData', borderColor: '#6DECAF', borderWidth: 1.5 }
    ];
  }

  componentDidUpdate() {
    this.chartReference.chartInstance.update();
  }

  getChartStuff = () => {
    const { data, cityNames, chartIndex } = this.props;
    const titles = ['Economy', 'Health & Safety', 'Culture', 'Infrastructure'];
    const chartData = {
        labels: data.cityOneData.map(datum => datum.name),
        datasets: this.myChartDataMap.map(({ chart, borderColor, borderWidth }, index) => ({
            type: 'bar',
            label: cityNames[index],
            data: data[chart].map(datum => datum.score_out_of_10.toFixed(2)),
            fill: false,
            backgroundColor: data[chart].map(() => borderColor),
            borderColor: data.cityOneData.map(() => borderColor),
            borderWidth
          })),
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
        },
        title: {
          display: true,
          text: titles[chartIndex]
        }
      };
      return { chartData, chartOptions };
  }

  render() {
    const chartStuff = this.getChartStuff();
    return(
        <div className='ComparisonChart'>
          <Bar
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
  cityNames: PropTypes.array,
  data: PropTypes.object
}
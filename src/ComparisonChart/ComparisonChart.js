import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ComparisonChart.scss';

class ComparisonChart extends Component{
  chartRef = React.createRef();
  // constructor(){
  //   super();

  // }

  componentDidMount() {
    const currentChartRef = this.chartRef.current.getContext('2d');

    // new Chart(currentChartRef, {
    //   type: 'bar',
    //   data: {
    //     labels: currentSleepUser.sleepPropertyOneWeek('2019/09/16', '2019/09/22', 'hoursSlept').map(day => day[0].slice(5)),
    //     datasets: [
    //       {
    //         label: 'Last Week\'s Hours of Sleep',
    //         data: currentSleepUser.sleepPropertyOneWeek('2019/09/16', '2019/09/22', 'hoursSlept').map(day => day[1]),
    //         backgroundColor: [
    //           'rgba(148, 0, 211, .25)',
    //           'rgba(148, 0, 211, .25)',
    //           'rgba(148, 0, 211, .25)',
    //           'rgba(148, 0, 211, .25)',
    //           'rgba(148, 0, 211, .25)',
    //           'rgba(148, 0, 211, .25)',
    //           'rgba(148, 0, 211, .25)',
    //         ],
    //         borderColor: [
    //           'rgba(128, 0, 128, 1)',
    //           'rgba(128, 0, 128, 1)',
    //           'rgba(128, 0, 128, 1)',
    //           'rgba(128, 0, 128, 1)',
    //           'rgba(128, 0, 128, 1)',
    //           'rgba(128, 0, 128, 1)',
    //           'rgba(128, 0, 128, 1)',
    //         ],
    //         borderWidth: 1,
    //         yAxisId: 'Sleep Hours'
    //       },
    //       {
    //         type: 'line',
    //         label: '  Last Week\'s Sleep Quality',
    //         data: currentSleepUser.sleepPropertyOneWeek('2019/09/16', '2019/09/22', 'sleepQuality').map(day => day[1]),
    //         backgroundColor: 'rgba(0, 0, 0, 0)',
    //         borderColor: 'rgba(128, 0, 128, 1)',
    //         yAxisID: 'Sleep Quality',
    //         borderWidth: 1.5
    //       },
    //     ]
    //   },
    //   options: {
    //     responsive: false,
    //     scales: {
    //       yAxes: [{
    //         id: 'Sleep Hours',
    //         ticks: {
    //           beginAtZero: true,
    //         },
    //         scaleLabel: {
    //           display: true,
    //           labelString: 'Hours'
    //         }
    //       },
    //       {
    //         id: 'Sleep Quality',
    //         position: 'right',
    //         ticks: {
    //           beginAtZero: true,
    //         },
    //         scaleLabel: {
    //           display: true,
    //           labelString: 'Sleep Quality'
    //         }
    //       },
    //       ]
    //     }
    //   }
    // });

  }

  render() {
    console.log(this.props)
    return(
      <>
      </>
    )
  }

}



export default ComparisonChart;
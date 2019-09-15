import React from 'react';
import './Comparison.scss';
import ComparisonChart from '../ComparisonChart/ComparisonChart';
import { connect } from 'react-redux';




const Comparison = (props) => {
  console.log('in comparison', props)
  const { cityInfo } = props;
  const cityOneReady = cityInfo.one.scores.length && cityInfo.one.details && cityInfo.one.images.images;
  const cityTwoReady = cityInfo.two.scores.length && cityInfo.two.details && cityInfo.two.images.images;

  const formatChartData = (arrayOne, arrayTwo, indexes) => ({
    cityOneData: indexes.map(index => arrayOne[index]),
    cityTwoData: indexes.map(index => arrayTwo[index]),
  });

  const cityOneScores = props.cityInfo.one.scores;
  const cityTwoScores = props.cityInfo.two.scores; 
  const economicData = formatChartData(cityOneScores, cityTwoScores, [0,1,2,3,6,11,12]);
  const healthAndSafetyData = formatChartData(cityOneScores, cityTwoScores, [7,8,10,16]);
  const culturalData = formatChartData(cityOneScores, cityTwoScores, [9,14,15]);
  const infrastructureData = formatChartData(cityOneScores, cityTwoScores, [4,5,13]);

  return(
    <div className='Comparison'>
      {!cityOneReady || !cityTwoReady && <p>Select Two Cities to Compare from the Form on the Left!</p>}
      {cityOneReady && cityTwoReady && <ComparisonChart data={economicData} />}
      {cityOneReady && cityTwoReady && <ComparisonChart data={healthAndSafetyData} />}
      {cityOneReady && cityTwoReady && <ComparisonChart data={culturalData} />}
      {cityOneReady && cityTwoReady && <ComparisonChart data={infrastructureData} />}
    </div>
  )
}

export const mapStateToProps = state => ({
  cityInfo: state.cityInfo
})

export default connect(mapStateToProps)(Comparison);
import React from 'react';
import './Comparison.scss';
import ComparisonChart from '../../components/ComparisonChart/ComparisonChart';
import { connect } from 'react-redux';
import { formatChartData } from '../../util/dataCleaner';

export const Comparison = (props) => {
  const { cityInfo } = props;
  const cityOneReady = cityInfo.one.scores.length && cityInfo.one.details && cityInfo.one.images.images;
  const cityTwoReady = cityInfo.two.scores.length && cityInfo.two.details && cityInfo.two.images.images;
  const cityOneName = cityOneReady ? cityInfo.one.details.fullName.split(',')[0] : null;
  const cityTwoName = cityTwoReady ? cityInfo.two.details.fullName.split(',')[0] : null;

  const cityOneScores = cityInfo.one.scores;
  const cityTwoScores = cityInfo.two.scores; 
  const economicData = formatChartData(cityOneScores, cityTwoScores, [0,1,2,3,6,11,12]);
  const healthAndSafetyData = formatChartData(cityOneScores, cityTwoScores, [7,8,10,16]);
  const culturalData = formatChartData(cityOneScores, cityTwoScores, [9,14,15]);
  const infrastructureData = formatChartData(cityOneScores, cityTwoScores, [4,5,13]);

  return(
    <div className='Comparison'>
      {(!cityOneReady || !cityTwoReady) && 
      <div name='instructions'>
      <p>Select two cities to from the form on the left to see a comparison of their quality of life data.</p>
      </div>}
      {(cityOneReady || null) && (cityTwoReady || null) && <ComparisonChart data={economicData} cityOneName={cityOneName} cityTwoName={cityTwoName}/>}
      {(cityOneReady || null) && (cityTwoReady || null) && <ComparisonChart data={healthAndSafetyData} cityOneName={cityOneName} cityTwoName={cityTwoName}/>}
      {(cityOneReady || null) && (cityTwoReady || null) && <ComparisonChart data={culturalData} cityOneName={cityOneName} cityTwoName={cityTwoName}/>}
      {(cityOneReady || null) && (cityTwoReady || null) && <ComparisonChart data={infrastructureData} cityOneName={cityOneName} cityTwoName={cityTwoName}/>}
    </div>
  )
}

export const mapStateToProps = state => ({
  cityInfo: state.cityInfo
})

export default connect(mapStateToProps)(Comparison);
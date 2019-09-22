import React from 'react';
import './Comparison.scss';
import ComparisonChart from '../../components/ComparisonChart/ComparisonChart';
import { connect } from 'react-redux';
import { formatChartData } from '../../util/dataCleaner';
import PropTypes from 'prop-types';

export const Comparison = (props) => {
  console.log(props)
  const { cityInfo: { one, two } } = props;
  const {
    scores: scoresOne, 
    images: imagesOne,
    details: detailsOne,
  } = one;
  const {
    scores: scoresTwo, 
    images: imagesTwo, 
    details: detailsTwo,
  } = two;
  const { fullName: fullNameOne } = detailsOne;
  const { fullName: fullNameTwo } = detailsTwo;

  const cityOneReady = (scoresOne.length > 0) && detailsOne && !!imagesOne.images && (fullNameOne.length > 0);
  const cityTwoReady = (scoresTwo.length > 0) && detailsTwo && !!imagesTwo.images && (fullNameTwo.length > 0);  
  
  const cityOneName = cityOneReady ? fullNameOne.split(',')[0] : null;
  const cityTwoName = cityTwoReady ? fullNameTwo.split(',')[0] : null;

  const cityOneScores = scoresOne;
  const cityTwoScores = scoresTwo; 
  const isReadyToDisplay = !!((cityOneReady || null) && (cityTwoReady || null));
  
  const chartCategoryMap = {
    economicIndexes: [0, 1, 2, 3, 6, 11, 12],
    healthAndSafetyIndexes: [7, 8, 10, 16],
    culturalIndexes: [9, 14, 15],
    infrastructureIndexes: [4, 5, 13]
  };

  const chartCategories = Object.keys(chartCategoryMap);

  const chartList = chartCategories.map(category => formatChartData(cityOneScores, cityTwoScores, chartCategoryMap[category]));

  return(
    <div className='Comparison'>
      {(!cityOneReady || !cityTwoReady) && 
      <div className='instructions'>
      <p>Select two cities to from the form on the left to see a comparison of their quality of life data.</p>
      </div>}
      {
        isReadyToDisplay &&
        <div className="comparison-chart__container">
          {
            chartList.map(chart =>  
              <ComparisonChart 
                data={chart}
                key={Math.random(1)}
                cityOneName={cityOneName}
                cityTwoName={cityTwoName}
              />)
            }
      </div>
      }
    </div>
  )
}

export const mapStateToProps = state => ({
  cityInfo: state.cityInfo
})

export default connect(mapStateToProps)(Comparison);

Comparison.propTypes = {
  cityInfo: PropTypes.object,
  dispatch: PropTypes.func
}
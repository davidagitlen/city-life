import React from 'react';
import './Comparison.scss';
import ComparisonChart from '../../components/ComparisonChart/ComparisonChart';
import { connect } from 'react-redux';
import { formatChartData } from '../../util/dataCleaner';
import PropTypes from 'prop-types';

export const Comparison = (props) => {
  const { cityInfoReducer: cityInfo } = props;
  const { inFlightScores, inFlightDetails, inFlightImages, details, scores } = cityInfo;
  const cityNames = details.map(detail => detail.fullName.split(',')[0]);
  const isReady = !(inFlightScores.includes(true) || inFlightDetails.includes(true) ||inFlightImages.includes(true));
  const chartCategoryMap = {
    economicIndexes: [0, 1, 2, 3, 6, 11, 12],
    healthAndSafetyIndexes: [7, 8, 10, 16],
    culturalIndexes: [9, 14, 15],
    infrastructureIndexes: [4, 5, 13]
  };

  const chartCategories = Object.keys(chartCategoryMap);
  const chartList = chartCategories.map(category => formatChartData(...scores, chartCategoryMap[category]));

  return(
    <div className='Comparison'>
      {
        !isReady ?
        <div className='instructions'>
          <p>
            Select two cities to from the form on the left to see a comparison of their quality of life data.
          </p>
        </div> :
        <div className="comparison-chart__container">
          {
            chartList.map(chart =>
              <ComparisonChart
                data={chart}
                key={Math.random(1)}
                cityNames={cityNames}
              />)
          }
      </div>
      }
    </div>
  )
}

export const mapStateToProps = state => ({
  ...state
});

export default connect(mapStateToProps)(Comparison);

Comparison.propTypes = {
  scores: PropTypes.array,
  details: PropTypes.array,
  images: PropTypes.array,
  inFlightScores: PropTypes.array,
  inFlightDetails: PropTypes.array,
  inFlightImages: PropTypes.array,
  dispatch: PropTypes.func
}
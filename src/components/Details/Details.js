import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import './Details.scss';
import { Link } from 'react-router-dom';
import { convertFromString } from '../../util/dataCleaner';
import PropTypes from 'prop-types';

const Details = (props) => {
  const { index, cityData } = props;
  const {
    latitude, longitude, population, fullName, timeZone
  } = cityData.details[index];
  const { attribution, images } = cityData.images[index];
  const { summary } = cityData.description[index];
  const cleanTimeZone = timeZone.replace(/_/g, ' ');

  const mapURL = `https://api.mapbox.com/styles/v1/mapbox/light-v9/static/${longitude},${latitude},6,0,0/350x300?access_token=pk.eyJ1IjoiZGF2aWRhZ2l0bGVuIiwiYSI6ImNrMGs5NTNlcTA0dGkzY3MzdHZ3MTRiZGoifQ.ZtBWtklc66DFIgPC2CI_qg`;
  const titleAttribution = `Photo by ${attribution.photographer}, from ${attribution.site}. Original can be found at ${attribution.source}.`
  console.log('in Details, props: ', props)

  return(
    <div className='Details'>
      <Link to={`/`} className='back-btn'>◀ back</Link>
      <div className='Details-image'>
        <img src={images.web} alt={`${fullName}`} title={titleAttribution} />
      </div>
      <div className='Details-description'>
        <div className='description-left'>
          {ReactHtmlParser(summary)}
          <p>{fullName}</p>
          <p><span>Population :</span> {population}</p>
          <p><span>Time Zone :</span> {cleanTimeZone}</p>
        </div>
        <div className='description-right'>
          <img src={mapURL} alt='' />
        </div>
      </div>
    </div>
  )
}

export default Details;

Details.propTypes = {
  cityData: PropTypes.object,
  index: PropTypes.number
}
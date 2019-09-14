import React from 'react';
import './City.scss';
import { connect } from 'react-redux';

export const City = (props) => {
  const { ordinal } = props;
  const { population, latitude, longitude, fullName, timeZone } = props.cityInfo[ordinal].details;
  const { web } = props.cityInfo[ordinal].images.images;
  // console.log(props.cityInfo[ordinal].images.images)
  // console.log(mobile)

  return(
    <div className='City'>
    <img src={web} alt=''/>
    <p>{fullName}</p>
    <p><span>Population : </span>{population}</p>
    <p><span>Time Zone : </span>{timeZone}</p>
    </div>
  )
}

export const mapStateToProps = state => ({
  cityInfo: state.cityInfo
})

export default connect(mapStateToProps)(City);
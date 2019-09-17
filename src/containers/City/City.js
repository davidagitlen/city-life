import React from 'react';
import './City.scss';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export const City = (props) => {
  const { ordinal } = props;
  const { fullName } = props.cityInfo[ordinal].details;
  const { web } = props.cityInfo[ordinal].images.images;
  const linkName = fullName ? fullName.split(',')[0] : null;
  return(
    <div className='City'>
      <Link to={`details/${linkName}`} className='link'>
        <div>
          <img id='circle' src={web} alt=''/>
        </div>
        <p>{fullName}</p>
      </Link>
    </div>
  )
}

export const mapStateToProps = state => ({
  cityInfo: state.cityInfo
})

export default connect(mapStateToProps)(City);

City.propTypes = {
  cityInfo: PropTypes.object,
  dispatch: PropTypes.func,
  ordinal: PropTypes.string
}
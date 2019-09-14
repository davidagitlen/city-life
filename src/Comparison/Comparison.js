import React from 'react';
import './Comparison.scss';
import { connect } from 'react-redux';


const Comparison = (props) => {
  console.log(props)
  return(
    <div className='Comparison'>
      <img src='' alt=''/>
      <p><span>Full Name:</span></p>
      <p><span>Population:</span></p>
      <p><span>Time Zone:</span></p>
    </div>
  )
}

export const mapStateToProps = state => ({
  cityInfo: state.cityInfo
})

export default connect(mapStateToProps)(Comparison);
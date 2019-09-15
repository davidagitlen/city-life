import React, { Component } from 'react';
import './Details.scss';

class Details extends Component{

  render() {
    console.log('in Details', this.props.props);
    const {country, population, latitude, longitude, fullName, timeZone} = this.props.props.details;
    const {attribution, images} = this.props.props.images;
    return(
      <>
        <div>
          <img src={images.web} alt={`${country}`} />
        </div>
        <section>
          <div>
            <p>{fullName}</p>
            <p><span>Population :</span> {population}</p>
            <p><span>Time Zone :</span> {timeZone}</p>
          </div>
          <div>
            <p>Map?</p>
          </div>
        </section>
      </>
    )
  }
}

export default Details;
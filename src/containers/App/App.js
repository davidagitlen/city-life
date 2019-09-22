import React from 'react';
import './App.scss';
import citySkyline from '../../images/city-skyline.svg';
import CityForm from '../CityForm/CityForm';
import City from '../City/City';
import Comparison from '../Comparison/Comparison';
import Details from '../../components/Details/Details';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { NavLink, Route } from 'react-router-dom';

export const App = (props) => {
  const { cityInfoReducer: cityData } = props;

  const { inFlightScores, inFlightDetails, inFlightImages, details, scores } = cityData;
  // const cityNames = details.map(detail => detail.fullName);

  const isReady = !(inFlightScores || inFlightDetails || inFlightImages);
  
    // const { cityInfo: { one = {}, two = {} } } = props;
    // const { scores: scoresOne = [], images: imagesOne = {}, } = one;
    // const { scores: scoresTwo = [] } = two;
    // const { images: imagesTwo = [] } = two;
    // const cityOneReady = (scoresOne.length > 0) && one.details && imagesOne.images;
    // const cityTwoReady = (scoresTwo.length > 0) && two.details && imagesTwo.images;

    return (
      <div className='App'>
        <header className='App-header'>
          <div className='site-name'>
            <h1>City<span>Life</span></h1>
          </div>
          <div className='nav-links'>
            <NavLink to='/' className='nav'>Compare Cities</NavLink>
            <NavLink to='/past-comparisons' className='nav'>History</NavLink>
            <NavLink to='/world-map' className='nav'>Map</NavLink>
          </div>
        </header>
        <main>
        <Route exact path='/' render={() => {
          return(
            <>
              <div className='forms'>
                <div className='city-one'>
                  <CityForm ordinal={0} />
                  {
                    !isReady && 
                    <div className='placeholder'>
                      <img 
                        id='circle' 
                        src={citySkyline} 
                        alt=''
                      />
                    </div>
                  }
                  {
                    (isReady) && 
                    <City ordinal={0} />
                  }
                </div>
                <div className='city-two'>
                  <CityForm ordinal={1} />
                  {
                    !isReady && 
                    <div className='placeholder'>
                      <img 
                        id='circle' 
                        src={citySkyline} 
                        alt='' />
                    </div>
                  }
                  {
                    (isReady) && 
                    <City ordinal={1} />
                  }
                </div>
              </div>
              {/* <Comparison /> */}
            </>
          )
        }} />
        <Route path='/details/:name' render={({ match }) => {
          const { name } = match.params;
          if (isReady) {
            console.log('in the route, baa: ', cityData, name)
            const indexINeed = cityData.details.findIndex(thing => thing.fullName.split(',').includes(name));
            return <Details cityData={cityData} index={indexINeed}/>
          }
          return null;
          // find index of cityData that has this name from the params, and use that index to pass the correct data to details

        }}
        />
        </main>
      </div>
    );
}

export const mapStateToProps = state => ({
  ...state
})

export default connect(mapStateToProps)(App);

App.propTypes = {
  cityInfo: PropTypes.object,
  dispatch: PropTypes.func
}
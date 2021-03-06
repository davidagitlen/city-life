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
  const {
    inFlightScores, 
    inFlightDetails, 
    inFlightImages
  } = cityData;
  const isReady = !(inFlightScores.includes(true) || inFlightDetails.includes(true) || inFlightImages.includes(true));
  const findSelectedIndex = (dataSet, matchString) => (
    dataSet.details.findIndex(thing => thing.fullName.split(',').includes(matchString)));
  const formSet = [
    { ordinal: 0, selectedClass: 'city-one' },
    { ordinal: 1, selectedClass: 'city-two' }
  ];

  return (
    <div className='App'>
      <header className='App-header'>
        <div className='site-name'>
          <h1>City<span>Life</span></h1>
        </div>
        <div className='nav-links'>
          <div>
            <NavLink to='/' className='nav'>Compare Cities</NavLink>
          </div>
          <div>
            <NavLink to='/past-comparisons' className='nav'>History</NavLink>
          </div>
          <div>
            <NavLink to='/world-map' className='nav'>Map</NavLink>
          </div>
        </div>
      </header>
      <main>
      <Route exact path='/' render={() => {
        return(
          <>
            <div className='forms'>
              {
                formSet.map(({ ordinal, selectedClass }) => (
                <div 
                  className={selectedClass}
                  key={selectedClass}
                  >
                <CityForm ordinal={ordinal}/>
                {
                  inFlightImages[ordinal] ?
                  <div className='placeholder'>
                    <img
                      id='circle'
                      src={citySkyline}
                      alt=''
                    />
                  </div> :
                  <City ordinal={ordinal} />
                }
              </div>
              ))
              }
            </div>
            <Comparison />
          </>
        )
      }} />
      <Route
        path='/details/:name'
        render={({ match }) => {
            const { name } = match.params;
            if (isReady) {
              const selectedIndex = findSelectedIndex(cityData, name);
              return <Details cityData={cityData} index={selectedIndex}/>
            }
            return null;
          }}
      />
      <Route
        path='/past-comparisons'
        render={() => (
          <div className='under-construction'>
            <p>
              Under Construction! Please check back later.
            </p>
          </div>
          )
        }
      />
      <Route
        path='/world-map'
          render={() => (
            <div className='under-construction'>
              <p>
                Under Construction! Please check back later.
              </p>
            </div>
          )
        }
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
import React from 'react';
import './App.scss';
import citySkyline from '../images/city-skyline.svg';
import CityForm from '../CityForm/CityForm';
import City from '../City/City';
import Comparison from '../Comparison/Comparison';
import Details from '../Details/Details';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import { NavLink, Route } from 'react-router-dom';


export const App = (props) => {
    console.log('in app', props)
    const { cityInfo } = props;
    const cityOneReady = cityInfo.one.scores.length && cityInfo.one.details && cityInfo.one.images.images;
    const cityTwoReady = cityInfo.two.scores.length && cityInfo.two.details && cityInfo.two.images.images;
    return (
      <div className='App'>
        <header className='App-header'>
          <div className='site-name'>
            <img src={citySkyline} alt='' />
            <h1>City<span>Life</span></h1>
          </div>
          <div className='nav-links'>
            <NavLink to='/' className='nav'>Compare Cities</NavLink>
            <NavLink to='/past-comparisons'>History</NavLink>
            <NavLink to='/world-map'>Map</NavLink>
          </div>
        </header>
        <main>
        <Route exact path='/' render={() => {
          return(
            <>
              <div className='forms'>
                <div className='city-one'>
                  <CityForm ordinal='one' />
                  {(cityOneReady || null) && <City ordinal='one' />}
                </div>
                <div className='city-two'>
                  <CityForm ordinal='two' />
                  {(cityTwoReady || null) && <City ordinal='two' />}
                </div>
              </div>
              <Comparison />
            </>
          )
        }} />
        <Route path='/details/:name' render={({ match }) => {
          const { name } =match.params;
          const awaitData = cityOneReady || cityTwoReady; 
          const cityCheck = awaitData ?cityInfo.one.details.fullName.includes(name) : null;
          const cityProps = cityCheck ? cityInfo.one : cityInfo.two;
          return <Details props={cityProps}/>
        }}
        />
        </main>
        {/* <Route exact path='/past-comparisons' render={() => {
          return(
            <main>
              <div>
                <Details />
              </div>
            </main>
          )
        }} /> */}
      </div>
    );
}

export const mapStateToProps = state => ({
  cityInfo: state.cityInfo
})

export default connect(mapStateToProps)(App);

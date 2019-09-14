import React, { Component } from 'react';
import './App.scss';
import CityForm from '../CityForm/CityForm';
import City from '../City/City';
import Comparison from '../Comparison/Comparison';
// import Details from '../Details/Details';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import { NavLink, Route } from 'react-router-dom';


export const App = (props) => {
    console.log('in app', props)
    const { cityInfo } = props;
    const cityOne = cityInfo.one.scores.length;
    const cityTwo = cityInfo.two.scores.length;
    return (
      <div className="App">
        <header className="App-header">
          <h1>CityLife</h1>
          <NavLink to='/' className='nav'>Compare Cities</NavLink>
          <NavLink to='/past-comparisons'>History</NavLink>
          <NavLink to='/world-map'>Map</NavLink>
        </header>
        <main>
        <Route exact path='/' render={() => {
          return(
            <>
              <div className='city-left'>
                <CityForm ordinal='one' />
              </div>
              <Comparison />
              <div className='city-right'>
                <CityForm ordinal='two' />
              </div>
            </>
          )
        }} />
        </main>
        {(cityOne || null) && <div>Hello One!</div>}
        {(cityTwo || null) && <div>Hello Two!</div>}
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

import React, { Component } from 'react';
import './App.scss';
import City from '../CityForm/CityForm';
import Comparison from '../Comparison/Comparison';
// import Details from '../Details/Details';
// import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { NavLink, Route } from 'react-router-dom';


class App extends Component{
  // constructor() {
  //   super()
  //   this.state = {
  //   }
  // };

  render() {
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
                <City ordinal='one' />
              </div>
              <Comparison />
              <div className='city-right'>
                <City ordinal='two' />
              </div>
            </>
          )
        }} />
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
}

export default App;

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
    const { cityInfo: { one = {}, two = {} } } = props;
    const { scores: scoresOne = [], images: imagesOne = {}, } = one;
    const { scores: scoresTwo = [] } = two;
    const { images: imagesTwo = [] } = two;
    const cityOneReady = (scoresOne.length > 0) && one.details && imagesOne.images;
    const cityTwoReady = (scoresTwo.length > 0) && two.details && imagesTwo.images;

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
                    !cityOneReady && 
                    <div className='placeholder'>
                      <img 
                        id='circle' 
                        src={citySkyline} 
                        alt=''
                      />
                    </div>
                  }
                  {
                    (cityOneReady || null) && 
                    <City ordinal={0} />
                  }
                </div>
                <div className='city-two'>
                  <CityForm ordinal={1} />
                  {
                    !cityTwoReady && 
                    <div className='placeholder'>
                      <img 
                        id='circle' 
                        src={citySkyline} 
                        alt='' />
                    </div>
                  }
                  {
                    (cityTwoReady || null) && 
                    <City ordinal={1} />
                  }
                </div>
              </div>
              <Comparison />
            </>
          )
        }} />
        <Route path='/details/:name' render={({ match }) => {
          const { name } =match.params;
          const awaitData = cityOneReady || cityTwoReady; 
          const cityCheck = awaitData ? one.details.fullName.includes(name) : null;
          const cityProps = cityCheck ? one : two;
          return <Details cityData={cityProps}/>
        }}
        />
        </main>
      </div>
    );
}

export const mapStateToProps = state => ({
  cityInfo: state.cityInfo
})

export default connect(mapStateToProps)(App);

App.propTypes = {
  cityInfo: PropTypes.object,
  dispatch: PropTypes.func
}
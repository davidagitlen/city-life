import React, { Component } from 'react';
import './City.scss';
import { fetchUrbanAreas, fetchCityData } from '../util/apiCalls';

class City extends Component{
  constructor(){
    super();
    this.state = {
      city : '',
      cities : [],
      error : ''
    };
  }

  componentDidMount = async () => {
    try {
      const urbanAreas = await fetchUrbanAreas();
      const urbanAreasNames = urbanAreas._links['ua:item'];
      this.setState({cities: urbanAreasNames});
    } catch ({ message }) {
      console.log(message);
    }
  }

  handleCitySelection = e => {
    this.setState({[e.target.name]:e.target.value})
  }

  handleSubmitCity = async (e) => {
    e.preventDefault();
    try {
      const city = await fetchCityData(`https://api.teleport.org/api/urban_areas/slug:${this.state.city.toLowerCase()}/`);
      const cityScores = city.categories;
      console.log(cityScores)
    } catch ({ message }) {
      console.log(message)
    }
  }
  
  render() {
    console.log(this.props)
    const cities = this.state.cities;
    const cityNames = cities.length ? cities.map(city => <option key={city.name} value={city.name} />) : null;

    return(
      <div>
        <form>
          <input 
            list='city-selection'
            name='city'
            type='text' 
            value={this.state.city}
            onChange={this.handleCitySelection}
            placeholder='Select a City'
            />
          <datalist id='city-selection'>
            {cityNames}
          </datalist>
          <button type='submit' onClick={this.handleSubmitCity}></button>
        </form>
      </div>
    )
  }
}

export default City;
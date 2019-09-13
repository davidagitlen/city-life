import React, { Component } from 'react';
import './City.scss';
import { fetchUrbanAreas, fetchCityScores, fetchAdditionalData } from '../util/apiCalls';

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
      this.setState({cities: urbanAreasNames}, () => {console.log(urbanAreasNames)});
    } catch ({ message }) {
      this.setState({error : message}, () => {console.error(message)});
    }
  }

  handleCitySelection = e => {
    this.setState({[e.target.name]:e.target.value})
  }

  handleSubmitCity = async (e) => {
    e.preventDefault();
    this.getCityScores();
    this.getAdditionalCityData();
    // const citySnippet = this.state.city.toLowerCase().replace(/,|\./, '').replace(' ', '-');
    // try {
    //   const city = await fetchCityScores(`https://api.teleport.org/api/urban_areas/slug:${citySnippet}/`);
    //   const cityScores = city.categories;
    //   console.log(cityScores);
    // } catch ({ message }) {
    //   this.setState({error: message}, () => {console.error(message)});
    // }
  }

  getCityScores = async () => {
    console.log(this.state.city.toLowerCase())
    const citySnippet = this.state.city.toLowerCase().replace(/,|\./g, '').replace(/\s/g, '-');
    try {
      const city = await fetchCityScores(`https://api.teleport.org/api/urban_areas/slug:${citySnippet}/`);
      const cityScores = city.categories;
      console.log(cityScores);
    } catch ({ message }) {
      this.setState({ error: message }, () => { console.error(message) });
    }
  }

  getAdditionalCityData = async () => {
    const originalName = this.state.city;
    const cityName = this.formatCityName(this.state.city).replace(/,|\./, '')
    try {
      const city = await fetchAdditionalData(cityName, originalName);
      console.log('in getAdditionalCityData', cityName, city)
    } catch ({ message }) {
      this.setState({ error: message}, () => {console.error(message)});
    }
  }

  formatCityName = (name) => {
    switch(name) {
      case 'San Francisco Bay Area' :
        return 'San Francisco';
      case 'Portland, ME' :
        return 'Portland';
      case 'Portland, OR' :
        return 'Portland';
      case 'Birmingham, AL' :
        return 'Birmingham';
      case 'Minneapolis-Saint Paul' :
        return 'Minneapolis';
      default :
        return name; 
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
            placeholder='Select a City'
            autoComplete='off'
            onChange={this.handleCitySelection}
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
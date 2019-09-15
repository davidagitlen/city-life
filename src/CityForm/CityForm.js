import React, { Component } from 'react';
import './CityForm.scss';
import { setCityScores, setCityDetails, setCityImages } from '../actions';
import { fetchUrbanAreas, fetchCityScores, findAdditionalData, fetchAdditionalData, fetchCityImages } from '../util/apiCalls';
import { formatCityName, formatAdditionalCityData } from '../util/dataCleaner';
import { connect } from 'react-redux';

class CityForm extends Component{
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
      this.setState({error : message}, () => {console.error(message)});
    }
  }

  handleCitySelection = e => {
    this.setState({[e.target.name]:e.target.value})
  }

  handleSubmitCity = async (e) => {
    e.preventDefault();
    this.getCityScores();
    this.getCityImages();
    this.handleAdditionalData();
  }

  getCityScores = async () => {
    const citySnippet = this.state.city.toLowerCase().replace(/,|\./g, '').replace(/\s/g, '-');
    try {
      const city = await fetchCityScores(`https://api.teleport.org/api/urban_areas/slug:${citySnippet}/`);
      const cityScores = city.categories;
      this.props.setCityScores(this.props.ordinal, cityScores);
    } catch ({ message }) {
      this.setState({ error: message }, () => { console.error(message) });
    }
  }

  getCityImages = async () => {
    const citySnippet = this.state.city.toLowerCase().replace(/,|\./g, '').replace(/\s/g, '-');
    try {
      const city = await fetchCityImages(`https://api.teleport.org/api/urban_areas/slug:${citySnippet}/`);
      const cityImages = {
        attribution: city.photos[0].attribution,
        images : city.photos[0].image
      };
      this.props.setCityImages(this.props.ordinal, cityImages)
    } catch ({ message }) {
      this.setState({ error: message}, () => { console.error(message)});
    } 
  }

  getAdditionalCityData = async () => {
    const originalName = this.state.city;
    // const cityName = this.formatCityName(this.state.city).replace(/,|\./, '')
    const cityName = formatCityName(originalName).replace(/,|\./, '');
    try {
      const city = await findAdditionalData(cityName, originalName);
      return city;
    } catch ({ message }) {
      this.setState({ error: message}, () => {console.error(message)});
    }
  }

  // formatCityName = (name) => {
  //   switch(name) {
  //     case 'San Francisco Bay Area' :
  //       return 'San Francisco';
  //     case 'Portland, ME' :
  //       return 'Portland';
  //     case 'Portland, OR' :
  //       return 'Portland';
  //     case 'Birmingham, AL' :
  //       return 'Birmingham';
  //     case 'Minneapolis-Saint Paul' :
  //       return 'Minneapolis';
  //     default :
  //       return name; 
  //   }
  // }

  handleAdditionalData = async () => {
    const href = await this.getAdditionalCityData();
    try {
      const additionalData = await fetchAdditionalData(href);
      // console.log('additionalData return', additionalData)
      // const formattedData = {
      //   population: additionalData.population.toLocaleString(),
      //   latitude: additionalData.location.latlon.latitude,
      //   longitude: additionalData.location.latlon.longitude,
      //   fullName: additionalData.full_name,
      //   timeZone: additionalData._links['city:timezone'].name,
      //   country: additionalData._links['city:country'].name
      // }
      const formattedData = formatAdditionalCityData(additionalData);
      // console.log(formattedData)
      this.props.setCityDetails(this.props.ordinal, formattedData);
    } catch ({ message }) {
      this.setState({ error : message});
    }
  }

  render() {
    const ordinal = this.props.ordinal;
    const cityOrdinal = ordinal === 'one' ? 'First' : 'Second';
    const cities = this.state.cities;
    const cityNames = cities.length ? cities.map(city => <option key={city.name} value={city.name} />) : null;
    return(
      <div className='CityForm'>
        <form>
          <p>{cityOrdinal} City</p>
          <label htmlFor='city'>City Name</label>
          <input 
            list='city-selection'
            name='city'
            id='city'
            type='text' 
            value={this.state.city}
            placeholder='Select a City'
            autoComplete='off'
            onChange={this.handleCitySelection}
            />
          <datalist id='city-selection'>
            {cityNames}
          </datalist>
          <button type='submit' disabled={!this.state.city} onClick={this.handleSubmitCity}>
            Select City
          </button>
        </form>
      </div>
    )
  }
}

export const mapStateToProps = state => ({
  cityInfo: state.cityInfo
});

export const mapDispatchToProps = dispatch => ({
  setCityScores: (ordinal, array) => dispatch(setCityScores(ordinal, array)),
  setCityDetails: (ordinal, details) => dispatch(setCityDetails(ordinal, details)),
  setCityImages: (ordinal, images) => dispatch(setCityImages(ordinal, images))
});

export default connect(mapStateToProps, mapDispatchToProps)(CityForm);
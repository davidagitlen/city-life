import React from 'react';
import { CityForm, mapStateToProps, mapDispatchToProps } from './CityForm';
import { setCityScores, setcityDetails, setCityImages } from '../../actions';
import { fetchUrbanAreas, fetchCityScores, findAdditionalData, fetchAdditionalData, fetchCityImages } from '../../util/apiCalls';
import { formatCityName, formatAdditionalCityData } from '../../util/dataCleaner'; 
import { shallow } from 'enzyme';

jest.mock('../../util/apiCalls');
jest.mock('../../actions');

describe('CityForm', () => {
  let wrapper, mockCityInfo;

  beforeEach(() => {
    mockCityInfo = {
      one: {
        details: {
          population: 1,
          latitude: 10,
          longitude: 10,
          fullName: 'Denver, Colorado!',
          timeZone: 'Denver!'
        },
        images: {
          attribution: {},
          images: {
            mobile: 'http://blurg.com',
            web: 'http://blurg.com/web'
          }
        },
        scores: [{ color: 'blue', name: 'Score', score_out_of_10: 10 }]
      },
      two: {
        details: {
          population: 2,
          latitude: 20,
          longitude: 20,
          fullName: 'Boulder, Colorado!',
          timeZone: 'Denver!'
        },
        images: {
          attribution: {},
          images: {
            mobile: 'http://blurg.com',
            web: 'http://blurg.com/web'
          }
        },
        scores: [{ color: 'red', name: 'Score', score_out_of_10: 10 }]
      }
    };

    fetchUrbanAreas.mockImplementation(() => {
      return Promise.resolve({
          _links: {
            'ua:item' : 'Denver'
          }
        });
    });

    fetchCityScores.mockImplementation(() => {
      return Promise.resolve({
        categories: [{ color: 'blue', name: 'Score', score_out_of_10: 10 }]
      });
    });

    findAdditionalData.mockImplementation(() => {
      return Promise.resolve({});
    });

    fetchAdditionalData.mockImplementation(() => {
      return Promise.resolve({});
    });

    fetchCityImages.mockImplementation(() => {
      return Promise.resolve({});
    });

    wrapper = shallow(
      <CityForm 
        cityInfo={mockCityInfo}
        ordinal='one'
      />
    );
  });

  it('should match the snapshot with data passed in correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('handleCitySelection', () => {

    it('should update city property of state with input value', () => {
      const mockEvent = {
        target: {
          name: 'city',
          value: 'Uncasville'
        }
      };

      const expected = {
        city: 'Uncasville',
        cities: [],
        error: ""
      };

      const wrapper = shallow(
        <CityForm 
          cityInfo={mockCityInfo}
          ordinal='one'
        />, {disableLifecycleMethods: true}
      );

      wrapper.instance().handleCitySelection(mockEvent);

      expect(wrapper.state()).toEqual(expected);
    });
  });

  describe('componentDidMount', () => {

    it('should invoke fetchUrbanAreas', () => {
      expect(fetchUrbanAreas).toHaveBeenCalled();
    });
  });

  describe('handleSubmitCity', () => {
    it('should invoke getCityScores, getCityImages, and handleAdditionalData', () => {

      const mockEvent = {
        preventDefault: jest.fn()
      };
      
      wrapper.instance().getCityScores = jest.fn();
      wrapper.instance().getCityImages = jest.fn();
      wrapper.instance().handleAdditionalData = jest.fn();
      wrapper.instance().forceUpdate();

      wrapper.instance().handleSubmitCity(mockEvent);

      expect(wrapper.instance().getCityScores).toHaveBeenCalled();
      expect(wrapper.instance().getCityImages).toHaveBeenCalled();
      expect(wrapper.instance().handleAdditionalData).toHaveBeenCalled();
    });
  });

  describe('getCityScores', () => {

    it('should invoke fetchCityScores with a properly formatted city name taken from state and cleaned with replace', () => {

      const mockEvent = {
        target: {
          name: 'city',
          value: 'San, Francisco, Bay, Area'
        }
      };

      const wrapper = shallow(
        <CityForm 
          cityInfo={mockCityInfo}
          ordinal='one'
        />
      );
  
      wrapper.instance().handleCitySelection(mockEvent);
      wrapper.instance().getCityScores();
      expect(fetchCityScores).toHaveBeenCalledWith(`https://api.teleport.org/api/urban_areas/slug:san-francisco-bay-area/`);
    });

    it('should invoke setCityScores if fetch is successful and response is ok', async () => {

      const wrapper = shallow(
        <CityForm
          cityInfo={mockCityInfo}
          ordinal='one'
          setCityScores={jest.fn()}
        />
      ); 
      
      wrapper.instance().getCityScores();

      expect(setCityScores).toHaveBeenCalled();





    });

  });



  
});
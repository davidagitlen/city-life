import React from 'react';
import { CityForm, mapStateToProps, mapDispatchToProps } from './CityForm';
import { setCityScores, setcityDetails, setCityImages } from '../actions';
import { fetchUrbanAreas, fetchCityScores, findAdditionalData, fetchAdditionalData, fetchCityImages } from '../util/apiCalls';
import { formatCityName, formatAdditionalCityData } from '../util/dataCleaner'; 
import { shallow } from 'enzyme';

jest.mock('../util/apiCalls');

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
        urbanAreas: {
          _links: {
            'ua:item' : 'Denver'
          }
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

})
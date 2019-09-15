import React from 'react';
import { mapStateToProps, App } from './App';
import { shallow } from 'enzyme';


describe('App', () => {

  let wrapper;
  let mockCityInfo;

  beforeEach(() => {
    mockCityInfo = {
      one: {
        details : {
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
        scores : [{color: 'blue', name: 'Score', score_out_of_10: 10}]
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

    wrapper = shallow(
      <App 
        cityInfo={mockCityInfo}
      />)
  });

  it('should match the snapshot with data passed in correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('mapStateToProps', () => {

    it('should return an object with appropriate data', () => {
      
      const mockState = {
        cityInfo: mockCityInfo,
        unrealData: 'boo!'
      };

      const expected = {
        cityInfo: mockCityInfo,
      };

      const mappedProps = mapStateToProps(mockState);

      expect(mappedProps).toEqual(expected);

    })


  });
});


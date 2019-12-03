import React from 'react';
import { Comparison, mapStateToProps } from './Comparison';
import { shallow } from 'enzyme';

describe('Comparison', () => {
  let mockCityInfo;

  beforeEach(() => {
    mockCityInfo = {
      details: [
        {
        population: 1,
        latitude: 10,
        longitude: 10,
        fullName: 'Denver, Colorado!',
        timeZone: 'Denver!'
      },
        {
        population: 1,
        latitude: 10,
        longitude: 10,
        fullName: 'Boulder, Colorado!',
        timeZone: 'Denver!'
        }
      ],
      images: [
        {
        attribution: {},
        images: {
          mobile: 'http://blurg.com',
          web: 'http://blurg.com/web'
        }
      },
        {
        attribution: {},
        images: {
          mobile: 'http://blurg.com',
          web: 'http://blurg.com/web'
          }
        }
      ],
      scores: [
        [{ color: 'blue', name: 'Score', score_out_of_10: 10 }],
        [{ color: 'green', name: 'Score', score_out_of_10: 9}]
        ],
      inFlightScores: [true, true],
      inFlightDetails: [true, true],
      inFlightImages: [true, true]
    }
  });

  it('should match the snapshot with data passed in correctly', () => {

    const wrapper = shallow(
      <Comparison 
        cityInfoReducer={mockCityInfo}
      />
    );

    expect(wrapper).toMatchSnapshot();
  });

  describe('mapStateToProps', () => {

    it('should return an object with appropriate data', () => {

      const mockState = {
        cityInfoReducer: mockCityInfo
      };

      const expected = {
        cityInfoReducer: mockCityInfo,
      };

      const mappedProps = mapStateToProps(mockState);

      expect(mappedProps).toEqual(expected);
    });
  });

});
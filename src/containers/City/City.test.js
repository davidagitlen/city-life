import React from 'react';
import { City, mapStateToProps }from './City';
import { shallow } from 'enzyme';

describe('City', () => {

  it('should match the snapshot with data passed in correctly', () => {
    const mockCityInfo = {
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
        [{ color: 'green', name: 'Score', score_out_of_10: 9 }]
      ],
      inFlightScores: [true, true],
      inFlightDetails: [true, true],
      inFlightImages: [true, true]
    };
    const wrapper = shallow(
      <City 
        cityInfoReducer={mockCityInfo}
        ordinal={0}
      />
    );

    expect(wrapper).toMatchSnapshot();
  });

  describe('mapStateToProps', () => {

    it('should return an object with appropriate data', () => {

      const mockCityInfo = {
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

      const mockState = {
        cityInfoReducer: mockCityInfo
      };

      const expected = {
        cityInfoReducer: mockCityInfo
      };

      const mappedProps = mapStateToProps(mockState);

      expect(mappedProps).toEqual(expected);
    });
  });
});
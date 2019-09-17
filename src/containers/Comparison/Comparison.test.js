import React from 'react';
import { Comparison, mapStateToProps } from './Comparison';
import { shallow } from 'enzyme';

describe('Comparison', () => {
  let mockCityInfo;

  beforeEach(() => {
    mockCityInfo = {
      cityInfo: {
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
      }
    };
  })
  it('should match the snapshot with data passed in correctly', () => {

    const wrapper = shallow(
      <Comparison 
        {...mockCityInfo}
      />
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('should match the snapshot if some of the data is missing', () => {
    const mockCityInfo = {
      cityInfo: {
        one: {
          details: null,
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
          details: null,
          images: {
            attribution: {},
            images: {
              mobile: 'http://blurg.com',
              web: 'http://blurg.com/web'
            }
          },
          scores: [{ color: 'red', name: 'Score', score_out_of_10: 10 }]
        }
      }
    };

    const wrapper = shallow(
      <Comparison 
        {...mockCityInfo}
      />
    );
    
    expect(wrapper).toMatchSnapshot();
  });

  describe('mapStateToProps', () => {

    it('should return an object with appropriate data', () => {

      const mockState = {
        cityInfo: mockCityInfo,
        unrealData: 'blarrrrgh!'
      };

      const expected = {
        cityInfo: mockCityInfo,
      };

      const mappedProps = mapStateToProps(mockState);

      expect(mappedProps).toEqual(expected);
    });
  });

});
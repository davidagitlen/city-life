import React from 'react';
import { City, mapStateToProps }from './City';
import { shallow } from 'enzyme';

describe('City', () => {

  it('should match the snapshot with data passed in correctly', () => {
    const mockData = {
      ordinal: 'one',
      cityInfo : {
        one: {
          details: {
            fullName: 'Dorvord, Gordletan'
          },
          images: {
            images: {
              web: 'http://blah.com'
            }
          }
        },
        two: {
          details: {
            fullName: 'Brindanda, DelBla;bey'
          },
          images: {
            images: {
              web: 'http://blah.com'
            }
          }
        }
      }
    };
    const wrapper = shallow(
      <City 
        {...mockData}
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
        cityInfo: mockCityInfo,
        unrealData: 'blergh!'
      };

      const expected = {
        cityInfo: mockCityInfo
      };

      const mappedProps = mapStateToProps(mockState);

      expect(mappedProps).toEqual(expected);
    });
  });
 
});
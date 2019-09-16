import React from 'react';
import Details from './Details';
import { shallow } from 'enzyme';

describe('Details', () => {

  let wrapper, mockProps;
  
  beforeEach(() => {

    mockProps = {
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
      };

    wrapper = shallow(
      <Details 
        cityData={mockProps}
      />
    );
  });

  it('should match the snapshot with data passed in correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

});
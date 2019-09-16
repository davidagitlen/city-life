import React from 'react';
import ComparisonChart from './ComparisonChart';
import { shallow } from 'enzyme';

describe('ComparisonChart', () => {

  let wrapper, mockData;
  // global.createRef() = jest.fn().mockImplementation(() => ({
  //   current : {
  //     getContext : jest.fn();
  //   }
  // }));

  beforeEach(() => {
    mockData = {
      cityOneData: [{ name: 'Housing', score_out_of_10: 10 }, { name: 'Startups', score_out_of_10: 10 }],
      cityTwoData: [{ name: 'Housing', score_out_of_10: 5 }, { name: 'Startups', score_out_of_10: 5 }]
    };

    wrapper = shallow(
      <ComparisonChart 
        data={mockData}
        cityOneName='Boulder'
        cityTwoname='Topeka'
      />
    );
  });

  it.skip('should match the snapshot with data passed in correctly', () => {
    global.createRef = jest.fn().mockImplementation(() => ({
    current : {
      getContext : jest.fn()
    }
  }));
    expect(wrapper).toMatchSnapshot();
  });

});
import React from 'react';
import ComparisonChart from './ComparisonChart';
import { shallow } from 'enzyme';

describe('ComparisonChart', () => {

  let wrapper, mockData;

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

  it('should match the snapshot with data passed in correctly', () => {
    const wrapper = shallow(
      <ComparisonChart
        data={mockData}
        cityOneName='Boulder'
        cityTwoname='Topeka'
      /> 
    );

    wrapper.instance().props.chartRef = {
      current: {
        getContext : jest.fn()
      }
    };
    wrapper.instance().forceUpdate();
    expect(wrapper).toMatchSnapshot();
  });

});
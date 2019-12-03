import React from 'react';
import { CityForm, mapStateToProps, mapDispatchToProps } from './CityForm';
import { setCityScores, setCityDetails, setCityImages } from '../../actions';
import { fetchUrbanAreas, fetchCityScores, findAdditionalData, fetchAdditionalData, fetchCityImages } from '../../util/apiCalls';
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
      return Promise.resolve({
        population: 100000,
        location: {
          latlon: {
            latitude: 100,
            longitude: 100
          }
        },
        full_name: 'Dorberord',
        _links: {
          'city:timezone' : {
            name: 'Dorberord'
          },
          'city:country': {
            name: 'Divad'
          }
        }
      });
    });

    fetchCityImages.mockImplementation(() => {
      return Promise.resolve({
        photos : [{attribution: 'Flickr', image: 'http://blah.com/blah'}]
      });
    });

    wrapper = shallow(
      <CityForm 
        cityInfo={mockCityInfo}
        ordinal={0}
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
          ordinal={0}
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
          ordinal={0}
          requestCityScores={jest.fn()}
          requestCityDetails={jest.fn()}
        />
      );
      wrapper.instance().handleCitySelection(mockEvent);
      wrapper.instance().getCityScores();
      expect(fetchCityScores).toHaveBeenCalledWith(`https://api.teleport.org/api/urban_areas/slug:san-francisco-bay-area/`);
    });

    it('should invoke setCityScores with the correct arguments if fetch is successful and response is ok', async () => {

      const wrapper = shallow(
        <CityForm
          cityInfo={mockCityInfo}
          ordinal={0}
          requestCityScores={jest.fn()}
          setCityScores={jest.fn()}
        />
      ); 
      
      await wrapper.instance().getCityScores();
      expect(wrapper.instance().props.setCityScores).toHaveBeenCalledWith(0, [{ color: 'blue', name: 'Score', score_out_of_10: 10 }]);
    });

    it.skip('should set error property of state to error message if fetchCityScores is not successful', async () => {
      const wrapper = shallow(
        <CityForm
          cityInfo={mockCityInfo}
          ordinal={0}
          setCityScores={jest.fn()}
        />
      );
      
      fetchCityScores.mockImplementation(() => {
        return Promise.reject(Error('Sorry, it didn\'t work'));
      });
      
      const expected = 'Sorry, it didn\'t work';

      await wrapper.instance().getCityScores();
      expect(wrapper.instance().state.error).toEqual(expected);
    });
  });

  describe('getCityImages', () => {

    it('should invoke fetchCityImages with a properly formatted city name taken from state and cleaned with replace', () => {
      const mockEvent = {
        target: {
          name: 'city',
          value: 'San, Francisco, Bay, Area'
        }
      };

      const wrapper = shallow(
        <CityForm
          cityInfo={mockCityInfo}
          requestCityImages={jest.fn()}
          ordinal={0}
        />
      );

      wrapper.instance().handleCitySelection(mockEvent);
      wrapper.instance().getCityImages();
      expect(fetchCityImages).toHaveBeenCalledWith(`https://api.teleport.org/api/urban_areas/slug:san-francisco-bay-area/`);
    });

    it('should invoke setCityImages with the correct arguments if fetch is successful and response is ok', async () => {

      const wrapper = shallow(
        <CityForm
          cityInfo={mockCityInfo}
          ordinal={0}
          requestCityImages={jest.fn()}
          setCityImages={jest.fn()}
        />
      );

      await wrapper.instance().getCityImages();
      expect(wrapper.instance().props.setCityImages).toHaveBeenCalledWith(0, { attribution: 'Flickr', images: 'http://blah.com/blah' });
    });
  });

  describe('getAdditionalCityData', () => {

    it('should invoke findAdditionalData with a properly formatted city name taken from state and cleaned and the original city name', () => {

      const mockEvent = {
        target: {
          name: 'city',
          value: 'San Francisco Bay Area'
        }
      };

      const wrapper = shallow(
        <CityForm
          cityInfo={mockCityInfo}
          ordinal={0}
        />
      );

      wrapper.instance().handleCitySelection(mockEvent);
      wrapper.instance().getAdditionalCityData();
      expect(findAdditionalData).toHaveBeenCalledWith('San Francisco', 'San Francisco Bay Area');
    });
  });

  describe('handleAdditionalData', () => {

    it('should call fetchAdditionalData with the url returned from getAdditionalCityData', async () => {
      const mockGetAdditionalCityData = jest.fn().mockImplementation(() => 'http://blurgh.com')

      const wrapper = shallow(
        <CityForm
          cityInfo={mockCityInfo}
          ordinal={0}
          requestCityDetails={jest.fn()}
        />
      );

      wrapper.instance().getAdditionalCityData = mockGetAdditionalCityData;
      wrapper.instance().forceUpdate();
      await wrapper.instance().handleAdditionalData();
      expect(fetchAdditionalData).toHaveBeenCalledWith('http://blurgh.com');
    });

    it('should invoke setCityDetails with the correct arguments if fetch is successful and response is ok', async () => {

      const wrapper = shallow(
        <CityForm
          cityInfo={mockCityInfo}
          ordinal={0}
          requestCityDetails={jest.fn()}
          setCityDetails={jest.fn()}
        />
      );

      const expected = {
        population: '100,000',
        latitude: 100,
        longitude: 100,
        fullName: 'Dorberord',
        timeZone: 'Dorberord',
        country: 'Divad'
      }

      await wrapper.instance().handleAdditionalData();
      expect(wrapper.instance().props.setCityDetails).toHaveBeenCalledWith(0, expected);
    });
  });

  describe('mapStateToProps', () => {
    it('should return an object with appropriate data', () => {
      const mockState = {
        cityInfoReducer: mockCityInfo,
      };
      const expected = {
        cityInfo: mockCityInfo,
      };
      const mappedProps = mapStateToProps(mockState);
      expect(mappedProps).toEqual(expected);
    });
  });

  describe('mapDispatchToProps', () => {

    let mockDispatch, mappedProps;

    beforeEach(() => {
      mockDispatch = jest.fn();

      mappedProps = mapDispatchToProps(mockDispatch)
    });

    it('calls dispatch with action object from setCityScores', () => {
      const mockSetCityScoresObject = {
        ordinal: 0,
        array: [{score: 1}, {score: 2}]
      };
      const actionToDispatch = setCityScores(mockSetCityScoresObject);

      mappedProps.setCityScores(mockSetCityScoresObject);

      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });

    it('calls dispatch with action object from setCityDetails', () => {
      const mockSetCityDetailsObject = {
        ordinal: 0,
        details: {name: 'Help', location: 'me'}
      }
      const actionToDispatch = setCityDetails(mockSetCityDetailsObject);

      mappedProps.setCityDetails(mockSetCityDetailsObject);

      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });

    it('calls dispatch with action object from setCityImages', () => {
      const mockSetCityImagesObject = {
        ordinal: 0,
        images: {web: 'http://blah.com/blah'}
      }
      const actionToDispatch = setCityImages(mockSetCityImagesObject);

      mappedProps.setCityImages(mockSetCityImagesObject);

      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });
  });

});
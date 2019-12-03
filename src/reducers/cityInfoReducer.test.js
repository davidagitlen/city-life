import { cityInfoReducer } from './cityInfoReducer';

describe('cityInfoReducer', () => {

  const mockDefaultState = { 
      scores: [[], []], 
      details: [{ fullName: '' }, { fullName: '' }], 
      images: [{}, {}],
      inFlightScores: [true, true],
      inFlightDetails: [true, true],
      inFlightImages: [true, true]
    };

  const mockActionObjectForDefault = {
    type: undefined,
    data: 'blah'
  }

  it('should return state by default', () => {

    expect(cityInfoReducer(mockDefaultState, mockActionObjectForDefault)).toEqual(mockDefaultState);
  });

  it('should update the correct object within state based on the ordinal of the action object with the array of updated scores if the type matches SET_CITY_SCORES', () => {

    const mockSetCityScoresAction = {
      type: 'SET_CITY_SCORES',
      ordinal: 0,
      array: [{name: 'Housing', score_out_of_10: 10}, {name: 'Education', score_out_of_10: 5}]
    };

    const expected = {
      scores: [[{ name: 'Housing', score_out_of_10: 10}, {name: 'Education', score_out_of_10: 5} ], []],
      details: [{ fullName: '' }, { fullName: '' }],
      images: [{}, {}],
      inFlightScores: [false, true],
      inFlightDetails: [true, true],
      inFlightImages: [true, true]
    };

    expect(cityInfoReducer(mockDefaultState, mockSetCityScoresAction)).toEqual(expected);
  });

  it('should update the correct object within state based on the ordinal of the action object with updated details if the type matches SET_CITY_DETAILS', () => {
    const mockSetCityDetailsAction = {
      type: 'SET_CITY_DETAILS',
      ordinal: 1,
      details: {name: 'Denver', state: 'Colorado'}
    };

    const expected = {
      scores: [[{ name: 'Housing', score_out_of_10: 10 }, { name: 'Education', score_out_of_10: 5 }], []],
      details: [{ fullName: '' }, { name: 'Denver', state: 'Colorado' }],
      images: [{}, {}],
      inFlightScores: [false, true],
      inFlightDetails: [true, false],
      inFlightImages: [true, true]
    };

    expect(cityInfoReducer(mockDefaultState, mockSetCityDetailsAction)).toEqual(expected);
  });

  it('should update the correct object within state based on the ordinal of the action object with updated images if the type matches SET_CITY_IMAGES', () => {

    const mockSetCityImagesAction = {
      type: 'SET_CITY_IMAGES',
      ordinal: 0,
      images: {mobile: 'https://blah.com/mobile.png', web: 'https://blah.com/web.png'}
    }

    const expected = {
      scores: [[{ name: 'Housing', score_out_of_10: 10 }, { name: 'Education', score_out_of_10: 5 }], []],
      details: [{ fullName: '' }, { name: 'Denver', state: 'Colorado' }],
      images: [{ mobile: 'https://blah.com/mobile.png', web: 'https://blah.com/web.png'}, {}],
      inFlightScores: [false, true],
      inFlightDetails: [true, false],
      inFlightImages: [false, true]
    };

    expect(cityInfoReducer(mockDefaultState, mockSetCityImagesAction)).toEqual(expected);
  });

});
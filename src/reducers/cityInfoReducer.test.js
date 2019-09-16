import { cityInfoReducer } from './cityInfoReducer';

describe('cityInfoReducer', () => {

  const mockDefaultState = { one: { scores: [], details:null, images:null}, two: { scores: [], details: null, images: null }};

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
      ordinal: 'one',
      array: [{name: 'Housing', score_out_of_10: 10}, {name: 'Education', score_out_of_10: 5}]
    };

    const expected = { 
        one: 
          { scores: [{ name: 'Housing', score_out_of_10: 10 }, { name: 'Education', score_out_of_10: 5 }],
          details: null,
          images: null },
        two: 
          { scores: [], 
            details: null,
            images: null } };

    expect(cityInfoReducer(mockDefaultState, mockSetCityScoresAction)).toEqual(expected);
  });

  it('should update the correct object within state based on the ordinal of the action object with updated details if the type matches SET_CITY_DETAILS', () => {
    const mockSetCityDetailsAction = {
      type: 'SET_CITY_DETAILS',
      ordinal: 'two',
      details: {name: 'Denver', state: 'Colorado'}
    };

    const expected = {
      one:
      {
        scores: [{ name: 'Housing', score_out_of_10: 10 }, { name: 'Education', score_out_of_10: 5 }],
        details: null,
        images: null
      },
      two:
      {
        scores: [],
        details: {name: 'Denver', state: 'Colorado'},
        images: null
      }
    };

    expect(cityInfoReducer(mockDefaultState, mockSetCityDetailsAction)).toEqual(expected);
  });

  it('should update the correct object within state based on the ordinal of the action object with updated images if the type matches SET_CITY_IMAGES', () => {

    const mockSetCityImagesAction = {
      type: 'SET_CITY_IMAGES',
      ordinal: 'one',
      images: {mobile: 'https://blah.com/mobile.png', web: 'https://blah.com/web.png'}
    }

    const expected = {
      one:
      {
        scores: [{ name: 'Housing', score_out_of_10: 10 }, { name: 'Education', score_out_of_10: 5 }],
        details: null,
        images: { mobile: 'https://blah.com/mobile.png', web: 'https://blah.com/web.png' }
      },
      two:
      {
        scores: [],
        details: { name: 'Denver', state: 'Colorado' },
        images: null
      }
    };

    expect(cityInfoReducer(mockDefaultState, mockSetCityImagesAction)).toEqual(expected);
  });

});
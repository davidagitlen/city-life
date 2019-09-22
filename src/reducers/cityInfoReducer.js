import { isEmpty } from '../util/dataCleaner';

export const cityInfoReducer = ( state = { 
  scores: [[], []],
  details: [ { fullName: '' }, { fullName: '' } ],
  images: [{}, {}],
  inFlightScores: true,
  inFlightDetails: true,
  inFlightImages: true
}, action ) => {
  console.log('in the reducer, finally', action)
  switch(action.type) {
    case 'SET_CITY_SCORES':
      const { scores } = state;
      scores[action.ordinal] = action.array;
      const inFlightScores = isEmpty('array', scores);
      return { ...state, scores, inFlightScores };
    case 'SET_CITY_DETAILS' :
      const { details } = {...state};
      details[action.ordinal] = action.details;
      const inFlightDetails = isEmpty('object', details)
      return { ...state, details, inFlightDetails };
    case 'SET_CITY_IMAGES' :
      const { images } = { ...state };
      images[action.ordinal] = action.images;
      const inFlightImages = isEmpty('object', images)
      return { ...state, images, inFlightImages };
    default :
      return state;
  }
}
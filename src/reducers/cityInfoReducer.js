import { isEmpty } from '../util/dataCleaner';

export const cityInfoReducer = ( state = { 
  scores: [[], []],
  details: [ { fullName: '' }, { fullName: '' } ],
  images: [{}, {}],
  inFlightScores: [true, true],
  inFlightDetails: [true, true],
  inFlightImages: [true, true],
}, action ) => {
  console.log('in the reducer, finally', action)
  switch(action.type) {
    case 'SET_CITY_SCORES':
      const { scores, inFlightScores } = state;
      const brandNewInFlightScores = inFlightScores;
      brandNewInFlightScores[action.ordinal] = false;
      scores[action.ordinal] = action.array;
      return { ...state, scores, inFlightScores: brandNewInFlightScores };
    case 'SET_CITY_DETAILS' :
      const { details, inFlightDetails } = {...state};
      const brandNewInFlightDetails = inFlightDetails;
      brandNewInFlightDetails[action.ordinal] = false;
      details[action.ordinal] = action.details;
      return { ...state, details, inFlightDetails: brandNewInFlightDetails };
    case 'SET_CITY_IMAGES' :
      const { images, inFlightImages } = { ...state };
      const brandNewInFlightImages = inFlightImages;
      images[action.ordinal] = action.images;
      brandNewInFlightImages[action.ordinal] = false
      return { ...state, images, inFlightImages: brandNewInFlightImages };
    case 'REQUEST_CITY_IMAGES':
      const newInFlightImages = state.inFlightImages;
      newInFlightImages[action.ordinal] = true;
      return { ...state, inFlightImages: newInFlightImages };
    case 'REQUEST_CITY_DETAILS' :
      const newInFlightDetails = state.inFlightDetails;
      newInFlightDetails[action.ordinal] = true;
      return { ...state, inFlightDetails: newInFlightDetails };
    case 'REQUEST_CITY_SCORES' :
      const newInFlightScores = state.inFlightScores;
      newInFlightScores[action.ordinal] = true;
      return { ...state, inFlightScores: newInFlightScores };
    default :
      return state;
  }
}
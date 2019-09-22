export const cityInfoReducer = ( state = { 
  scores: [[], []],
  details: [ { fullName: '' }, { fullName: '' } ],
  images: [{}, {}],
}, action ) => {
  console.log('in the reducer, finally', action)
  switch(action.type) {
    case 'SET_CITY_SCORES':
      const { scores } = state;
      scores[action.ordinal] = action.array;
      return { ...state, scores };
    case 'SET_CITY_DETAILS' :
      const { details } = {...state};
      details[action.ordinal] = action.details;
      return { ...state, details };
    case 'SET_CITY_IMAGES' :
      const { images } = { ...state };
      images[action.ordinal] = action.images;
      return { ...state, images };
    default :
      return state;
  }
}
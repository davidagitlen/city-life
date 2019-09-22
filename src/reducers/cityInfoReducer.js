export const cityInfoReducer = ( state = { 
  one:{
    scores: [], 
    details: {
      fullName: ''
    }, 
    images: {}
  }, 
  two:{
    scores: [], 
    details: {
      fullName: ''
    }, 
    images: {} 
  }
}, action) => {
  switch(action.type) {
    case 'SET_CITY_SCORES' :
      const scoresToUpdate = {...state};
      scoresToUpdate[action.ordinal].scores = action.array;
      return scoresToUpdate;
    case 'SET_CITY_DETAILS' :
      const detailsToUpdate = {...state};
      detailsToUpdate[action.ordinal].details = action.details;
      return detailsToUpdate;
    case 'SET_CITY_IMAGES' :
      const imagesToUpdate = {...state};
      imagesToUpdate[action.ordinal].images = action.images;
      return imagesToUpdate;
    default :
      return state;
  }
}
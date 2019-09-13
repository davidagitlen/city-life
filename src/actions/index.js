export const setCityScores = (ordinal, array) => ({
  type: 'SET_CITY_SCORES',
  ordinal,
  array
});

export const setCityDetails = (ordinal, details) => ({
  type: 'SET_CITY_DETAILS',
  ordinal,
  details
});

export const setCityImages = (ordinal, images) => ({
  type: 'SET_CITY_IMAGES',
  ordinal,
  images
})
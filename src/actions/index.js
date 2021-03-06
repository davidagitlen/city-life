export const requestCityScores = (ordinal) => ({
  type: 'REQUEST_CITY_SCORES',
  ordinal,
})
export const requestCityDetails = (ordinal) => ({
  type: 'REQUEST_CITY_DETAILS',
  ordinal,
})
export const requestCityImages = (ordinal) => ({
  type: 'REQUEST_CITY_IMAGES',
  ordinal,
})

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
});

export const setCityDescription = (ordinal, description) => ({
  type: 'SET_CITY_DESCRIPTION',
  ordinal,
  description
});

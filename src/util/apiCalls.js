export const fetchUrbanAreas = async () => {
  const url = 'https://api.teleport.org/api/urban_areas/';
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('There was a problem retrieving city data!');
  }
  const urbanAreasData = await response.json();
  return urbanAreasData;
}

export const fetchCityScores = async (partialUrl) => {
  const url = `${partialUrl}scores`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('There was a problem retrieving that city\'s scores!');
  }
  const cityData = await response.json();
  return cityData;
}

export const fetchCityImages = async (partialUrl) => {
  const url = `${partialUrl}images`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('There was a problem retrieving that city\'s images!');
  }
  const cityImages = await response.json();
  return cityImages;
}

export const findAdditionalData = async (city, originalName) => {
  const url = `https://api.teleport.org/api/cities/?search=${city}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('There was a problem retrieving that city\'s additional data!');
  }
  const additionalCityData = await response.json();
  switch (originalName) {
    case 'Portland, ME' :
      return additionalCityData._embedded['city:search-results'][1]._links['city:item'].href;
    case 'Birmingham, AL' :
      return additionalCityData._embedded['city:search-results'][1]._links['city:item'].href;
    default :
      return additionalCityData._embedded['city:search-results'][0]._links['city:item'].href;
  }
}

export const fetchAdditionalData = async (href) => {
  const url = `${href}`
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('There was a problem parsing that city\'s additional data!')
  }
  const data = await response.json();
  return data;
}

// export const fetchMap = async (lat, lon) => {
//   const url = `https://api.mapbox.com/styles/v1/mapbox/light-v9/static/${lon},${lat},6,0,0/350x300?access_token=pk.eyJ1IjoiZGF2aWRhZ2l0bGVuIiwiYSI6ImNrMGs5NTNlcTA0dGkzY3MzdHZ3MTRiZGoifQ.ZtBWtklc66DFIgPC2CI_qg`;
//   const response = await fetch(url);
//   if (!response.ok) {
//     throw new Error('There was a problem retrieving that city\'s map!')
//   }
//   console.log('in fetchmap response', response);
//   const data = await response.json();
//   console.log('in fetchmap data', data)
//   return data;
// }
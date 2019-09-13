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

export const fetchAdditionalData = async (city, originalName) => {
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

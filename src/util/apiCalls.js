export const fetchUrbanAreas = async () => {
  const url = 'https://api.teleport.org/api/urban_areas/';
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('There was a problem retrieving city data!');
  }
  const urbanAreasData = await response.json();
  return urbanAreasData;
}

export const fetchCityData = async (partialUrl) => {
  const url = `${partialUrl}scores`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('There was a problem retrieving that city\'s scores!');
  }
  const cityData = await response.json();
  return cityData;
}
export const formatCityName = (name) => {
  switch (name) {
    case 'San Francisco Bay Area':
      return 'San Francisco';
    case 'Portland, ME':
      return 'Portland';
    case 'Portland, OR':
      return 'Portland';
    case 'Birmingham, AL':
      return 'Birmingham';
    case 'Minneapolis-Saint Paul':
      return 'Minneapolis';
    default:
      return name;
  }
};

export const formatAdditionalCityData = (data) => ({
  population: data.population.toLocaleString(),
  latitude: data.location.latlon.latitude,
  longitude: data.location.latlon.longitude,
  fullName: data.full_name,
  timeZone: data._links['city:timezone'].name,
  country: data._links['city:country'].name
});

export const formatChartData = (arrayOne, arrayTwo, indexes) => ({
  cityOneData: indexes.map(index => arrayOne[index]),
  cityTwoData: indexes.map(index => arrayTwo[index]),
});

export const isEmpty = (dataType, dataSet) => {
  switch(dataType) {
    case 'object':
      return dataSet.map(nestedValue => (!Object.keys(nestedValue).length)).includes(true);
    case 'array':
      return dataSet.map(nestedValue => (!nestedValue.length)).includes(true); 
    default:
      return true;
  }
}


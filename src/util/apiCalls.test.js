import {
  fetchUrbanAreas,
  fetchCityScores,
  fetchCityImages,
  findAdditionalData,
  fetchAdditionalData,
} from './apiCalls';

describe('apiCalls', () => {

  describe('fetchUrbanAreas', () => {

    it('should call fetch with the correct url', () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve()
        });
      });
      fetchUrbanAreas();
      expect(window.fetch).toHaveBeenCalledWith('https://api.teleport.org/api/urban_areas/')
    });

    it('should return an array of city names (happy)', () => {
      let expected = ['Denver', 'Boulder', 'San Francisco'];

      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(expected)
        });
      });

      expect(fetchUrbanAreas()).resolves.toEqual(expected);
    });

    it('should return an error if the fetch is not successful', () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.reject(Error('Error fetching urban areas'));
      });

      expect(fetchUrbanAreas()).rejects.toEqual(Error('Error fetching urban areas'));
    });
  }); 

  describe('fetchCityScores', () => {
    it('should call fetch with the correct url, appending "scores" to the end of the url it is passed', () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve()
        });
      });

      const mockPartialUrl = 'https://api.teleport.org/api/urban_areas/slug:denver/';

      const expected = `https://api.teleport.org/api/urban_areas/slug:denver/scores`;

      fetchCityScores(`https://api.teleport.org/api/urban_areas/slug:denver/`);

      expect(window.fetch).toHaveBeenCalledWith(expected);
    });

    it('should return an array of objects (happy)', () => {
      const expected = [{name: 'Housing', score_out_of_10: 10}, {name: 'Commute', score_out_of_10: 10}, {name: 'Startups', score_out_of_10: 10}];

      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(expected)
        });
      });

      expect(fetchCityScores(`https://api.teleport.org/api/urban_areas/slug:denver/`)).resolves.toEqual(expected);
    });

    it('should return an error if the fetch is not successful', () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.reject(Error('Error fetching that city\'s scores'));
      });

      expect(fetchCityScores(`https://api.teleport.org/api/urban_areas/slug:denver/`)).rejects.toEqual(Error('Error fetching that city\'s scores'));
    });
  });

  describe('fetchCityImages', () => {

    it('should call fetch with the correct url, appending "images" to the end of the url it is passed', () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve()
        });
      });

      const expected = 'https://api.teleport.org/api/urban_areas/slug:Denver/images';

      fetchCityImages(`https://api.teleport.org/api/urban_areas/slug:Denver/`);

      expect(window.fetch).toHaveBeenCalledWith(expected);
    });

    it('should return an object with a key of photos set to an array containing an object with attribution and image keys (happy)', () => {
      const expected = {photos : [{attribution: 'Flickr', image: {web: 'https://blah.com/web.png'}}]}
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(expected)
        });
      });

      expect(fetchCityImages(`https://api.teleport.org/api/urban_areas/slug:Denver/`)).resolves.toEqual(expected);
    });

    it('should return an error if the fetch is not successful', () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.reject(Error('There was an error fetching that city\'s images'))
      });

      expect(fetchCityImages(`https://api.teleport.org/api/urban_areas/slug:Denver/`)).rejects.toEqual(Error('There was an error fetching that city\'s images'));
    });
  });

});
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
    })

  }); 
});
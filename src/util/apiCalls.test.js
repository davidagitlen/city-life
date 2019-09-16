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

    it('should return an error if the response is not ok (sad)', () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: false
        });
      });

      expect(fetchUrbanAreas()).rejects.toEqual(Error('There was a problem retrieving city data!'))

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

      fetchCityScores(mockPartialUrl);

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

    it('should return an error if the reponse is not ok (sad)', () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: false
        });
      });

      expect(fetchCityScores(`https://api.teleport.org/api/urban_areas/slug:denver/`)).rejects.toEqual(Error('There was a problem retrieving that city\'s scores!'));
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

    it('should return an error if the response is not ok (sad)', () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: false
        });
      });

      expect(fetchCityImages(`https://api.teleport.org/api/urban_areas/slug:Denver/`)).rejects.toEqual('There was a problem retrieving that city\'s images!');
    });
  });

  describe('findAdditionalData', () => {

    it('should call fetch with the correct url, with a query string assigned to the name of the city passed in as the first argument', () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve()
        });
      });

      const expected = `https://api.teleport.org/api/cities/?search=Denver`;

      findAdditionalData('Denver');

      expect(window.fetch).toHaveBeenCalledWith(expected);
    });

    it('should return an object with an embedded array of search results, and return the correct index of the nested array based on the original name passed as an argument (happy)', () => {

      const expected = { 
        _embedded : {
          'city:search-results' : [
            { _links: {
                'city:item' : {
                  href : 'http://nightmare.com/one/href'
                }
              }
            },
            { _links: { 
                'city:item' : {
                  href : 'http://nightmare.com/two/href'
                }
              }
            } 
          ]
        }
      };

      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(expected)
        });
      });
      expect(findAdditionalData('Denver', 'Denver')).resolves.toEqual(expected._embedded['city:search-results'][0]._links['city:item'].href);

      expect(findAdditionalData('Portland', 'Portland, ME')).resolves.toEqual(expected._embedded['city:search-results'][1]._links['city:item'].href)
    });

    it('should return an error if the fetch is not successful', () => {

      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.reject(Error('There was an error fetching that city\'s additional data'));
      });

      expect(findAdditionalData('Denver')).rejects.toEqual(Error('There was an error fetching that city\'s additional data'));
    });

    it('should return an error if the response is not ok (sad)', () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: false
        });
      });

      expect(findAdditionalData('Denver')).rejects.toEqual('There was a problem retrieving that city\'s additional data!');
    });
  });

  describe('fetchAdditionalData', () => {

    it('should call fetch with the correct url', () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve()
        });
      });

      fetchAdditionalData('http://blah.com/blah');

      expect(window.fetch).toHaveBeenCalledWith('http://blah.com/blah');
    });

    it('should return an object of data to be formatted', () => {

      const expected = {
        population: 10000,
        location: {latlon: 'blah'},
        full_name: 'Dorvord Gortland',
      };

      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(expected)
        });
      });

      expect(fetchAdditionalData('http://blah.com/blah')).resolves.toEqual(expected);
    });

    it('should return an error if the fetch is not successful (sad)', () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.reject(Error('There was an error fetching the additional data'));
      });

      expect(fetchAdditionalData('http://blah.com/blah')).rejects.toEqual(Error('There was an error fetching the additional data'));
    });

    it('should return an error if the response is not ok (sad)', () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: false
        });
      });

      expect(fetchAdditionalData('http://blah.com/blah')).rejects.toEqual('There was a problem parsing that city\'s additional data!');
    });
  });
});
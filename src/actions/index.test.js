import { setCityScores, setCityDetails, setCityImages } from './index';

describe('Actions', () => {

  describe('setCityScores', () => {
    it('should return an object with SET_CITY_SCORES type, an ordinal, and an array of scores', () => {

      const mockScores = [{score: 1}, {score: 2}, {score: 3}];
      const ordinal = 'one';
      const expected = {
        type: 'SET_CITY_SCORES',
        ordinal: 'one',
        array: mockScores
      }

      expect(setCityScores(ordinal, mockScores)).toEqual(expected);
    });
  });

  describe('setCityDetails', () => {
    it('should return an object with SET_CITY_DETAILS type, an ordinal, and a details object', () => {

      const mockDetails = {name: 'Boulder', population: 100000};
      const ordinal = 'one';
      const expected = {
        type: 'SET_CITY_DETAILS',
        ordinal: 'one',
        details: mockDetails
      };

      expect(setCityDetails(ordinal, mockDetails)).toEqual(expected);
    });
  });

  describe('setCityImages', () => {
    it('should return an object with type SET_CITY_IMAGES, an ordinal, and an images object', () => {

      const mockImages = {
        web: 'https://blah.com/web/blah',
        mobile: 'https://blah.com/mobile/blah'
      };
      const ordinal = 'two';
      const expected = {
        type: 'SET_CITY_IMAGES',
        ordinal: 'two',
        images: mockImages
      };

      expect(setCityImages(ordinal, mockImages)).toEqual(expected);
    });
  });

});
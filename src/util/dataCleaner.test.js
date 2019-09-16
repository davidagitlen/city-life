import { 
  formatCityName, 
  formatAdditionalCityData
} from './dataCleaner';

describe('dataCleaner', () => {

  describe('formatCityName', () => {
    it('should return "San Francisco" if passed an argument of "San Francisco Bay Area"', () => {

      expect(formatCityName('San Francisco Bay Area')).toEqual('San Francisco');

    });


  });

});
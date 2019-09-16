import { 
  formatCityName, 
  formatAdditionalCityData,
  formatChartData
} from './dataCleaner';

describe('dataCleaner', () => {

  describe('formatCityName', () => {
    it('should return "San Francisco" if passed an argument of "San Francisco Bay Area"', () => {

      expect(formatCityName('San Francisco Bay Area')).toEqual('San Francisco');
    });

    it('should return "Portland" if passed an argument of either "Portland, ME" or "Portland, OR"', () => {

      expect(formatCityName('Portland, ME')).toEqual('Portland');
      expect(formatCityName('Portland, OR')).toEqual('Portland');
    });

    it('should return "Birmingham" if it is passed an argument of "Birmingham, AL"', () => {

      expect(formatCityName('Birmingham, AL')).toEqual('Birmingham');
    });

    it('should return "Minneapolis" if it is passed an argument of "Minneapolis-Saint Paul"', () => {
      
      expect(formatCityName('Minneapolis-Saint Paul')).toEqual('Minneapolis');
    });

    it('should return the original name if it does not match any of the cases of the switch statement', () => {

      expect(formatCityName('Denver')).toEqual('Denver');
    });
  });

  describe('formatAdditionalCityData', () => {

    it('should return an appropriately formatted object based on the data it is passed', () => {

      const mockData = {
        population: 100000,
        location: {
          latlon: {
            latitude: 100,
            longitude: 100
            }
        },
        full_name: 'Dorvordville',
        _links: {
          'city:timezone': {
            name: 'Americuh/Dorvordville'
          },
          'city:country': {
            name: 'Americuh'
          }
        }
      };

      const expected = {
        population: '100,000',
        latitude: 100,
        longitude: 100,
        fullName: 'Dorvordville',
        timeZone: 'Americuh/Dorvordville',
        country: 'Americuh'
      };

      expect(formatAdditionalCityData(mockData)).toEqual(expected);

    });
  });

  describe('formatChartData', () =>{

    it('should return an object with properly properly selected indices of the first two arrays passed to it as arguments, based on the array of indices passed as its last argument', () => {

      const mockFirstArray = [{name: 'Housing', score_out_of_10: 10}, {name: 'Commute', score_out_of_10: 10}, {name: 'Education', score_out_of_10: 10}];
      const mockSecondArray = [{ name: 'Housing', score_out_of_10: 5 }, { name: 'Commute', score_out_of_10: 5 }, { name: 'Education', score_out_of_10: 5 }];

      const expected = {
          cityOneData: [{ name: 'Housing', score_out_of_10: 10 }, { name: 'Education', score_out_of_10: 10 }],
          cityTwoData: [{ name: 'Housing', score_out_of_10: 5 }, { name: 'Education', score_out_of_10: 5 }]
        };

      expect(formatChartData(mockFirstArray, mockSecondArray, [0, 2])).toEqual(expected);

      });
    });

  });
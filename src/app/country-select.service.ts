import { Country } from './country.model';

export class CountrySelectService{

countriesList: Country[] = [
  new Country('Argentina'),
  new Country('Barbados'),
  new Country('Brazil'),
  new Country('Australia'),
  new Country('Canada'),
  new Country('China'),
  new Country('India'),
  new Country('Israel'),
  new Country('Germany'),
  new Country('Russia'),
  new Country('South Africa'),
  new Country('Saudi Arabia'),
  new Country('United Kingdom'),
  new Country('USA'),
  new Country('Zambia')
];

// Return List of countries as a new array
  getCountries() {
    return [...this.countriesList];
  }

}

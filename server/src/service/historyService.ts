import fs from 'node:fs/promises';
import { v4 as uuidv4 } from 'uuid';

// Define a City class with name and id properties
class City {
  name: string;
  id: string;

  constructor(name: string, id: string) {
    this.name = name;
    this.id = id;
  }
}

// Complete the HistoryService class
class HistoryService {
//   Define a read method that reads from the searchHistory.json file
  private async read(){
    return await fs.readFile('db/db.json', {
        flag: 'a+',
        encoding: 'utf8',
      });
  }

//   Define a write method that writes the updated cities array to the searchHistory.json file
  private async write(cities: City[]) {
    return await fs.writeFile('db/db.json', JSON.stringify(cities, null, '\t'));
  }

//   Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  async getCities() {
    return await this.read().then((cities) => {
        let parsedCities: City[];
  
        // If cities isn't an array or can't be turned into one, send back a new empty array
        try {
          parsedCities = [].concat(JSON.parse(cities));
        } catch (err) {
          parsedCities = [];
        }
  
        return parsedCities;
      });
  }

//   Define an addCity method that adds a city to the searchHistory.json file
  async addCity(city: string) {
    if (!city) {
        throw new Error('city cannot be blank');
      }
  
      // Adds a unique id to the city using uuid package
      const newCity: City = { name: city, id: uuidv4() };
  
      // Gets all cities, adds the new city, writes all the updated cities, returns the newCity
      return await this.getCities()
        .then((cities) => {
          if (cities.find((index) => index.name === city)) {
            return cities;
          }
          return [...cities, newCity];
        })
        .then((updatedCities) => this.write(updatedCities))
        .then(() => newCity);
  }

//   Define a removeCity method that removes a city from the searchHistory.json file
  async removeCity(id: string) {
    if (!id) {
      throw new Error('city id cannot be blank');
    }
    return await this.getCities()
      .then((cities) => cities.filter((city) => city.id !== id))
      .then((filteredCities) => this.write(filteredCities));
  }
}

export default new HistoryService();

// import fs from 'fs/promises';

// // Define a City class with name and id properties
// class City {
//   name: string;
//   id: number;

//   constructor(name: string, id: number) {
//     this.name = name;
//     this.id = id;
//   }
// }

// // Complete the HistoryService class
// class HistoryService {
// //   Define a read method that reads from the searchHistory.json file
//   private async read(){
//     try {
//         const data = await fs.readFile('./searchHistory.json', 'utf8');
//         return JSON.parse(data);
//       } catch (err: any) {
//         if (err.code === 'ENOENT'){
//             console.log('File not found, initializing with an empty array.');
//             return [];
//         } else {
//             console.error('Error reading file:', err);
//             throw err;
//         }
//       }
//   }

// //   Define a write method that writes the updated cities array to the searchHistory.json file
//   private async write(cities: City[]) {
//     try {
//         const data = JSON.stringify(cities);
//         await fs.writeFile('./searchHistory.json', data, 'utf8');
//         console.log('Cities successfully saved to file.');
//     } catch (err) {
//         console.error('Error writing to file', err);
//     }
//   }

// //   Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
//   async getCities() {
//     const array = await this.read()
//     const cities = array.map((city: City) => {
//         return new City (city.name, city.id)
//         })
//     return cities;
//   }

// //   Define an addCity method that adds a city to the searchHistory.json file
//   async addCity(name: string) {
//     const cities = await this.getCities();

//     const newId = cities.length > 0 ? cities[cities.length - 1].id + 1 : 1;
//     const newCity = new City(name, newId)

//     cities.push(newCity);

//     await this.write(cities);
//   }

// //   BONUS: Define a removeCity method that removes a city from the searchHistory.json file
// //   async removeCity(id: string) {
// //   }
// }

// export default new HistoryService();

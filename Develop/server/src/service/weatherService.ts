import dotenv from 'dotenv';
dotenv.config();

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  lon: number;
  lat: number;
}
// TODO: Define a class for the Weather object
class Weather{
  city: string;
  date: string;
  icon: string;
  temp: number;
  windspeed: number;
  humidity: number;

  constructor (city: string, date: string, icon: string, temp: number, windspeed: number, humidity: number) {
    this.city = city;
    this.date = date;
    this.icon = icon;
    this.temp = temp;
    this.windspeed = windspeed;
    this.humidity = humidity;
  }
}

// TODO: Complete the WeatherService class
class WeatherService {

  // TODO: Define the baseURL, API key, and city name properties
  baseURL: string;
  APIkey: string;
  cityName: string;

  constructor (baseURL: string, APIkey: string, cityName: string) {
    this.baseURL = baseURL;
    this.APIkey = APIkey;
    this.cityName = cityName;
  }

  // TODO: Create fetchLocationData method
  private async fetchLocationData(query: string) {
    const locationData = await fetch(query)
    return locationData;
  }

  // TODO: Create destructureLocationData method
  private destructureLocationData(locationData: any): Coordinates {
    const lat = locationData[0].lat;
    const lon = locationData[0].lon;
    return {lat, lon};
  }

  // TODO: Create buildGeocodeQuery method
  private buildGeocodeQuery(): string {
    return `${this.baseURL}/geo/1.0/direct?q=${this.cityName}&appid=${this.APIkey}`;
  }

  // TODO: Create buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string {
    return `${this.baseURL}/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.APIkey}`;
  }

  // TODO: Create fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData() {
    const geoCodeQuery = this.buildGeocodeQuery()
    const locationData = await this.fetchLocationData(geoCodeQuery)
    const locationDataJson = locationData.json()
    const coordinates = this.destructureLocationData(locationDataJson)
    return coordinates;
  }

  // TODO: Create fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates) {
    
  }

  // TODO: Build parseCurrentWeather method
  private parseCurrentWeather(response: any) {}

  // TODO: Complete buildForecastArray method
  private buildForecastArray(currentWeather: Weather, weatherData: any[]) {}
  
  // TODO: Complete getWeatherForCity method
  async getWeatherForCity(city: string) {}

}

export default new WeatherService();

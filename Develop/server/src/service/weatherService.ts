import dotenv from 'dotenv';
dotenv.config();

// Defines an interface for the Coordinates object
interface Coordinates {
  lon: number;
  lat: number;
}
// Defines a class for the Weather object
class Weather{
  city: string;
  date: string;
  icon: string;
  iconDescription: string;
  tempF: number;
  windSpeed: number;
  humidity: number;


  constructor (city: string, date: string, icon: string, iconDescription: string, tempF: number, windSpeed: number, humidity: number) {
    this.city = city;
    this.date = date;
    this.icon = icon;
    this.iconDescription = iconDescription;
    this.tempF = tempF;
    this.windSpeed = windSpeed;
    this.humidity = humidity;
  }
}

// WeatherService class
class WeatherService {

  // Defines the baseURL, API key, and city name properties
  baseURL: string;
  APIkey: string;
  city: string = '';

  constructor() {
    this.baseURL = process.env.API_BASE_URL || '';
    this.APIkey = process.env.API_KEY || '';
  }

  // fetchLocationData method
  private async fetchLocationData(query: string) {
    const locationData = await fetch(query)
    return locationData;
  }

  // destructureLocationData method
  private destructureLocationData(locationData: any): Coordinates {
    const lat = locationData[0].lat;
    const lon = locationData[0].lon;
    return {lat, lon};
  }

  // buildGeocodeQuery method
  private buildGeocodeQuery(): string {
    return `${this.baseURL}/geo/1.0/direct?q=${this.city}&appid=${this.APIkey}`;
  }

  // buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string {
    return `${this.baseURL}/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.APIkey}&units=imperial`;
  }

  // fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData() {
    const geoCodeQuery = this.buildGeocodeQuery();
    const locationData = await this.fetchLocationData(geoCodeQuery);
    const locationDataJson = await locationData.json();
    const coordinates = this.destructureLocationData(locationDataJson);
    return coordinates;
  }

  // Create fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates) {
    const weatherQuery = this.buildWeatherQuery(coordinates);
    const response = await fetch(weatherQuery);
    const weatherData = await response.json();
    return weatherData;
  }

  private parseCurrentWeather(response: any) {
    const currentWeather = response.list[0];
    const date = currentWeather.dt_txt;
    const icon = currentWeather.weather[0].icon;
    const iconDescription = currentWeather.weather[0].description;
    const temp = currentWeather.main.temp;
    const windSpeed = currentWeather.wind.speed;
    const humidity = currentWeather.main.humidity;
   
    return new Weather (this.city, date, icon, iconDescription, temp, windSpeed, humidity);
  }


  // buildForecastArray method
  private buildForecastArray(currentWeather: Weather, weatherData: {list: any[]}) {
  const fiveDayForecast = weatherData.list.filter((forecast) => {
    return forecast.dt_txt.includes('00:00:00')
  }).map((f) => {
    return new Weather (this.city, f.dt_txt, f.weather[0].icon, f.weather[0].description, f.main.temp, f.wind.speed, f.main.humidity)
  })  

  console.log(fiveDayForecast);

  const sixDayForecast = [currentWeather, ...fiveDayForecast];
  return sixDayForecast;
  }
  
  // getWeatherForCity method
  async getWeatherForCity(city: string) {
    this.city = city;
    const coordinates = await this.fetchAndDestructureLocationData(); //returns coordinates
    const weatherData = await this.fetchWeatherData(coordinates); // returns weatherData
    const currentWeather = this.parseCurrentWeather(weatherData);
    console.log(currentWeather);
    const sixDayForecast = this.buildForecastArray(currentWeather, weatherData) // assembles final array
    return sixDayForecast;
  }
}

export default new WeatherService();
import { Router, type Request, type Response } from 'express';
// import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';
const router = Router();

// POST Request with city name to retrieve weather data
router.post('/', async (req: Request, res: Response) => {
  // GET weather data from city name
  try {
    const cityName = req.body.cityName;
    if (!cityName) {
      return res.status(400).json({ msg: 'City name is required'});
    }
    const weatherData = await WeatherService.getWeatherForCity(cityName);
  // Save city to search history
    // await HistoryService.addCity(cityName);
    console.log(`city ${cityName} added to history`)
    return res.json(weatherData);
  // Error handling
  } catch (err) {
    console.error('Error in POST / route', err);
    return res.status(500).json({error: 'Internal server error'})
  }
});

// GET search history
// router.get('/api/weather/history', async (_req: Request, res: Response) => {
//   try {
//     const savedCities = await HistoryService.getCities();
//     console.log("Fetched cities:", savedCities);
//     res.json(savedCities);
//   } catch (err) {
//     console.log('Error in GET / route', err);
//     res.status(500).json({error: 'Internal server error'});
//   }
// });

// DELETE city from search history
// router.delete('/history/:id', async (req: Request, res: Response) => {
// };

export default router;

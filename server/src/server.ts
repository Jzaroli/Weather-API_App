import dotenv from 'dotenv';
import express from 'express';
dotenv.config();
// Import the routes
import routes from './routes/index.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Serves static files of entire client dist folder
app.use(express.static('../client/dist'));

// Implements middleware for parsing JSON and urlencoded form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Implements middleware to connect the routes
app.use(routes);

// Starts the server on the port
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));

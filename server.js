'use strict'

// Constants
require('dotenv').config();
const getWeather = require('./Weather.js');
const getMovies = require('./Movies.js');

// Middleware
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

// Modulized functions
app.get('/weather', getWeather);
app.get('/movies', getMovies);


// Port info
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`listening on PORT: ${PORT}`));

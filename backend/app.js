const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

connectDB();
app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/authroutes'));
app.use('/api/stations', require('./routes/stationRoutes'));

app.get('/', (req, res) => res.send('API is running'));

module.exports = app;

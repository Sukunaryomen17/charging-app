const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = ['https://charging-app-yccv.onrender.com'];
// Middleware
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// API routes
app.use('/api/auth', require('./routes/authroutes'));
app.use('/api/stations', require('./routes/stationRoutes'));
// Add your other API routes here...

// Serve React static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  try {
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
    });
  } catch (err) {
    console.error('❌ Error in wildcard route:', err.message);
  }
}


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

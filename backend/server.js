// ✅ Always load environment variables first!
require('dotenv').config();

const app = require('./app');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 5000;

// ✅ Connect to MongoDB after loading env
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error(err));

// ✅ Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

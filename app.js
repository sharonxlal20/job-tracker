const express = require('express');
const cors = require('cors');
const app = express();

const jobRoutes = require('./routes/jobs');
const authRoutes = require('./routes/auth');
const errorHandler = require('./middleware/errorHandler');

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/jobs', jobRoutes);

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.use(errorHandler); // must go LAST, after all routes and the 404 handler

module.exports = app;
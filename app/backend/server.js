const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

// Import API routes
const apiRoutes = require('./routes/api');

// Use the API routes
app.use('/api', apiRoutes);

// Serve static files from the React frontend
app.use(express.static('../frontend/build'));

// Fallback to serve the React app for any other routes
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../frontend/build', 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


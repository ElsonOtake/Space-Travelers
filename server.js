const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

// Check if build directory exists
const buildPath = path.join(__dirname, 'build');
if (!fs.existsSync(buildPath)) {
  console.error('Build directory does not exist. Please run "npm run build" first.');
  console.error('Expected path:', buildPath);
}

// Serve static files from the React app build directory
app.use(express.static(buildPath));

// Security headers middleware
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});

// API routes can be added here if needed
// app.use('/api', require('./routes/api'));

// Catch all handler: send back React's index.html file for any non-API routes
app.get('*', (req, res) => {
  const indexPath = path.join(__dirname, 'build', 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(500).send('Build directory or index.html not found. The app may not have been built correctly.');
  }
});

// Use the PORT environment variable or default to 3000
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Space Travelers' Hub server is running on port ${port}`);
});

module.exports = app;
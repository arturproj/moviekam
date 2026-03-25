require('dotenv').config({
  path: `.env.${process.env.NODE_ENV || 'development'}`
});
const express = require('express');
const cors = require('cors');
const http = require('http');
const path = require('path');

const app = express();
// Middleware
// Configure the Cross-Origin-Resource-Policy
app.use(cors({
  origin: '*', // Specifica l'origine autorizzata
  credentials: true,
  optionsSuccessStatus: 200
}));
app.use(express.json());

// Serve static files from the Vue app (after build)
app.use(express.static(path.join(__dirname, 'client/dist')));

// Serve Vue app for all other routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/dist', 'index.html'));
});

const api = require('./api')
app.use('/api', api)

// This middleware must be placed after all other app.use() and route definitions
app.use(function(req, res, next) {
  // res.status(404).render('404_error_template', { title: "Sorry, page not found" });
  res.status(404).send("Sorry, page not found");
});

// Start the server
const server = http.createServer(app);
const PORT = process.env.NODE_PORT || 3000;
server.listen(PORT, () => {
  console.log(`Example app listening on port http://127.0.0.1:${PORT}`)
})
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');
const path = require('path')
const socketIo = require('socket.io');

const app = express();
// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Specifica l'origine autorizzata
  credentials: true,
  optionsSuccessStatus: 200
}));
app.use(express.json());

// Serve static files from the Vue app (after build)
app.use(express.static(path.join(__dirname, 'client/dist')));
app.use(express.static(path.join(__dirname, 'public')));

const server = http.createServer(app);
const io = socketIo(server, {
    cors: { origin: '*' }
}); 

const TheMovieController = require('./api/TheMovieController')
app.use('/api/movie', TheMovieController)
const YouTubeController = require('./api/YouTubeController')
app.use('/api/ytube', YouTubeController)

// Serve Vue app for all other routes
app.use((req, res, next) => {
  if (req.method === 'GET' && req.accepts('html') && !req.path.startsWith('/api')) {
    res.sendFile(path.join(__dirname, 'client/dist', 'index.html'));
  } else {
    next();
  }
});

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.on('message', (msg) => {
    console.log('Message:', msg);
    io.emit('message', msg); // Broadcast to all clients
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Example app listening on port http://127.0.0.1:${PORT}`)
})
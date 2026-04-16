const cors = require('cors');
const express = require('express');
const routes = require('../routes');

const server = express();

// CORS configuration for production and local development
const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:8080', 'https://anime-api-v1-1-0.onrender.com', 'https://*.onrender.com'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

server.use(cors(corsOptions));
server.options('*', cors(corsOptions));

// Middleware
server.use(express.json({ limit: '50mb' }));
server.use(express.urlencoded({ limit: '50mb', extended: true }));

// Root route
server.get('/', (req, res) => {
  res.json({
    message: 'Anime API v1.2.0',
    status: 'running',
    endpoints: {
      getAllAnimes: 'GET /api/animes',
      getAnimeById: 'GET /api/animes/:id',
      createAnime: 'POST /api/animes',
      updateAnime: 'PUT /api/animes/:id',
      deleteAnime: 'DELETE /api/animes/:id'
    }
  });
});

server.use('/api', routes);

module.exports = server;
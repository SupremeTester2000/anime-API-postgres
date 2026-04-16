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

server.use('/api', routes);

module.exports = server;
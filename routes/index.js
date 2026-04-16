const { Router } = require('express');
const multer = require('multer');
const controllers = require('../controllers');

// Multer configuration with size limits
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB max file size
  }
});

const router = Router();

// Welcome route
router.get('/', (req, res) => res.send('Welcome to Anime API'));

// CREATE 
router.post('/animes', upload.any(), (req, res, next) => {
  console.log('POST /animes - Body:', req.body);
  console.log('POST /animes - Files:', req.files || req.file);
  next();
}, controllers.createAnime);

// READ
router.get('/animes', controllers.getAllAnimes);

// READ BY ID
router.get('/animes/:id', controllers.getAnimeById);

// UPDATE
router.put('/animes/:id', upload.any(), (req, res, next) => {
  console.log('PUT /animes/:id - Body:', req.body);
  console.log('PUT /animes/:id - Files:', req.files || req.file);
  next();
}, controllers.updateAnime);

// DELETE
router.delete('/animes/:id', controllers.deleteAnime);

// Error handler for multer
router.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    return res.status(400).json({ error: `Upload error: ${error.message}` });
  }
  if (error) {
    return res.status(500).json({ error: error.message });
  }
  next();
});

module.exports = router;
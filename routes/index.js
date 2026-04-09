const { Router } = require('express');
const multer = require('multer');
const controllers = require('../controllers');

const upload = multer({ storage: multer.memoryStorage() });
const router = Router();

// Welcome route
router.get('/', (req, res) => res.send('Welcome to Anime API'));

// CREATE 
router.post('/animes', upload.any(), controllers.createAnime);

// READ
router.get('/animes', controllers.getAllAnimes);

// READ BY ID
router.get('/animes/:id', controllers.getAnimeById);

// UPDATE
router.put('/animes/:id', upload.any(), controllers.updateAnime);

// DELETE
router.delete('/animes/:id', controllers.deleteAnime);

module.exports = router;
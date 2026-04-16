const models = require("../database/models");
const { uploadImage, removeImage } = require('../config/cloudinary');

// CREATE
const createAnime = async (req, res) => {
    try {
        console.log('createAnime called');
        console.log('body:', JSON.stringify(req.body));
        console.log('file(s):', req.file || req.files);
        
        const { title, episodios, fecha_ini, fecha_fin, image_url: imageUrlBody } = req.body;

        if (!title || !title.trim()) {
            return res.status(400).json({ error: 'Title is required' });
        }

        let image_url = null;
        let image_public_id = null;

        const file = req.file || (req.files && req.files[0]);

        // Caso 1: Imagen subida como archivo
        if (file && file.buffer) {
            try {
                const uploadedImage = await uploadImage(file.buffer);
                image_url = uploadedImage.secure_url;
                image_public_id = uploadedImage.public_id;
                console.log('Image uploaded successfully:', image_public_id);
            } catch (uploadError) {
                console.error('Image upload failed:', uploadError);
                return res.status(400).json({ error: `Image upload failed: ${uploadError.message}` });
            }
        }
        // Caso 2: Imagen por URL (opcional)
        else if (imageUrlBody && imageUrlBody.trim()) {
            image_url = imageUrlBody.trim();
            console.log('Using image URL:', image_url);
        }

        const animeData = {
            title: title.trim(),
            episodios: episodios ? parseInt(episodios) : null,
            fecha_ini: fecha_ini || null,
            fecha_fin: fecha_fin || null,
            image_url,
            image_public_id
        };

        console.log('Creating anime with data:', animeData);

        const anime = await models.Anime.create(animeData);

        return res.status(201).json({
            message: 'Anime created successfully',
            anime
        });

    } catch (error) {
        console.error('createAnime error:', error.message);
        console.error('Error stack:', error.stack);
        return res.status(500).json({ error: `Server error: ${error.message}` });
    }
};

// READ ALL
const getAllAnimes = async (req, res) => {
    try {
        const animes = await models.Anime.findAll({
            attributes: [
                'id', 'title', 'episodios',
                'fecha_ini', 'fecha_fin',
                'image_url', 'image_public_id',
                'createdAt', 'updatedAt'
            ]
        });

        return res.status(200).json({
            message: 'Animes retrieved successfully',
            animes
        });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// READ BY ID
const getAnimeById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: 'Anime ID is required' });
        }

        const anime = await models.Anime.findByPk(id, {
            attributes: [
                'id', 'title', 'episodios',
                'fecha_ini', 'fecha_fin',
                'image_url', 'image_public_id',
                'createdAt', 'updatedAt'
            ]
        });

        if (!anime) {
            return res.status(404).json({ error: 'Anime not found' });
        }

        return res.status(200).json({
            message: 'Anime retrieved successfully',
            anime
        });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// UPDATE
const updateAnime = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, episodios, fecha_ini, fecha_fin, image_url: imageUrlBody } = req.body;

        if (!id) {
            return res.status(400).json({ error: 'Anime ID is required' });
        }

        const anime = await models.Anime.findByPk(id);

        if (!anime) {
            return res.status(404).json({ error: 'Anime not found' });
        }

        // Actualizar campos
        if (title !== undefined) anime.title = title;
        if (episodios !== undefined) anime.episodios = episodios;
        if (fecha_ini !== undefined) anime.fecha_ini = fecha_ini;
        if (fecha_fin !== undefined) anime.fecha_fin = fecha_fin;

        const file = req.file || (req.files && req.files[0]);

        // Caso 1: Nueva imagen subida
        if (file && file.buffer) {
            if (anime.image_public_id) {
                await removeImage(anime.image_public_id);
            }

            const uploadedImage = await uploadImage(file.buffer);
            anime.image_url = uploadedImage.secure_url;
            anime.image_public_id = uploadedImage.public_id;
        }
        // Caso 2: URL manual
        else if (imageUrlBody) {
            anime.image_url = imageUrlBody;
            anime.image_public_id = null;
        }

        await anime.save();

        return res.status(200).json({
            message: 'Anime updated successfully',
            anime
        });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// DELETE
const deleteAnime = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: 'Anime ID is required' });
        }

        const anime = await models.Anime.findByPk(id);

        if (!anime) {
            return res.status(404).json({ error: 'Anime not found' });
        }

        // Eliminar imagen de Cloudinary si existe
        if (anime.image_public_id) {
            await removeImage(anime.image_public_id);
        }

        await anime.destroy();

        return res.status(200).json({
            message: 'Anime deleted successfully',
            anime
        });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createAnime,
    getAllAnimes,
    getAnimeById,
    updateAnime,
    deleteAnime
};
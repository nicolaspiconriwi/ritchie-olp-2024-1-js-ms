const { getAll, save, findById, findByRouteId } = require("../models/languageModel");

exports.getAll = async (req, res) => {
    try {
        const languages = await getAll();
        res.status(200).json(languages);
    } catch (err) {
        console.error('Error en getAllLanguages:', err);
        res.status(500).json({ message: 'Error en el servidor' });
    }
}

exports.save = async (req, res) => {
    try {
        const { name, description, id_language } = req.body;
        const language = await save(name, description, id_language);
        res.status(201).json(language);
    } catch (err) {
        console.error('Error en save:', err);
        res.status(500).json({ message: 'Error en el servidor' });
    }
}

exports.getById = async (req, res) => {
    try {
        const { id } = req.params;
        const language = await findById(id);
        res.status(200).json(language);
    } catch (err) {
        console.error('Error en getById:', err);
        res.status(500).json({ message: 'Error en el servidor' });
    }
}

exports.getByRouteId = async (req, res) => {
    try {
        const { id_language } = req.params;
        const language = await findByRouteId(id_language);
        res.status(200).json(language);
    } catch (err) {
        console.error('Error en getByLanguageId:', err);
        res.status(500).json({ message: 'Error en el servidor' });
    }
}
const { getAll, save, findById, findByRouteId } = require("../models/challengeModel");

exports.getAll = async (req, res) => {
    try {
        const challenges = await getAll();
        res.status(200).json(challenges);
    } catch (err) {
        console.error('Error en getAllchallenges:', err);
        res.status(500).json({ message: 'Error en el servidor' });
    }
}

exports.save = async (req, res) => {
    try {
        const { name, description, id_challenge } = req.body;
        const challenge = await save(name, description, id_challenge);
        res.status(201).json(challenge);
    } catch (err) {
        console.error('Error en save:', err);
        res.status(500).json({ message: 'Error en el servidor' });
    }
}

exports.getById = async (req, res) => {
    try {
        const { id } = req.params;
        const challenge = await findById(id);
        res.status(200).json(challenge);
    } catch (err) {
        console.error('Error en getById:', err);
        res.status(500).json({ message: 'Error en el servidor' });
    }
}

exports.getByRouteId = async (req, res) => {
    try {
        const { id_challenge } = req.params;
        const challenge = await findByRouteId(id_challenge);
        res.status(200).json(challenge);
    } catch (err) {
        console.error('Error en getBychallengeId:', err);
        res.status(500).json({ message: 'Error en el servidor' });
    }
}
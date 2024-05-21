const { save, getAll, getById } = require("../models/challengeModel");

exports.save = async (req, res) => {
    try {
        console.log(req);
        // check nullity of title and content
        if (!req.body.title || !req.body.content || !req.body.description) {
            console.log('Faltan campos por llenar');
            return res.status(400).json({ message: 'Faltan campos por llenar' });
        }
        const { title, content, description } = req.body;
        console.log('title:', title, '\ncontent:', content, '\ndescription:', description);
        const challenge = await save({ title, content, description });
        res.status(200).json({ message: "Challenge creado exitosamente", challenge });
    } catch (err) {
        console.error('Error en save:', err);
        res.status(500).json({ message: 'Error en el servidor' });
    }
}


exports.getAll = async (req, res) => {
    try {
        const challenges = await getAll();
        res.status(200).json(challenges);
    } catch (err) {
        console.error('Error en getAll:', err);
        res.status(500).json({ message: 'Error en el servidor' });
    }
}

exports.getById = async (req, res) => {
    try {
        const { id } = req.params;
        const challenge = await getById(id);
        res.status(200).json(challenge);
    } catch (err) {
        console.error('Error en getById:', err);
        res.status(500).json({ message: 'Error en el servidor' });
    }
}
const { findById, getAll, save } = require("../models/routeModel");

exports.getAll = async (req, res) => {
    try {
        const routes = await getAll();
        res.status(200).json(routes);
    } catch (err) {
        console.error('Error en getAllRoutes:', err);
        res.status(500).json({ message: 'Error en el servidor' });
    }
}

exports.getById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await findById(id);
        if (!user) {
            return res.status(400).json({ message: 'Esa ruta no existe' });
        }
        res.json(user);
    } catch (err) {
        console.error('Error en getById:', err);
        res.status(500).json({ message: 'Error en el servidor' });
    }
}

exports.save = async (req, res) => {
    try {
        const { name, description, content } = req.body;
        const user = await save(name, description, content);
        res.status(201).json(user);
    } catch (err) {
        console.error('Error en saveRoute:', err);
        res.status(500).json({ message: 'Error en el servidor' });
    }
}
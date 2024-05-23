const express = require('express');
const { getAll, save, getByRouteId, getById } = require('../../controllers/languageController');

const router = express.Router();


router.get('/', getAll);
router.post('/', save);
router.get('/:id', getById);
router.get('/:email', getByRouteId);

module.exports = router;

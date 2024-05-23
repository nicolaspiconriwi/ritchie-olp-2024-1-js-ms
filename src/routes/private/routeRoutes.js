const express = require('express');
const { getAll, getById, save} = require('../../controllers/routeController');

const router = express.Router();

router.post('/', save);
router.get('/', getAll);
router.get('/:id', getById);

module.exports = router;

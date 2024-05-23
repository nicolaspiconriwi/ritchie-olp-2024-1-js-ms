const express = require('express');
const { getAll, getById} = require('../../controllers/routeController');

const router = express.Router();

router.get('/', getAll);
router.post('/', create);
router.get('/:id', getById);

module.exports = router;

const express = require('express');

const router = express.Router();

const { save, getAll, getById } = require('../../controllers/challengeController');

router.post('/', save);
router.get('/', getAll);
router.get('/:id', getById);

module.exports = router;

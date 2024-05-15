const express = require('express');
const { getAll } = require('../../controllers/challengeController');

const router = express.Router();

router.get('/', getAll)

module.exports = router;
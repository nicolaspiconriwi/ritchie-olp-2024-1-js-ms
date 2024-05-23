const express = require('express');
const { getAll, save, getByLanguageId } = require('../../controllers/moduleController');

const router = express.Router();

router.get('/', getAll);
router.post('/', save);
router.get('/:id', getById);
router.get('/:email', getByLanguageId);


module.exports = router;

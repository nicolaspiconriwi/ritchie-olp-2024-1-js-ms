const userRoutes = require('./userRoutes'); 
const challengeRoutes = require('./challengeRoutes');
const express = require('express');
const moduleRoutes = require('./moduleRoutes');

const router = express.Router();

// router.use('/languages', languageRoutes);
// router.use('/modules', moduleRoutes);
// router.use('/routes', routeRoutes);
// router.use('/users', userRoutes);
router.use('/challenges', challengeRoutes);
router.use('/modules', moduleRoutes);
module.exports = router;

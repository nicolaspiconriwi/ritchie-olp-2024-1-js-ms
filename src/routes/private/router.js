const userRoutes = require('./userRoutes'); 
const challengeRoutes = require('./challengeRoutes');
const moduleRoutes = require('./moduleRoutes');
const languageRoutes = require('./languageRoutes');
const routeRoutes = require('./routeRoutes');
const express = require('express');

const router = express.Router();

// Users
router.use('/users', userRoutes);

// Challenges
// router.use('/challenges', challengeRoutes);

// Modules
router.use('/modules', moduleRoutes);

// Languages
router.use('/languages', languageRoutes);

// Routes
router.use('/routes', routeRoutes);



module.exports = router;

const express = require('express');
const { matchCreators, matchBrands } = require('../controllers/matchController');

const router = express.Router();

// POST /api/match - Brand-Creator matching endpoint
router.post('/match', matchCreators);

// POST /api/match-brands - Creator-Brand matching endpoint
router.post('/match-brands', matchBrands);

module.exports = router;

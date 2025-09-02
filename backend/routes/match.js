const express = require('express');
const { matchCreators } = require('../controllers/matchController');

const router = express.Router();

// POST /api/match - Brand-Creator matching endpoint
router.post('/match', matchCreators);

module.exports = router;

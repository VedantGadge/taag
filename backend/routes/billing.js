const express = require('express');
const { submitBrandBilling, submitCreatorPayout } = require('../controllers/billingController');

const router = express.Router();

// POST /api/billing/brand - Brand billing details
router.post('/brand', submitBrandBilling);

// POST /api/billing/creator - Creator payout details
router.post('/creator', submitCreatorPayout);

module.exports = router;

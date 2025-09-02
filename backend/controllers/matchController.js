const { calculateMatchScores } = require('../services/matchingService');
const { creators } = require('../db');

/**
 * Handle brand-creator matching requests
 */
const matchCreators = async (req, res) => {
  try {
    const brandBrief = req.body;
    
    // Validate required fields
    const requiredFields = ['category', 'targetLocations', 'targetAges', 'platforms', 'budgetINR'];
    const missingFields = requiredFields.filter(field => !brandBrief[field]);
    
    if (missingFields.length > 0) {
      return res.status(400).json({
        error: 'Missing required fields',
        missingFields
      });
    }
    
    // Calculate match scores
    const matchResults = calculateMatchScores(brandBrief, creators);
    
    res.json({
      success: true,
      totalMatches: matchResults.length,
      matches: matchResults
    });
  } catch (error) {
    console.error('Error in matchCreators:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
};

module.exports = {
  matchCreators
};

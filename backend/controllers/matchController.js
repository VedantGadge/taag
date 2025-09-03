const { calculateMatchScores, calculateBrandMatches } = require('../services/matchingService');
const { creators, brands } = require('../db');

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

/**
 * Handle creator-brand matching requests
 */
const matchBrands = async (req, res) => {
  try {
    const creatorBrief = req.body;
    
    // Validate required fields
    const requiredFields = ['categories', 'platforms', 'minBudgetINR', 'maxBudgetINR', 'collaborationTypes'];
    const missingFields = requiredFields.filter(field => !creatorBrief[field]);
    
    if (missingFields.length > 0) {
      return res.status(400).json({
        error: 'Missing required fields',
        missingFields
      });
    }
    
    // Calculate brand match scores
    const matchResults = calculateBrandMatches(creatorBrief, brands);
    
    res.json({
      success: true,
      totalMatches: matchResults.length,
      matches: matchResults
    });
  } catch (error) {
    console.error('Error in matchBrands:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
};

module.exports = {
  matchCreators,
  matchBrands
};

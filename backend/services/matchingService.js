/**
 * Core matching algorithm for brand-creator matching
 */

/**
 * Calculate relevance score based on brand category and creator experience
 */
function calculateRelevance(brand, creator) {
  const { category } = brand;
  const { pastBrandCategories, verticals } = creator;
  
  // Perfect match: brand category in past brand categories
  if (pastBrandCategories.includes(category)) {
    return {
      score: 100,
      reason: `Proven experience in ${category}`
    };
  }
  
  // Good match: brand category in creator verticals
  if (verticals.includes(category)) {
    return {
      score: 70,
      reason: `Relevant Vertical: ${category}`
    };
  }
  
  // No relevance
  return {
    score: 0,
    reason: "No direct relevance"
  };
}

/**
 * Calculate audience fit based on location and age demographics
 */
function calculateAudienceFit(brand, creator) {
  const { targetLocations, targetAges } = brand;
  const { audienceGeo, audienceAge } = creator;
  
  // Calculate location score
  let locationScore = 0;
  targetLocations.forEach(location => {
    if (audienceGeo[location]) {
      locationScore += audienceGeo[location];
    }
  });
  locationScore = Math.min(locationScore * 100, 100); // Convert to percentage, cap at 100
  
  // Calculate age score
  let ageScore = 0;
  const [minAge, maxAge] = targetAges;
  
  // Map age ranges to overlap calculation
  Object.entries(audienceAge).forEach(([ageRange, percentage]) => {
    const [rangeMin, rangeMax] = ageRange.includes('+') 
      ? [parseInt(ageRange), 100] 
      : ageRange.split('-').map(Number);
    
    // Calculate overlap between brand target and creator audience
    const overlapMin = Math.max(minAge, rangeMin);
    const overlapMax = Math.min(maxAge, rangeMax || 100);
    
    if (overlapMin <= overlapMax) {
      const overlapSize = overlapMax - overlapMin + 1;
      const rangeSize = (rangeMax || 100) - rangeMin + 1;
      const targetSize = maxAge - minAge + 1;
      
      // Calculate proportional overlap
      const overlapRatio = Math.min(overlapSize / rangeSize, overlapSize / targetSize);
      ageScore += percentage * overlapRatio * 100;
    }
  });
  
  // Average location and age scores
  const totalScore = (locationScore + ageScore) / 2;
  
  return {
    score: Math.round(totalScore),
    reason: `${Math.round(locationScore)}% audience match in target cities`
  };
}

/**
 * Calculate performance score based on cost-per-view and engagement
 */
function calculatePerformance(brand, creator, allCreators) {
  const { basePriceINR, avgViews, engagementRate } = creator;
  
  // Calculate Cost Per View (CPV)
  const cpv = basePriceINR / avgViews;
  
  // Find min and max CPV for normalization
  const allCPVs = allCreators.map(c => c.basePriceINR / c.avgViews);
  const minCPV = Math.min(...allCPVs);
  const maxCPV = Math.max(...allCPVs);
  
  // Normalize CPV score (lower CPV = higher score)
  const cpvScore = maxCPV === minCPV ? 50 : ((maxCPV - cpv) / (maxCPV - minCPV)) * 50;
  
  // Engagement score (normalize engagement rate to 0-50 scale)
  const engagementScore = Math.min(engagementRate * 1000, 50); // Scale engagement rate
  
  const totalScore = cpvScore + engagementScore;
  
  const reason = engagementRate > 0.05 
    ? `High ${(engagementRate * 100).toFixed(1)}% Engagement`
    : "Great value for money (Low CPV)";
  
  return {
    score: Math.round(totalScore),
    reason
  };
}

/**
 * Calculate constraint satisfaction score
 */
function calculateConstraints(brand, creator) {
  const { noAdultContent } = brand;
  const { safetyFlags } = creator;
  
  // Check adult content constraint
  if (noAdultContent && safetyFlags.adult) {
    return {
      score: 0,
      reason: "Violates content guidelines"
    };
  }
  
  return {
    score: 100,
    reason: "Meets all constraints"
  };
}

/**
 * Filter creators based on basic eligibility criteria
 */
function filterEligibleCreators(brandBrief, creators) {
  return creators.filter(creator => {
    // Budget filter
    if (creator.basePriceINR > brandBrief.budgetINR) {
      return false;
    }
    
    // Platform filter
    const hasRequiredPlatform = brandBrief.platforms.some(platform => 
      creator.platforms.includes(platform)
    );
    if (!hasRequiredPlatform) {
      return false;
    }
    
    // Adult content filter
    if (brandBrief.noAdultContent && creator.safetyFlags.adult) {
      return false;
    }
    
    return true;
  });
}

/**
 * Apply diversification rule to promote variety in top results
 */
function applyDiversification(rankedCreators) {
  if (rankedCreators.length < 3) return rankedCreators;
  
  const top3 = rankedCreators.slice(0, 3);
  const primaryVerticals = top3.map(creator => creator.verticals[0]);
  
  // Check if all top 3 have the same primary vertical
  if (primaryVerticals[0] === primaryVerticals[1] && primaryVerticals[1] === primaryVerticals[2]) {
    // Find the next creator with a different primary vertical
    const remaining = rankedCreators.slice(3);
    const diverseCreatorIndex = remaining.findIndex(creator => 
      creator.verticals[0] !== primaryVerticals[0]
    );
    
    if (diverseCreatorIndex !== -1) {
      const diverseCreator = remaining[diverseCreatorIndex];
      // Add diversification reason
      diverseCreator.reasons.push("Promoted for diversification");
      
      // Swap with 3rd position
      rankedCreators[2] = diverseCreator;
      rankedCreators[3 + diverseCreatorIndex] = top3[2];
    }
  }
  
  return rankedCreators;
}

/**
 * Main function to calculate match scores for all creators
 */
function calculateMatchScores(brandBrief, creators) {
  // Step 1: Filter eligible creators
  const eligibleCreators = filterEligibleCreators(brandBrief, creators);
  
  if (eligibleCreators.length === 0) {
    return [];
  }
  
  // Step 2: Calculate scores for each creator
  const scoredCreators = eligibleCreators.map(creator => {
    const relevance = calculateRelevance(brandBrief, creator);
    const audienceFit = calculateAudienceFit(brandBrief, creator);
    const performance = calculatePerformance(brandBrief, creator, eligibleCreators);
    const constraints = calculateConstraints(brandBrief, creator);
    
    // Calculate weighted total score
    const totalScore = Math.round(
      (relevance.score * 0.4) +
      (audienceFit.score * 0.3) +
      (performance.score * 0.2) +
      (constraints.score * 0.1)
    );
    
    // Collect top 3 reasons (non-zero scores)
    const allReasons = [relevance, audienceFit, performance, constraints]
      .filter(component => component.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map(component => component.reason);
    
    return {
      ...creator,
      matchScore: totalScore,
      reasons: allReasons,
      breakdown: {
        relevance: relevance.score,
        audienceFit: audienceFit.score,
        performance: performance.score,
        constraints: constraints.score
      }
    };
  });
  
  // Step 3: Sort by score
  const sortedCreators = scoredCreators.sort((a, b) => b.matchScore - a.matchScore);
  
  // Step 4: Apply diversification
  const finalResults = applyDiversification(sortedCreators);
  
  return finalResults;
}

module.exports = {
  calculateMatchScores,
  calculateRelevance,
  calculateAudienceFit,
  calculatePerformance,
  calculateConstraints
};

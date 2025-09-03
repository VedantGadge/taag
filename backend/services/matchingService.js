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

/**
 * Calculate brand matches for creators
 */
function calculateBrandMatches(creatorBrief, brands) {
  // Step 1: Filter eligible brands
  const eligibleBrands = filterEligibleBrands(creatorBrief, brands);
  
  if (eligibleBrands.length === 0) {
    return [];
  }
  
  // Step 2: Calculate scores for each brand
  const scoredBrands = eligibleBrands.map(brand => {
    const categoryMatch = calculateBrandCategoryMatch(creatorBrief, brand);
    const budgetFit = calculateBrandBudgetFit(creatorBrief, brand);
    const collaborationMatch = calculateCollaborationMatch(creatorBrief, brand);
    const audienceAlignment = calculateBrandAudienceAlignment(creatorBrief, brand);
    
    // Calculate weighted total score
    const totalScore = Math.round(
      (categoryMatch.score * 0.4) +
      (budgetFit.score * 0.3) +
      (collaborationMatch.score * 0.2) +
      (audienceAlignment.score * 0.1)
    );
    
    // Collect top 3 reasons
    const allReasons = [categoryMatch, budgetFit, collaborationMatch, audienceAlignment]
      .filter(component => component.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map(component => component.reason);
    
    return {
      ...brand,
      matchScore: totalScore,
      reasons: allReasons,
      breakdown: {
        categoryMatch: categoryMatch.score,
        budgetFit: budgetFit.score,
        collaborationMatch: collaborationMatch.score,
        audienceAlignment: audienceAlignment.score
      }
    };
  });
  
  // Step 3: Sort by score
  const sortedBrands = scoredBrands.sort((a, b) => b.matchScore - a.matchScore);
  
  return sortedBrands;
}

/**
 * Filter brands based on creator preferences
 */
function filterEligibleBrands(creatorBrief, brands) {
  return brands.filter(brand => {
    // Budget filter
    if (brand.budgetINR < creatorBrief.minBudgetINR || brand.budgetINR > creatorBrief.maxBudgetINR) {
      return false;
    }
    
    // Platform filter
    const hasSharedPlatform = creatorBrief.platforms.some(platform => 
      brand.platforms.includes(platform)
    );
    if (!hasSharedPlatform) {
      return false;
    }
    
    // Content exclusions
    if (creatorBrief.exclusions.noAdultContent && brand.constraints?.allowsAdultContent) {
      return false;
    }
    
    return true;
  });
}

/**
 * Calculate category match between creator and brand
 */
function calculateBrandCategoryMatch(creatorBrief, brand) {
  const { categories } = creatorBrief;
  const { category } = brand;
  
  // Perfect match: brand category in creator's categories
  if (categories.includes(category)) {
    return {
      score: 100,
      reason: `Perfect category match: ${category}`
    };
  }
  
  // Partial match for related categories
  const relatedCategories = {
    'Fashion': ['Beauty', 'Lifestyle'],
    'Beauty': ['Fashion', 'Lifestyle'],
    'Technology': ['Education', 'Business'],
    'Food': ['Lifestyle', 'Travel'],
    'Travel': ['Lifestyle', 'Food'],
    'Fitness': ['Lifestyle', 'Wellness'],
  };
  
  if (relatedCategories[category]?.some(related => categories.includes(related))) {
    return {
      score: 70,
      reason: `Related category alignment`
    };
  }
  
  return {
    score: 0,
    reason: "No category alignment"
  };
}

/**
 * Calculate budget fit score
 */
function calculateBrandBudgetFit(creatorBrief, brand) {
  const { minBudgetINR, maxBudgetINR } = creatorBrief;
  const { budgetINR } = brand;
  
  // Within preferred range
  if (budgetINR >= minBudgetINR && budgetINR <= maxBudgetINR) {
    const midpoint = (minBudgetINR + maxBudgetINR) / 2;
    const distance = Math.abs(budgetINR - midpoint);
    const maxDistance = (maxBudgetINR - minBudgetINR) / 2;
    const score = Math.max(80, 100 - (distance / maxDistance) * 20);
    
    return {
      score: Math.round(score),
      reason: `Budget fits your range (₹${budgetINR.toLocaleString()})`
    };
  }
  
  return {
    score: 0,
    reason: "Budget outside preferred range"
  };
}

/**
 * Calculate collaboration type match
 */
function calculateCollaborationMatch(creatorBrief, brand) {
  const { collaborationTypes, preferredTones } = creatorBrief;
  const { tone } = brand;
  
  let score = 0;
  let reasons = [];
  
  // Check collaboration alignment (simplified - in real app, brands would specify preferred types)
  if (collaborationTypes.includes('Sponsored Posts') || collaborationTypes.includes('Brand Ambassador')) {
    score += 60;
    reasons.push('Suitable collaboration types');
  }
  
  // Check tone alignment
  const toneMatch = preferredTones.some(creatorTone => 
    tone.some(brandTone => brandTone.toLowerCase().includes(creatorTone.toLowerCase()))
  );
  
  if (toneMatch) {
    score += 40;
    reasons.push('Brand tone alignment');
  }
  
  return {
    score: Math.min(score, 100),
    reason: reasons.join(', ') || 'Limited collaboration fit'
  };
}

/**
 * Calculate audience alignment
 */
function calculateBrandAudienceAlignment(creatorBrief, brand) {
  const { audienceDemographics } = creatorBrief;
  const { targetLocations, targetAges } = brand;
  
  let score = 0;
  
  // Location alignment
  const locationMatch = audienceDemographics.locations.some(location => 
    targetLocations.includes(location)
  );
  if (locationMatch) {
    score += 50;
  }
  
  // Age alignment (simplified)
  const creatorAgeRanges = audienceDemographics.ageGroups;
  const brandAgeRange = targetAges; // [minAge, maxAge]
  
  if (creatorAgeRanges.some(range => {
    const [min, max] = range.includes('+') ? [65, 100] : range.split('-').map(Number);
    return (min <= brandAgeRange[1] && max >= brandAgeRange[0]);
  })) {
    score += 50;
  }
  
  return {
    score,
    reason: score > 50 ? 'Good audience alignment' : 'Limited audience overlap'
  };
}

module.exports = {
  calculateMatchScores,
  calculateBrandMatches,
  calculateRelevance,
  calculateAudienceFit,
  calculatePerformance,
  calculateConstraints
};

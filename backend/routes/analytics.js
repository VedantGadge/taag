const express = require('express');
const router = express.Router();
const { creators, brands } = require('../db');

// Get overall platform analytics
router.get('/overview', (req, res) => {
  console.log('📊 Analytics Overview API called');
  try {
    // Calculate key metrics
    const totalCreators = creators.length;
    const totalBrands = brands.length;
    
    const totalEarnings = creators.reduce((sum, creator) => {
      // Simulate earnings based on price and estimated campaigns
      const estimatedCampaigns = Math.floor(Math.random() * 20) + 5;
      return sum + (creator.basePriceINR * estimatedCampaigns * 0.3); // 30% of campaign value
    }, 0);
    
    const avgEngagement = creators.reduce((sum, creator) => sum + creator.engagementRate, 0) / creators.length;
    
    // Category distribution
    const categoryStats = creators.reduce((acc, creator) => {
      creator.verticals.forEach(vertical => {
        if (!acc[vertical]) {
          acc[vertical] = { creators: 0, totalEarnings: 0, avgEngagement: 0 };
        }
        acc[vertical].creators += 1;
        acc[vertical].totalEarnings += creator.basePriceINR * 3; // Estimate
        acc[vertical].avgEngagement += creator.engagementRate;
      });
      return acc;
    }, {});
    
    // Calculate averages for categories
    Object.keys(categoryStats).forEach(category => {
      categoryStats[category].avgEngagement = 
        categoryStats[category].avgEngagement / categoryStats[category].creators;
    });
    
    // Location distribution
    const locationStats = creators.reduce((acc, creator) => {
      const topLocation = Object.keys(creator.audienceGeo).reduce((a, b) => 
        creator.audienceGeo[a] > creator.audienceGeo[b] ? a : b
      );
      
      if (!acc[topLocation]) {
        acc[topLocation] = 0;
      }
      acc[topLocation] += 1;
      return acc;
    }, {});
    
    // Platform distribution
    const platformStats = creators.reduce((acc, creator) => {
      creator.platforms.forEach(platform => {
        if (!acc[platform]) {
          acc[platform] = { users: 0, totalViews: 0 };
        }
        acc[platform].users += 1;
        acc[platform].totalViews += creator.avgViews;
      });
      return acc;
    }, {});
    
    // Top performers
    const topCreatorsByEngagement = [...creators]
      .sort((a, b) => b.engagementRate - a.engagementRate)
      .slice(0, 5)
      .map(creator => ({
        name: creator.handle,
        engagement: creator.engagementRate,
        followers: creator.avgViews / 1000, // Simulate followers from views
        earnings: creator.basePriceINR * 3 // Estimate earnings
      }));
    
    res.json({
      overview: {
        totalCreators,
        totalBrands,
        totalEarnings,
        avgEngagement: Math.round(avgEngagement * 100) / 100
      },
      categoryStats: Object.keys(categoryStats).map(name => ({
        name,
        ...categoryStats[name]
      })),
      locationStats: Object.keys(locationStats).map(name => ({
        name,
        value: locationStats[name]
      })),
      platformStats: Object.keys(platformStats).map(name => ({
        name,
        ...platformStats[name]
      })),
      topPerformers: topCreatorsByEngagement
    });
  } catch (error) {
    console.error('Error getting analytics overview:', error);
    res.status(500).json({ error: 'Failed to get analytics overview' });
  }
});

// Get creator analytics
router.get('/creators', (req, res) => {
  console.log('👤 Creator Analytics API called with filters:', req.query);
  try {
    const { category, location, platform, sortBy = 'engagement', order = 'desc' } = req.query;
    
    let filteredCreators = [...creators];
    
    // Apply filters
    if (category) {
      filteredCreators = filteredCreators.filter(creator => 
        creator.verticals.includes(category)
      );
    }
    
    if (location) {
      filteredCreators = filteredCreators.filter(creator => 
        Object.keys(creator.audienceGeo).includes(location)
      );
    }
    
    if (platform) {
      filteredCreators = filteredCreators.filter(creator => 
        creator.platforms.includes(platform)
      );
    }
    
    // Add computed fields
    const enrichedCreators = filteredCreators.map(creator => {
      const topLocation = Object.keys(creator.audienceGeo).reduce((a, b) => 
        creator.audienceGeo[a] > creator.audienceGeo[b] ? a : b
      );
      
      // Simulate additional data
      const estimatedFollowers = Math.floor(creator.avgViews * (1.5 + Math.random()));
      const estimatedEarnings = creator.basePriceINR * (Math.floor(Math.random() * 15) + 5);
      const campaignCount = Math.floor(Math.random() * 25) + 3;
      const rating = 4.2 + Math.random() * 0.8;
      
      return {
        id: creator._id,
        handle: creator.handle,
        name: creator.handle.replace('@', '').split(/(?=[A-Z])/).map(word => 
          word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' '),
        category: creator.verticals[0],
        platforms: creator.platforms,
        followers: estimatedFollowers,
        avgViews: creator.avgViews,
        engagementRate: creator.engagementRate,
        location: topLocation,
        earnings: estimatedEarnings,
        campaignsCompleted: campaignCount,
        rating: Math.round(rating * 10) / 10,
        joinDate: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
        lastActive: new Date(2024, 7, Math.floor(Math.random() * 31) + 1).toISOString().split('T')[0]
      };
    });
    
    // Sort creators
    enrichedCreators.sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];
      
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }
      
      if (order === 'desc') {
        return bValue > aValue ? 1 : -1;
      } else {
        return aValue > bValue ? 1 : -1;
      }
    });
    
    res.json({
      creators: enrichedCreators,
      totalCount: enrichedCreators.length,
      filters: { category, location, platform, sortBy, order }
    });
  } catch (error) {
    console.error('Error getting creator analytics:', error);
    res.status(500).json({ error: 'Failed to get creator analytics' });
  }
});

// Get brand analytics
router.get('/brands', (req, res) => {
  console.log('🏢 Brand Analytics API called with filters:', req.query);
  try {
    const { category, location, sortBy = 'totalSpent', order = 'desc' } = req.query;
    
    let filteredBrands = [...brands];
    
    // Apply filters
    if (category) {
      filteredBrands = filteredBrands.filter(brand => brand.category === category);
    }
    
    if (location) {
      filteredBrands = filteredBrands.filter(brand => 
        brand.targetLocations.includes(location)
      );
    }
    
    // Add computed fields
    const enrichedBrands = filteredBrands.map(brand => {
      const campaignCount = Math.floor(Math.random() * 15) + 3;
      const totalSpent = brand.budgetINR * campaignCount;
      const avgCampaignBudget = totalSpent / campaignCount;
      const roi = 2.5 + Math.random() * 2;
      
      return {
        id: brand._id,
        name: brand.name,
        category: brand.category,
        industry: `${brand.category} Industry`,
        location: brand.targetLocations[0],
        totalSpent,
        campaignsRun: campaignCount,
        avgCampaignBudget,
        topPerformingCreator: creators[Math.floor(Math.random() * creators.length)].handle,
        joinDate: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
        lastCampaign: new Date(2024, 7, Math.floor(Math.random() * 31) + 1).toISOString().split('T')[0],
        roi: Math.round(roi * 10) / 10
      };
    });
    
    // Sort brands
    enrichedBrands.sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];
      
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }
      
      if (order === 'desc') {
        return bValue > aValue ? 1 : -1;
      } else {
        return aValue > bValue ? 1 : -1;
      }
    });
    
    res.json({
      brands: enrichedBrands,
      totalCount: enrichedBrands.length,
      filters: { category, location, sortBy, order }
    });
  } catch (error) {
    console.error('Error getting brand analytics:', error);
    res.status(500).json({ error: 'Failed to get brand analytics' });
  }
});

// Get trending data
router.get('/trending', (req, res) => {
  try {
    // Simulate trending data
    const trendingCategories = creators.reduce((acc, creator) => {
      creator.verticals.forEach(vertical => {
        if (!acc[vertical]) {
          acc[vertical] = { category: vertical, growth: 0, creators: 0 };
        }
        acc[vertical].creators += 1;
        acc[vertical].growth += Math.random() * 50 + 10; // Random growth 10-60%
      });
      return acc;
    }, {});
    
    Object.keys(trendingCategories).forEach(category => {
      trendingCategories[category].growth = Math.round(
        trendingCategories[category].growth / trendingCategories[category].creators
      );
    });
    
    const trending = Object.values(trendingCategories)
      .sort((a, b) => b.growth - a.growth)
      .slice(0, 5);
    
    // Top performing campaigns (simulated)
    const topCampaigns = creators.slice(0, 5).map((creator, index) => ({
      id: `campaign_${index + 1}`,
      brand: brands[index % brands.length].name,
      creator: creator.handle,
      category: creator.verticals[0],
      reach: creator.avgViews * (1.2 + Math.random() * 0.8),
      engagement: creator.engagementRate,
      roi: 2.5 + Math.random() * 2
    }));
    
    res.json({
      trendingCategories: trending,
      topCampaigns
    });
  } catch (error) {
    console.error('Error getting trending data:', error);
    res.status(500).json({ error: 'Failed to get trending data' });
  }
});

module.exports = router;

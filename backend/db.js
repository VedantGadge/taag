const creators = [
  {
    "_id": "c1",
    "handle": "@fitwithria",
    "verticals": ["Fitness", "Lifestyle"],
    "platforms": ["Instagram", "YouTube"],
    "audienceGeo": { "Mumbai": 0.42, "Delhi": 0.2, "Pune": 0.15, "Bengaluru": 0.13, "Others": 0.1 },
    "audienceAge": { "18-24": 0.55, "25-34": 0.35, "35-44": 0.1 },
    "avgViews": 120000,
    "engagementRate": 0.047,
    "pastBrandCategories": ["Fashion", "Wellness"],
    "contentTone": ["energetic", "fun"],
    "safetyFlags": { "adult": false },
    "basePriceINR": 80000
  },
  {
    "_id": "c2",
    "handle": "@techbyraj",
    "verticals": ["Technology", "Education"],
    "platforms": ["YouTube", "LinkedIn"],
    "audienceGeo": { "Bengaluru": 0.5, "Hyderabad": 0.2, "Chennai": 0.15, "Mumbai": 0.1, "Others": 0.05 },
    "audienceAge": { "18-24": 0.25, "25-34": 0.5, "35-44": 0.2, "45+": 0.05 },
    "avgViews": 95000,
    "engagementRate": 0.032,
    "pastBrandCategories": ["EdTech", "Fintech"],
    "contentTone": ["informative", "serious"],
    "safetyFlags": { "adult": false },
    "basePriceINR": 60000
  },
  {
    "_id": "c3",
    "handle": "@foodiesneha",
    "verticals": ["Food", "Lifestyle"],
    "platforms": ["Instagram", "Reels"],
    "audienceGeo": { "Delhi": 0.6, "Mumbai": 0.25, "Noida": 0.1, "Others": 0.05 },
    "audienceAge": { "18-24": 0.6, "25-34": 0.3, "35-44": 0.1 },
    "avgViews": 150000,
    "engagementRate": 0.056,
    "pastBrandCategories": ["Food", "Hospitality"],
    "contentTone": ["fun", "casual"],
    "safetyFlags": { "adult": false },
    "basePriceINR": 70000
  },
  {
    "_id": "c4",
    "handle": "@travelwithsara",
    "verticals": ["Travel", "Lifestyle"],
    "platforms": ["Instagram", "YouTube"],
    "audienceGeo": { "Mumbai": 0.3, "Delhi": 0.25, "Bengaluru": 0.2, "Goa": 0.15, "Others": 0.1 },
    "audienceAge": { "18-24": 0.4, "25-34": 0.45, "35-44": 0.15 },
    "avgViews": 110000,
    "engagementRate": 0.051,
    "pastBrandCategories": ["Travel", "Hospitality", "Fashion"],
    "contentTone": ["inspiring", "adventurous"],
    "safetyFlags": { "adult": false },
    "basePriceINR": 75000
  },
  {
    "_id": "c5",
    "handle": "@fashionbymaya",
    "verticals": ["Fashion", "Beauty"],
    "platforms": ["Instagram", "TikTok"],
    "audienceGeo": { "Mumbai": 0.35, "Delhi": 0.3, "Bengaluru": 0.2, "Others": 0.15 },
    "audienceAge": { "18-24": 0.65, "25-34": 0.25, "35-44": 0.1 },
    "avgViews": 85000,
    "engagementRate": 0.062,
    "pastBrandCategories": ["Fashion", "Beauty", "Lifestyle"],
    "contentTone": ["trendy", "stylish"],
    "safetyFlags": { "adult": false },
    "basePriceINR": 65000
  }
];

const brands = [
  {
    "_id": "b1",
    "name": "Acme Activewear",
    "category": "Fashion",
    "budgetINR": 500000,
    "targetLocations": ["Mumbai", "Delhi"],
    "targetAges": [18, 30],
    "goals": ["installs", "awareness"],
    "tone": ["energetic", "clean"],
    "platforms": ["Instagram", "YouTube"],
    "constraints": { "noAdultContent": true, "timelineDays": 21 }
  },
  {
    "_id": "b2",
    "name": "FinSmart",
    "category": "Fintech",
    "budgetINR": 300000,
    "targetLocations": ["Bengaluru", "Hyderabad"],
    "targetAges": [22, 35],
    "goals": ["signups", "sales"],
    "tone": ["informative", "trustworthy"],
    "platforms": ["YouTube", "LinkedIn"],
    "constraints": { "noAdultContent": true, "timelineDays": 30 }
  }
];

module.exports = { creators, brands };

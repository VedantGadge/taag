import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Button,
  Paper,
  Avatar,
  LinearProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  TextField,
  InputAdornment,
  Breadcrumbs,
  Link,
} from '@mui/material';
import {
  Business,
  TrendingUp,
  FilterList,
  Search,
  Home,
  ChevronRight,
  Campaign,
  MonetizationOn,
  Schedule,
  LocationOn,
} from '@mui/icons-material';

const BrandMatchConsole = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get data from navigation state
  const matchResults = location.state?.matchResults;
  const creatorBrief = location.state?.creatorBrief;
  
  // State management
  const [filters, setFilters] = useState({
    minScore: 0,
    category: '',
    maxBudget: 10000000,
    sortBy: 'score'
  });
  
  const [filteredResults, setFilteredResults] = useState([]);

  // Redirect if no match results
  useEffect(() => {
    if (!matchResults) {
      navigate('/creator-brief');
    }
  }, [matchResults, navigate]);

  // Filter and sort results
  useEffect(() => {
    if (!matchResults?.matches) return;
    
    let filtered = matchResults.matches || [];
    
    // Apply filters
    if (filters.minScore > 0) {
      filtered = filtered.filter(brand => brand.matchScore >= filters.minScore);
    }
    
    if (filters.category) {
      filtered = filtered.filter(brand => brand.category === filters.category);
    }
    
    if (filters.maxBudget < 10000000) {
      filtered = filtered.filter(brand => brand.budgetINR <= filters.maxBudget);
    }
    
    // Sort results
    switch (filters.sortBy) {
      case 'score':
        filtered.sort((a, b) => b.matchScore - a.matchScore);
        break;
      case 'budget':
        filtered.sort((a, b) => b.budgetINR - a.budgetINR);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }
    
    setFilteredResults(filtered);
  }, [matchResults, filters]);

  if (!matchResults) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h6">No brand matches found. Please submit a creator brief first.</Typography>
        <Button variant="contained" onClick={() => navigate('/creator-brief')} sx={{ mt: 2 }}>
          Create Brief
        </Button>
      </Box>
    );
  }

  const allBrands = matchResults.matches || [];
  const categories = [...new Set(allBrands.map(brand => brand.category))];

  const BrandCard = ({ brand }) => (
    <Grid item xs={12} md={6} lg={4} key={brand._id}>
      <Card 
        sx={{ 
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: 3,
          }
        }}
      >
        <CardContent sx={{ flex: 1 }}>
          {/* Brand Header */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar sx={{ backgroundColor: 'primary.main', width: 48, height: 48 }}>
                <Business />
              </Avatar>
              <Box>
                <Typography variant="h6" fontWeight={600}>
                  {brand.name}
                </Typography>
                <Chip 
                  label={brand.category} 
                  size="small" 
                  color="secondary"
                  sx={{ mt: 0.5 }}
                />
              </Box>
            </Box>
            
            {/* Match Score */}
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" fontWeight={700} color="primary.main">
                {brand.matchScore}%
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Match Score
              </Typography>
            </Box>
          </Box>

          {/* Budget and Timeline */}
          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <MonetizationOn sx={{ fontSize: 16, color: 'success.main' }} />
              <Typography variant="body2" fontWeight={600}>
                Budget: ₹{brand.budgetINR?.toLocaleString()}
              </Typography>
            </Box>
            
            {brand.constraints?.timelineDays && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <Schedule sx={{ fontSize: 16, color: 'info.main' }} />
                <Typography variant="body2">
                  Timeline: {brand.constraints.timelineDays} days
                </Typography>
              </Box>
            )}
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <LocationOn sx={{ fontSize: 16, color: 'warning.main' }} />
              <Typography variant="body2">
                Target: {brand.targetLocations?.join(', ')}
              </Typography>
            </Box>
          </Box>

          {/* Platforms */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Platforms:
            </Typography>
            <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
              {brand.platforms?.map(platform => (
                <Chip 
                  key={platform} 
                  label={platform} 
                  size="small" 
                  variant="outlined"
                />
              ))}
            </Box>
          </Box>

          {/* Brand Tone */}
          {brand.tone && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Brand Tone:
              </Typography>
              <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                {brand.tone.map(tone => (
                  <Chip 
                    key={tone} 
                    label={tone} 
                    size="small" 
                    color="primary"
                    variant="outlined"
                  />
                ))}
              </Box>
            </Box>
          )}

          {/* Match Reasons */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Why this is a good match:
            </Typography>
            {brand.reasons?.map((reason, index) => (
              <Typography key={index} variant="body2" sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 1,
                mb: 0.5 
              }}>
                <Box 
                  sx={{ 
                    width: 4, 
                    height: 4, 
                    borderRadius: '50%', 
                    backgroundColor: 'primary.main' 
                  }} 
                />
                {reason}
              </Typography>
            ))}
          </Box>

          {/* Progress Breakdown */}
          {brand.breakdown && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Match Breakdown:
              </Typography>
              <Box sx={{ mb: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                  <Typography variant="caption">Category Match</Typography>
                  <Typography variant="caption">{brand.breakdown.categoryMatch}%</Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={brand.breakdown.categoryMatch} 
                  sx={{ height: 4, borderRadius: 2 }}
                />
              </Box>
              <Box sx={{ mb: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                  <Typography variant="caption">Budget Fit</Typography>
                  <Typography variant="caption">{brand.breakdown.budgetFit}%</Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={brand.breakdown.budgetFit} 
                  sx={{ height: 4, borderRadius: 2 }}
                  color="secondary"
                />
              </Box>
            </Box>
          )}
        </CardContent>

        {/* Actions */}
        <Box sx={{ p: 2, pt: 0 }}>
          <Button 
            variant="contained" 
            fullWidth
            startIcon={<Campaign />}
            onClick={() => navigate('/billing', { 
              state: { 
                selectedBrand: brand,
                creatorBrief: creatorBrief 
              } 
            })}
            sx={{
              background: 'linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #0284c7 0%, #0891b2 100%)',
              }
            }}
          >
            Start Collaboration
          </Button>
        </Box>
      </Card>
    </Grid>
  );

  return (
    <Box sx={{ backgroundColor: 'grey.50', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="xl">
        {/* Breadcrumbs */}
        <Breadcrumbs 
          aria-label="breadcrumb" 
          sx={{ mb: 4 }}
          separator={<ChevronRight fontSize="small" />}
        >
          <Link
            underline="hover"
            color="inherit"
            onClick={() => navigate('/')}
            sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
          >
            <Home sx={{ mr: 0.5 }} fontSize="inherit" />
            Home
          </Link>
          <Link
            underline="hover"
            color="inherit"
            onClick={() => navigate('/creators')}
            sx={{ cursor: 'pointer' }}
          >
            For Creators
          </Link>
          <Link
            underline="hover"
            color="inherit"
            onClick={() => navigate('/creator-brief')}
            sx={{ cursor: 'pointer' }}
          >
            Find Brands
          </Link>
          <Typography color="text.primary">Brand Matches</Typography>
        </Breadcrumbs>

        {/* Header Section */}
        <Paper elevation={2} sx={{ p: 4, mb: 4, borderRadius: 3, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
            <Box>
              <Typography variant="h4" fontWeight={700} gutterBottom>
                Your Brand Matches
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.9 }}>
                Found {matchResults?.totalMatches || 0} brands looking for creators like you
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Button
                variant="outlined"
                startIcon={<Search />}
                onClick={() => navigate('/creator-brief')}
                sx={{ 
                  borderColor: 'white',
                  color: 'white',
                  '&:hover': { 
                    borderColor: 'white',
                    backgroundColor: 'rgba(255,255,255,0.1)' 
                  }
                }}
              >
                New Search
              </Button>
            </Box>
          </Box>

          {/* Brief Summary */}
          {creatorBrief && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ opacity: 0.9 }}>
                Your Preferences
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                {creatorBrief.categories?.map(category => (
                  <Chip 
                    key={category}
                    label={category} 
                    sx={{ backgroundColor: 'rgba(255,255,255,0.2)', color: 'white' }}
                  />
                ))}
                <Chip 
                  label={`₹${creatorBrief.minBudgetINR?.toLocaleString()} - ₹${creatorBrief.maxBudgetINR?.toLocaleString()}`} 
                  sx={{ backgroundColor: 'rgba(255,255,255,0.2)', color: 'white' }}
                />
                {creatorBrief.platforms?.map(platform => (
                  <Chip 
                    key={platform}
                    label={platform} 
                    sx={{ backgroundColor: 'rgba(255,255,255,0.2)', color: 'white' }}
                  />
                ))}
              </Box>
            </Box>
          )}
        </Paper>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ textAlign: 'center', p: 2 }}>
              <Typography variant="h3" fontWeight={700} color="primary.main">
                {matchResults?.totalMatches || 0}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Brand Matches
              </Typography>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ textAlign: 'center', p: 2 }}>
              <Typography variant="h3" fontWeight={700} color="secondary.main">
                {filteredResults.length > 0 ? Math.round(filteredResults.reduce((sum, brand) => sum + brand.matchScore, 0) / filteredResults.length) : 0}%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Average Match Score
              </Typography>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ textAlign: 'center', p: 2 }}>
              <Typography variant="h3" fontWeight={700} color="success.main">
                {filteredResults.length > 0 ? `₹${Math.round(filteredResults.reduce((sum, brand) => sum + brand.budgetINR, 0) / filteredResults.length / 1000)}K` : '₹0'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Average Budget
              </Typography>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ textAlign: 'center', p: 2 }}>
              <Typography variant="h3" fontWeight={700} color="warning.main">
                {filteredResults.filter(brand => brand.matchScore >= 80).length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                High-Match Brands
              </Typography>
            </Card>
          </Grid>
        </Grid>

        {/* Filters Section */}
        <Paper elevation={1} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
            <FilterList color="primary" />
            <Typography variant="h6" fontWeight={600}>
              Filter & Sort Results
            </Typography>
          </Box>
          
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  value={filters.category}
                  label="Category"
                  onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
                >
                  <MenuItem value="">All Categories</MenuItem>
                  {categories.map(category => (
                    <MenuItem key={category} value={category}>{category}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth>
                <InputLabel>Sort By</InputLabel>
                <Select
                  value={filters.sortBy}
                  label="Sort By"
                  onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value }))}
                >
                  <MenuItem value="score">Match Score</MenuItem>
                  <MenuItem value="budget">Budget (High to Low)</MenuItem>
                  <MenuItem value="name">Brand Name</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                type="number"
                label="Max Budget"
                value={filters.maxBudget === 10000000 ? '' : filters.maxBudget}
                onChange={(e) => setFilters(prev => ({ 
                  ...prev, 
                  maxBudget: e.target.value ? parseInt(e.target.value) : 10000000 
                }))}
                InputProps={{
                  startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                }}
                fullWidth
              />
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <Typography gutterBottom>Minimum Match Score: {filters.minScore}%</Typography>
              <Slider
                value={filters.minScore}
                onChange={(_, value) => setFilters(prev => ({ ...prev, minScore: value }))}
                min={0}
                max={100}
                step={5}
                marks
                valueLabelDisplay="auto"
              />
            </Grid>
          </Grid>
        </Paper>

        {/* Results Section */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" fontWeight={600} gutterBottom>
            Your Brand Matches ({filteredResults.length})
          </Typography>
          
          {filteredResults.length === 0 ? (
            <Paper sx={{ p: 6, textAlign: 'center' }}>
              <TrendingUp sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                No brands match your current filters
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Try adjusting your filters to see more results
              </Typography>
              <Button 
                variant="outlined" 
                onClick={() => setFilters({ minScore: 0, category: '', maxBudget: 10000000, sortBy: 'score' })}
              >
                Clear All Filters
              </Button>
            </Paper>
          ) : (
            <Grid container spacing={3}>
              {filteredResults.map(brand => (
                <BrandCard key={brand._id} brand={brand} />
              ))}
            </Grid>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default BrandMatchConsole;

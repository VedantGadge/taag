import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Paper,
  Typography,
  Box,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Alert,
  CircularProgress,
  Chip,
  Container,
  Breadcrumbs,
  Link,
  Card,
  CardContent
} from '@mui/material';
import {
  FilterList,
  Receipt,
  Refresh,
  Home,
  ChevronRight,
  TrendingUp,
  Group,
  LocationOn
} from '@mui/icons-material';
import CreatorCard from '../components/CreatorCard';

const MatchConsole = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [filteredResults, setFilteredResults] = useState([]);
  const [filters, setFilters] = useState({
    minScore: 0,
    location: '',
    vertical: '',
    platform: ''
  });

  const matchResults = location.state?.matchResults;
  const brandBrief = location.state?.brandBrief;

  useEffect(() => {
    if (!matchResults) {
      navigate('/brief');
      return;
    }

    // Apply filters
    let filtered = matchResults.matches || [];
    
    if (filters.minScore > 0) {
      filtered = filtered.filter(creator => creator.matchScore >= filters.minScore);
    }
    
    if (filters.location) {
      filtered = filtered.filter(creator => 
        Object.keys(creator.audienceGeo).includes(filters.location)
      );
    }
    
    if (filters.vertical) {
      filtered = filtered.filter(creator => 
        creator.verticals.includes(filters.vertical)
      );
    }
    
    if (filters.platform) {
      filtered = filtered.filter(creator => 
        creator.platforms.includes(filters.platform)
      );
    }

    setFilteredResults(filtered);
  }, [matchResults, filters, navigate]);

  if (!matchResults) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}>
        <CircularProgress />
      </Box>
    );
  }

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const resetFilters = () => {
    setFilters({
      minScore: 0,
      location: '',
      vertical: '',
      platform: ''
    });
  };

  // Get unique values for filter options
  const allCreators = matchResults.matches || [];
  const uniqueLocations = [...new Set(allCreators.flatMap(creator => Object.keys(creator.audienceGeo)))];
  const uniqueVerticals = [...new Set(allCreators.flatMap(creator => creator.verticals))];
  const uniquePlatforms = [...new Set(allCreators.flatMap(creator => creator.platforms))];

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
            onClick={() => navigate('/brands')}
            sx={{ cursor: 'pointer' }}
          >
            For Brands
          </Link>
          <Link
            underline="hover"
            color="inherit"
            onClick={() => navigate('/brief')}
            sx={{ cursor: 'pointer' }}
          >
            Find Creators
          </Link>
          <Typography color="text.primary">Creator Matches</Typography>
        </Breadcrumbs>

        {/* Header Stats */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={4}>
            <Card sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Group sx={{ fontSize: 40 }} />
                  <Box>
                    <Typography variant="h4" fontWeight="bold">
                      {matchResults?.totalMatches || 0}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      Total Matches Found
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card sx={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', color: 'white' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <TrendingUp sx={{ fontSize: 40 }} />
                  <Box>
                    <Typography variant="h4" fontWeight="bold">
                      {filteredResults.length > 0 ? Math.round(filteredResults.reduce((sum, creator) => sum + creator.matchScore, 0) / filteredResults.length) : 0}%
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      Average Match Score
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', color: 'white' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <LocationOn sx={{ fontSize: 40 }} />
                  <Box>
                    <Typography variant="h4" fontWeight="bold">
                      {brandBrief?.targetLocations?.length || 0}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      Target Locations
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Main Content */}
        <Paper elevation={3} sx={{ borderRadius: 4, overflow: 'hidden' }}>
          {/* Header */}
          <Box sx={{ 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
            color: 'white', 
            p: 4 
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h4" fontWeight="bold">
                Your Creator Matches
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  variant="outlined"
                  startIcon={<Refresh />}
                  onClick={() => navigate('/brief')}
                  sx={{ 
                    color: 'white', 
                    borderColor: 'white',
                    '&:hover': { 
                      borderColor: 'white', 
                      backgroundColor: 'rgba(255,255,255,0.1)' 
                    }
                  }}
                >
                  New Search
                </Button>
                <Button
                  variant="contained"
                  startIcon={<Receipt />}
                  onClick={() => navigate('/billing')}
                  sx={{ 
                    backgroundColor: 'white',
                    color: 'primary.main',
                    '&:hover': { 
                      backgroundColor: 'grey.100' 
                    }
                  }}
                >
                  Proceed to Billing
                </Button>
              </Box>
            </Box>

            {/* Brief Summary */}
            {brandBrief && (
              <Box>
                <Typography variant="h6" gutterBottom sx={{ opacity: 0.9 }}>
                  Campaign Details
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                  <Chip 
                    label={`${brandBrief.category}`} 
                    sx={{ backgroundColor: 'rgba(255,255,255,0.2)', color: 'white' }}
                  />
                  <Chip 
                    label={`₹${brandBrief.budgetINR?.toLocaleString()}`} 
                    sx={{ backgroundColor: 'rgba(255,255,255,0.2)', color: 'white' }}
                  />
                  <Chip 
                    label={`Age: ${brandBrief.targetAges?.[0]}-${brandBrief.targetAges?.[1]}`} 
                    sx={{ backgroundColor: 'rgba(255,255,255,0.2)', color: 'white' }}
                  />
                </Box>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {brandBrief.targetLocations?.slice(0, 5).map(location => (
                    <Chip 
                      key={location} 
                      label={location} 
                      size="small" 
                      sx={{ backgroundColor: 'rgba(255,255,255,0.15)', color: 'white' }}
                    />
                  ))}
                  {brandBrief.targetLocations?.length > 5 && (
                    <Chip 
                      label={`+${brandBrief.targetLocations.length - 5} more`} 
                      size="small" 
                      sx={{ backgroundColor: 'rgba(255,255,255,0.15)', color: 'white' }}
                    />
                  )}
                </Box>
              </Box>
            )}
          </Box>

          <Box sx={{ p: 4 }}>
            {matchResults.totalMatches === 0 ? (
              <Alert 
                severity="info" 
                sx={{ 
                  borderRadius: 3,
                  '& .MuiAlert-icon': { fontSize: '2rem' }
                }}
              >
                <Typography variant="h6" gutterBottom>
                  No Creator Matches Found
                </Typography>
                <Typography>
                  Try adjusting your criteria:
                  <br />• Increase your budget
                  <br />• Add more platforms
                  <br />• Expand target locations
                  <br />• Consider different age ranges
                </Typography>
              </Alert>
            ) : (
              <>
                {/* Filters */}
                <Paper 
                  elevation={2} 
                  sx={{ 
                    p: 3, 
                    mb: 4, 
                    borderRadius: 3,
                    background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                    <FilterList color="primary" sx={{ fontSize: '1.5rem' }} />
                    <Typography variant="h6" fontWeight="bold">
                      Filter Results
                    </Typography>
                    <Button 
                      size="small" 
                      onClick={resetFilters}
                      sx={{ 
                        backgroundColor: 'primary.main',
                        color: 'white',
                        '&:hover': { backgroundColor: 'primary.dark' }
                      }}
                    >
                      Reset All
                    </Button>
                  </Box>
                  
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={3}>
                      <TextField
                        label="Minimum Score"
                        type="number"
                        value={filters.minScore}
                        onChange={(e) => handleFilterChange('minScore', parseInt(e.target.value) || 0)}
                        inputProps={{ min: 0, max: 100 }}
                        fullWidth
                        size="small"
                        sx={{ 
                          '& .MuiOutlinedInput-root': { 
                            borderRadius: 2,
                            backgroundColor: 'white'
                          }
                        }}
                      />
                    </Grid>
                    
                    <Grid item xs={12} sm={6} md={3}>
                      <FormControl fullWidth size="small">
                        <InputLabel sx={{ 
                          fontSize: '0.9rem',
                          whiteSpace: 'nowrap',
                          overflow: 'visible',
                          textOverflow: 'unset',
                          maxWidth: 'none',
                        }}>Filter by Location</InputLabel>
                        <Select
                          value={filters.location}
                          label="Filter by Location"
                          onChange={(e) => handleFilterChange('location', e.target.value)}
                          sx={{ 
                            borderRadius: 2,
                            backgroundColor: 'white',
                            minHeight: '48px',
                            '& .MuiInputLabel-root': {
                              whiteSpace: 'nowrap',
                              overflow: 'visible',
                              textOverflow: 'unset',
                              maxWidth: 'none',
                            },
                          }}
                        >
                          <MenuItem value="">All Locations</MenuItem>
                          {uniqueLocations.map(location => (
                            <MenuItem key={location} value={location}>
                              {location}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    
                    <Grid item xs={12} sm={6} md={3}>
                      <FormControl fullWidth size="small">
                        <InputLabel sx={{ 
                          fontSize: '0.9rem',
                          whiteSpace: 'nowrap',
                          overflow: 'visible',
                          textOverflow: 'unset',
                          maxWidth: 'none',
                        }}>Filter by Category</InputLabel>
                        <Select
                          value={filters.vertical}
                          label="Filter by Category"
                          onChange={(e) => handleFilterChange('vertical', e.target.value)}
                          sx={{ 
                            borderRadius: 2,
                            backgroundColor: 'white',
                            minHeight: '48px',
                            '& .MuiInputLabel-root': {
                              whiteSpace: 'nowrap',
                              overflow: 'visible',
                              textOverflow: 'unset',
                              maxWidth: 'none',
                            },
                          }}
                        >
                          <MenuItem value="">All Categories</MenuItem>
                          {uniqueVerticals.map(vertical => (
                            <MenuItem key={vertical} value={vertical}>
                              {vertical}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    
                    <Grid item xs={12} sm={6} md={3}>
                      <FormControl fullWidth size="small">
                        <InputLabel sx={{ 
                          fontSize: '0.9rem',
                          whiteSpace: 'nowrap',
                          overflow: 'visible',
                          textOverflow: 'unset',
                          maxWidth: 'none',
                        }}>Filter by Platform</InputLabel>
                        <Select
                          value={filters.platform}
                          label="Filter by Platform"
                          onChange={(e) => handleFilterChange('platform', e.target.value)}
                          sx={{ 
                            borderRadius: 2,
                            backgroundColor: 'white',
                            minHeight: '48px',
                            '& .MuiInputLabel-root': {
                              whiteSpace: 'nowrap',
                              overflow: 'visible',
                              textOverflow: 'unset',
                              maxWidth: 'none',
                            },
                          }}
                        >
                          <MenuItem value="">All Platforms</MenuItem>
                          {uniquePlatforms.map(platform => (
                            <MenuItem key={platform} value={platform}>
                              {platform}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>

                  {filteredResults.length !== matchResults.totalMatches && (
                    <Alert 
                      severity="info" 
                      sx={{ mt: 3, borderRadius: 2 }}
                    >
                      Showing {filteredResults.length} of {matchResults.totalMatches} creators
                    </Alert>
                  )}
                </Paper>

                {/* Creator Cards */}
                {filteredResults.length === 0 ? (
                  <Alert 
                    severity="warning"
                    sx={{ 
                      borderRadius: 3,
                      '& .MuiAlert-icon': { fontSize: '2rem' }
                    }}
                  >
                    <Typography variant="h6" gutterBottom>
                      No creators match your current filters
                    </Typography>
                    <Typography>
                      Try adjusting the filter criteria to see more results.
                    </Typography>
                  </Alert>
                ) : (
                  <Grid container spacing={3}>
                    {filteredResults.map((creator) => (
                      <Grid item xs={12} md={6} lg={4} key={creator._id}>
                        <CreatorCard creator={creator} />
                      </Grid>
                    ))}
                  </Grid>
                )}
              </>
            )}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default MatchConsole;

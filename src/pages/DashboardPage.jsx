import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  Tabs,
  Tab,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Button,
  TextField,
  InputAdornment,
  Alert,
  CircularProgress,
  Avatar,
  Stack,
  IconButton
} from '@mui/material';
import {
  People,
  Business,
  TrendingUp,
  LocationOn,
  Star,
  Visibility,
  AttachMoney,
  Search,
  Download,
  Share,
  MoreVert
} from '@mui/icons-material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts';

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [creators, setCreators] = useState([]);
  const [creatorsLoading, setCreatorsLoading] = useState(false);
  const [brands, setBrands] = useState([]);
  const [brandsLoading, setBrandsLoading] = useState(false);
  const [filters, setFilters] = useState({
    location: 'all',
    category: 'all',
    platform: 'all',
    followerRange: 'all'
  });

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    
    // Fetch creators data when switching to Creators tab
    if (newValue === 1 && creators.length === 0) {
      fetchCreators();
    }
    
    // Fetch brands data when switching to Brands tab
    if (newValue === 2 && brands.length === 0) {
      fetchBrands();
    }
  };

  // Fetch creators data from backend
  const fetchCreators = async () => {
    try {
      setCreatorsLoading(true);
      const response = await fetch('http://localhost:5000/api/analytics/creators');
      
      if (!response.ok) {
        throw new Error('Failed to fetch creators');
      }
      
      const result = await response.json();
      setCreators(result.creators || []);
    } catch (error) {
      console.error('Error fetching creators:', error);
      setError('Failed to load creators data. Please try again later.');
    } finally {
      setCreatorsLoading(false);
    }
  };

  // Fetch brands data from backend
  const fetchBrands = async () => {
    try {
      setBrandsLoading(true);
      const response = await fetch('http://localhost:5000/api/analytics/brands');
      
      if (!response.ok) {
        throw new Error('Failed to fetch brands');
      }
      
      const result = await response.json();
      setBrands(result.brands || []);
    } catch (error) {
      console.error('Error fetching brands:', error);
      setError('Failed to load brands data. Please try again later.');
    } finally {
      setBrandsLoading(false);
    }
  };

  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Mock data instead of API call
        const result = {
          analytics: {
            totalRevenue: 125420,
            activeCreators: 1247,
            activeBrands: 89,
            campaignsRunning: 23,
            totalInfluencers: 15420,
            totalBrands: 892,
            monthlyGrowth: 12.5,
            engagementRate: 4.2
          },
          // Data for rendering recent activity feed
          recentActivity: [
            { id: 1, type: 'match', description: 'New creator match found for Nike campaign', time: '2 hours ago' },
            { id: 2, type: 'billing', description: 'Payment processed for Instagram campaign', time: '4 hours ago' },
            { id: 3, type: 'campaign', description: 'Summer collection campaign launched', time: '1 day ago' }
          ],
          // Mock stats for charts
          categoryStats: [
            { name: 'Tech', count: 50 },
            { name: 'Fashion', count: 30 },
            { name: 'Food', count: 20 }
          ],
          platformStats: [
            { platform: 'Instagram', users: 1000, engagement: 4.2 },
            { platform: 'YouTube', users: 500, engagement: 3.5 }
          ],
          locationStats: [
            { location: 'New York', creators: 300, brands: 50 },
            { location: 'Los Angeles', creators: 200, brands: 40 }
          ]
        };
        
        setData(result);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setError('Failed to load dashboard data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <Container maxWidth="xl" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <CircularProgress size={60} />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="xl" sx={{ mt: 4 }}>
        <Alert 
          severity="error" 
          sx={{ 
            borderRadius: 4,
            boxShadow: 3
          }}
        >
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Box>
      {/* Hero Section to align with homepage/brands */}
      <Box sx={{ backgroundColor: '#000000', color: 'white', py: { xs: 6, md: 10 } }}>
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '2rem', md: '3rem' },
              fontWeight: 700,
              mb: 2,
              lineHeight: 1.2,
            }}
          >
            Influencer Marketing
            {' '}
            <Box
              component="span"
              sx={{
                background: 'linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Analytics Hub
            </Box>
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.85, maxWidth: 800 }}>
            Real-time insights into creator performance, brand partnerships, and campaign success metrics across all platforms
          </Typography>
        </Container>
      </Box>

      {/* Main Dashboard Content */}
      <Box sx={{ 
        background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #f8fafc 100%)', 
        minHeight: '100vh',
        py: { xs: 4, md: 6 }
      }}>
        <Container maxWidth="xl">
          {/* Navigation Tabs */}
          <Paper 
            elevation={4} 
            sx={{ 
              borderRadius: 4, 
              overflow: 'hidden', 
              mb: 6,
              background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
              border: '1px solid rgba(99, 102, 241, 0.1)'
            }}
          >
            <Tabs 
              value={activeTab} 
              onChange={handleTabChange}
              variant="fullWidth"
              sx={{
                '& .MuiTabs-indicator': {
                  backgroundColor: 'primary.main',
                  height: 4,
                  borderRadius: 2
                },
                '& .MuiTab-root': {
                  minHeight: 80,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  '&.Mui-selected': {
                    color: 'primary.main',
                    background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%)'
                  }
                }
              }}
            >
              <Tab 
                label="Overview" 
                icon={<TrendingUp sx={{ fontSize: 24 }} />} 
                iconPosition="start"
              />
              <Tab 
                label="Creators" 
                icon={<People sx={{ fontSize: 24 }} />} 
                iconPosition="start"
              />
              <Tab 
                label="Brands" 
                icon={<Business sx={{ fontSize: 24 }} />} 
                iconPosition="start"
              />
            </Tabs>
          </Paper>

          {/* Tab Content */}
          {activeTab === 0 && data && <OverviewTab overviewData={data} />}
          {activeTab === 1 && (
            <CreatorsTab 
              creators={creators} 
              filters={filters} 
              onFilterChange={setFilters}
              loading={creatorsLoading}
            />
          )}
          {activeTab === 2 && (
            <BrandsTab 
              brands={brands} 
              filters={filters} 
              onFilterChange={setFilters}
              loading={brandsLoading}
            />
          )}
        </Container>
      </Box>
    </Box>
  );
};

// Component for Overview Tab
const OverviewTab = ({ overviewData }) => {
  // Map incoming data.analytics to overview for metrics
  const overview = overviewData.analytics || {};
  const categoryStats = overviewData.categoryStats || [];
  const locationStats = overviewData.locationStats || [];
  const platformStats = overviewData.platformStats || [];

  // Chart colors array with sky blue theme
  const COLORS = [
    '#0ea5e9', '#38bdf8', '#0284c7', '#0369a1', '#075985',
    '#06b6d4', '#22d3ee', '#0891b2', '#0e7490', '#155e75'
  ];

  const metrics = [
    {
      title: 'Active Creators',
      value: overview.activeCreators || 0,
      icon: <People />,
      color: '#0ea5e9',
      trend: overview.monthlyGrowth ? `+${overview.monthlyGrowth}%` : ''
    },
    {
      title: 'Partner Brands',
      value: overview.activeBrands || overview.totalBrands || 0,
      icon: <Business />,
      color: '#06b6d4',
      trend: overview.monthlyGrowth ? `+${overview.monthlyGrowth}%` : ''
    },
    {
      title: 'Successful Matches',
      value: overview.campaignsRunning || 0,
      icon: <Star />,
      color: '#38bdf8',
      trend: overview.monthlyGrowth ? `+${overview.monthlyGrowth}%` : ''
    },
    {
      title: 'Platform GMV',
      value: `$${(overview.totalRevenue || 0).toLocaleString()}`,
      icon: <AttachMoney />,
      color: '#0284c7',
      trend: overview.monthlyGrowth ? `+${overview.monthlyGrowth}%` : ''
    }
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      {/* Metrics Cards */}
      <Grid container spacing={4} sx={{ mb: 6, justifyContent: 'center' }}>
        {metrics.map((metric, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card 
              sx={{ 
                p: 3,
                borderRadius: 4,
                background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                border: '1px solid rgba(14, 165, 233, 0.1)',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 20px 40px rgba(14, 165, 233, 0.1)',
                  transition: 'all 0.3s ease'
                }
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box 
                  sx={{ 
                    p: 1.5, 
                    borderRadius: 2, 
                    background: `${metric.color}20`,
                    color: metric.color,
                    mr: 2
                  }}
                >
                  {metric.icon}
                </Box>
                <Box>
                  <Typography variant="h4" fontWeight="bold" color="primary.main">
                    {metric.value}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {metric.title}
                  </Typography>
                </Box>
              </Box>
              <Chip 
                label={metric.trend} 
                size="small" 
                sx={{ 
                  backgroundColor: '#e8f5e8',
                  color: '#2e7d32',
                  fontSize: '0.75rem'
                }} 
              />
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Charts Section */}
      <Grid container spacing={6} sx={{ justifyContent: 'center' }}>
        {/* Category Distribution */}
        <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Card sx={{ 
            p: 3, 
            borderRadius: 4,
            background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
            border: '1px solid rgba(14, 165, 233, 0.1)'
          }}>
            <Typography variant="h6" gutterBottom fontWeight={600}>
              Creator Categories
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryStats}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {categoryStats?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Grid>

        {/* Platform Statistics */}
        <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Card sx={{ 
            p: 3, 
            borderRadius: 4,
            background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
            border: '1px solid rgba(14, 165, 233, 0.1)'
          }}>
            <Typography variant="h6" gutterBottom fontWeight={600}>
              Platform Performance
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={platformStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="platform" />
                <YAxis />
                <RechartsTooltip />
                <Legend />
                <Bar dataKey="users" fill="#0ea5e9" />
                <Bar dataKey="engagement" fill="#06b6d4" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Grid>

        {/* Geographic Distribution */}
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Card sx={{ 
            p: 3, 
            borderRadius: 4,
            background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
            border: '1px solid rgba(14, 165, 233, 0.1)'
          }}>
            <Typography variant="h6" gutterBottom fontWeight={600}>
              Geographic Distribution
            </Typography>
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart data={locationStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="location" />
                <YAxis />
                <RechartsTooltip />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="creators" 
                  stackId="1"
                  stroke="#0ea5e9" 
                  fill="#0ea5e9" 
                  fillOpacity={0.6}
                />
                <Area 
                  type="monotone" 
                  dataKey="brands" 
                  stackId="1"
                  stroke="#06b6d4" 
                  fill="#06b6d4" 
                  fillOpacity={0.6}
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

// Component for Creators Tab
const CreatorsTab = ({ creators, filters, onFilterChange, loading }) => {
  const filteredCreators = creators.filter(creator => {
    return (
      (filters.location === 'all' || creator.location === filters.location) &&
      (filters.category === 'all' || creator.category === filters.category) &&
      (filters.platform === 'all' || creator.platforms?.includes(filters.platform))
    );
  });

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <Box>
      {/* Filter Bar */}
      <Paper sx={{ p: 3, mb: 4, borderRadius: 4 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search creators..."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <FormControl fullWidth>
              <InputLabel sx={{ 
                fontSize: '1rem',
                whiteSpace: 'nowrap',
                overflow: 'visible',
                textOverflow: 'unset',
                maxWidth: 'none',
              }}>Location</InputLabel>
              <Select
                value={filters.location}
                label="Location"
                onChange={(e) => onFilterChange({...filters, location: e.target.value})}
                sx={{
                  minHeight: '56px',
                  '& .MuiInputLabel-root': {
                    whiteSpace: 'nowrap',
                    overflow: 'visible',
                    textOverflow: 'unset',
                    maxWidth: 'none',
                  },
                }}
              >
                <MenuItem value="all">All Locations</MenuItem>
                <MenuItem value="New York">New York</MenuItem>
                <MenuItem value="Los Angeles">Los Angeles</MenuItem>
                <MenuItem value="Chicago">Chicago</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <FormControl fullWidth>
              <InputLabel sx={{ 
                fontSize: '1rem',
                whiteSpace: 'nowrap',
                overflow: 'visible',
                textOverflow: 'unset',
                maxWidth: 'none',
              }}>Category</InputLabel>
              <Select
                value={filters.category}
                label="Category"
                onChange={(e) => onFilterChange({...filters, category: e.target.value})}
                sx={{
                  minHeight: '56px',
                  '& .MuiInputLabel-root': {
                    whiteSpace: 'nowrap',
                    overflow: 'visible',
                    textOverflow: 'unset',
                    maxWidth: 'none',
                  },
                }}
              >
                <MenuItem value="all">All Categories</MenuItem>
                <MenuItem value="Fashion">Fashion</MenuItem>
                <MenuItem value="Food">Food</MenuItem>
                <MenuItem value="Tech">Tech</MenuItem>
                <MenuItem value="Travel">Travel</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <FormControl fullWidth>
              <InputLabel sx={{ 
                fontSize: '1rem',
                whiteSpace: 'nowrap',
                overflow: 'visible',
                textOverflow: 'unset',
                maxWidth: 'none',
              }}>Platform</InputLabel>
              <Select
                value={filters.platform}
                label="Platform"
                onChange={(e) => onFilterChange({...filters, platform: e.target.value})}
                sx={{
                  minHeight: '56px',
                  '& .MuiInputLabel-root': {
                    whiteSpace: 'nowrap',
                    overflow: 'visible',
                    textOverflow: 'unset',
                    maxWidth: 'none',
                  },
                }}
              >
                <MenuItem value="all">All Platforms</MenuItem>
                <MenuItem value="Instagram">Instagram</MenuItem>
                <MenuItem value="YouTube">YouTube</MenuItem>
                <MenuItem value="TikTok">TikTok</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              variant="outlined"
              startIcon={<Download />}
              fullWidth
            >
              Export Data
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Creators Grid */}
      <Grid container spacing={4}>
        {filteredCreators.map((creator, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={creator.id || index}>
            <Card sx={{ 
              borderRadius: 4,
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                transition: 'all 0.3s ease'
              }
            }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar 
                    src={creator.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${creator.handle || creator.name}`}
                    sx={{ width: 48, height: 48, mr: 2 }}
                  />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" fontWeight={600}>
                      {creator.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {creator.handle}
                    </Typography>
                  </Box>
                  <IconButton size="small">
                    <MoreVert />
                  </IconButton>
                </Box>

                <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                  <Chip 
                    label={creator.category} 
                    size="small" 
                    color="primary" 
                    variant="outlined"
                  />
                  {creator.platforms && creator.platforms.slice(0, 2).map((platform, idx) => (
                    <Chip 
                      key={idx}
                      label={platform} 
                      size="small" 
                      variant="filled"
                      sx={{ backgroundColor: '#0ea5e9', color: 'white' }}
                    />
                  ))}
                </Stack>

                <Grid container spacing={2} sx={{ mb: 2 }}>
                  <Grid item xs={6}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h6" color="primary.main" fontWeight="bold">
                        {(creator.followers || 0).toLocaleString()}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Followers
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h6" color="primary.main" fontWeight="bold">
                        {creator.engagementRate || '0'}%
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Engagement
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>

                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <LocationOn sx={{ fontSize: 16, color: 'text.secondary', mr: 0.5 }} />
                    <Typography variant="caption" color="text.secondary">
                      {creator.location}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 0.5 }}>
                    <IconButton size="small" color="primary">
                      <Visibility />
                    </IconButton>
                    <IconButton size="small" color="primary">
                      <Share />
                    </IconButton>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Empty State */}
      {filteredCreators.length === 0 && (
        <Box sx={{ 
          textAlign: 'center', 
          py: 8,
          background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
          borderRadius: 4,
          border: '1px solid rgba(99, 102, 241, 0.1)'
        }}>
          <People sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No creators found
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Try adjusting your filters to see more results
          </Typography>
        </Box>
      )}
    </Box>
  );
};

// Component for Brands Tab
const BrandsTab = ({ brands, filters, onFilterChange, loading }) => {
  const filteredBrands = brands.filter(brand => {
    return (
      (filters.location === 'all' || brand.location === filters.location) &&
      (filters.category === 'all' || brand.category === filters.category)
    );
  });

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <Box>
      {/* Filter Bar */}
      <Paper sx={{ p: 3, mb: 4, borderRadius: 4 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search brands..."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <FormControl fullWidth>
              <InputLabel sx={{ 
                fontSize: '1rem',
                whiteSpace: 'nowrap',
                overflow: 'visible',
                textOverflow: 'unset',
                maxWidth: 'none',
              }}>Industry</InputLabel>
              <Select
                value={filters.category}
                label="Industry"
                onChange={(e) => onFilterChange({...filters, category: e.target.value})}
                sx={{
                  minHeight: '56px',
                  '& .MuiInputLabel-root': {
                    whiteSpace: 'nowrap',
                    overflow: 'visible',
                    textOverflow: 'unset',
                    maxWidth: 'none',
                  },
                }}
              >
                <MenuItem value="all">All Industries</MenuItem>
                <MenuItem value="Fashion">Fashion</MenuItem>
                <MenuItem value="Technology">Technology</MenuItem>
                <MenuItem value="Food & Beverage">Food & Beverage</MenuItem>
                <MenuItem value="Beauty">Beauty</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <FormControl fullWidth>
              <InputLabel sx={{ 
                fontSize: '1rem',
                whiteSpace: 'nowrap',
                overflow: 'visible',
                textOverflow: 'unset',
                maxWidth: 'none',
              }}>Location</InputLabel>
              <Select
                value={filters.location}
                label="Location"
                onChange={(e) => onFilterChange({...filters, location: e.target.value})}
                sx={{
                  minHeight: '56px',
                  '& .MuiInputLabel-root': {
                    whiteSpace: 'nowrap',
                    overflow: 'visible',
                    textOverflow: 'unset',
                    maxWidth: 'none',
                  },
                }}
              >
                <MenuItem value="all">All Locations</MenuItem>
                <MenuItem value="New York">New York</MenuItem>
                <MenuItem value="Los Angeles">Los Angeles</MenuItem>
                <MenuItem value="San Francisco">San Francisco</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              variant="outlined"
              startIcon={<Download />}
              fullWidth
            >
              Export Data
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Brands Grid */}
      <Grid container spacing={4}>
        {filteredBrands.map((brand, index) => (
          <Grid item xs={12} sm={6} md={4} key={brand.id || index}>
            <Card sx={{ 
              borderRadius: 4,
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                transition: 'all 0.3s ease'
              }
            }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar 
                    src={brand.logo || `https://api.dicebear.com/7.x/shapes/svg?seed=${brand.name}`}
                    sx={{ width: 48, height: 48, mr: 2 }}
                  />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" fontWeight={600}>
                      {brand.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {brand.industry || brand.category}
                    </Typography>
                  </Box>
                  <IconButton size="small">
                    <MoreVert />
                  </IconButton>
                </Box>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Leading brand in the {brand.category.toLowerCase()} industry with focus on innovation and quality.
                </Typography>

                <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                  <Chip 
                    label={brand.category} 
                    size="small" 
                    color="primary" 
                    variant="outlined"
                  />
                  <Chip 
                    label={`${brand.campaignsRun || 0} campaigns`} 
                    size="small" 
                    variant="filled"
                    sx={{ backgroundColor: '#06b6d4', color: 'white' }}
                  />
                </Stack>

                <Grid container spacing={2} sx={{ mb: 2 }}>
                  <Grid item xs={6}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h6" color="primary.main" fontWeight="bold">
                        ₹{(brand.totalSpent || 0).toLocaleString()}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Total Spent
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h6" color="success.main" fontWeight="bold">
                        {brand.roi || '0'}x
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        ROI
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>

                <Grid container spacing={2} sx={{ mb: 2 }}>
                  <Grid item xs={6}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h6" color="text.primary" fontWeight="bold">
                        ₹{(brand.avgCampaignBudget || 0).toLocaleString()}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Avg Budget
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h6" color="text.primary" fontWeight="bold">
                        {brand.topPerformingCreator || 'N/A'}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Top Creator
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>

                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <LocationOn sx={{ fontSize: 16, color: 'text.secondary', mr: 0.5 }} />
                    <Typography variant="caption" color="text.secondary">
                      {brand.location}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 0.5 }}>
                    <IconButton size="small" color="primary">
                      <Visibility />
                    </IconButton>
                    <IconButton size="small" color="primary">
                      <Share />
                    </IconButton>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Empty State */}
      {filteredBrands.length === 0 && (
        <Box sx={{ 
          textAlign: 'center', 
          py: 8,
          background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
          borderRadius: 4,
          border: '1px solid rgba(99, 102, 241, 0.1)'
        }}>
          <Business sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No brands found
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Try adjusting your filters to see more results
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default DashboardPage;

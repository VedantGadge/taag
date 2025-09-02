import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  Breadcrumbs,
  Link,
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
  FilterList,
  Download,
  Share,
  MoreVert,
  Home,
  ChevronRight
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
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [filters, setFilters] = useState({
    location: 'all',
    category: 'all',
    platform: 'all',
    followerRange: 'all'
  });

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
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
            Actionable
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
              Analytics
            </Box>
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.85, maxWidth: 800 }}>
            Track creator performance, audience growth, campaigns, and revenue—all in one place.
          </Typography>
        </Container>
      </Box>
      {/* Hero Section with Marketing Videos */}
      <Box sx={{ 
        background: 'linear-gradient(135deg, #0ea5e9 0%, #06b6d4 50%, #38bdf8 100%)', 
        position: 'relative',
        overflow: 'hidden',
        py: { xs: 6, md: 8 }
      }}>
        {/* Animated Background Elements */}
        <Box sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.1,
          background: `
            radial-gradient(circle at 20% 50%, rgba(255,255,255,0.2) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255,255,255,0.2) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(255,255,255,0.2) 0%, transparent 50%)
          `
        }} />
        
        {/* Floating Video Cards */}
        <Box sx={{
          position: 'absolute',
          top: '10%',
          right: '10%',
          width: 200,
          height: 120,
          borderRadius: 4,
          background: 'rgba(255,255,255,0.15)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          animation: 'float 6s ease-in-out infinite',
          '@keyframes float': {
            '0%, 100%': { transform: 'translateY(0px)' },
            '50%': { transform: 'translateY(-20px)' }
          },
          '&::before': {
            content: '"📹"',
            fontSize: '2rem',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }
        }}>
          <Typography variant="caption" sx={{ color: 'white', mt: 4 }}>
            Live Marketing Video
          </Typography>
        </Box>

        <Box sx={{
          position: 'absolute',
          bottom: '15%',
          left: '15%',
          width: 160,
          height: 100,
          borderRadius: 4,
          background: 'rgba(255,255,255,0.15)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          animation: 'float 8s ease-in-out infinite 2s',
          '&::before': {
            content: '"🎬"',
            fontSize: '1.8rem',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }
        }}>
          <Typography variant="caption" sx={{ color: 'white', mt: 3 }}>
            Creator Content
          </Typography>
        </Box>

        <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 2 }}>
          {/* Breadcrumbs */}
          <Breadcrumbs 
            aria-label="breadcrumb" 
            sx={{ 
              mb: 4,
              '& .MuiBreadcrumbs-separator': {
                color: 'rgba(255,255,255,0.7)'
              },
              '& a, & p': {
                color: 'rgba(255,255,255,0.9)'
              }
            }}
            separator={<ChevronRight fontSize="small" />}
          >
            <Link
              underline="hover"
              color="inherit"
              onClick={() => navigate('/')}
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                cursor: 'pointer',
                '&:hover': { color: 'white' }
              }}
            >
              <Home sx={{ mr: 0.5 }} fontSize="inherit" />
              Home
            </Link>
            <Typography color="inherit" fontWeight={600}>
              Analytics Dashboard
            </Typography>
          </Breadcrumbs>

          {/* Hero Content */}
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={7}>
              <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                <Typography 
                  variant="h1" 
                  sx={{
                    color: 'white',
                    mb: 3,
                    textShadow: '0 4px 20px rgba(0,0,0,0.1)',
                    fontSize: { xs: '2.5rem', md: '3.5rem' }
                  }}
                >
                  Influencer Marketing
                  <br />
                  <Box component="span" sx={{ 
                    background: 'linear-gradient(135deg, #ffffff 0%, #e0f2fe 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}>
                    Analytics Hub
                  </Box>
                </Typography>
                
                <Typography 
                  variant="h5" 
                  sx={{ 
                    color: 'rgba(255,255,255,0.9)',
                    mb: 4,
                    maxWidth: 600,
                    lineHeight: 1.4,
                    fontWeight: 400
                  }}
                >
                  Real-time insights into creator performance, brand partnerships, and campaign success metrics across all platforms
                </Typography>

                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: { xs: 'center', md: 'flex-start' } }}>
                  <Button
                    variant="contained"
                    size="large"
                    sx={{
                      background: 'rgba(255,255,255,0.2)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255,255,255,0.3)',
                      color: 'white',
                      px: 4,
                      py: 1.5,
                      '&:hover': {
                        background: 'rgba(255,255,255,0.25)',
                        transform: 'translateY(-2px)',
                      }
                    }}
                  >
                    View Live Data
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    sx={{
                      borderColor: 'rgba(255,255,255,0.5)',
                      color: 'white',
                      px: 4,
                      py: 1.5,
                      '&:hover': {
                        borderColor: 'white',
                        background: 'rgba(255,255,255,0.1)',
                        transform: 'translateY(-2px)',
                      }
                    }}
                  >
                    Export Report
                  </Button>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} md={5}>
              <Box sx={{ 
                position: 'relative',
                textAlign: 'center',
                display: { xs: 'none', md: 'block' }
              }}>
                {/* Main Video Card */}
                <Card sx={{
                  background: 'rgba(255,255,255,0.15)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: 6,
                  p: 4,
                  transform: 'rotate(-2deg)',
                  animation: 'pulse 4s ease-in-out infinite',
                  '@keyframes pulse': {
                    '0%, 100%': { transform: 'rotate(-2deg) scale(1)' },
                    '50%': { transform: 'rotate(-2deg) scale(1.05)' }
                  }
                }}>
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="h2" sx={{ color: 'white', mb: 1 }}>
                      🎥
                    </Typography>
                    <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
                      Content Creation
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                      Live marketing campaigns
                    </Typography>
                  </Box>
                  
                  <Box sx={{ 
                    height: 100,
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                    borderRadius: 3,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 2
                  }}>
                    <Typography variant="h4" sx={{ color: 'white' }}>▶️</Typography>
                  </Box>
                  
                  <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                    Recording brand collaboration
                  </Typography>
                </Card>

                {/* Floating Stats */}
                <Box sx={{
                  position: 'absolute',
                  top: -20,
                  right: -20,
                  background: 'rgba(255,255,255,0.9)',
                  borderRadius: 3,
                  p: 2,
                  minWidth: 120,
                  animation: 'bounce 3s ease-in-out infinite',
                  '@keyframes bounce': {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-10px)' }
                  }
                }}>
                  <Typography variant="h6" color="primary.main" fontWeight="bold">
                    +127%
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Engagement Rate
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
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
          {activeTab === 1 && data && (
            <CreatorsTab 
              creators={data.creators || []} 
              filters={filters} 
              onFilterChange={setFilters} 
            />
          )}
          {activeTab === 2 && data && (
            <BrandsTab 
              brands={data.brands || []} 
              filters={filters} 
              onFilterChange={setFilters} 
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
    <Box>
  {/* Metrics Cards */}
      <Grid container spacing={4} sx={{ mb: 6 }}>
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
      <Grid container spacing={6}>
        {/* Category Distribution */}
        <Grid item xs={12} md={6}>
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
        <Grid item xs={12} md={6}>
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
        <Grid item xs={12}>
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
const CreatorsTab = ({ creators, filters, onFilterChange }) => {
  const filteredCreators = creators.filter(creator => {
    return (
      (filters.location === 'all' || creator.location === filters.location) &&
      (filters.category === 'all' || creator.category === filters.category) &&
      (filters.platform === 'all' || creator.platform === filters.platform)
    );
  });

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
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
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
                    src={creator.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${creator.name}`}
                    sx={{ width: 48, height: 48, mr: 2 }}
                  />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" fontWeight={600}>
                      {creator.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      @{creator.username || creator.name.toLowerCase().replace(' ', '')}
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
                  <Chip 
                    label={creator.platform} 
                    size="small" 
                    variant="filled"
                    sx={{ backgroundColor: '#0ea5e9', color: 'white' }}
                  />
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
                        {creator.engagement || '4.2'}%
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
const BrandsTab = ({ brands, filters, onFilterChange }) => {
  const filteredBrands = brands.filter(brand => {
    return (
      (filters.location === 'all' || brand.location === filters.location) &&
      (filters.category === 'all' || brand.category === filters.category)
    );
  });

  return (
    <Box>
      {/* Filter Bar */}
      <Paper sx={{ p: 3, mb: 4, borderRadius: 4 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} sm={6} md={4}>
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
          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                variant="outlined"
                startIcon={<FilterList />}
                sx={{ flex: 1 }}
              >
                More Filters
              </Button>
              <Button
                variant="outlined"
                startIcon={<Download />}
                sx={{ flex: 1 }}
              >
                Export
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Brands Grid */}
      <Grid container spacing={4}>
        {filteredBrands.map((brand, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
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
                      {brand.category}
                    </Typography>
                  </Box>
                  <IconButton size="small">
                    <MoreVert />
                  </IconButton>
                </Box>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {brand.description || 'Leading brand in the industry with focus on innovation and quality.'}
                </Typography>

                <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                  <Chip 
                    label={brand.category} 
                    size="small" 
                    color="primary" 
                    variant="outlined"
                  />
                  <Chip 
                    label={`${brand.campaigns || Math.floor(Math.random() * 20 + 5)} campaigns`} 
                    size="small" 
                    variant="filled"
                    sx={{ backgroundColor: '#06b6d4', color: 'white' }}
                  />
                </Stack>

                <Grid container spacing={2} sx={{ mb: 2 }}>
                  <Grid item xs={6}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h6" color="primary.main" fontWeight="bold">
                        ${(brand.budget || Math.floor(Math.random() * 500000 + 50000)).toLocaleString()}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Campaign Budget
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h6" color="primary.main" fontWeight="bold">
                        {brand.rating || '4.8'}★
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Brand Rating
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

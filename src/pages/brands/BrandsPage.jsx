import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  alpha,
} from '@mui/material';
import {
  Search,
  Analytics,
  Payment,
  CheckCircle,
  Star,
} from '@mui/icons-material';

const BrandsPage = () => {
  const navigate = useNavigate();

  const benefits = [
    {
      icon: <Search sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Smart Creator Discovery',
      description: 'Find perfect creators using AI-powered matching based on audience demographics, engagement rates, and brand alignment.',
    },
    {
      icon: <Analytics sx={{ fontSize: 40, color: 'secondary.main' }} />,
      title: 'Campaign Analytics',
      description: 'Track performance with real-time metrics, ROI analysis, and detailed insights to optimize your influencer marketing.',
    },
    {
      icon: <Payment sx={{ fontSize: 40, color: 'success.main' }} />,
      title: 'Automated Billing',
      description: 'Streamlined payment processing with GST compliance, automated invoicing, and secure creator payouts.',
    },
  ];

  const features = [
    'AI-powered creator matching algorithm',
    'Comprehensive creator profiles with 50+ data points',
    'Advanced filtering by location, demographics, and engagement',
    'Campaign performance tracking and analytics',
    'Automated billing and payment processing',
    'GST compliance and tax management',
    'Dedicated account management',
    '24/7 customer support',
  ];

  const useCases = [
    {
      title: 'Product Launches',
      description: 'Find creators who resonate with your target audience for maximum launch impact.',
      icon: '🚀',
    },
    {
      title: 'Brand Awareness',
      description: 'Scale your reach with creators across multiple platforms and demographics.',
      icon: '📢',
    },
    {
      title: 'Performance Marketing',
      description: 'Drive conversions with creators who have proven track records in your category.',
      icon: '📈',
    },
  ];

  const testimonials = [
    {
      name: 'Rajesh Kumar',
      role: 'Marketing Director, TechStart',
      avatar: 'RK',
      comment: 'MatchBill helped us find the perfect tech reviewers for our product launch. Our campaign reached 2M+ people with 15% engagement rate.',
    },
    {
      name: 'Anita Desai',
      role: 'Brand Manager, StyleCo',
      avatar: 'AD',
      comment: 'The platform\'s AI matching is incredible. We found fashion influencers who perfectly aligned with our brand values and target audience.',
    },
  ];

  const HeroSection = () => (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        py: { xs: 8, md: 12 },
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                fontWeight: 700,
                mb: 3,
                lineHeight: 1.2,
              }}
            >
              Find Your Perfect
              <Box component="span" sx={{ color: '#fbbf24', display: 'block' }}>
                Brand Ambassadors
              </Box>
            </Typography>
            
            <Typography
              variant="h5"
              sx={{
                mb: 4,
                opacity: 0.9,
                fontSize: { xs: '1.1rem', md: '1.25rem' },
                lineHeight: 1.6,
              }}
            >
              Connect with content creators who share your brand values and can authentically 
              promote your products to their engaged audiences.
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate('/brief')}
                sx={{
                  backgroundColor: 'white',
                  color: 'primary.main',
                  px: 4,
                  py: 1.5,
                  fontSize: '1rem',
                  fontWeight: 600,
                  '&:hover': {
                    backgroundColor: '#f8fafc',
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                Start Finding Creators
              </Button>
              <Button
                variant="outlined"
                size="large"
                sx={{
                  borderColor: 'white',
                  color: 'white',
                  px: 4,
                  py: 1.5,
                  fontSize: '1rem',
                  fontWeight: 600,
                  '&:hover': {
                    borderColor: 'white',
                    backgroundColor: alpha('#ffffff', 0.1),
                  },
                }}
              >
                Watch Demo
              </Button>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Paper
              elevation={10}
              sx={{
                p: 4,
                borderRadius: 4,
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <Typography variant="h6" fontWeight={600} color="text.primary" gutterBottom>
                Success Metrics
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" fontWeight={700} color="primary.main">
                      94%
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Match Accuracy
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" fontWeight={700} color="secondary.main">
                      3.5x
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Average ROI
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" fontWeight={700} color="success.main">
                      72h
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Avg. Match Time
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" fontWeight={700} color="warning.main">
                      15K+
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Active Creators
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );

  const BenefitsSection = () => (
    <Container maxWidth="lg" sx={{ py: 10 }}>
      <Box sx={{ textAlign: 'center', mb: 8 }}>
        <Typography variant="h2" fontWeight={700} gutterBottom>
          Everything You Need to Scale
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
          Comprehensive tools and features designed specifically for modern brand marketing teams
        </Typography>
      </Box>
      
      <Grid container spacing={4}>
        {benefits.map((benefit, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card
              sx={{
                height: '100%',
                textAlign: 'center',
                p: 3,
                '&:hover': {
                  transform: 'translateY(-8px)',
                  transition: 'all 0.3s ease',
                },
              }}
            >
              <CardContent>
                <Box sx={{ mb: 3 }}>
                  {benefit.icon}
                </Box>
                <Typography variant="h5" fontWeight={600} gutterBottom>
                  {benefit.title}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                  {benefit.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );

  const FeaturesSection = () => (
    <Box sx={{ backgroundColor: 'grey.50', py: 10 }}>
      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h2" fontWeight={700} gutterBottom>
              Platform Features
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
              Everything you need to run successful influencer marketing campaigns
            </Typography>
            
            <List sx={{ '& .MuiListItem-root': { py: 1 } }}>
              {features.map((feature, index) => (
                <ListItem key={index} sx={{ pl: 0 }}>
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <CheckCircle sx={{ color: 'success.main', fontSize: 20 }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={feature}
                    sx={{
                      '& .MuiListItemText-primary': {
                        fontSize: '1rem',
                        fontWeight: 500,
                      },
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Paper
              elevation={8}
              sx={{
                p: 4,
                borderRadius: 4,
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                color: 'white',
              }}
            >
              <Typography variant="h4" fontWeight={600} gutterBottom>
                Ready to Get Started?
              </Typography>
              <Typography variant="body1" sx={{ mb: 4, opacity: 0.9 }}>
                Join hundreds of brands who trust MatchBill for their influencer marketing needs.
              </Typography>
              
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate('/brief')}
                sx={{
                  backgroundColor: 'white',
                  color: 'primary.main',
                  mb: 2,
                  '&:hover': {
                    backgroundColor: '#f8fafc',
                  },
                }}
                fullWidth
              >
                Create Your First Campaign
              </Button>
              
              <Typography variant="caption" sx={{ opacity: 0.8 }}>
                Free to start • No setup fees • Cancel anytime
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );

  const UseCasesSection = () => (
    <Container maxWidth="lg" sx={{ py: 10 }}>
      <Box sx={{ textAlign: 'center', mb: 8 }}>
        <Typography variant="h2" fontWeight={700} gutterBottom>
          Perfect for Every Campaign
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Whether you're launching a product or building brand awareness, we've got you covered
        </Typography>
      </Box>
      
      <Grid container spacing={4}>
        {useCases.map((useCase, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card
              sx={{
                height: '100%',
                p: 3,
                textAlign: 'center',
                border: '2px solid transparent',
                '&:hover': {
                  borderColor: 'primary.main',
                  transform: 'translateY(-4px)',
                  transition: 'all 0.3s ease',
                },
              }}
            >
              <CardContent>
                <Typography variant="h2" sx={{ mb: 2 }}>
                  {useCase.icon}
                </Typography>
                <Typography variant="h5" fontWeight={600} gutterBottom>
                  {useCase.title}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                  {useCase.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );

  const TestimonialsSection = () => (
    <Box sx={{ backgroundColor: 'grey.50', py: 10 }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="h2" fontWeight={700} gutterBottom>
            What Brands Are Saying
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Real results from real marketing teams
          </Typography>
        </Box>
        
        <Grid container spacing={4}>
          {testimonials.map((testimonial, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card
                sx={{
                  height: '100%',
                  p: 4,
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    transition: 'all 0.3s ease',
                  },
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', mb: 2 }}>
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} sx={{ color: 'warning.main', fontSize: 20 }} />
                    ))}
                  </Box>
                  
                  <Typography variant="body1" sx={{ mb: 3, fontStyle: 'italic', lineHeight: 1.7 }}>
                    "{testimonial.comment}"
                  </Typography>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ backgroundColor: 'primary.main' }}>
                      {testimonial.avatar}
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle2" fontWeight={600}>
                        {testimonial.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {testimonial.role}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );

  return (
    <Box>
      <HeroSection />
      <BenefitsSection />
      <FeaturesSection />
      <UseCasesSection />
      <TestimonialsSection />
    </Box>
  );
};

export default BrandsPage;

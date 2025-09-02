import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
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

// Animation wrapper component
const AnimatedSection = ({ children, delay = 0, direction = 'up' }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? 50 : direction === 'down' ? -50 : 0,
      x: direction === 'left' ? 50 : direction === 'right' ? -50 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: 0.8,
        delay,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
    >
      {children}
    </motion.div>
  );
};

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
      description: 'Streamlined payment processing with GST compliance, automated invoicing, and secure creator payouts for hassle-free financial management.',
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
        backgroundColor: '#000000',
        color: 'white',
        py: { xs: 8, md: 12 },
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Text content with container */}
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
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
            <Box 
              component="span" 
              sx={{ 
                display: 'block',
                background: 'linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                color: 'transparent',
              }}
            >
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
              maxWidth: 800,
              mx: 'auto',
            }}
          >
            Connect with content creators who share your brand values and can authentically 
            promote your products to their engaged audiences.
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center', mb: 6 }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/brief')}
              sx={{
                backgroundColor: '#0ea5e9',
                color: 'white',
                px: 4,
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 600,
                '&:hover': {
                  backgroundColor: '#0284c7',
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
                borderColor: '#0ea5e9',
                color: '#0ea5e9',
                px: 4,
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 600,
                '&:hover': {
                  borderColor: '#0ea5e9',
                  backgroundColor: alpha('#0ea5e9', 0.1),
                },
              }}
            >
              Watch Demo
            </Button>
          </Box>
        </Box>
      </Container>
      
      {/* Full-width hero image spanning entire section */}
        <Box
          component="img"
          src="/assets/forBrandsHero.png"
          alt="Brand Ambassadors Platform"
          sx={{
            width: '100%',
            maxWidth: '100%',
            height: 'auto',
            borderRadius: { xs: 2, md: 4 },
          }}
        />
    </Box>
  );

  const SuccessMetricsSection = () => (
    <Box sx={{ backgroundColor: 'white', py: 12 }}>
      <Container maxWidth="xl">
        <Box sx={{ textAlign: 'center' }}>
          {/* Horizontal Stats Row with more spacing */}
          <Grid container spacing={8} justifyContent="center" alignItems="center">
            <Grid item xs={6} md={2.4}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography 
                  variant="h1" 
                  sx={{ 
                    fontSize: { xs: '3rem', md: '4rem' },
                    fontWeight: 700,
                    color: '#0ea5e9',
                    lineHeight: 1,
                    mb: 2
                  }}
                >
                  94%
                </Typography>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    color: '#1a1a1a',
                    fontWeight: 500,
                    lineHeight: 1.4,
                    fontSize: { xs: '1rem', md: '1.1rem' }
                  }}
                >
                  Match Accuracy
                </Typography>
              </Box>
            </Grid>
            
            <Grid item xs={6} md={2.4}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography 
                  variant="h1" 
                  sx={{ 
                    fontSize: { xs: '3rem', md: '4rem' },
                    fontWeight: 700,
                    color: '#0ea5e9',
                    lineHeight: 1,
                    mb: 2
                  }}
                >
                  3.5x
                </Typography>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    color: '#1a1a1a',
                    fontWeight: 500,
                    lineHeight: 1.4,
                    fontSize: { xs: '1rem', md: '1.1rem' }
                  }}
                >
                  Average ROI
                </Typography>
              </Box>
            </Grid>
            
            <Grid item xs={6} md={2.4}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography 
                  variant="h1" 
                  sx={{ 
                    fontSize: { xs: '3rem', md: '4rem' },
                    fontWeight: 700,
                    color: '#0ea5e9',
                    lineHeight: 1,
                    mb: 2
                  }}
                >
                  72h
                </Typography>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    color: '#1a1a1a',
                    fontWeight: 500,
                    lineHeight: 1.4,
                    fontSize: { xs: '1rem', md: '1.1rem' }
                  }}
                >
                  Avg. Match Time
                </Typography>
              </Box>
            </Grid>
            
            <Grid item xs={6} md={2.4}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography 
                  variant="h1" 
                  sx={{ 
                    fontSize: { xs: '3rem', md: '4rem' },
                    fontWeight: 700,
                    color: '#0ea5e9',
                    lineHeight: 1,
                    mb: 2
                  }}
                >
                  15K+
                </Typography>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    color: '#1a1a1a',
                    fontWeight: 500,
                    lineHeight: 1.4,
                    fontSize: { xs: '1rem', md: '1.1rem' }
                  }}
                >
                  Active Creators
                </Typography>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={2.4}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography 
                  variant="h1" 
                  sx={{ 
                    fontSize: { xs: '3rem', md: '4rem' },
                    fontWeight: 700,
                    color: '#0ea5e9',
                    lineHeight: 1,
                    mb: 2
                  }}
                >
                  98%
                </Typography>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    color: '#1a1a1a',
                    fontWeight: 500,
                    lineHeight: 1.4,
                    fontSize: { xs: '1rem', md: '1.1rem' }
                  }}
                >
                  Client Satisfaction
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
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
            <AnimatedSection delay={index * 0.2} direction="up">
              <Card
                sx={{
                  height: '100%',
                  minHeight: 380,
                  textAlign: 'center',
                  p: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    transition: 'all 0.3s ease',
                  },
                }}
              >
                <CardContent
                  sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    pb: 3,
                    height: '100%',
                  }}
                >
                  <Box>
                    <Box sx={{ mb: 3 }}>
                      {benefit.icon}
                    </Box>
                    <Typography variant="h5" fontWeight={600} gutterBottom>
                      {benefit.title}
                    </Typography>
                  </Box>
                  <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7, mt: 2 }}>
                    {benefit.description}
                  </Typography>
                </CardContent>
              </Card>
            </AnimatedSection>
          </Grid>
        ))}
      </Grid>
    </Container>
  );

  const FeaturesSection = () => (
    <Box sx={{ backgroundColor: 'grey.50', py: 10 }}>
      <Container maxWidth="lg">
        {/* Title Section */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="h2" fontWeight={700} gutterBottom>
            Platform Features
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Everything you need to run successful influencer marketing campaigns
          </Typography>
        </Box>

        {/* Two Column Features List */}
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 6,
            mb: 8 
          }}
        >
          <Box sx={{ flex: 1 }}>
            <List sx={{ '& .MuiListItem-root': { py: 1.5 } }}>
              {features.slice(0, Math.ceil(features.length / 2)).map((feature, index) => (
                <ListItem key={index} sx={{ pl: 0, alignItems: 'flex-start' }}>
                  <ListItemIcon sx={{ minWidth: 40, mt: 0.5 }}>
                    <CheckCircle sx={{ color: 'success.main', fontSize: 24 }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={feature}
                    sx={{
                      '& .MuiListItemText-primary': {
                        fontSize: '1.1rem',
                        fontWeight: 500,
                        lineHeight: 1.6,
                        color: '#2d3748',
                      },
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
          
          <Box sx={{ flex: 1 }}>
            <List sx={{ '& .MuiListItem-root': { py: 1.5 } }}>
              {features.slice(Math.ceil(features.length / 2)).map((feature, index) => (
                <ListItem key={index} sx={{ pl: 0, alignItems: 'flex-start' }}>
                  <ListItemIcon sx={{ minWidth: 40, mt: 0.5 }}>
                    <CheckCircle sx={{ color: 'success.main', fontSize: 24 }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={feature}
                    sx={{
                      '& .MuiListItemText-primary': {
                        fontSize: '1.1rem',
                        fontWeight: 500,
                        lineHeight: 1.6,
                        color: '#2d3748',
                      },
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>
        
        {/* Centered CTA Section */}
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            mt: 8,
            px: 2
          }}
        >
          <Paper
            elevation={8}
            sx={{
              paddingY: 4,
              borderRadius: 4,
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              color: 'white',
              width: '140%',
              maxWidth: 1100,
              textAlign: 'center',
            }}
          >
            <Typography variant="h4" fontWeight={600} gutterBottom>
              Ready to Get Started?
            </Typography>
            <Typography variant="body1" sx={{ mb: 4, opacity: 0.9, px: 6 }}>
              Join hundreds of brands who trust MatchBill for their influencer marketing needs.
            </Typography>
            
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/brief')}
              sx={{
                backgroundColor: 'white',
                color: 'primary.main',
                mb: 3,
                px: 10,
                py: 2,
                fontSize: '1.1rem',
                fontWeight: 600,
                borderRadius: 3,
                minWidth: 350,
                '&:hover': {
                  backgroundColor: '#f8fafc',
                  transform: 'translateY(-2px)',
                },
              }}
            >
              Create Your First Campaign
            </Button>
            
            <Typography variant="caption" sx={{ opacity: 0.8, display: 'block' }}>
              Free to start • No setup fees • Cancel anytime
            </Typography>
          </Paper>
        </Box>
      </Container>
    </Box>
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
              <AnimatedSection delay={index * 0.2} direction="up">
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
              </AnimatedSection>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );

  return (
    <Box>
      <HeroSection />
      <AnimatedSection delay={0.2}>
        <SuccessMetricsSection />
      </AnimatedSection>
      <AnimatedSection delay={0.3}>
        <BenefitsSection />
      </AnimatedSection>
      <AnimatedSection delay={0.4}>
        <FeaturesSection />
      </AnimatedSection>
      <AnimatedSection delay={0.5}>
        <TestimonialsSection />
      </AnimatedSection>
    </Box>
  );
};

export default BrandsPage;

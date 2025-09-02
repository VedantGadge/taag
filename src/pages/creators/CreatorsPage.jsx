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
  Chip,
} from '@mui/material';
import {
  MonetizationOn,
  Campaign,
  Analytics,
  CheckCircle,
  Star,
  Speed,
  Shield,
} from '@mui/icons-material';

const CreatorsPage = () => {
  const navigate = useNavigate();

  const benefits = [
    {
      icon: <MonetizationOn sx={{ fontSize: 40, color: 'success.main' }} />,
      title: 'Fair & Fast Payments',
      description: 'Get paid quickly with transparent pricing. Instant payouts within 24 hours of campaign completion.',
    },
    {
      icon: <Campaign sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Quality Brand Partners',
      description: 'Work with verified brands that align with your content and values. No more spam or irrelevant offers.',
    },
    {
      icon: <Analytics sx={{ fontSize: 40, color: 'secondary.main' }} />,
      title: 'Growth Analytics',
      description: 'Track your performance, earnings, and audience growth with detailed insights and recommendations.',
    },
  ];

  const features = [
    'Automated brand matching based on your niche',
    'Transparent pricing with no hidden fees',
    'Campaign management tools and timeline tracking',
    'Performance analytics and audience insights',
    'Secure payment processing with GST handling',
    'Brand collaboration history and ratings',
    'Content approval workflow',
    'Dedicated creator support team',
  ];

  const earningPotential = [
    {
      tier: 'Micro Influencer',
      followers: '1K - 10K',
      earningRange: '₹5K - ₹25K',
      perPost: 'per campaign',
      badge: 'Growing',
      color: 'success',
    },
    {
      tier: 'Mid-Tier Creator',
      followers: '10K - 100K',
      earningRange: '₹25K - ₹1L',
      perPost: 'per campaign',
      badge: 'Popular',
      color: 'primary',
    },
    {
      tier: 'Macro Influencer',
      followers: '100K+',
      earningRange: '₹1L - ₹10L',
      perPost: 'per campaign',
      badge: 'Elite',
      color: 'secondary',
    },
  ];

  const testimonials = [
    {
      name: 'Priya Sharma',
      handle: '@priyafashion',
      avatar: 'PS',
      followers: '85K',
      platform: 'Instagram',
      comment: 'MatchBill connected me with amazing fashion brands. I\'ve earned ₹2.5L in just 3 months!',
      earnings: '₹2.5L in 3 months',
    },
    {
      name: 'Rahul Tech',
      handle: '@rahultech',
      avatar: 'RT',
      followers: '120K',
      platform: 'YouTube',
      comment: 'Finally, a platform that values creators. Fair rates, quick payments, and genuine brand partnerships.',
      earnings: '₹4L in 6 months',
    },
  ];

  const HeroSection = () => (
    <Box
      sx={{
        backgroundColor: '#000000',
        color: 'white',
        py: { xs: 8, md: 14 },
        position: 'relative',
        overflow: 'hidden',
        minHeight: { md: 520 },
      }}
    >
      {/* Right-side background video */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          width: { xs: '80%', md: '80%' },
        }}
      >
        <Box
          component="video"
          src="/assets/HeroVid.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        />
        {/* Edge fade to blend video into black background */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            background:
              'linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.98) 3%, rgba(0,0,0,0.95) 6%, rgba(0,0,0,0.9) 10%, rgba(0,0,0,0.82) 15%, rgba(0,0,0,0.72) 20%, rgba(0,0,0,0.6) 25%, rgba(0,0,0,0.46) 30%, rgba(0,0,0,0.32) 35%, rgba(0,0,0,0.2) 40%, rgba(0,0,0,0.12) 45%, rgba(0,0,0,0.06) 50%, rgba(0,0,0,0.03) 55%, rgba(0,0,0,0.01) 60%, rgba(0,0,0,0) 65%)',
          }}
        />
      </Box>

      {/* Content overlay */}
      <Container maxWidth={false} disableGutters sx={{ position: 'relative', zIndex: 2 }}>
        <Box sx={{ maxWidth: { xs: '100%', md: 800 }, px: { xs: 5, md: 15 } }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2.5rem', md: '4rem' },
              fontWeight: 700,
              mb: 3,
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
            }}
          >
            Turn your content into
            <br />
            <Box
              component="span"
              sx={{
                background: 'linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              real income
            </Box>
          </Typography>

          <Typography
            variant="h5"
            sx={{
              mb: 5,
              opacity: 0.85,
              fontSize: { xs: '1.15rem', md: '1.35rem' },
              lineHeight: 1.55,
              maxWidth: 640,
              fontWeight: 400,
            }}
          >
            Get matched with verified brands, earn fairly, and grow your audience—without spam.
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/creators/dashboard')}
              sx={{
                backgroundColor: '#0ea5e9',
                color: 'white',
                px: 5,
                py: 2,
                fontSize: '1.05rem',
                fontWeight: 600,
                borderRadius: 2,
                textTransform: 'none',
                boxShadow: 'none',
                '&:hover': {
                  backgroundColor: '#0284c7',
                  boxShadow: '0 20px 40px rgba(14, 165, 233, 0.3)',
                  transform: 'translateY(-2px)',
                },
              }}
            >
              Join as Creator
            </Button>
            <Button
              variant="outlined"
              size="large"
              sx={{
                borderColor: '#0ea5e9',
                color: '#0ea5e9',
                px: 5,
                py: 2,
                fontSize: '1.05rem',
                fontWeight: 600,
                borderRadius: 2,
                textTransform: 'none',
                '&:hover': {
                  borderColor: '#0ea5e9',
                  backgroundColor: alpha('#0ea5e9', 0.1),
                },
              }}
            >
              View Success Stories
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );

  const BenefitsSection = () => (
    <Container maxWidth="lg" sx={{ py: 10 }}>
      <Box sx={{ textAlign: 'center', mb: 8 }}>
        <Typography variant="h2" fontWeight={700} gutterBottom>
          Why Creators Choose Us
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
          Built by creators, for creators. We understand what you need to succeed.
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

  const EarningSection = () => (
    <Box sx={{ backgroundColor: 'grey.50', py: 10 }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="h2" fontWeight={700} gutterBottom>
            Your Earning Potential
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Fair compensation based on your reach and engagement
          </Typography>
        </Box>
        
        <Grid container spacing={4}>
          {earningPotential.map((tier, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                sx={{
                  height: '100%',
                  textAlign: 'center',
                  p: 4,
                  border: '2px solid transparent',
                  '&:hover': {
                    borderColor: `${tier.color}.main`,
                    transform: 'translateY(-8px)',
                    transition: 'all 0.3s ease',
                  },
                }}
              >
                <CardContent>
                  <Chip
                    label={tier.badge}
                    color={tier.color}
                    sx={{ mb: 2, fontWeight: 600 }}
                  />
                  <Typography variant="h5" fontWeight={600} gutterBottom>
                    {tier.tier}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {tier.followers} followers
                  </Typography>
                  <Typography variant="h4" fontWeight={700} color={`${tier.color}.main`} sx={{ my: 2 }}>
                    {tier.earningRange}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {tier.perPost}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );

  const FeaturesSection = () => (
    <Container maxWidth="lg" sx={{ py: 10 }}>
      <Grid container spacing={6} alignItems="center">
        <Grid item xs={12} md={6}>
          <Typography variant="h2" fontWeight={700} gutterBottom>
            Creator Tools & Features
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
            Everything you need to manage collaborations and grow your creator business
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
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper
                sx={{
                  p: 3,
                  borderRadius: 3,
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  color: 'white',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Shield sx={{ fontSize: 32 }} />
                  <Typography variant="h6" fontWeight={600}>
                    Secure & Trusted
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Bank-grade security with automated GST handling and instant payments
                </Typography>
              </Paper>
            </Grid>
            
            <Grid item xs={12}>
              <Paper
                sx={{
                  p: 3,
                  borderRadius: 3,
                  background: 'linear-gradient(135deg, #6366f1 0%, #4338ca 100%)',
                  color: 'white',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Speed sx={{ fontSize: 32 }} />
                  <Typography variant="h6" fontWeight={600}>
                    Quick Onboarding
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Get verified and start earning within 24 hours of joining
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );

  const TestimonialsSection = () => (
    <Box sx={{ backgroundColor: 'grey.50', py: 10 }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="h2" fontWeight={700} gutterBottom>
            Creator Success Stories
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Real creators, real earnings, real growth
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
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar sx={{ backgroundColor: 'secondary.main', width: 56, height: 56 }}>
                        {testimonial.avatar}
                      </Avatar>
                      <Box>
                        <Typography variant="h6" fontWeight={600}>
                          {testimonial.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {testimonial.handle} • {testimonial.followers} followers
                        </Typography>
                      </Box>
                    </Box>
                    <Chip label={testimonial.platform} size="small" color="primary" />
                  </Box>
                  
                  <Typography variant="body1" sx={{ mb: 3, fontStyle: 'italic', lineHeight: 1.7 }}>
                    "{testimonial.comment}"
                  </Typography>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex' }}>
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} sx={{ color: 'warning.main', fontSize: 20 }} />
                      ))}
                    </Box>
                    <Typography variant="subtitle2" color="success.main" fontWeight={600}>
                      {testimonial.earnings}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );

  const CTASection = () => (
    <Container maxWidth="md" sx={{ py: 10, textAlign: 'center' }}>
      <Typography variant="h2" fontWeight={700} gutterBottom>
        Ready to Start Earning?
      </Typography>
      <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
        Join thousands of creators who are already monetizing their content with top brands
      </Typography>
      
      <Button
        variant="contained"
        size="large"
        onClick={() => navigate('/creators/dashboard')}
        sx={{
          px: 6,
          py: 2,
          fontSize: '1.1rem',
          background: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
          '&:hover': {
            background: 'linear-gradient(135deg, #0891b2 0%, #2563eb 100%)',
            transform: 'translateY(-2px)',
          },
        }}
      >
        Get Started as Creator
      </Button>
      
      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 4, flexWrap: 'wrap' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <CheckCircle sx={{ color: 'success.main' }} />
          <Typography variant="body2">Free to join</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <CheckCircle sx={{ color: 'success.main' }} />
          <Typography variant="body2">Instant payments</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <CheckCircle sx={{ color: 'success.main' }} />
          <Typography variant="body2">No hidden fees</Typography>
        </Box>
      </Box>
    </Container>
  );

  return (
    <Box>
      <HeroSection />
      <BenefitsSection />
      <EarningSection />
      <FeaturesSection />
      <TestimonialsSection />
      <CTASection />
    </Box>
  );
};

export default CreatorsPage;

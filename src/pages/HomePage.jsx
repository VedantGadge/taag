import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Paper,
} from '@mui/material';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Box>
      {/* Hero Section - single section with right video BG and overlayed left text */}
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
            width: { xs: '100%', md: '75%' },
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
          {/* Softer left-edge fade for seamless readability blend */}
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              background:
                'linear-gradient(90deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.85) 12%, rgba(0,0,0,0.65) 25%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0.2) 55%, rgba(0,0,0,0.08) 70%, rgba(0,0,0,0.0) 85%)',
            }}
          />
        </Box>

        {/* Content overlays above video */}
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Box sx={{ maxWidth: { xs: '100%', md: 800 }, mr: { md: '-12%' } }}>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '2.5rem', md: '4.25rem' },
                fontWeight: 600,
                mb: 3,
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
              }}
            >
              The future of commerce is
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
                powered by creators
              </Box>
            </Typography>

            <Typography
              variant="h5"
              sx={{
                mb: 5,
                opacity: 0.85,
                fontSize: { xs: '1.15rem', md: '1.5rem' },
                lineHeight: 1.5,
                maxWidth: 640,
                fontWeight: 400,
              }}
            >
              Connect brands with perfect creators through AI-powered matching,
              streamlined workflows, and measurable ROI for influencer marketing campaigns.
            </Typography>

            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/brands/find-creators')}
              sx={{
                backgroundColor: '#0ea5e9',
                color: 'white',
                px: 5,
                py: 2,
                fontSize: '1.1rem',
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
              Request a demo
            </Button>
          </Box>

          {/* Trusted by logos */}
          <Box sx={{ textAlign: 'center', mt: 10 }}>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)', mb: 4 }}>
              Trusted by leading brands and creators
            </Typography>
            <Grid container spacing={4} justifyContent="center" alignItems="center">
              {['Samsung', 'Nike', 'Coca-Cola', 'Netflix', 'Spotify', 'Amazon'].map((brand) => (
                <Grid item xs={4} md={2} key={brand}>
                  <Typography
                    variant="h6"
                    sx={{
                      color: 'rgba(255,255,255,0.4)',
                      fontWeight: 600,
                      fontSize: { xs: '0.9rem', md: '1.1rem' },
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                    }}
                  >
                    {brand}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </Box>

      {/* Stats Section */}
      <Box sx={{ backgroundColor: 'white', py: 12 }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 10 }}>
            <Typography 
              variant="h2" 
              sx={{ 
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                fontWeight: 600,
                mb: 3,
                color: '#1a1a1a',
                letterSpacing: '-0.02em'
              }}
            >
              Word-of-mouth commerce at scale
            </Typography>
          </Box>
        
        <Grid container spacing={8}>
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography 
                variant="h1" 
                sx={{ 
                  fontSize: { xs: '4rem', md: '6rem' },
                  fontWeight: 700,
                  color: '#0ea5e9',
                  lineHeight: 1,
                  mb: 2
                }}
              >
                88%
              </Typography>
              <Typography 
                variant="h6" 
                sx={{ 
                  color: '#1a1a1a',
                  fontWeight: 400,
                  lineHeight: 1.4
                }}
              >
                of brands trust creator recommendations for authentic marketing
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography 
                variant="h1" 
                sx={{ 
                  fontSize: { xs: '4rem', md: '6rem' },
                  fontWeight: 700,
                  color: '#0ea5e9',
                  lineHeight: 1,
                  mb: 2
                }}
              >
                5.78x
              </Typography>
              <Typography 
                variant="h6" 
                sx={{ 
                  color: '#1a1a1a',
                  fontWeight: 400,
                  lineHeight: 1.4
                }}
              >
                ROI earned for every $1 spent on influencer marketing campaigns
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography 
                variant="h1" 
                sx={{ 
                  fontSize: { xs: '4rem', md: '6rem' },
                  fontWeight: 700,
                  color: '#0ea5e9',
                  lineHeight: 1,
                  mb: 2
                }}
              >
                73%
              </Typography>
              <Typography 
                variant="h6" 
                sx={{ 
                  color: '#1a1a1a',
                  fontWeight: 400,
                  lineHeight: 1.4
                }}
              >
                said user-generated content made them more confident purchasing
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>

      {/* Features Section */}
      <Box sx={{ backgroundColor: '#f8fafc', py: 12 }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 10 }}>
            <Typography 
              variant="h2" 
              sx={{ 
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                fontWeight: 600,
              mb: 3,
              color: '#1a1a1a',
              letterSpacing: '-0.02em'
            }}
          >
            How MatchBill drives creator commerce at scale
          </Typography>
        </Box>
        
        <Grid container spacing={8} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box>
              <Typography 
                variant="h3" 
                sx={{ 
                  fontSize: { xs: '2rem', md: '2.5rem' },
                  fontWeight: 600,
                  mb: 3,
                  color: '#1a1a1a',
                  lineHeight: 1.2
                }}
              >
                Find creators faster - or let them find you
              </Typography>
              <Typography 
                variant="h6" 
                sx={{ 
                  color: '#64748b',
                  fontWeight: 400,
                  lineHeight: 1.6,
                  mb: 4
                }}
              >
                Discover creators in half the time with the only influencer marketing platform 
                with AI-powered inbound and outbound discovery for creators, brands, and campaigns.
              </Typography>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#0ea5e9',
                  color: 'white',
                  px: 4,
                  py: 1.5,
                  fontWeight: 600,
                  textTransform: 'none',
                  borderRadius: 2,
                  '&:hover': {
                    backgroundColor: '#0284c7',
                  },
                }}
                onClick={() => navigate('/brands/find-creators')}
              >
                Find influential creators
              </Button>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Paper
              elevation={0}
              sx={{
                p: 4,
                borderRadius: 3,
                backgroundColor: 'white',
                border: '1px solid #e2e8f0',
                height: 300,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <Typography variant="h6" sx={{ color: '#64748b' }}>
                Creator Discovery Interface
              </Typography>
              
              {/* Visual elements */}
              <Box
                sx={{
                  position: 'absolute',
                  top: 20,
                  left: 20,
                  width: 60,
                  height: 60,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
                  opacity: 0.8,
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 20,
                  right: 20,
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #06b6d4, #0ea5e9)',
                  opacity: 0.6,
                }}
              />
            </Paper>
          </Grid>
        </Grid>
        
        {/* Second feature */}
        <Grid container spacing={8} alignItems="center" sx={{ mt: 8 }}>
          <Grid item xs={12} md={6} order={{ xs: 2, md: 1 }}>
            <Paper
              elevation={0}
              sx={{
                p: 4,
                borderRadius: 3,
                backgroundColor: 'white',
                border: '1px solid #e2e8f0',
                height: 300,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <Typography variant="h6" sx={{ color: '#64748b' }}>
                Campaign Management
              </Typography>
              
              {/* Visual elements */}
              <Box
                sx={{
                  position: 'absolute',
                  top: 30,
                  right: 30,
                  width: 80,
                  height: 4,
                  borderRadius: 2,
                  background: '#0ea5e9',
                  opacity: 0.8,
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  top: 50,
                  right: 30,
                  width: 120,
                  height: 4,
                  borderRadius: 2,
                  background: '#06b6d4',
                  opacity: 0.6,
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  top: 70,
                  right: 30,
                  width: 60,
                  height: 4,
                  borderRadius: 2,
                  background: '#0ea5e9',
                  opacity: 0.4,
                }}
              />
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }}>
            <Box>
              <Typography 
                variant="h3" 
                sx={{ 
                  fontSize: { xs: '2rem', md: '2.5rem' },
                  fontWeight: 600,
                  mb: 3,
                  color: '#1a1a1a',
                  lineHeight: 1.2
                }}
              >
                Run larger campaigns with less effort
              </Typography>
              <Typography 
                variant="h6" 
                sx={{ 
                  color: '#64748b',
                  fontWeight: 400,
                  lineHeight: 1.6,
                  mb: 4
                }}
              >
                Use flexible workflows to automate business processes for any campaign strategy. 
                Everything from creator outreach to content approval and automated payments.
              </Typography>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#0ea5e9',
                  color: 'white',
                  px: 4,
                  py: 1.5,
                  fontWeight: 600,
                  textTransform: 'none',
                  borderRadius: 2,
                  '&:hover': {
                    backgroundColor: '#0284c7',
                  },
                }}
                onClick={() => navigate('/dashboard')}
              >
                Run any campaign strategy
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>

      {/* CTA Section */}
      <Box
        sx={{
          backgroundColor: '#000000',
          color: 'white',
          py: 12,
        }}
      >
      <Container maxWidth="md" sx={{ textAlign: 'center' }}>
        <Typography 
          variant="h2" 
          sx={{ 
            fontSize: { xs: '2.5rem', md: '3.5rem' },
            fontWeight: 600,
            mb: 3,
            letterSpacing: '-0.02em'
          }}
        >
          Unlock faster, more efficient ROI with MatchBill
        </Typography>
        
        <Grid container spacing={8} sx={{ mb: 6, justifyContent: 'center' }}>
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography 
                variant="h2" 
                sx={{ 
                  fontSize: { xs: '3rem', md: '4rem' },
                  fontWeight: 700,
                  color: '#0ea5e9',
                  lineHeight: 1,
                  mb: 1
                }}
              >
                127%
              </Typography>
              <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.8)', fontWeight: 400 }}>
                Increase in Campaign ROI
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography 
                variant="h2" 
                sx={{ 
                  fontSize: { xs: '3rem', md: '4rem' },
                  fontWeight: 700,
                  color: '#0ea5e9',
                  lineHeight: 1,
                  mb: 1
                }}
              >
                25 Hrs
              </Typography>
              <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.8)', fontWeight: 400 }}>
                Saved per Campaign
              </Typography>
            </Box>
          </Grid>
        </Grid>
        
        <Typography 
          variant="h6" 
          sx={{ 
            mb: 6, 
            opacity: 0.8,
            fontStyle: 'italic',
            maxWidth: 600,
            mx: 'auto',
            lineHeight: 1.6
          }}
        >
          "MatchBill's AI platform handled all the strategy and logistics for us, 
          driving significant engagement through our campaigns. This was our most successful quarter yet."
        </Typography>
        
        <Typography variant="body1" sx={{ mb: 1, fontWeight: 600 }}>
          Sarah Chen
        </Typography>
        <Typography variant="body2" sx={{ mb: 6, color: 'rgba(255,255,255,0.7)' }}>
          Digital Marketing Director, TechCorp
        </Typography>
        
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate('/brands/find-creators')}
          sx={{
            backgroundColor: '#0ea5e9',
            color: 'white',
            px: 5,
            py: 2,
            fontSize: '1.1rem',
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
          Request a demo
        </Button>
        
        <Box sx={{ mt: 6 }}>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)', mb: 3 }}>
            Save time without sacrificing returns. Uplevel your influencer marketing campaigns with MatchBill.
          </Typography>
        </Box>
      </Container>
    </Box>
    </Box>
  );
};

export default HomePage;

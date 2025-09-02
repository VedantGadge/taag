import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
} from '@mui/material';

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
          {/* Ultra-smooth left-edge fade for extremely seamless blend */}
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

        {/* Content overlays above video */}
    <Container maxWidth={false} disableGutters sx={{ position: 'relative', zIndex: 2 }}>
          <Box sx={{ 
            maxWidth: { xs: '100%', md: 800 }, 
            px: { xs: 5, md: 15 }
          }}>
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
          <AnimatedSection delay={0.3} direction="up">
            <Box sx={{ textAlign: 'center', mt: 10 }}>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)', mb: 4, textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}>
                Trusted by leading brands and creators
              </Typography>
              <Grid container spacing={4} justifyContent="center" alignItems="center">
                {['Samsung', 'Nike', 'Coca-Cola', 'Netflix', 'Spotify', 'Amazon'].map((brand) => (
                  <Grid item xs={4} md={2} key={brand}>
                    <Typography
                      variant="h6"
                      sx={{
                        color: 'rgba(255,255,255,0.9)',
                        fontWeight: 700,
                        fontSize: { xs: '0.9rem', md: '1.1rem' },
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                        textShadow: '0 2px 12px rgba(0,0,0,0.8)',
                        '&:hover': {
                          color: 'rgba(255,255,255,1)',
                          transform: 'translateY(-2px)',
                        transition: 'all 0.2s ease',
                      },
                    }}
                  >
                    {brand}
                  </Typography>
                </Grid>
              ))}
            </Grid>
            </Box>
          </AnimatedSection>
        </Container>
      </Box>

      {/* Stats Section */}
      <AnimatedSection delay={0.1} direction="up">
        <Box sx={{ backgroundColor: 'white', py: 12 }}>
          <Container maxWidth="lg">
            <Box sx={{ textAlign: 'center', mb: 8 }}>
              <Typography 
                variant="h2" 
                sx={{ 
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  fontWeight: 600,
                  mb: 6,
                  color: '#1a1a1a',
                letterSpacing: '-0.02em'
              }}
            >
              Word-of-mouth commerce at scale
            </Typography>
          
            {/* Horizontal Stats Row */}
            <Grid container spacing={6} justifyContent="center" alignItems="center">
              <Grid item xs={12} sm={4}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography 
                    variant="h1" 
                    sx={{ 
                      fontSize: { xs: '3.5rem', md: '5rem' },
                      fontWeight: 700,
                      color: '#0ea5e9',
                      lineHeight: 1,
                      mb: 1
                    }}
                  >
                    88%
                  </Typography>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      color: '#1a1a1a',
                      fontWeight: 400,
                      lineHeight: 1.4,
                      fontSize: { xs: '1rem', md: '1.2rem' }
                    }}
                  >
                    of brands trust creator recommendations
                  </Typography>
                </Box>
              </Grid>
              
              <Grid item xs={12} sm={4}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography 
                    variant="h1" 
                    sx={{ 
                      fontSize: { xs: '3.5rem', md: '5rem' },
                      fontWeight: 700,
                      color: '#0ea5e9',
                      lineHeight: 1,
                      mb: 1
                    }}
                  >
                    5.78x
                  </Typography>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      color: '#1a1a1a',
                      fontWeight: 400,
                      lineHeight: 1.4,
                      fontSize: { xs: '1rem', md: '1.2rem' }
                    }}
                  >
                    ROI for every $1 spent on campaigns
                  </Typography>
                </Box>
              </Grid>
              
              <Grid item xs={12} sm={4}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography 
                    variant="h1" 
                    sx={{ 
                      fontSize: { xs: '3.5rem', md: '5rem' },
                      fontWeight: 700,
                      color: '#0ea5e9',
                      lineHeight: 1,
                      mb: 1
                    }}
                  >
                    73%
                  </Typography>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      color: '#1a1a1a',
                      fontWeight: 400,
                      lineHeight: 1.4,
                      fontSize: { xs: '1rem', md: '1.2rem' }
                    }}
                  >
                    more confident purchasing with UGC
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Container>
        </Box>
      </AnimatedSection>

     {/* Features Section */}
      <AnimatedSection delay={0.2} direction="up">
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
    
    {/* First feature - Image left, Text right */}
    <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 2, md: 4 }, mb: 12, flexWrap: 'nowrap' }}>
      <Box sx={{ flex: '0 0 40%', minWidth: 260, maxWidth: 520 }}>
        {/* Social Post style card (left of text) */}
        <Box
          sx={{
            position: 'relative',
            height: { xs: 280, md: 280 },
            borderRadius: 3,
            overflow: 'hidden',
            border: '1px solid #e2e8f0',
            boxShadow: '0 30px 80px rgba(2, 132, 199, 0.15)',
            backgroundColor: 'white',
          }}
        >
          <Box
            component="img"
            src="/assets/ifnz2.png"
            alt="Creator post example"
            loading="lazy"
            sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />

          {/* Tag pills */}
          <Box sx={{ position: 'absolute', top: 16, right: 16, display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Box sx={{ px: 1.5, py: 0.5, borderRadius: 999, bgcolor: '#fce7f3', color: '#831843', fontSize: 12, fontWeight: 600 }}>10k–50k Followers</Box>
            <Box sx={{ px: 1.5, py: 0.5, borderRadius: 999, bgcolor: '#fee2e2', color: '#7f1d1d', fontSize: 12, fontWeight: 600 }}>18–25 Years</Box>
            <Box sx={{ px: 1.5, py: 0.5, borderRadius: 999, bgcolor: '#e0f2fe', color: '#075985', fontSize: 12, fontWeight: 600 }}>Atlanta, GA</Box>
          </Box>

          
        </Box>
      </Box>
      <Box sx={{ flex: '1 1 0', pl: { md: 4 } }}>
          <Typography 
            variant="h3" 
            sx={{ 
              fontSize: { xs: '1.8rem', md: '2rem' },
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
              mb: 4,
              fontSize: { xs: '1rem', md: '1.05rem' }
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
    </Box>
    
    {/* Second feature - Text left, Image right */}
    <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 2, md: 4 }, flexWrap: 'nowrap' }}>
      <Box sx={{ flex: '1 1 0', pr: { md: 4 } }}>
          <Typography 
            variant="h3" 
            sx={{ 
              fontSize: { xs: '1.8rem', md: '2rem' },
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
              mb: 4,
              fontSize: { xs: '1rem', md: '1.05rem' }
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
      
      <Box sx={{ flex: '0 0 40%', minWidth: 260, maxWidth: 520 }}>
        {/* Social Post style card (right of text) */}
        <Box
          sx={{
            position: 'relative',
            height: { xs: 280, md: 280 },
            borderRadius: 3,
            overflow: 'hidden',
            border: '1px solid #e2e8f0',
            boxShadow: '0 30px 80px rgba(2, 132, 199, 0.15)',
            backgroundColor: 'white',
          }}
        >
          <Box
            component="img"
            src="/assets/ifnz3.png"
            alt="Campaign content example"
            loading="lazy"
            sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />

          {/* Metrics chips */}
          <Box sx={{ position: 'absolute', top: 16, left: 16, display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Box sx={{ px: 1.5, py: 0.5, borderRadius: 999, bgcolor: '#dbeafe', color: '#1e3a8a', fontSize: 12, fontWeight: 700 }}>Reach +42%</Box>
            <Box sx={{ px: 1.5, py: 0.5, borderRadius: 999, bgcolor: '#dcfce7', color: '#065f46', fontSize: 12, fontWeight: 700 }}>CTR 3.1%</Box>
            <Box sx={{ px: 1.5, py: 0.5, borderRadius: 999, bgcolor: '#fee2e2', color: '#7f1d1d', fontSize: 12, fontWeight: 700 }}>CAC ↓ 18%</Box>
          </Box>

        </Box>
      </Box>
    </Box>
  </Container>
        </Box>
      </AnimatedSection>

      {/* CTA Section */}
      <AnimatedSection delay={0.3} direction="up">
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
      </AnimatedSection>
    </Box>
  );
};

export default HomePage;

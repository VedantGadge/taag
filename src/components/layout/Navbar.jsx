import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  IconButton,
  useMediaQuery,
  useTheme,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  Campaign,
  Person,
  TrendingUp,
} from '@mui/icons-material';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  
  // Refs for navbar items to calculate indicator position
  const brandsRef = useRef(null);
  const creatorsRef = useRef(null);
  const analyticsRef = useRef(null);
  
  // State for sliding indicator
  const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, left: 0 });
  const [isInitialized, setIsInitialized] = useState(false);

  // Update indicator position when route changes
  useEffect(() => {
    const updateIndicator = () => {
      let activeRef = null;
      
      if (location.pathname.startsWith('/brands')) {
        activeRef = brandsRef.current;
      } else if (location.pathname.startsWith('/creators')) {
        activeRef = creatorsRef.current;
      } else if (location.pathname.startsWith('/dashboard')) {
        activeRef = analyticsRef.current;
      }
      
      if (activeRef) {
        const { offsetLeft, offsetWidth } = activeRef;
        setIndicatorStyle({ left: offsetLeft, width: offsetWidth });
        setIsInitialized(true);
      } else {
        // Hide indicator when no section is active
        setIndicatorStyle({ left: 0, width: 0 });
        setIsInitialized(false);
      }
    };

    // Immediate update, then small delay as backup
    updateIndicator();
    const timer = setTimeout(updateIndicator, 10);
    
    // Re-calculate on window resize
    window.addEventListener('resize', updateIndicator);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateIndicator);
    };
  }, [location.pathname]);

  const handleNavigation = (path) => {
    navigate(path);
    setMobileDrawerOpen(false);
  };

  const isActivePath = (path) => {
    return location.pathname.startsWith(path);
  };

  const DesktopNav = () => (
    <Toolbar>
      <Container maxWidth="xl" sx={{ display: 'flex', alignItems: 'center', px: { xs: 2, sm: 3 } }}>
        {/* Logo */}
        <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', mr: 4 }} onClick={() => navigate('/') }>
          <Campaign sx={{ fontSize: 32, color: 'common.white', mr: 1 }} />
          <Typography variant="h5" sx={{ fontWeight: 800, color: 'common.white', letterSpacing: 0.2 }}>
            MatchBill
          </Typography>
        </Box>

        {/* Navigation Links */}
        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', position: 'relative' }}>
          {/* Sliding background indicator */}
          {isInitialized && (
            <motion.div
              layout
              layoutId="navbar-indicator"
              style={{
                position: 'absolute',
                top: '2px',
                bottom: '2px',
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                borderRadius: '12px',
                zIndex: 0,
              }}
              initial={false}
              animate={{
                left: indicatorStyle.left,
                width: indicatorStyle.width,
              }}
              transition={{
                type: 'spring',
                stiffness: 600,
                damping: 60,
                mass: 0.6,
                restDelta: 0.01,
                restSpeed: 0.01,
              }}
            />
          )}
          
          {/* For Brands */}
          <Button
            ref={brandsRef}
            onClick={() => handleNavigation('/brands')}
            sx={{
              color: isActivePath('/brands') ? 'common.white' : 'rgba(255, 255, 255, 0.8)',
              fontWeight: isActivePath('/brands') ? 600 : 500,
              px: 2,
              py: 1,
              borderRadius: 2,
              position: 'relative',
              zIndex: 1,
              '&:hover': {
                backgroundColor: 'transparent',
                color: 'common.white',
              },
            }}
          >
            For Brands
          </Button>

          {/* For Creators */}
          <Button
            ref={creatorsRef}
            onClick={() => handleNavigation('/creators')}
            sx={{
              color: isActivePath('/creators') ? 'common.white' : 'rgba(255, 255, 255, 0.8)',
              fontWeight: isActivePath('/creators') ? 600 : 500,
              px: 2,
              py: 1,
              borderRadius: 2,
              position: 'relative',
              zIndex: 1,
              '&:hover': {
                backgroundColor: 'transparent',
                color: 'common.white',
              },
            }}
          >
            For Creators
          </Button>

          {/* Analytics */}
          <Button
            ref={analyticsRef}
            onClick={() => handleNavigation('/dashboard')}
            sx={{
              color: isActivePath('/dashboard') ? 'common.white' : 'rgba(255, 255, 255, 0.8)',
              fontWeight: isActivePath('/dashboard') ? 600 : 500,
              px: 2,
              py: 1,
              borderRadius: 2,
              position: 'relative',
              zIndex: 1,
              '&:hover': {
                backgroundColor: 'transparent',
                color: 'common.white',
              },
            }}
          >
            Analytics
          </Button>
        </Box>

        {/* CTA Buttons */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            onClick={() => navigate('/login')}
            sx={{
              borderColor: 'rgba(255, 255, 255, 0.6)',
              color: 'rgba(255, 255, 255, 0.9)',
              '&:hover': {
                borderColor: 'rgba(255, 255, 255, 0.9)',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: 'common.white',
              },
            }}
          >
            Sign In
          </Button>
          <Button
            variant="contained"
            onClick={() => navigate('/signup')}
            sx={{
              background: 'linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #0284c7 0%, #0891b2 100%)',
              },
            }}
          >
            Get Started
          </Button>
        </Box>
      </Container>
    </Toolbar>
  );

  const MobileNav = () => (
    <Toolbar>
      <Container maxWidth="xl" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2 }}>
        {/* Logo */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
          }}
          onClick={() => navigate('/')}
        >
          <Campaign sx={{ fontSize: 28, color: 'common.white', mr: 1 }} />
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: 'common.white',
            }}
          >
            MatchBill
          </Typography>
        </Box>

        {/* Mobile Menu Button */}
        <IconButton
          onClick={() => setMobileDrawerOpen(true)}
          sx={{ color: 'common.white' }}
        >
          <MenuIcon />
        </IconButton>
      </Container>
    </Toolbar>
  );

  return (
    <>
    <AppBar 
        position="sticky" 
        elevation={0}
        square
        color="transparent"
        sx={{
          // Seamless gradient background
          backgroundImage: 'linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)',
          backgroundColor: 'transparent',
          // Remove any borders/outlines/rounded corners
          border: 'none !important',
          outline: 'none !important',
          boxShadow: 'none',
      borderRadius: '0 !important',
      overflow: 'hidden',
          // Ensure children do not re-introduce rounding
          '& .MuiToolbar-root': {
            borderRadius: '0 !important',
          },
        }}
      >
        {isMobile ? <MobileNav /> : <DesktopNav />}
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileDrawerOpen}
        onClose={() => setMobileDrawerOpen(false)}
        PaperProps={{
          sx: {
            width: 280,
            backgroundColor: 'background.default',
          },
        }}
      >
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" fontWeight={600}>
            Menu
          </Typography>
          <IconButton onClick={() => setMobileDrawerOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Box>

        <List>
          <ListItem>
            <Typography variant="subtitle2" color="text.secondary" sx={{ px: 2, py: 1 }}>
              FOR BRANDS
            </Typography>
          </ListItem>
          <ListItem
            button
            onClick={() => handleNavigation('/brands')}
            sx={{
              borderRadius: 2,
              mx: 1,
              mb: 1,
              '&:hover': {
                backgroundColor: 'primary.50',
              },
            }}
          >
            <ListItemIcon sx={{ color: 'primary.main', minWidth: 40 }}>
              <Person />
            </ListItemIcon>
            <ListItemText primary="For Brands" />
          </ListItem>

          <ListItem>
            <Typography variant="subtitle2" color="text.secondary" sx={{ px: 2, py: 1 }}>
              FOR CREATORS
            </Typography>
          </ListItem>
          <ListItem
            button
            onClick={() => handleNavigation('/creators')}
            sx={{
              borderRadius: 2,
              mx: 1,
              mb: 1,
              '&:hover': {
                backgroundColor: 'primary.50',
              },
            }}
          >
            <ListItemIcon sx={{ color: 'secondary.main', minWidth: 40 }}>
              <Person />
            </ListItemIcon>
            <ListItemText primary="For Creators" />
          </ListItem>

          <ListItem>
            <Typography variant="subtitle2" color="text.secondary" sx={{ px: 2, py: 1 }}>
              ANALYTICS
            </Typography>
          </ListItem>
          <ListItem
            button
            onClick={() => handleNavigation('/dashboard')}
            sx={{
              borderRadius: 2,
              mx: 1,
              mb: 1,
              '&:hover': {
                backgroundColor: 'primary.50',
              },
            }}
          >
            <ListItemIcon sx={{ color: 'info.main', minWidth: 40 }}>
              <TrendingUp />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>

          <Box sx={{ p: 2, mt: 4 }}>
            <Button
              variant="outlined"
              fullWidth
              onClick={() => handleNavigation('/login')}
              sx={{ mb: 2 }}
            >
              Sign In
            </Button>
            <Button
              variant="contained"
              fullWidth
              onClick={() => handleNavigation('/signup')}
            >
              Get Started
            </Button>
          </Box>
        </List>
      </Drawer>
    </>
  );
};

export default Navbar;

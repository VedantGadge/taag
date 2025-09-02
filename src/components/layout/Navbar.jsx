import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  Menu,
  MenuItem,
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
  Dashboard,
  Receipt,
  TrendingUp,
  Group,
} from '@mui/icons-material';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [brandMenuAnchor, setBrandMenuAnchor] = useState(null);
  const [creatorMenuAnchor, setCreatorMenuAnchor] = useState(null);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const brandMenuItems = [
    { label: 'Find Creators', path: '/brands/find-creators', icon: <Person /> },
    { label: 'Campaign Dashboard', path: '/brands/dashboard', icon: <Dashboard /> },
    { label: 'Billing & Payments', path: '/billing', icon: <Receipt /> },
  ];

  const creatorMenuItems = [
    { label: 'Creator Dashboard', path: '/creators/dashboard', icon: <Dashboard /> },
    { label: 'Analytics', path: '/creators/analytics', icon: <TrendingUp /> },
    { label: 'Collaborations', path: '/creators/collaborations', icon: <Group /> },
  ];

  const handleBrandMenuOpen = (event) => {
    setBrandMenuAnchor(event.currentTarget);
  };

  const handleCreatorMenuOpen = (event) => {
    setCreatorMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setBrandMenuAnchor(null);
    setCreatorMenuAnchor(null);
  };

  const handleNavigation = (path) => {
    navigate(path);
    handleMenuClose();
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
          <Campaign sx={{ fontSize: 32, color: 'primary.main', mr: 1 }} />
          <Typography variant="h5" sx={{ fontWeight: 700, color: 'text.primary' }}>
            MatchBill
          </Typography>
        </Box>

        {/* Navigation Links */}
        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
          {/* For Brands */}
          <Button
            onClick={handleBrandMenuOpen}
            sx={{
              color: isActivePath('/brands') ? 'primary.main' : 'text.primary',
              fontWeight: isActivePath('/brands') ? 600 : 500,
              px: 2,
              py: 1,
              borderRadius: 2,
              '&:hover': {
                backgroundColor: 'primary.main',
                color: 'common.white',
              },
            }}
          >
            For Brands
          </Button>

          {/* For Creators */}
          <Button
            onClick={handleCreatorMenuOpen}
            sx={{
              color: isActivePath('/creators') ? 'primary.main' : 'text.primary',
              fontWeight: isActivePath('/creators') ? 600 : 500,
              px: 2,
              py: 1,
              borderRadius: 2,
              '&:hover': {
                backgroundColor: 'primary.main',
                color: 'common.white',
              },
            }}
          >
            For Creators
          </Button>

          {/* Dashboard */}
          <Button
            onClick={() => navigate('/dashboard')}
            sx={{
              color: isActivePath('/dashboard') ? 'primary.main' : 'text.primary',
              fontWeight: isActivePath('/dashboard') ? 600 : 500,
              px: 2,
              py: 1,
              borderRadius: 2,
              '&:hover': {
                backgroundColor: 'primary.main',
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
              borderColor: 'primary.main',
              color: 'primary.main',
              '&:hover': {
                borderColor: 'primary.dark',
                backgroundColor: 'primary.50',
              },
            }}
          >
            Sign In
          </Button>
          <Button
            variant="contained"
            onClick={() => navigate('/signup')}
            sx={{
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #4338ca 0%, #7c3aed 100%)',
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
          <Campaign sx={{ fontSize: 28, color: 'primary.main', mr: 1 }} />
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            MatchBill
          </Typography>
        </Box>

        {/* Mobile Menu Button */}
        <IconButton
          onClick={() => setMobileDrawerOpen(true)}
          sx={{ color: 'text.primary' }}
        >
          <MenuIcon />
        </IconButton>
      </Container>
    </Toolbar>
  );

  return (
    <>
      <AppBar position="sticky" elevation={0}>
        {isMobile ? <MobileNav /> : <DesktopNav />}
      </AppBar>

      {/* Brand Menu */}
      <Menu
        anchorEl={brandMenuAnchor}
        open={Boolean(brandMenuAnchor)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            mt: 1,
            borderRadius: 2,
            minWidth: 200,
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
          },
        }}
      >
        {brandMenuItems.map((item) => (
          <MenuItem
            key={item.path}
            onClick={() => handleNavigation(item.path)}
            sx={{
              py: 1.5,
              px: 2,
              '&:hover': {
                backgroundColor: 'primary.50',
                color: 'primary.main',
              },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {item.icon}
              <Typography variant="body2">{item.label}</Typography>
            </Box>
          </MenuItem>
        ))}
      </Menu>

      {/* Creator Menu */}
      <Menu
        anchorEl={creatorMenuAnchor}
        open={Boolean(creatorMenuAnchor)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            mt: 1,
            borderRadius: 2,
            minWidth: 200,
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
          },
        }}
      >
        {creatorMenuItems.map((item) => (
          <MenuItem
            key={item.path}
            onClick={() => handleNavigation(item.path)}
            sx={{
              py: 1.5,
              px: 2,
              '&:hover': {
                backgroundColor: 'primary.50',
                color: 'primary.main',
              },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {item.icon}
              <Typography variant="body2">{item.label}</Typography>
            </Box>
          </MenuItem>
        ))}
      </Menu>

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
          {brandMenuItems.map((item) => (
            <ListItem
              key={item.path}
              button
              onClick={() => handleNavigation(item.path)}
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
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItem>
          ))}

          <ListItem>
            <Typography variant="subtitle2" color="text.secondary" sx={{ px: 2, py: 1 }}>
              FOR CREATORS
            </Typography>
          </ListItem>
          {creatorMenuItems.map((item) => (
            <ListItem
              key={item.path}
              button
              onClick={() => handleNavigation(item.path)}
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
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItem>
          ))}

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

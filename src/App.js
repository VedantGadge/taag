import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/material';

// Import theme
import theme from './theme';

// Import layout components
import Navbar from './components/layout/Navbar';

// Import pages
import HomePage from './pages/HomePage';
import BriefForm from './pages/BriefForm';
import CreatorBriefForm from './pages/CreatorBriefForm';
import MatchConsole from './pages/MatchConsole';
import BrandMatchConsole from './pages/BrandMatchConsole';
import BillingPage from './pages/BillingPage';
import DashboardPage from './pages/DashboardPage';

// Import brand pages
import BrandsPage from './pages/brands/BrandsPage';
import BrandDashboard from './pages/brands/BrandDashboard';

// Import creator pages
import CreatorsPage from './pages/creators/CreatorsPage';
import CreatorDashboard from './pages/creators/CreatorDashboard';

// Import components
import ComingSoon from './components/ComingSoon';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navbar />
          
          <Box component="main" sx={{ flexGrow: 1 }}>
            <Routes>
              {/* Home */}
              <Route path="/" element={<HomePage />} />
              
              {/* Analytics Dashboard */}
              <Route path="/dashboard" element={<DashboardPage />} />
              
              {/* Brand routes */}
              <Route path="/brands" element={<BrandsPage />} />
              <Route path="/brands/find-creators" element={<BriefForm />} />
              <Route path="/brands/dashboard" element={<BrandDashboard />} />
              
              {/* Creator routes */}
              <Route path="/creators" element={<CreatorsPage />} />
              <Route path="/creators/dashboard" element={<CreatorDashboard />} />
              <Route path="/creators/find-brands" element={<CreatorBriefForm />} />
              <Route path="/creators/analytics" element={
                <ComingSoon 
                  title="Creator Analytics" 
                  description="Track your performance, audience growth, and earnings insights." 
                />
              } />
              <Route path="/creators/collaborations" element={
                <ComingSoon 
                  title="Collaborations" 
                  description="Manage your brand partnerships and campaign history." 
                />
              } />
              
              {/* Existing app routes */}
              <Route path="/brief" element={<BriefForm />} />
              <Route path="/creator-brief" element={<CreatorBriefForm />} />
              <Route path="/matches" element={<MatchConsole />} />
              <Route path="/brand-matches" element={<BrandMatchConsole />} />
              <Route path="/billing" element={<BillingPage />} />
              
              {/* Auth routes (placeholders) */}
              <Route path="/login" element={
                <ComingSoon 
                  title="Sign In" 
                  description="Secure login for brands and creators." 
                />
              } />
              <Route path="/signup" element={
                <ComingSoon 
                  title="Get Started" 
                  description="Join thousands of brands and creators on MatchBill." 
                />
              } />
              
              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;

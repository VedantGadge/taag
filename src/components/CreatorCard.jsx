import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Typography,
  Box,
  LinearProgress,
  Chip,
  Grid,
  Divider,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  Instagram,
  YouTube,
  LinkedIn,
  Twitter,
  Facebook,
  TrendingUp,
  Visibility,
  MonetizationOn
} from '@mui/icons-material';

const platformIcons = {
  Instagram: <Instagram />,
  YouTube: <YouTube />,
  LinkedIn: <LinkedIn />,
  Twitter: <Twitter />,
  Facebook: <Facebook />,
  TikTok: <TrendingUp />,
  Reels: <Instagram />
};

const CreatorCard = ({ creator }) => {
  const {
    handle,
    verticals,
    platforms,
    audienceGeo,
    audienceAge,
    avgViews,
    engagementRate,
    basePriceINR,
    matchScore,
    reasons,
    breakdown
  } = creator;

  // Get top locations
  const topLocations = Object.entries(audienceGeo)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 3);

  // Get top age groups
  const topAgeGroups = Object.entries(audienceAge)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 2);

  const formatNumber = (num) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <Card elevation={3} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56 }}>
            {handle.slice(1, 3).toUpperCase()}
          </Avatar>
        }
        title={
          <Typography variant="h6" component="div">
            {handle}
          </Typography>
        }
        subheader={
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 1 }}>
            {verticals.map((vertical) => (
              <Chip
                key={vertical}
                label={vertical}
                size="small"
                variant="outlined"
                color="primary"
              />
            ))}
          </Box>
        }
        action={
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h4" color="primary" fontWeight="bold">
              {matchScore}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Match Score
            </Typography>
          </Box>
        }
      />

      <CardContent sx={{ flexGrow: 1 }}>
        {/* Match Score Progress */}
        <Box sx={{ mb: 2 }}>
          <LinearProgress
            variant="determinate"
            value={matchScore}
            sx={{
              height: 8,
              borderRadius: 4,
              backgroundColor: 'grey.200',
              '& .MuiLinearProgress-bar': {
                borderRadius: 4,
                backgroundColor: matchScore >= 80 ? 'success.main' : matchScore >= 60 ? 'warning.main' : 'error.main'
              }
            }}
          />
        </Box>

        {/* Platforms */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" gutterBottom>
            Platforms
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            {platforms.map((platform) => (
              <Tooltip key={platform} title={platform}>
                <IconButton size="small" color="primary">
                  {platformIcons[platform] || <TrendingUp />}
                </IconButton>
              </Tooltip>
            ))}
          </Box>
        </Box>

        {/* Key Metrics */}
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Visibility fontSize="small" color="action" />
              <Box>
                <Typography variant="body2" fontWeight="bold">
                  {formatNumber(avgViews)}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Avg Views
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <TrendingUp fontSize="small" color="action" />
              <Box>
                <Typography variant="body2" fontWeight="bold">
                  {(engagementRate * 100).toFixed(1)}%
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Engagement
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* Audience Demographics */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" gutterBottom>
            Top Audience
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 1 }}>
            {topLocations.map(([location, percentage]) => (
              <Chip
                key={location}
                label={`${location} ${(percentage * 100).toFixed(0)}%`}
                size="small"
                variant="outlined"
              />
            ))}
          </Box>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {topAgeGroups.map(([ageGroup, percentage]) => (
              <Chip
                key={ageGroup}
                label={`${ageGroup} ${(percentage * 100).toFixed(0)}%`}
                size="small"
                variant="outlined"
                color="secondary"
              />
            ))}
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Price */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <MonetizationOn color="action" />
          <Typography variant="h6" color="primary">
            {formatCurrency(basePriceINR)}
          </Typography>
        </Box>

        {/* Match Reasons */}
        <Box>
          <Typography variant="subtitle2" gutterBottom>
            Why This Match?
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
            {reasons?.slice(0, 3).map((reason, index) => (
              <Chip
                key={index}
                label={reason}
                size="small"
                color="success"
                variant="filled"
                sx={{ alignSelf: 'flex-start' }}
              />
            ))}
          </Box>
        </Box>

        {/* Score Breakdown */}
        {breakdown && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="caption" color="text.secondary">
              Score Breakdown: Relevance {breakdown.relevance} • Audience {breakdown.audienceFit} • Performance {breakdown.performance}
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default CreatorCard;

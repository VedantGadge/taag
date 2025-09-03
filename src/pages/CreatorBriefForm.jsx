import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  FormControlLabel,
  Switch,
  Alert,
  Breadcrumbs,
  Link,
  CircularProgress,
  Autocomplete,
} from '@mui/material';
import {
  Home,
  ChevronRight,
  Search,
  TrendingUp,
} from '@mui/icons-material';
import api from '../services/api';

// Creator brief validation schema
const creatorBriefSchema = z.object({
  categories: z.array(z.string()).min(1, 'Select at least one category'),
  platforms: z.array(z.string()).min(1, 'Select at least one platform'),
  minBudgetINR: z.number().min(1000, 'Minimum budget must be at least ₹1,000'),
  maxBudgetINR: z.number().max(10000000, 'Maximum budget cannot exceed ₹1,00,00,000'),
  preferredTones: z.array(z.string()).min(1, 'Select at least one tone preference'),
  contentTypes: z.array(z.string()).min(1, 'Select at least one content type'),
  audienceDemographics: z.object({
    ageGroups: z.array(z.string()).min(1, 'Select target age groups'),
    locations: z.array(z.string()).min(1, 'Select target locations'),
  }),
  exclusions: z.object({
    noAdultContent: z.boolean(),
    noAlcoholTobacco: z.boolean(),
    noGambling: z.boolean(),
  }),
  collaborationTypes: z.array(z.string()).min(1, 'Select collaboration types'),
  availability: z.object({
    startDate: z.string().min(1, 'Start date is required'),
    duration: z.string().min(1, 'Campaign duration is required'),
  }),
});

// Options data
const categoryOptions = [
  'Fashion', 'Beauty', 'Technology', 'Food', 'Travel', 'Fitness', 'Lifestyle',
  'Gaming', 'Education', 'Finance', 'Healthcare', 'Automotive', 'Sports',
  'Entertainment', 'Home & Garden', 'Parenting', 'Business', 'Art & Design'
];

const platformOptions = ['Instagram', 'YouTube', 'LinkedIn', 'TikTok', 'Twitter', 'Facebook', 'Twitch', 'Pinterest'];

const toneOptions = [
  'Professional', 'Casual', 'Humorous', 'Educational', 'Inspirational',
  'Trendy', 'Authentic', 'Luxury', 'Minimalist', 'Bold'
];

const contentTypeOptions = [
  'Posts', 'Stories', 'Reels', 'IGTV', 'YouTube Videos', 'Shorts',
  'Live Streams', 'Tutorials', 'Reviews', 'Unboxing', 'Vlogs',
  'Behind the Scenes', 'Product Demos', 'Challenges'
];

const collaborationTypeOptions = [
  'Sponsored Posts', 'Product Gifting', 'Brand Ambassador', 'Event Coverage',
  'Product Reviews', 'Takeovers', 'Contests/Giveaways', 'Long-term Partnership',
  'Affiliate Marketing', 'Co-creation'
];

const locationOptions = [
  'Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad',
  'Pune', 'Ahmedabad', 'Surat', 'Jaipur', 'Lucknow', 'Kanpur',
  'Nagpur', 'Indore', 'Thane', 'Bhopal', 'Visakhapatnam', 'Pimpri-Chinchwad',
  'Patna', 'Vadodara', 'Ghaziabad', 'Ludhiana', 'Agra', 'Nashik'
];

const ageGroupOptions = ['13-17', '18-24', '25-34', '35-44', '45-54', '55-64', '65+'];

const CreatorBriefForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(creatorBriefSchema),
    defaultValues: {
      categories: ['Fashion', 'Beauty'],
      platforms: ['Instagram', 'YouTube'],
      minBudgetINR: 300000,
      maxBudgetINR: 800000,
      preferredTones: ['Trendy', 'Energetic', 'Authentic'],
      contentTypes: ['Posts', 'Stories', 'Reels'],
      audienceDemographics: {
        ageGroups: ['18-24', '25-34'],
        locations: ['Mumbai', 'Delhi', 'Bengaluru'],
      },
      exclusions: {
        noAdultContent: true,
        noAlcoholTobacco: false,
        noGambling: true,
      },
      collaborationTypes: ['Sponsored Posts', 'Brand Ambassador', 'Product Reviews'],
      availability: {
        startDate: new Date().toISOString().split('T')[0],
        duration: '3-4 weeks',
      },
    },
  });

  const budgetRange = watch(['minBudgetINR', 'maxBudgetINR']);

  const onSubmit = async (data) => {
    setLoading(true);
    setError('');
    
    try {
      console.log('Submitting creator brief:', data);
      
      // Validate budget range
      if (data.minBudgetINR >= data.maxBudgetINR) {
        setError('Minimum budget must be less than maximum budget');
        setLoading(false);
        return;
      }
      
      const result = await api.matchBrands(data);
      
      // Navigate to brand matches page
      navigate('/brand-matches', { 
        state: { 
          matchResults: result,
          creatorBrief: data 
        } 
      });
    } catch (err) {
      console.error('Error submitting creator brief:', err);
      setError(err.response?.data?.error || 'Failed to find brand matches. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ backgroundColor: 'grey.50', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
        {/* Breadcrumbs */}
        <Breadcrumbs 
          aria-label="breadcrumb" 
          sx={{ mb: 4 }}
          separator={<ChevronRight fontSize="small" />}
        >
          <Link
            underline="hover"
            color="inherit"
            onClick={() => navigate('/')}
            sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
          >
            <Home sx={{ mr: 0.5 }} fontSize="inherit" />
            Home
          </Link>
          <Link
            underline="hover"
            color="inherit"
            onClick={() => navigate('/creators')}
            sx={{ cursor: 'pointer' }}
          >
            For Creators
          </Link>
          <Typography color="text.primary">Find Brands</Typography>
        </Breadcrumbs>

        <Paper elevation={3} sx={{ p: { xs: 4, md: 8 }, borderRadius: 4, maxWidth: 1200, mx: 'auto' }}>
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
              <Search sx={{ fontSize: 48, color: 'primary.main' }} />
            </Box>
            <Typography variant="h3" fontWeight={700} gutterBottom color="primary">
              Find Your Perfect Brand Partners
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
              Tell us about your content style and collaboration preferences, and we'll match you with brands looking for creators like you
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 4, borderRadius: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <Grid container spacing={5}>
              
              {/* Categories */}
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  Content Categories
                </Typography>
                <Controller
                  name="categories"
                  control={control}
                  render={({ field }) => (
                    <Autocomplete
                      multiple
                      options={categoryOptions}
                      value={field.value}
                      onChange={(_, newValue) => field.onChange(newValue)}
                      renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                          <Chip
                            variant="outlined"
                            label={option}
                            {...getTagProps({ index })}
                            key={option}
                          />
                        ))
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Select categories you create content for"
                          placeholder="e.g., Fashion, Beauty, Technology"
                          error={!!errors.categories}
                          helperText={errors.categories?.message}
                          sx={{
                            '& .MuiInputLabel-root': {
                              backgroundColor: 'white',
                              px: 1,
                            },
                          }}
                        />
                      )}
                    />
                  )}
                />
              </Grid>

              {/* Platforms */}
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  Platforms
                </Typography>
                <Controller
                  name="platforms"
                  control={control}
                  render={({ field }) => (
                    <Autocomplete
                      multiple
                      options={platformOptions}
                      value={field.value}
                      onChange={(_, newValue) => field.onChange(newValue)}
                      renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                          <Chip
                            variant="outlined"
                            label={option}
                            {...getTagProps({ index })}
                            key={option}
                          />
                        ))
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Select your active platforms"
                          placeholder="e.g., Instagram, YouTube"
                          error={!!errors.platforms}
                          helperText={errors.platforms?.message}
                          sx={{
                            '& .MuiInputLabel-root': {
                              backgroundColor: 'white',
                              px: 1,
                            },
                          }}
                        />
                      )}
                    />
                  )}
                />
              </Grid>

              {/* Budget Range */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  Expected Collaboration Budget (₹)
                </Typography>
                <Box sx={{ px: 2, py: 1 }}>
                  <Grid container spacing={4} alignItems="center">
                    <Grid item xs={12} md={3}>
                      <Controller
                        name="minBudgetINR"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            type="number"
                            label="Minimum Budget"
                            fullWidth
                            InputProps={{
                              startAdornment: <Typography sx={{ mr: 1 }}>₹</Typography>,
                            }}
                            error={!!errors.minBudgetINR}
                            helperText={errors.minBudgetINR?.message}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <Controller
                        name="maxBudgetINR"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            type="number"
                            label="Maximum Budget"
                            fullWidth
                            InputProps={{
                              startAdornment: <Typography sx={{ mr: 1 }}>₹</Typography>,
                            }}
                            error={!!errors.maxBudgetINR}
                            helperText={errors.maxBudgetINR?.message}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography variant="body2" color="text.secondary">
                        Range: ₹{budgetRange[0]?.toLocaleString()} - ₹{budgetRange[1]?.toLocaleString()}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>

              {/* Content Preferences */}
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  Preferred Brand Tone
                </Typography>
                <Controller
                  name="preferredTones"
                  control={control}
                  render={({ field }) => (
                    <Autocomplete
                      multiple
                      options={toneOptions}
                      value={field.value}
                      onChange={(_, newValue) => field.onChange(newValue)}
                      renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                          <Chip
                            variant="outlined"
                            label={option}
                            {...getTagProps({ index })}
                            key={option}
                          />
                        ))
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="What brand tones align with your style?"
                          error={!!errors.preferredTones}
                          helperText={errors.preferredTones?.message}
                          sx={{
                            '& .MuiInputLabel-root': {
                              backgroundColor: 'white',
                              px: 1,
                            },
                          }}
                        />
                      )}
                    />
                  )}
                />
              </Grid>

              {/* Content Types */}
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  Content Types You Create
                </Typography>
                <Controller
                  name="contentTypes"
                  control={control}
                  render={({ field }) => (
                    <Autocomplete
                      multiple
                      options={contentTypeOptions}
                      value={field.value}
                      onChange={(_, newValue) => field.onChange(newValue)}
                      renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                          <Chip
                            variant="outlined"
                            label={option}
                            {...getTagProps({ index })}
                            key={option}
                          />
                        ))
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Select content formats you specialize in"
                          error={!!errors.contentTypes}
                          helperText={errors.contentTypes?.message}
                          sx={{
                            '& .MuiInputLabel-root': {
                              backgroundColor: 'white',
                              px: 1,
                            },
                          }}
                        />
                      )}
                    />
                  )}
                />
              </Grid>

              {/* Audience Demographics */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  Your Audience Demographics
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Controller
                      name="audienceDemographics.ageGroups"
                      control={control}
                      render={({ field }) => (
                        <Autocomplete
                          multiple
                          options={ageGroupOptions}
                          value={field.value}
                          onChange={(_, newValue) => field.onChange(newValue)}
                          renderTags={(value, getTagProps) =>
                            value.map((option, index) => (
                              <Chip
                                variant="outlined"
                                label={option}
                                {...getTagProps({ index })}
                                key={option}
                              />
                            ))
                          }
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Primary age groups in your audience"
                              error={!!errors.audienceDemographics?.ageGroups}
                              helperText={errors.audienceDemographics?.ageGroups?.message}
                              sx={{
                                '& .MuiInputLabel-root': {
                                  backgroundColor: 'white',
                                  px: 1,
                                },
                              }}
                            />
                          )}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Controller
                      name="audienceDemographics.locations"
                      control={control}
                      render={({ field }) => (
                        <Autocomplete
                          multiple
                          options={locationOptions}
                          value={field.value}
                          onChange={(_, newValue) => field.onChange(newValue)}
                          renderTags={(value, getTagProps) =>
                            value.map((option, index) => (
                              <Chip
                                variant="outlined"
                                label={option}
                                {...getTagProps({ index })}
                                key={option}
                              />
                            ))
                          }
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Primary audience locations"
                              error={!!errors.audienceDemographics?.locations}
                              helperText={errors.audienceDemographics?.locations?.message}
                              sx={{
                                '& .MuiInputLabel-root': {
                                  backgroundColor: 'white',
                                  px: 1,
                                },
                              }}
                            />
                          )}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </Grid>

              {/* Collaboration Types */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  Preferred Collaboration Types
                </Typography>
                <Controller
                  name="collaborationTypes"
                  control={control}
                  render={({ field }) => (
                    <Autocomplete
                      multiple
                      options={collaborationTypeOptions}
                      value={field.value}
                      onChange={(_, newValue) => field.onChange(newValue)}
                      renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                          <Chip
                            variant="outlined"
                            label={option}
                            {...getTagProps({ index })}
                            key={option}
                          />
                        ))
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="What types of brand collaborations interest you?"
                          error={!!errors.collaborationTypes}
                          helperText={errors.collaborationTypes?.message}
                          sx={{
                            '& .MuiInputLabel-root': {
                              backgroundColor: 'white',
                              px: 1,
                            },
                          }}
                        />
                      )}
                    />
                  )}
                />
              </Grid>

              {/* Content Exclusions */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  Content Exclusions
                </Typography>
                <Box sx={{ pl: 2 }}>
                  <Controller
                    name="exclusions.noAdultContent"
                    control={control}
                    render={({ field }) => (
                      <FormControlLabel
                        control={<Switch {...field} checked={field.value} />}
                        label="No adult/explicit content brands"
                      />
                    )}
                  />
                  <Controller
                    name="exclusions.noAlcoholTobacco"
                    control={control}
                    render={({ field }) => (
                      <FormControlLabel
                        control={<Switch {...field} checked={field.value} />}
                        label="No alcohol/tobacco brands"
                      />
                    )}
                  />
                  <Controller
                    name="exclusions.noGambling"
                    control={control}
                    render={({ field }) => (
                      <FormControlLabel
                        control={<Switch {...field} checked={field.value} />}
                        label="No gambling/betting brands"
                      />
                    )}
                  />
                </Box>
              </Grid>

              {/* Availability */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  Availability
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Controller
                      name="availability.startDate"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          type="date"
                          label="Available from"
                          fullWidth
                          InputLabelProps={{ shrink: true }}
                          error={!!errors.availability?.startDate}
                          helperText={errors.availability?.startDate?.message}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Controller
                      name="availability.duration"
                      control={control}
                      render={({ field }) => (
                        <FormControl fullWidth error={!!errors.availability?.duration}>
                          <InputLabel>Preferred campaign duration</InputLabel>
                          <Select {...field} label="Preferred campaign duration">
                            <MenuItem value="1-2 weeks">1-2 weeks</MenuItem>
                            <MenuItem value="3-4 weeks">3-4 weeks</MenuItem>
                            <MenuItem value="1-2 months">1-2 months</MenuItem>
                            <MenuItem value="3-6 months">3-6 months</MenuItem>
                            <MenuItem value="Ongoing">Ongoing</MenuItem>
                          </Select>
                        </FormControl>
                      )}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            {/* Submit Button */}
            <Box sx={{ mt: 6, textAlign: 'center' }}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={loading}
                sx={{
                  px: 6,
                  py: 2,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  background: 'linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #0284c7 0%, #0891b2 100%)',
                    transform: 'translateY(-2px)',
                  },
                }}
                startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <TrendingUp />}
              >
                {loading ? 'Finding Brand Matches...' : 'Find Brand Partners'}
              </Button>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                We'll analyze your profile and preferences to find the best brand collaboration opportunities
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default CreatorBriefForm;

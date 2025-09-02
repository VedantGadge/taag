import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Paper,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Box,
  Button,
  Slider,
  Alert,
  CircularProgress,
  Autocomplete,
  OutlinedInput,
  FormHelperText,
  Grid,
  Container,
  Breadcrumbs,
  Link
} from '@mui/material';
import { Home, ChevronRight } from '@mui/icons-material';
import { api } from '../services/api';

// Form validation schema
const brandBriefSchema = z.object({
  category: z.string().min(1, 'Category is required'),
  targetLocations: z.array(z.string()).min(1, 'At least one location is required'),
  targetAges: z.array(z.number()).length(2, 'Age range must have min and max'),
  goals: z.array(z.string()).min(1, 'At least one goal is required'),
  tone: z.array(z.string()).min(1, 'At least one tone is required'),
  platforms: z.array(z.string()).min(1, 'At least one platform is required'),
  budgetINR: z.number().min(1000, 'Budget must be at least ₹1,000'),
  noAdultContent: z.boolean(),
});

// Options for form fields
const categoryOptions = ['Fashion', 'Technology', 'Food', 'Travel', 'Beauty', 'Fitness', 'Education', 'Fintech', 'Lifestyle'];
const locationOptions = ['Mumbai', 'Delhi', 'Bengaluru', 'Hyderabad', 'Chennai', 'Pune', 'Kolkata', 'Ahmedabad', 'Jaipur', 'Goa'];
const goalOptions = ['awareness', 'installs', 'signups', 'sales', 'engagement'];
const toneOptions = ['energetic', 'fun', 'informative', 'serious', 'trendy', 'casual', 'inspiring', 'trustworthy'];
const platformOptions = ['Instagram', 'YouTube', 'LinkedIn', 'TikTok', 'Twitter', 'Facebook', 'Reels'];

const BriefForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm({
    resolver: zodResolver(brandBriefSchema),
    defaultValues: {
      category: '',
      targetLocations: [],
      targetAges: [18, 35],
      goals: [],
      tone: [],
      platforms: [],
      budgetINR: 100000,
      noAdultContent: true,
    },
  });

  const ageRange = watch('targetAges');

  const onSubmit = async (data) => {
    setLoading(true);
    setError('');
    try {
      console.log('Submitting brand brief:', data);
      const result = await api.matchCreators(data);
      
      // Navigate to results page with data
      navigate('/matches', { 
        state: { 
          matchResults: result,
          brandBrief: data 
        } 
      });
    } catch (err) {
      console.error('Error submitting brief:', err);
      setError(err.response?.data?.error || 'Failed to submit brief. Please try again.');
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
            onClick={() => navigate('/brands')}
            sx={{ cursor: 'pointer' }}
          >
            For Brands
          </Link>
          <Typography color="text.primary">Find Creators</Typography>
        </Breadcrumbs>

        <Paper elevation={3} sx={{ p: { xs: 3, md: 6 }, borderRadius: 4, maxWidth: 900, mx: 'auto' }}>
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h3" fontWeight={700} gutterBottom color="primary">
              Find Your Perfect Creators
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
              Tell us about your campaign and we'll match you with creators who align with your brand values and target audience
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 4, borderRadius: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <Grid container spacing={4}>
              {/* Category & Budget */}
              <Grid item xs={12} md={6}>
                <Controller
                  name="category"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth error={!!errors.category}>
                      <InputLabel>Brand Category</InputLabel>
                      <Select {...field} label="Brand Category">
                        {categoryOptions.map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </Select>
                      {errors.category && (
                        <FormHelperText>{errors.category.message}</FormHelperText>
                      )}
                    </FormControl>
                  )}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Controller
                  name="budgetINR"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Campaign Budget"
                      type="number"
                      fullWidth
                      error={!!errors.budgetINR}
                      helperText={errors.budgetINR?.message}
                      InputProps={{
                        startAdornment: '₹',
                      }}
                    />
                  )}
                />
              </Grid>

              {/* Target Locations */}
              <Grid item xs={12}>
                <Controller
                  name="targetLocations"
                  control={control}
                  render={({ field }) => (
                    <Autocomplete
                      {...field}
                      multiple
                      options={locationOptions}
                      value={field.value || []}
                      onChange={(_, newValue) => field.onChange(newValue)}
                      renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                          <Chip 
                            variant="outlined" 
                            label={option} 
                            {...getTagProps({ index })} 
                            key={option}
                            color="primary"
                          />
                        ))
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Target Locations"
                          error={!!errors.targetLocations}
                          helperText={errors.targetLocations?.message || "Select cities where your target audience is located"}
                        />
                      )}
                    />
                  )}
                />
              </Grid>

              {/* Age Range */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                  Target Age Range: {ageRange[0]} - {ageRange[1]} years
                </Typography>
                <Controller
                  name="targetAges"
                  control={control}
                  render={({ field }) => (
                    <Slider
                      {...field}
                      value={field.value}
                      onChange={(_, newValue) => field.onChange(newValue)}
                      valueLabelDisplay="auto"
                      min={13}
                      max={65}
                      marks={[
                        { value: 13, label: '13' },
                        { value: 25, label: '25' },
                        { value: 35, label: '35' },
                        { value: 50, label: '50' },
                        { value: 65, label: '65+' },
                      ]}
                      sx={{
                        '& .MuiSlider-thumb': {
                          width: 24,
                          height: 24,
                        },
                        '& .MuiSlider-track': {
                          height: 6,
                        },
                        '& .MuiSlider-rail': {
                          height: 6,
                        },
                      }}
                    />
                  )}
                />
              </Grid>

              {/* Goals & Tone */}
              <Grid item xs={12} md={6}>
                <Controller
                  name="goals"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth error={!!errors.goals}>
                      <InputLabel>Campaign Goals</InputLabel>
                      <Select
                        {...field}
                        multiple
                        value={field.value || []}
                        input={<OutlinedInput label="Campaign Goals" />}
                        renderValue={(selected) => (
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => (
                              <Chip key={value} label={value} size="small" color="secondary" />
                            ))}
                          </Box>
                        )}
                      >
                        {goalOptions.map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </Select>
                      {errors.goals && (
                        <FormHelperText>{errors.goals.message}</FormHelperText>
                      )}
                    </FormControl>
                  )}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Controller
                  name="tone"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth error={!!errors.tone}>
                      <InputLabel>Content Tone</InputLabel>
                      <Select
                        {...field}
                        multiple
                        value={field.value || []}
                        input={<OutlinedInput label="Content Tone" />}
                        renderValue={(selected) => (
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => (
                              <Chip key={value} label={value} size="small" color="success" />
                            ))}
                          </Box>
                        )}
                      >
                        {toneOptions.map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </Select>
                      {errors.tone && (
                        <FormHelperText>{errors.tone.message}</FormHelperText>
                      )}
                    </FormControl>
                  )}
                />
              </Grid>

              {/* Platforms */}
              <Grid item xs={12}>
                <Controller
                  name="platforms"
                  control={control}
                  render={({ field }) => (
                    <Autocomplete
                      {...field}
                      multiple
                      options={platformOptions}
                      value={field.value || []}
                      onChange={(_, newValue) => field.onChange(newValue)}
                      renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                          <Chip 
                            variant="outlined" 
                            label={option} 
                            {...getTagProps({ index })} 
                            key={option}
                            color="info"
                          />
                        ))
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Preferred Platforms"
                          error={!!errors.platforms}
                          helperText={errors.platforms?.message || "Select platforms where you want to run your campaign"}
                        />
                      )}
                    />
                  )}
                />
              </Grid>

              {/* Submit Button */}
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={loading}
                    sx={{ 
                      minWidth: 250,
                      py: 2,
                      fontSize: '1.1rem',
                      borderRadius: 3,
                      background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #4338ca 0%, #7c3aed 100%)',
                        transform: 'translateY(-2px)',
                      },
                    }}
                  >
                    {loading ? (
                      <>
                        <CircularProgress size={24} sx={{ mr: 2, color: 'white' }} />
                        Finding Perfect Matches...
                      </>
                    ) : (
                      'Find My Creators'
                    )}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default BriefForm;

import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';

// 🎯 DEMO MODE: Both forms are pre-filled with realistic test data for demonstration
import {
  Paper,
  Typography,
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  TextField,
  Grid,
  Alert,
  CircularProgress,
  Divider,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Container,
  Breadcrumbs,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import { Print, Save, Home, ChevronRight } from '@mui/icons-material';
import { api } from '../services/api';

// Professional Invoice Print Styles
const printStyles = `
  @media print {
    @page {
      margin: 15mm;
      size: A4;
    }
    
    body * {
      visibility: hidden;
    }
    
    .print-area, .print-area * {
      visibility: visible;
    }
    
    .print-area {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      background: white !important;
      color: black !important;
      font-family: 'Roboto', Arial, sans-serif;
    }
    
    .no-print {
      display: none !important;
    }
    
    .invoice-header {
      border-bottom: 2px solid black;
      padding-bottom: 20px;
      margin-bottom: 30px;
    }
    
    .invoice-logo {
      font-size: 32px;
      font-weight: bold;
      color: black !important;
      margin-bottom: 10px;
    }
    
    .invoice-number {
      font-size: 18px;
      color: black !important;
      margin-bottom: 5px;
    }
    
    .company-details {
      display: flex;
      justify-content: space-between;
      margin: 30px 0;
    }
    
    .company-box {
      border: 2px solid black;
      padding: 20px;
      width: 45%;
      border-radius: 0;
    }
    
    .company-box h6 {
      color: black !important;
      border-bottom: 1px solid black;
      padding-bottom: 5px;
      margin-bottom: 15px;
    }
    
    .invoice-table {
      width: 100%;
      border-collapse: collapse;
      margin: 30px 0;
      border: 2px solid black;
    }
    
    .invoice-table th,
    .invoice-table td {
      border: 1px solid black;
      padding: 15px;
      text-align: left;
    }
    
    .invoice-table th {
      background-color: black !important;
      color: white !important;
      font-weight: bold;
    }
    
    .total-section {
      background: white !important;
      padding: 20px;
      border: 3px solid black;
      margin-top: 30px;
      text-align: center;
    }
    
    .total-section h4 {
      color: black !important;
    }
    
    .footer-note {
      margin-top: 40px;
      padding-top: 20px;
      border-top: 1px solid black;
      font-size: 12px;
      color: black !important;
      text-align: center;
    }
    
    /* Remove all colors and make everything B&W */
    * {
      color: black !important;
      background-color: white !important;
    }
    
    .invoice-table th {
      background-color: black !important;
      color: white !important;
    }
  }
`;

// Validation schemas
const brandBillingSchema = z.object({
  company: z.string().min(1, 'Company name is required'),
  gstin: z.string().regex(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, 'Invalid GSTIN format'),
  address: z.object({
    street: z.string().min(1, 'Street address is required'),
    city: z.string().min(1, 'City is required'),
    state: z.string().min(1, 'State is required'),
    pincode: z.string().regex(/^[1-9][0-9]{5}$/, 'Invalid pincode format')
  }),
  email: z.string().email('Invalid email format'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Invalid phone number format'),
  budget: z.number().min(1000, 'Budget must be at least ₹1,000'),
  paymentMethod: z.enum(['Credit Card', 'Bank Transfer', 'UPI', 'Cheque'])
});

const creatorPayoutSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  pan: z.string().regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Invalid PAN format'),
  upi: z.string().regex(/^[\w.-_]{2,256}@[a-zA-Z]{2,64}$/, 'Invalid UPI ID format'),
  bankAccount: z.object({
    accountNumber: z.string().regex(/^\d{9,18}$/, 'Invalid account number'),
    ifsc: z.string().regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, 'Invalid IFSC code'),
    bankName: z.string().min(1, 'Bank name is required'),
    accountHolderName: z.string().min(1, 'Account holder name is required')
  }),
  address: z.object({
    street: z.string().min(1, 'Street address is required'),
    city: z.string().min(1, 'City is required'),
    state: z.string().min(1, 'State is required'),
    pincode: z.string().regex(/^[1-9][0-9]{5}$/, 'Invalid pincode format')
  })
});

const steps = ['Brand Billing', 'Creator Payout', 'Summary'];

const BillingPage = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [brandBillingData, setBrandBillingData] = useState(null);
  const [creatorPayoutData, setCreatorPayoutData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Brand billing form
  const brandForm = useForm({
    resolver: zodResolver(brandBillingSchema),
    defaultValues: {
      company: 'TechCorp Solutions Pvt Ltd',
      gstin: '27AAPFU0939F1ZV',
      address: {
        street: 'Plot No. 42, Sector 18, Cyber City',
        city: 'Gurugram',
        state: 'Haryana',
        pincode: '122015'
      },
      email: 'marketing@techcorp.com',
      phone: '+91 9876543210',
      budget: 250000,
      paymentMethod: 'Bank Transfer'
    }
  });

  // Creator payout form
  const creatorForm = useForm({
    resolver: zodResolver(creatorPayoutSchema),
    defaultValues: {
      name: 'Devansh Shah',
      pan: 'ABCDE1234F',
      upi: 'devansh.creator@paytm',
      bankAccount: {
        accountNumber: '1234567890123456',
        ifsc: 'HDFC0001234',
        bankName: 'HDFC Bank',
        accountHolderName: 'Devansh Shah'
      },
      address: {
        street: 'A-101, Creative Heights, Koregaon Park',
        city: 'Pune',
        state: 'Maharashtra',
        pincode: '411001'
      }
    }
  });

  const handleBrandBillingSubmit = async (data) => {
    setLoading(true);
    setError('');
    try {
      const result = await api.submitBrandBilling(data);
      setBrandBillingData(result.summary);
      setActiveStep(1);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to submit billing details');
    } finally {
      setLoading(false);
    }
  };

  const handleCreatorPayoutSubmit = async (data) => {
    setLoading(true);
    setError('');
    try {
      const result = await api.submitCreatorPayout(data);
      setCreatorPayoutData(result.data);
      setActiveStep(2);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to submit payout details');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setActiveStep(prev => prev - 1);
    setError('');
  };

  const handlePrintSummary = () => {
    window.print();
  };

  const handleSaveSummary = () => {
    const summaryData = {
      brandBilling: brandBillingData,
      creatorPayout: creatorPayoutData,
      timestamp: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(summaryData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `billing-summary-${new Date().getTime()}.json`;
    link.click();
    URL.revokeObjectURL(url);
    
    setSuccess(true);
  };

  const renderBrandBillingForm = () => (
    <Paper elevation={3} sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom color="primary">
        Brand Billing Details
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Box component="form" onSubmit={brandForm.handleSubmit(handleBrandBillingSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Controller
              name="company"
              control={brandForm.control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="Company Name"
                  fullWidth
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Controller
              name="gstin"
              control={brandForm.control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="GSTIN"
                  fullWidth
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  placeholder="e.g., 22AAAAA0000A1Z5"
                />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
              Address
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Controller
              name="address.street"
              control={brandForm.control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="Street Address"
                  fullWidth
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Controller
              name="address.city"
              control={brandForm.control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="City"
                  fullWidth
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <Controller
              name="address.state"
              control={brandForm.control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="State"
                  fullWidth
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <Controller
              name="address.pincode"
              control={brandForm.control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="Pincode"
                  fullWidth
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Controller
              name="email"
              control={brandForm.control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="Email"
                  type="email"
                  fullWidth
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Controller
              name="phone"
              control={brandForm.control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="Phone"
                  fullWidth
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  placeholder="e.g., 9876543210"
                />
              )}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Controller
              name="budget"
              control={brandForm.control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="Campaign Budget (INR)"
                  type="number"
                  fullWidth
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  InputProps={{
                    startAdornment: '₹',
                  }}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Controller
              name="paymentMethod"
              control={brandForm.control}
              render={({ field, fieldState }) => (
                <FormControl fullWidth error={!!fieldState.error}>
                  <InputLabel sx={{ 
                    fontSize: '1rem',
                    whiteSpace: 'nowrap',
                    overflow: 'visible',
                    textOverflow: 'unset',
                    maxWidth: 'none',
                  }}>Payment Method</InputLabel>
                  <Select 
                    {...field} 
                    label="Payment Method"
                    sx={{
                      minHeight: '56px',
                      '& .MuiInputLabel-root': {
                        whiteSpace: 'nowrap',
                        overflow: 'visible',
                        textOverflow: 'unset',
                        maxWidth: 'none',
                      },
                    }}
                  >
                    <MenuItem value="Credit Card">Credit Card</MenuItem>
                    <MenuItem value="Bank Transfer">Bank Transfer</MenuItem>
                    <MenuItem value="UPI">UPI</MenuItem>
                    <MenuItem value="Cheque">Cheque</MenuItem>
                  </Select>
                  {fieldState.error && (
                    <FormHelperText>{fieldState.error.message}</FormHelperText>
                  )}
                </FormControl>
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
              <Button
                type="submit"
                variant="contained"
                disabled={loading}
                size="large"
              >
                {loading ? <CircularProgress size={20} /> : 'Next: Creator Payout'}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );

  const renderCreatorPayoutForm = () => (
    <Paper elevation={3} sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom color="primary">
        Creator Payout Details
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Box component="form" onSubmit={creatorForm.handleSubmit(handleCreatorPayoutSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Controller
              name="name"
              control={creatorForm.control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="Full Name"
                  fullWidth
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Controller
              name="pan"
              control={creatorForm.control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="PAN Number"
                  fullWidth
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  placeholder="e.g., ABCDE1234F"
                />
              )}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Controller
              name="upi"
              control={creatorForm.control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="UPI ID"
                  fullWidth
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  placeholder="e.g., creator@paytm"
                />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
              Bank Account Details
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Controller
              name="bankAccount.accountNumber"
              control={creatorForm.control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="Account Number"
                  fullWidth
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Controller
              name="bankAccount.ifsc"
              control={creatorForm.control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="IFSC Code"
                  fullWidth
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  placeholder="e.g., SBIN0000123"
                />
              )}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Controller
              name="bankAccount.bankName"
              control={creatorForm.control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="Bank Name"
                  fullWidth
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Controller
              name="bankAccount.accountHolderName"
              control={creatorForm.control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="Account Holder Name"
                  fullWidth
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
              Address
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Controller
              name="address.street"
              control={creatorForm.control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="Street Address"
                  fullWidth
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Controller
              name="address.city"
              control={creatorForm.control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="City"
                  fullWidth
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <Controller
              name="address.state"
              control={creatorForm.control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="State"
                  fullWidth
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <Controller
              name="address.pincode"
              control={creatorForm.control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="Pincode"
                  fullWidth
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
              <Button onClick={handleBack} size="large">
                Back
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={loading}
                size="large"
              >
                {loading ? <CircularProgress size={20} /> : 'Generate Summary'}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );

  const renderSummary = () => (
    <>
      <style>{printStyles}</style>
      <Paper elevation={3} sx={{ p: 4 }} className="print-area">
        {/* Invoice Header */}
        <Box className="invoice-header">
          <Typography variant="h3" className="invoice-logo">
            MATCHBILL TECHNOLOGIES
          </Typography>
          <Typography variant="subtitle1" sx={{ color: '#666', mb: 2 }}>
            Influencer Marketing & Creator Management Platform
          </Typography>
          <Typography variant="h6" className="invoice-number">
            INVOICE #MB-{new Date().getFullYear()}-{String(new Date().getMonth() + 1).padStart(2, '0')}-{String(new Date().getDate()).padStart(2, '0')}-{String(Math.floor(Math.random() * 1000)).padStart(3, '0')}
          </Typography>
          <Typography variant="body1" sx={{ color: '#666' }}>
            Date: {new Date().toLocaleDateString('en-IN', { 
              day: '2-digit', 
              month: 'long', 
              year: 'numeric' 
            })}
          </Typography>
        </Box>

        {success && (
          <Alert severity="success" sx={{ mb: 3 }} className="no-print">
            Summary saved successfully!
          </Alert>
        )}

        {/* Company Details */}
        <Box className="company-details">
          <Box className="company-box">
            <Typography variant="h6" sx={{ color: '#1976d2', mb: 2, fontWeight: 'bold' }}>
              BRAND INFORMATION
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>
              {brandBillingData?.company}
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>GSTIN:</strong> {brandBillingData?.gstin}
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>Email:</strong> {brandBillingData?.email}
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              <strong>Phone:</strong> {brandBillingData?.phone}
            </Typography>
            <Typography variant="body2" sx={{ fontSize: '0.9rem' }}>
              {brandBillingData?.address?.street}<br/>
              {brandBillingData?.address?.city}, {brandBillingData?.address?.state}<br/>
              {brandBillingData?.address?.pincode}
            </Typography>
          </Box>

          <Box className="company-box">
            <Typography variant="h6" sx={{ color: '#1976d2', mb: 2, fontWeight: 'bold' }}>
              CREATOR INFORMATION
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>
              {creatorPayoutData?.name}
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>PAN:</strong> {creatorPayoutData?.pan}
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>UPI ID:</strong> {creatorPayoutData?.upi}
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              <strong>Bank:</strong> {creatorPayoutData?.bankAccount?.bankName}
            </Typography>
            <Typography variant="body2" sx={{ fontSize: '0.9rem' }}>
              {creatorPayoutData?.address?.street}<br/>
              {creatorPayoutData?.address?.city}, {creatorPayoutData?.address?.state}<br/>
              {creatorPayoutData?.address?.pincode}
            </Typography>
          </Box>
        </Box>

        {/* Invoice Table */}
        <TableContainer>
          <Table className="invoice-table">
            <TableHead>
              <TableRow>
                <TableCell><strong>Description</strong></TableCell>
                <TableCell><strong>Details</strong></TableCell>
                <TableCell align="right"><strong>Amount (₹)</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    Digital Marketing Campaign Services
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Content creation, promotion and influencer marketing services
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    Client: {brandBillingData?.company}<br/>
                    Service Provider: {creatorPayoutData?.name}<br/>
                    Payment Method: {brandBillingData?.paymentMethod}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body1">
                    {brandBillingData?.budget?.toLocaleString()}
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={2}>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                    Goods and Services Tax (GST) @ 18%
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body1">
                    {brandBillingData?.gst?.amount?.toLocaleString()}
                  </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        {/* Total Section */}
        <Box className="total-section">
          <Typography variant="h4" sx={{ color: '#1976d2', fontWeight: 'bold' }}>
            TOTAL AMOUNT: ₹{brandBillingData?.gst?.total?.toLocaleString()}
          </Typography>
          <Typography variant="body2" sx={{ mt: 1, color: '#666' }}>
            (Inclusive of all applicable taxes)
          </Typography>
        </Box>

        {/* Bank Details */}
        <Box sx={{ mt: 4, p: 3, border: '1px solid #ddd', borderRadius: 2 }}>
          <Typography variant="h6" sx={{ color: '#1976d2', mb: 2, fontWeight: 'bold' }}>
            PAYMENT DETAILS
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Account Number:</strong> {creatorPayoutData?.bankAccount?.accountNumber}
              </Typography>
              <Typography variant="body2">
                <strong>IFSC Code:</strong> {creatorPayoutData?.bankAccount?.ifsc}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Bank Name:</strong> {creatorPayoutData?.bankAccount?.bankName}
              </Typography>
              <Typography variant="body2">
                <strong>Account Holder:</strong> {creatorPayoutData?.bankAccount?.accountHolderName}
              </Typography>
            </Grid>
          </Grid>
        </Box>

        {/* Footer */}
        <Box className="footer-note">
          <Typography variant="caption">
            This is a computer-generated invoice and does not require a physical signature.<br/>
            For any queries, please contact us at support@matchbill.com | +91-9876543210<br/>
            <strong>MatchBill Technologies Private Limited</strong> | CIN: U72900KA2023PTC123456 | www.matchbill.com
          </Typography>
        </Box>

        {/* Action Buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }} className="no-print">
          <Button onClick={handleBack} size="large">
            Back
          </Button>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="outlined"
              startIcon={<Print />}
              onClick={handlePrintSummary}
              size="large"
            >
              Print Invoice
            </Button>
            <Button
              variant="contained"
              startIcon={<Save />}
              onClick={handleSaveSummary}
              size="large"
            >
              Save Invoice
            </Button>
          </Box>
        </Box>
      </Paper>
    </>
  );

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
          <Link
            underline="hover"
            color="inherit"
            onClick={() => navigate('/matches')}
            sx={{ cursor: 'pointer' }}
          >
            Creator Matches
          </Link>
          <Typography color="text.primary">Billing & Payout</Typography>
        </Breadcrumbs>

        <Paper 
          elevation={3} 
          sx={{ 
            borderRadius: 4, 
            overflow: 'hidden',
            background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)'
          }}
        >
          {/* Header */}
          <Box sx={{ 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
            color: 'white', 
            p: 4,
            textAlign: 'center'
          }}>
            <Typography variant="h3" fontWeight={700} gutterBottom>
              Billing & Payout Management
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.9 }}>
              Complete your campaign setup with secure billing and creator payments
            </Typography>
          </Box>

          {/* Stepper */}
          <Box sx={{ p: 4 }}>
            <Stepper 
              activeStep={activeStep} 
              sx={{ 
                mb: 6,
                '& .MuiStepLabel-root .Mui-completed': {
                  color: 'primary.main',
                },
                '& .MuiStepLabel-root .Mui-active': {
                  color: 'primary.main',
                },
                '& .MuiStepConnector-alternativeLabel': {
                  top: 10,
                  left: 'calc(-50% + 16px)',
                  right: 'calc(50% + 16px)',
                },
                '& .MuiStepConnector-alternativeLabel.Mui-completed .MuiStepConnector-line': {
                  backgroundColor: 'primary.main',
                },
                '& .MuiStepConnector-alternativeLabel.Mui-active .MuiStepConnector-line': {
                  backgroundColor: 'primary.main',
                },
              }}
              alternativeLabel
            >
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel
                    sx={{
                      '& .MuiStepLabel-label': {
                        fontSize: '1.1rem',
                        fontWeight: 500,
                      },
                    }}
                  >
                    {label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>

            {activeStep === 0 && renderBrandBillingForm()}
            {activeStep === 1 && renderCreatorPayoutForm()}
            {activeStep === 2 && renderSummary()}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default BillingPage;

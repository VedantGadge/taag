import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';

const ComingSoon = ({ title, description }) => {
  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Paper
        elevation={3}
        sx={{
          p: 6,
          textAlign: 'center',
          borderRadius: 4,
        }}
      >
        <Typography variant="h3" fontWeight={700} gutterBottom color="primary">
          {title}
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
          {description}
        </Typography>
        <Box
          sx={{
            width: 100,
            height: 100,
            borderRadius: '50%',
            backgroundColor: 'primary.50',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mx: 'auto',
            mb: 4,
          }}
        >
          <Typography variant="h4">🚀</Typography>
        </Box>
        <Typography variant="body1" color="text.secondary">
          This feature is coming soon. Stay tuned for updates!
        </Typography>
      </Paper>
    </Container>
  );
};

export default ComingSoon;

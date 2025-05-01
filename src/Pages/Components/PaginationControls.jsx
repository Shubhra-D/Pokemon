import React from 'react';
import { Box, Button, Typography } from '@mui/material';

const PaginationControls = ({ page, setPage, totalPages }) => {
  const handlePrev = () => setPage(prev => Math.max(prev - 1, 1));
  const handleNext = () => setPage(prev => Math.min(prev + 1, totalPages));

  if (totalPages <= 1) return null;

  return (
    <Box mt={4} display="flex" justifyContent="center" alignItems="center" gap={2}>
      <Button
        variant="contained"
        onClick={handlePrev}
        disabled={page === 1}
        sx={{ backgroundColor: '#3B4CCA' }}
      >
        Previous
      </Button>

      <Typography>Page {page} of {totalPages}</Typography>

      <Button
        variant="contained"
        onClick={handleNext}
        disabled={page === totalPages}
        sx={{ backgroundColor: '#3B4CCA' }}
      >
        Next
      </Button>
    </Box>
  );
};

export default PaginationControls;

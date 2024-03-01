import React from 'react';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

export default function Loading({ width, height, color="#fff" }) {
  return (
    <Stack>
      <CircularProgress sx={{ width: width, height: height, color: color }} />
    </Stack>
  );
}
import React from 'react';

import { Box, Typography } from '@mui/material';

interface InodataMessage {
  height: string;
  status: string;
  data: number;
}
function NodataMessageHistory(props: InodataMessage) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: props.height,
      }}
    >
      {props.data === 0 && props.status === '' ? (
        <Typography>No history order</Typography>
      ) : props.data === 0 && props.status === 'completed' ? (
        <Typography>No completed order</Typography>
      ) : (
        props.data === 0 &&
        props.status === 'cancelled' && (
          <Typography>No cancelled order</Typography>
        )
      )}
    </Box>
  );
}

export default NodataMessageHistory;

import React from 'react';

import { Box, Typography } from '@mui/material';

interface InodataMessage {
  height: string;
  status: string;
  data: number;
}
function NodataMessage(props: InodataMessage) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: props.height,
      }}
    >
      {props.data === 0 && props.status === 'review' ? (
        <Typography>No review order</Typography>
      ) : props.data === 0 && props.status === 'pending' ? (
        <Typography>No pending order</Typography>
      ) : props.data === 0 && props.status === 'confirmed' ? (
        <Typography>No confirmed order</Typography>
      ) : props.data === 0 && props.status === 'waiting_driver' ? (
        <Typography>No waiting driver</Typography>
      ) : (
        props.data === 0 &&
        props.status === 'processing,delivering_province' && (
          <Typography>No processing order</Typography>
        )
      )}
    </Box>
  );
}

export default NodataMessage;

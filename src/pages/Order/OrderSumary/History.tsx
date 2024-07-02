import React from 'react';

import {
  Box,
  CircularProgress,
  Divider,
  Paper,
  Stack,
  Typography,
} from '@mui/material';

import theme from 'themes';

interface Ihistory {
  orderNum: number | undefined;
  Totalearn: number | undefined;
  TotalSold: number | undefined;
  loading: boolean;
}

function DataHistory(props: Ihistory) {
  return (
    <Paper
      variant='outlined'
      sx={{
        m: 2,
        p: 2,
        background: theme.palette.background.default,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}
      >
        <Stack
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography>Orders</Typography>
          <Typography fontWeight={'bold'} color={theme.palette.primary.main}>
            {props.loading ? (
              <CircularProgress size={16} />
            ) : (
              props.orderNum || 0
            )}
          </Typography>
        </Stack>
        <Divider orientation='vertical' flexItem />
        <Stack
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography>Completed</Typography>
          <Typography fontWeight={'bold'} color={theme.palette.primary.main}>
            {props.loading ? (
              <CircularProgress size={16} />
            ) : (
              props.TotalSold || 0
            )}
          </Typography>
        </Stack>

        <Divider orientation='vertical' flexItem />
        <Stack
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography>Total Earning</Typography>
          <Typography fontWeight={'bold'} color={theme.palette.primary.main}>
            {props.loading ? (
              <CircularProgress size={16} />
            ) : (
              `$${props.Totalearn?.toFixed(2) || '0.00'}`
            )}
          </Typography>
        </Stack>
      </Box>
    </Paper>
  );
}

export default DataHistory;

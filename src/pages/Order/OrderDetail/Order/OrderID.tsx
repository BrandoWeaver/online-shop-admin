import moment from 'moment';
import React from 'react';

import { Box, Grid, Typography } from '@mui/material';

import theme from 'themes';

interface ItopCom {
  detailId: any;
  status: string | undefined;
  date: string | undefined;
}

function TopCom(props: ItopCom) {
  return (
    <>
      <Grid
        item
        xs={12}
        sx={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <Box>
          <Typography
            fontWeight={'bold'}
            sx={{
              fontSize: {
                xs: 'body2.fontSize',
                md: 'body1.fontSize',
              },
            }}
          >
            Order ID: {props.detailId}
          </Typography>
          <Typography
            sx={{
              fontSize: {
                xs: 'body2.fontSize',
                md: 'body1.fontSize',
              },
              color: 'text.secondary',
            }}
          >
            {moment(props.date).format('MMM DD, hh:mm A')}
          </Typography>
        </Box>

        <Box sx={{ display: 'inline-block' }}>
          <Typography
            sx={{
              borderRadius: 2,
              p: 1,
              color: theme.palette.secondary.main,
              background: theme.palette.grey['300'],
            }}
          >
            {props.status}
          </Typography>
        </Box>
      </Grid>
    </>
  );
}

export default TopCom;

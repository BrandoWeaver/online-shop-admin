import React from 'react';
import { LiaGetPocket } from 'react-icons/lia';
import { PiPhoneThin } from 'react-icons/pi';
import { PiUserCircleThin } from 'react-icons/pi';

import { Box, Grid, Typography } from '@mui/material';

interface Idriver {
  driverName: string | undefined;
  driverPhone: string | undefined;
  plateNumber: string | undefined;
}

function Driver(props: Idriver) {
  return (
    <>
      <Grid item xs={12}>
        <Typography
          fontWeight={'bold'}
          sx={{
            fontSize: {
              xs: 'body2.fontSize',
              md: 'body1.fontSize',
            },
          }}
        >
          Driver
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            mb: 1,
            pl: 1,
          }}
        >
          <PiUserCircleThin size={30} />
          <Typography
            sx={{
              ml: 2,
              fontSize: {
                xs: 'body2.fontSize',
                md: 'body1.fontSize',
              },
            }}
          >
            {props.driverName === null ? 'N/A' : props.driverName}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            mb: 1,
            pl: 1,
          }}
        >
          <PiPhoneThin size={30} />
          <Typography
            sx={{
              ml: 2,
              fontSize: {
                xs: 'body2.fontSize',
                md: 'body1.fontSize',
              },
            }}
          >
            {props.driverPhone === null ? 'N/A' : props.driverPhone}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            mb: 1,
            pl: 1,
          }}
        >
          <LiaGetPocket size={30} />
          <Typography
            sx={{
              ml: 2,
              fontSize: {
                xs: 'body2.fontSize',
                md: 'body1.fontSize',
              },
            }}
          >
            {props.plateNumber === null ? 'N/A' : props.plateNumber}
          </Typography>
        </Box>
      </Grid>
    </>
  );
}

export default Driver;

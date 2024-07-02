import React from 'react';
import { CiLocationOn } from 'react-icons/ci';
import { PiPhoneThin } from 'react-icons/pi';
import { PiUserCircleThin } from 'react-icons/pi';

import { Box, Grid, Typography } from '@mui/material';

import theme from 'themes';

interface Icus {
  customerName: string | undefined;
  customerContact: string | undefined;
  zone: string | undefined;
}

function Customer(props: Icus) {
  return (
    <>
      <Grid item xs={12} mt={2}>
        <Typography
          fontWeight={'bold'}
          sx={{
            fontSize: {
              xs: 'body2.fontSize',
              md: 'body1.fontSize',
            },
          }}
        >
          Customer
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
            {props.customerName}
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
            {props.customerContact}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            mb: 2,
            pl: 1,
          }}
        >
          <CiLocationOn size={30} />
          <Typography
            sx={{
              ml: 2,
              fontSize: {
                xs: 'body2.fontSize',
                md: 'body1.fontSize',
              },
            }}
          >
            {props.zone}
          </Typography>
        </Box>
      </Grid>
    </>
  );
}

export default Customer;

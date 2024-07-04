import React from 'react';
import { MdCheck } from 'react-icons/md';

import { Box, Button, Fade, Grid } from '@mui/material';

import TopCom from '../OrderID';
import StepperTracking from './Stepper';

interface Itrack {
  detailId: string | undefined;
  status: string | undefined;
  date: string | undefined;
  orderTracking: any;
}

function TrackingPage(prop: Itrack) {
  return (
    <Box
      sx={{
        p: 3,
        overflow: 'scroll',
        height: { md: 'calc(100vh - 195px)', xs: 'calc(100vh - 50px)' },
        overflowX: 'hidden',
        '::-webkit-scrollbar': { display: 'none' },
      }}
    >
      <Fade in={prop.detailId !== '' && true} timeout={500}>
        <Grid container>
          <TopCom
            detailId={prop.detailId}
            status={prop.status}
            date={prop.date}
          />

          <Grid item xs={12}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'start',
              }}
            >
              <StepperTracking
                status={prop.status}
                orderTracking={prop.orderTracking}
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Button
              startIcon={<MdCheck />}
              size='large'
              fullWidth
              variant='contained'
              sx={{ mt: 2 }}
            >
              Track Delivery
            </Button>
          </Grid>
        </Grid>
      </Fade>
    </Box>
  );
}

export default TrackingPage;

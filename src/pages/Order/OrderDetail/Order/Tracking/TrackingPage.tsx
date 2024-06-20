import React, { useEffect, useState } from 'react';
import { MdCheck } from 'react-icons/md';

import { Box, Button, Fade, Grid } from '@mui/material';

import TopCom from '../OrderID';
import StepperTracking from './Stepper';

interface Itrack {
  detailId: number | undefined;
  status: string | undefined;
  date: string | undefined;
  orderTracking: Iorder.OrderTracking[];
}

function TrackingPage(prop: Itrack) {
  const [url, setUrl] = useState<string>('');
  useEffect(() => {
    prop.orderTracking.map((el) => setUrl(el.url));
  }, [prop.orderTracking]);

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
      <Fade in={prop.detailId !== -1 && true} timeout={500}>
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
              disabled={!url}
              startIcon={<MdCheck />}
              size='large'
              fullWidth
              variant='contained'
              sx={{ mt: 2 }}
              onClick={() => window.open(url)}
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

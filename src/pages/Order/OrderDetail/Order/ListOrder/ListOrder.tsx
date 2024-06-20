import moment from 'moment';
import React, { memo } from 'react';

import { Box, Grid, Stack, Typography } from '@mui/material';

import theme from 'themes';

interface Iorder {
  setId: React.Dispatch<React.SetStateAction<number>>;
  productQty: number;
  orderNote: boolean;
  active: boolean;
  id: number;
  customerName: string;
  amount: number;
  date: string;
}

function ListOrder(props: Iorder) {
  return (
    <Box>
      <Grid
        onClick={() => {
          props.setId(props.id);
        }}
        container
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          ':hover': {
            background: theme.palette.grey['200'],
            cursor: 'pointer',
          },
          background: props.active
            ? theme.palette.grey['200']
            : theme.palette.background.default,
        }}
      >
        <Grid item xs={2.25}>
          <Typography
            sx={{
              fontSize: {
                xs: 'body2.fontSize',
                md: 'body1.fontSize',
              },
              color: 'text.secondary',
            }}
          >
            Order ID
          </Typography>
          <Typography
            sx={{
              fontSize: {
                xs: 'body2.fontSize',
                md: 'body1.fontSize',
              },
            }}
          >
            {props.id}
          </Typography>
        </Grid>
        <Grid item xs={2.25}>
          <Typography
            sx={{
              fontSize: {
                xs: 'body2.fontSize',
                md: 'body1.fontSize',
              },
              color: 'text.secondary',
            }}
          >
            Buyer
          </Typography>
          <Typography
            sx={{
              fontSize: {
                xs: 'body2.fontSize',
                md: 'body1.fontSize',
              },
            }}
          >
            {props.customerName}
          </Typography>
        </Grid>
        <Grid item xs={2.25}>
          <Typography
            sx={{
              fontSize: {
                xs: 'body2.fontSize',
                md: 'body1.fontSize',
              },
              color: 'text.secondary',
            }}
          >
            Product
          </Typography>

          <Typography
            sx={{
              fontSize: {
                xs: 'body2.fontSize',
                md: 'body1.fontSize',
              },
            }}
          >
            {props.productQty}
          </Typography>
        </Grid>

        <Grid item xs={2.25}>
          <Typography
            sx={{
              fontSize: {
                xs: 'body2.fontSize',
                md: 'body1.fontSize',
              },
              color: 'text.secondary',
            }}
          >
            Amount
          </Typography>
          <Typography
            sx={{
              fontSize: {
                xs: 'body2.fontSize',
                md: 'body1.fontSize',
              },
            }}
          >
            {`$${props.amount.toFixed(2)}`}
          </Typography>
        </Grid>

        <Grid
          item
          xs={3}
          sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
        >
          <div
            style={{
              height: '50px',
              width: '1px',
              background: theme.palette.grey['300'],
              marginRight: '10px',
            }}
          ></div>
          <Typography
            sx={{
              display: { md: 'block', xs: 'none' },
              fontSize: {
                xs: 'body2.fontSize',
                md: 'body1.fontSize',
              },
              color: 'text.secondary',
            }}
          >
            {moment(props.date).format('MMM DD, hh:mm A')}
          </Typography>

          <Box
            sx={{
              display: { md: 'none', xs: 'block' },
              fontSize: {
                xs: 'body2.fontSize',
                md: 'body1.fontSize',
              },
            }}
          >
            <Stack
              sx={{
                display: 'flex',
                alignItems: 'flex-start',
                flexDirection: 'column',
              }}
            >
              <Typography
                sx={{
                  fontSize: {
                    xs: 'body2.fontSize',
                    md: 'body1.fontSize',
                  },
                  color: 'text.secondary',
                }}
              >
                Remark
              </Typography>
              {props?.orderNote && (
                <Typography color={theme.palette.primary.main}>View</Typography>
              )}
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default memo(ListOrder);

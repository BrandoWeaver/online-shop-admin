import { Box, Button, Grid, Typography } from '@mui/material';
import React from 'react';
import { CiPickerHalf } from 'react-icons/ci';
import theme from 'themes';
interface Icolor {
  Colorhex: string;
  main: string;
  accent?: string;
  setPrimaryColor: (data: boolean) => void;
  reStorePrime: (defaultColor: string) => void;
}

function ColorCom({ Colorhex, main, setPrimaryColor, reStorePrime }: Icolor) {
  return (
    <Box mx={{ xs: 0, md: 6 }}>
      <Grid
        container
        display={'flex'}
        flexDirection={'row'}
        alignItems='center'
        justifyContent={'space-between'}
      >
        <Grid item xs={2} md={1}>
          <Box
            sx={{
              // width: "50px",
              // height: "50px",
              width: { xs: 50, md: 60 },
              height: { xs: 50, md: 60 },
              background: `${Colorhex}`,
              borderRadius: '5px',
            }}
          ></Box>
        </Grid>
        <Grid item xs={4} md={3}>
          <Typography
            fontWeight={'bold'}
            sx={{
              fontSize: { xs: 'body2.fontSize', md: 'body1.fontSize' },
            }}
          >
            {main}
          </Typography>
          <div
            style={{
              background: theme.palette.grey['200'],
              display: 'inline-block',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '5px',
            }}
          >
            <Typography
              sx={{ fontSize: { xs: 'body2.fontSize', md: 'body1.fontSize' } }}
            >
              {Colorhex}
            </Typography>
          </div>
        </Grid>
        <Grid item md={1} xs={1}>
          <div
            style={{
              height: '40px',
              background: theme.palette.grey['400'],
              width: '1px',
            }}
          ></div>
        </Grid>
        <Grid
          xs={5}
          md={7}
          item
          sx={{
            display: 'inline-block',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Button
            sx={{ p: '5px', px: { md: 2, xs: 1 } }}
            // disabled={props.loading}
            onClick={() => setPrimaryColor(true)}
            variant='outlined'
            startIcon={<CiPickerHalf color='primary' />}
          >
            <Typography
              color={theme.palette.grey['900']}
              sx={{ fontSize: { xs: 'body2.fontSize', md: 'body1.fontSize' } }}
            >
              Color Picker
            </Typography>
          </Button>

          <Button
            sx={{ fontSize: { xs: 'body2.fontSize', md: 'body1.fontSize' } }}
            // disabled={props.loading}
            onClick={() => reStorePrime('')}
          >
            Restore Default
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ColorCom;

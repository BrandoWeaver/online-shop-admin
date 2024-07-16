import React from 'react';

import { Grid } from '@mui/material';

interface Ibnt {
  setOrder: React.Dispatch<React.SetStateAction<string>>;
  orderNote: any[] | undefined;
  order: string;
  detailId: string;
}
function StepButton(prop: Ibnt) {
  // const id = prop.detailId;
  // useEffect(() => {
  //   if (id !== prop.detailId) {
  //     prop.setOrder('order');
  //   } else {
  //     prop.setOrder(prop.order);
  //   }
  // }, [id,prop]);
  return (
    <Grid
      container
      spacing={2}
      sx={{
        display: 'flex',
        flexDirection: 'row',
        px: 3,
        pt: { xs: 1, md: 0 },
      }}
    >
      <Grid item xs={4}>
        {/* <Button
          variant='outlined'
          sx={{
            borderRadius: 3,
            width: '100%',
            background:
              prop.order === 'order'
                ? 'linear-gradient(to right bottom, #60efff, #0061ff)'
                : theme.palette.background.default,
            color:
              prop.order === 'order'
                ? theme.palette.common.white
                : theme.palette.common.black,
          }}
          onClick={() => {
            prop.setOrder('order');
          }}
        >
          Order
        </Button> */}
      </Grid>
      <Grid item xs={4}>
        {/* <Button
          variant='outlined'
          sx={{
            borderRadius: 3,
            width: '100%',
            background:
              prop.order === 'note'
                ? 'linear-gradient(to right bottom, #60efff, #0061ff)'
                : theme.palette.background.default,
            color:
              prop.order === 'note'
                ? theme.palette.common.white
                : theme.palette.common.black,
          }}
          onClick={() => {
            prop.setOrder('note');
          }}
        >
          <Badge
            variant='dot'
            color='error'
            invisible={prop.orderNote?.length === 0 ? true : false}
          >
            Note
          </Badge>
        </Button> */}
      </Grid>
      <Grid item xs={4}>
        {/* <Button
          variant='outlined'
          sx={{
            borderRadius: 3,
            width: '100%',
            background:
              prop.order === 'track'
                ? 'linear-gradient(to right bottom, #60efff, #0061ff)'
                : theme.palette.background.default,
            color:
              prop.order === 'track'
                ? theme.palette.common.white
                : theme.palette.common.black,
          }}
          onClick={() => {
            prop.setOrder('track');
          }}
        >
          Tracking
        </Button> */}
      </Grid>
    </Grid>
  );
}

export default StepButton;

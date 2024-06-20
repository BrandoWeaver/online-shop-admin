import React, { memo } from 'react';
import { IoLocationOutline } from 'react-icons/io5';

import { Button, Grid, Typography } from '@mui/material';

import theme from 'themes';

interface Ilocation {
  address: string;
  location: string;
  lateLang: Location;
  id: number;
  buyerAddressId: number | undefined;
  setBuyerAddressId: (id: number) => void;
  label: string;
  currentPlaceId: number | '' | undefined;
  setCrrAddrId: (id: number) => void;
  active: boolean;
}
interface Location {
  lat: number;
  lng: number;
}
interface IselectLocation {
  Address: string;
  labe: string;
}
export function SelectLocation(props: IselectLocation) {
  return (
    <Grid
      container
      sx={{
        py: 2,
        borderRadius: '10px',
        ':hover': {
          cursor: 'pointer',
        },
      }}
    >
      <Grid item xs={1} md={1}>
        <IoLocationOutline size={25} color={theme.palette.primary.main} />
      </Grid>
      <Grid item xs={11} md={11}>
        <Typography
          fontWeight={'bold'}
          sx={{
            fontSize: {
              xs: 'body2.fontSize',
              md: 'body1.fontSize',
            },
            ml: { xs: 1, md: 0 },
          }}
        >
          {props.Address}
        </Typography>
      </Grid>
      <Grid item xs={1}></Grid>
      <Grid item xs={11} md={11}>
        <Typography
          fontWeight={'bold'}
          sx={{
            background: theme.palette.grey['50'],
            py: 1.2,
            px: 3,
            borderRadius: 2,
            color: theme.palette.secondary.main,

            display: 'inline-block',
            fontSize: {
              xs: 'body2.fontSize',
              md: 'body1.fontSize',
            },
          }}
        >
          {props.labe === 'home'
            ? 'Home'
            : props.labe === 'work'
            ? 'Work'
            : props.labe === 'other' && 'Other'}
        </Typography>
      </Grid>
    </Grid>
  );
}

function SaveLocation(props: Ilocation) {
  const onSelect = (placeId: number) => {
    props.setCrrAddrId(placeId);
  };
  return (
    <Grid
      container
      onClick={() => {
        props.setBuyerAddressId(props.id);
        onSelect(props.id);
      }}
      sx={{
        py: 2,
        border: props.active
          ? `2px solid ${theme.palette.primary.main}`
          : `1px solid ${theme.palette.common.white}`,
        borderRadius: '10px',
        ':hover': {
          cursor: 'pointer',
        },
      }}
      key={props.id}
    >
      <Grid item xs={1}>
        <IoLocationOutline size={25} color={theme.palette.primary.main} />
      </Grid>
      <Grid item xs={11}>
        <Typography
          fontWeight={'bold'}
          sx={{
            fontSize: {
              xs: 'body2.fontSize',
              md: 'body1.fontSize',
            },
          }}
        >
          {props.address}
        </Typography>
      </Grid>
      <Grid item xs={1}></Grid>
      <Grid item xs={11}>
        <Button
          sx={{
            background: theme.palette.grey['300'],
            mr: 2,
            px: 3,
            color: theme.palette.secondary.main,

            fontSize: {
              xs: 'body2.fontSize',
              md: 'body1.fontSize',
            },
          }}
        >
          {props.location}
        </Button>
      </Grid>
    </Grid>
  );
}

export default memo(SaveLocation, (pre, next) => pre.active === next.active);

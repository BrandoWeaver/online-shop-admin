import React, { useCallback, useState } from 'react';

import { Grid, Typography } from '@mui/material';

import SaveLocation from '../DeliveryLocation/SaveLocation';

interface Ilocation {
  open: boolean;
  setOpen: () => void;
  listAddress: BuyerAddress[];
  buyerAddressId: number | undefined;
  setBuyerAddressId: (id: number) => void;
  idCurrentPlace: number | undefined;
}
export interface BuyerAddress {
  location: Location;
  id: number;
  name?: string;
  label: string;
  address: string;
  createdAt: string;
  updatedAt: string;
  buyerId: number;
}

interface Location {
  lat: number;
  lng: number;
}

function DialogLocation(props: Ilocation) {
  const [crrAddrId, setCrrAddrId] = useState<number | undefined | ''>(
    props?.idCurrentPlace,
  );

  const handleSetBuyerAddressId = useCallback(
    (id: number) => props.setBuyerAddressId(id),
    [props],
  );
  const handleSetCrrAddrId = useCallback((id: number) => setCrrAddrId(id), []);
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
          Saved Address
        </Typography>
      </Grid>

      <Grid
        item
        xs={12}
        sx={{
          p: 1,
          overflow: 'scroll',
          height: {
            md: 'calc(100vh - 370px)',
            xs: 'calc(100vh - 320px)',
          },
          overflowX: 'hidden',
          '::-webkit-scrollbar': { display: 'none' },
        }}
      >
        {props.listAddress.map((el) => {
          return (
            <SaveLocation
              key={el.id}
              buyerAddressId={props?.idCurrentPlace}
              currentPlaceId={crrAddrId}
              setCrrAddrId={handleSetCrrAddrId}
              setBuyerAddressId={handleSetBuyerAddressId}
              address={el.address}
              location={el.label}
              lateLang={el.location}
              id={el.id}
              label={el.label}
              active={crrAddrId === el.id}
            />
          );
        })}
      </Grid>
    </>
  );
}

export default DialogLocation;

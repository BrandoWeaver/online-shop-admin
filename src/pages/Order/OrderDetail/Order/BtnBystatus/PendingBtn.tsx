import { useRequest } from 'ahooks';
import React, { useState } from 'react';
import { MdClose, MdDone } from 'react-icons/md';

import { Button, Grid } from '@mui/material';

import ORDER from 'api/Order';

import ConfirmDialog from 'components/Dialog/ConfirmDialog';
import ErrorDialog from 'components/Dialog/ErrorDialog';

interface Ipening {
  setRejectOrder: React.Dispatch<React.SetStateAction<boolean>>;
  id: string | undefined;
  refreshOrderList: () => void;
  setOrder: React.Dispatch<React.SetStateAction<string>>;
  refreshListDetail: () => void;
  setId: React.Dispatch<React.SetStateAction<number>>;
}

function PendingBtn(props: Ipening) {
  const [open, setOpen] = useState(false);
  const [errOpen, setOpenErr] = useState(false);
  // const { selectedShop } = React.useContext(AuthContext);
  const { run: runConfrim, error: errConfrim } = useRequest(
    () =>
      ORDER.runRejectOrder(`${1}`, props.id || '', 'confirmed', [
        'Accepting Order',
      ]),
    {
      manual: true,
      onSuccess: () => {
        props.refreshOrderList();
        setOpen(false);
        props.setOrder('order');
        props.refreshListDetail();
        props.setId(-1);
      },
      onError: () => {
        setOpenErr(true);
      },
    },
  );
  return (
    <Grid container>
      <ErrorDialog
        open={errOpen}
        errorTitle='Error Ocured'
        onCloseDialog={() => setOpenErr(false)}
        errorMessage={
          errConfrim?.message ||
          errConfrim?.error ||
          errConfrim?.error_description
        }
      />

      <Grid
        item
        xs={4}
        md={3}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Button
          variant='contained'
          color='error'
          sx={{
            width: '100%',
            fontSize: {
              xs: 'body2.fontSize',
              md: 'body1.fontSize',
            },
          }}
          onClick={() => props.setRejectOrder(true)}
        >
          <MdClose style={{ marginRight: 2 }} size={20} />
          reject
        </Button>
      </Grid>
      <Grid
        item
        xs={8}
        md={9}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          pl: 2,
        }}
      >
        <Button
          variant='contained'
          color='primary'
          sx={{
            width: '100%',
            fontSize: {
              xs: 'body2.fontSize',
              md: 'body1.fontSize',
            },
          }}
          onClick={() => {
            setOpen(true);
          }}
        >
          <MdDone style={{ marginRight: 2 }} size={20} />
          accept
        </Button>
        <ConfirmDialog
          title='Accepting Order'
          message='Are you sure?'
          open={open}
          onCancel={() => setOpen(false)}
          onConfirm={() => runConfrim()}
        />
      </Grid>
    </Grid>
  );
}

export default PendingBtn;

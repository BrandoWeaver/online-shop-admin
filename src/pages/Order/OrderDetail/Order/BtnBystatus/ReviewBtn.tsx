import { useRequest } from 'ahooks';
import React, { useState } from 'react';
import { MdClose, MdDone } from 'react-icons/md';

import { Button, Grid } from '@mui/material';

import { AuthContext } from 'contexts/AuthContext';

import ORDER from 'api/Order';

import ConfirmDialog from 'components/Dialog/ConfirmDialog';
import ErrorDialog from 'components/Dialog/ErrorDialog';

interface Ireview {
  setCancel: React.Dispatch<React.SetStateAction<boolean>>;
  id: number | undefined;
  refreshOrderList: () => void;
  setOrder: React.Dispatch<React.SetStateAction<string>>;
  refreshListDetail: () => void;
  setId: React.Dispatch<React.SetStateAction<number>>;
}

function ReviewBtn(props: Ireview) {
  const [open, setOpen] = useState(false);
  const [errOpen, setOpenErr] = useState(false);
  const { selectedShop } = React.useContext(AuthContext);
  const { run: runConfrim, error: errConfirm } = useRequest(
    () => ORDER.runConfirmOrder(`${selectedShop?.id}`, props.id, 'pending'),
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
        errorMessage={
          errConfirm?.message ||
          errConfirm?.error ||
          errConfirm?.error_description
        }
        onCloseDialog={() => setOpenErr(false)}
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
          onClick={() => {
            props.setCancel(true);
          }}
        >
          <MdClose style={{ marginRight: 2 }} size={20} />
          Cancel
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
            // runConfrim();
            setOpen(true);
          }}
        >
          <MdDone style={{ marginRight: 2 }} size={20} />
          Confirmed
        </Button>
        <ConfirmDialog
          title='Confirm Order'
          message='Are you sure?'
          open={open}
          onCancel={() => setOpen(false)}
          onConfirm={() => runConfrim()}
        />
      </Grid>
    </Grid>
  );
}

export default ReviewBtn;

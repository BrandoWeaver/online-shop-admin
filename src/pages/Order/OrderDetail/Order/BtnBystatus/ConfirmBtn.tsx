import { useRequest } from 'ahooks';
import React, { useState } from 'react';
import { MdDone } from 'react-icons/md';

import { Button, Grid, Paper } from '@mui/material';

import { AuthContext } from 'contexts/AuthContext';

import ORDER from 'api/Order';

import ConfirmDialog from 'components/Dialog/ConfirmDialog';
import ErrorDialog from 'components/Dialog/ErrorDialog';

interface Iconfirm {
  id: number | undefined;
  refreshOrderList: () => void;
  setOrder: React.Dispatch<React.SetStateAction<string>>;
  refreshListDetail: () => void;
  setId: React.Dispatch<React.SetStateAction<number>>;
}

function ConfrimBtn(prop: Iconfirm) {
  const [open, setOpen] = useState(false);
  const { selectedShop } = React.useContext(AuthContext);
  const [errOpen, setOpenErr] = useState(false);
  const { run: runManageDelivery, error: errMangeDelivery } = useRequest(
    () =>
      ORDER.runRejectOrder(`${selectedShop?.id}`, prop.id, 'completed', [
        'manage own delivery',
      ]),
    {
      manual: true,
      onSuccess: () => {
        prop.refreshOrderList();
        setOpen(false);
        prop.setOrder('order');
        prop.refreshListDetail();
        prop.setId(-1);
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
          errMangeDelivery?.message ||
          errMangeDelivery?.error ||
          errMangeDelivery?.error_description
        }
      />
      <Grid
        item
        xs={12}
        component={Paper}
        variant='outlined'
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
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
          Manage Own Delivery
        </Button>
        <ConfirmDialog
          title='Managing Own Delivery'
          message='Are you sure?'
          open={open}
          onCancel={() => setOpen(false)}
          onConfirm={() => runManageDelivery()}
        />
      </Grid>
    </Grid>
  );
}

export default ConfrimBtn;

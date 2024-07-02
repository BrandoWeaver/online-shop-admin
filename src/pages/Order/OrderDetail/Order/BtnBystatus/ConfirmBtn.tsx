import { useRequest } from 'ahooks';
import React, { useState } from 'react';
import { MdDone } from 'react-icons/md';

import { Button, Grid, Paper } from '@mui/material';

import ORDER from 'api/Order';

import ConfirmDialog from 'components/Dialog/ConfirmDialog';
import ErrorDialog from 'components/Dialog/ErrorDialog';

interface Iconfirm {
  id: string | undefined;
  refreshOrderList: () => void;
  setOrder: React.Dispatch<React.SetStateAction<string>>;
  refreshListDetail: () => void;
  setId: React.Dispatch<React.SetStateAction<string>>;
}

function ConfrimBtn(props: Iconfirm) {
  const [open, setOpen] = useState(false);
  // const { selectedShop } = React.useContext(AuthContext);
  const [errOpen, setOpenErr] = useState(false);
  const {
    runAsync: runUpdateOrder,
    error: errMangeDelivery,
    loading,
  } = useRequest(() => ORDER.updateOrder(`${props.id}`, 'completed'), {
    manual: true,
    onError: (e) => setOpenErr(true),
    onSuccess: () => {
      props.refreshOrderList();
      setOpen(false);
      props.setId('');
    },
  });

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
          Complete Proccessing
        </Button>
        <ConfirmDialog
          title='Complete Proccessing'
          message='Are you sure?'
          open={open}
          onCancel={() => setOpen(false)}
          onConfirm={() => runUpdateOrder()}
          loading={loading}
        />
      </Grid>
    </Grid>
  );
}

export default ConfrimBtn;

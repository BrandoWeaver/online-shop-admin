import { useRequest } from 'ahooks';
import React, { useContext, useState } from 'react';

import { Button, Dialog, DialogActions } from '@mui/material';

import { AuthContext } from 'contexts/AuthContext';

import ORDER from 'api/Order';

import ErrorDialog from 'components/Dialog/ErrorDialog';

import CancelOrder from './CancelOrder';

interface Icancel {
  cancel: boolean;
  setCancel: React.Dispatch<React.SetStateAction<boolean>>;
  id: number | undefined;
  refreshOrderList: () => void;
  setOrder: React.Dispatch<React.SetStateAction<string>>;
  setId: React.Dispatch<React.SetStateAction<number>>;
}

function DialogCancel(props: Icancel) {
  const [reason, setReson] = useState<string>('');
  const [errOpen, setErr] = useState(false);
  const { selectedShop } = useContext(AuthContext);
  const { run: runCancelOrder, error: errCancel } = useRequest(
    () =>
      ORDER.runRejectOrder(`${selectedShop?.id}`, props.id, 'pre_cancelled', [
        reason,
      ]),
    {
      manual: true,
      onSuccess: () => {
        props.setCancel(false);
        props.refreshOrderList();
        props.setOrder('order');
        props.setId(-1);
      },
      onError: () => {
        setErr(true);
      },
    },
  );

  return (
    <>
      <ErrorDialog
        open={errOpen}
        errorMessage={
          errCancel?.message || errCancel?.error || errCancel?.error_description
        }
        onCloseDialog={() => setErr(false)}
        errorTitle='Error Ocured'
      />
      <Dialog open={props.cancel} fullWidth={true} maxWidth={'xs'}>
        <CancelOrder setReson={setReson} reason={reason} />
        <DialogActions>
          <Button
            onClick={() => {
              props.setCancel(false);
            }}
            sx={{
              fontSize: {
                xs: 'body2.fontSize',
                md: 'body1.fontSize',
              },
            }}
          >
            Cancel
          </Button>
          <Button
            autoFocus
            onClick={() => {
              runCancelOrder();
            }}
            sx={{
              fontSize: {
                xs: 'body2.fontSize',
                md: 'body1.fontSize',
              },
            }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default DialogCancel;

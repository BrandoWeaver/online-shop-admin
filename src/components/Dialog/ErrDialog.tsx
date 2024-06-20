import { forwardRef, useImperativeHandle, useRef, useState } from 'react';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';

interface IErrDialog {
  title?: string;
}

export interface IErrDialogRef {
  open: (message: string | Error) => void;
  close: () => void;
}

const ErrDialog = forwardRef<IErrDialogRef, IErrDialog>(
  ({ title = 'Something Wrong' }, ref) => {
    const messageRef = useRef('');

    const [open, setOpen] = useState(false);
    const onClose = () => setOpen(false);

    useImperativeHandle(
      ref,
      () => ({
        open: (message) => {
          messageRef.current =
            typeof message === 'string'
              ? message
              : message.error_description || message.error || message.message;
          setOpen(true);
        },
        close: onClose,
      }),
      [],
    );
    return (
      <Dialog open={open} onClose={onClose} fullWidth maxWidth='xs'>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <Typography>{messageRef.current}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>
            <Typography>OK</Typography>
          </Button>
        </DialogActions>
      </Dialog>
    );
  },
);

export default ErrDialog;

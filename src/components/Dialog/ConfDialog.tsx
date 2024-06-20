import { forwardRef, useImperativeHandle, useRef, useState } from 'react';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';

interface IConfDialog {
  message?: string;
  onConfirm: (data: any) => void;
}

export interface IConfDialogRef {
  open: (title: string, params?: any) => void;
  close: () => void;
}

const ConfDialog = forwardRef<IConfDialogRef, IConfDialog>(
  ({ message = 'Are you sure?', onConfirm }, ref) => {
    const [open, setOpen] = useState(false);
    const onClose = () => setOpen(false);

    const titleRef = useRef('');
    const paramsRef = useRef<any>();

    useImperativeHandle(
      ref,
      () => ({
        open: (title, params) => {
          titleRef.current = title;
          paramsRef.current = params;
          setOpen(true);
        },
        close: onClose,
      }),
      []
    );

    return (
      <Dialog open={open} onClose={onClose} fullWidth maxWidth='xs'>
        <DialogTitle noWrap>{titleRef.current}</DialogTitle>
        <DialogContent>
          <Typography>{message}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>No</Button>
          <Button onClick={() => onConfirm(paramsRef.current)}>Yes</Button>
        </DialogActions>
      </Dialog>
    );
  }
);

export default ConfDialog;

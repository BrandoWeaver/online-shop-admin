import React from 'react';

import {
  Breakpoint,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';

import theme from 'themes';

interface IConfirmDialog {
  open: boolean;
  title?: string | React.ReactNode;
  message?: string | React.ReactNode;
  onCancel: () => void;
  onConfirm: () => void;
  maxWidth?: Breakpoint;
  loading?: boolean;
}

const ConfirmDialog = (props: IConfirmDialog) => {
  const { open, maxWidth = 'xs' } = props;
  return (
    <Dialog
      open={open}
      fullWidth
      maxWidth={maxWidth}
      sx={{ zIndex: theme.zIndex.modal + 2 }}
    >
      <DialogTitle>{props.title || 'Are you sure?'}</DialogTitle>
      <DialogContent>
        {typeof props.message === 'string' ? (
          <Typography
            sx={{
              fontSize: {
                xs: 'body2.fontSize',
                md: 'body1.fontSize',
              },
            }}
          >
            {props.message}
          </Typography>
        ) : (
          props.message
        )}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={props.onCancel}
          sx={{
            fontSize: {
              xs: 'body2.fontSize',
              md: 'body1.fontSize',
            },
          }}
        >
          No
        </Button>
        <Button
          onClick={props.onConfirm}
          sx={{
            fontSize: {
              xs: 'body2.fontSize',
              md: 'body1.fontSize',
            },
          }}
        >
          {props.loading ? <CircularProgress size={20} /> : 'Yes'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;

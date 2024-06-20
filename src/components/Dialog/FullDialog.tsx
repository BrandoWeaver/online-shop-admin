import * as React from 'react';
import { MdClose } from 'react-icons/md';

import AppBar from '@mui/material/AppBar';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import Slide from '@mui/material/Slide';
import Toolbar from '@mui/material/Toolbar';
import { TransitionProps } from '@mui/material/transitions';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction='up' ref={ref} {...props} />;
});

interface IFullScreenDialog {
  children: React.ReactNode;
  open: boolean;
  handleClose: () => void;
}

const FullScreenDialog = ({
  open,
  handleClose,
  children,
}: IFullScreenDialog) => {
  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
      sx={{
        display: { md: 'none', xs: 'block' },
      }}
    >
      <AppBar position='sticky' color='default' elevation={0}>
        <Toolbar>
          <IconButton edge='start' color='inherit' onClick={handleClose}>
            <MdClose />
          </IconButton>
        </Toolbar>
      </AppBar>
      {children}
    </Dialog>
  );
};

export default FullScreenDialog;

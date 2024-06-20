import React from 'react';
import { MdClose } from 'react-icons/md';

import { Avatar, Dialog, IconButton } from '@mui/material';

interface Ireciept {
  open: boolean;
  onClose: () => void;
  receipt: string;
}

function VeiwReciept(props: Ireciept) {
  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
      maxWidth='xs'
      PaperProps={{ sx: { position: 'relative' } }}
      fullWidth
    >
      <IconButton
        size='small'
        onClick={props.onClose}
        sx={{
          position: 'absolute',
          right: 10,
          top: 10,
          zIndex: 1,
          color: 'common.black',
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          '&:hover': {
            backgroundColor: (theme) => theme.palette.grey[100],
          },
        }}
      >
        <MdClose fontSize='large' />
      </IconButton>
      <Avatar
        variant='square'
        src={props.receipt}
        sx={{ width: '100%', height: 'auto', aspectRatio: '1/1' }}
      />
    </Dialog>
  );
}

export default VeiwReciept;

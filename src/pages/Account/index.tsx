import { useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { MdPermIdentity } from 'react-icons/md';

import { Alert, Box, Button, Snackbar, Typography } from '@mui/material';

import ErrDialog, { IErrDialogRef } from 'components/Dialog/ErrDialog';

import { IformAcc } from './form';

const Account = () => {
  const [succOpen, setOpenSucc] = useState(false);
  const [accOpen, setaccOpen] = useState(false);
  const method = useForm<IformAcc>();
  const errRef = useRef<IErrDialogRef>(null);

  const onSubmit: SubmitHandler<IformAcc> = async (data) => {
    console.log('Data', data);
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('username', data.userName);
  };

  return (
    <Box px={{ xs: 2, md: 7 }} py={{ xs: 0, md: 2 }} mb={{ xs: 10, md: 0 }}>
      <ErrDialog ref={errRef} />
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={accOpen}
        autoHideDuration={3000}
        onClose={() => {
          setaccOpen(false);
        }}
      >
        <Alert
          onClose={() => {
            setaccOpen(false);
          }}
          severity='success'
          sx={{ width: '100%' }}
        >
          Your account info has been changed
        </Alert>
      </Snackbar>

      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={succOpen}
        autoHideDuration={3000}
        onClose={() => {
          setOpenSucc(false);
        }}
      >
        <Alert
          onClose={() => {
            setOpenSucc(false);
          }}
          severity='success'
          sx={{ width: '100%' }}
        >
          Your Password has been changed
        </Alert>
      </Snackbar>

      <Box
        sx={{ display: 'flex', flexDirection: 'row', alignItems: 'stretch' }}
      >
        <MdPermIdentity size={30} />
        <Typography variant='h6' fontWeight={'bold'} sx={{ ml: 1 }}>
          Account Setting
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          pt: 3,
          px: 3,
        }}
      >
        <Button
          variant='contained'
          onClick={() => {
            method.handleSubmit(onSubmit)();
          }}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
};
export default Account;

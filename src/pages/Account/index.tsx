import { useRequest } from 'ahooks';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { MdPermIdentity } from 'react-icons/md';

import { Alert, Box, Button, Snackbar, Typography } from '@mui/material';

import ErrorDialog from 'components/Dialog/ErrorDialog';
import { BackdropLoading } from 'components/Loading';

import HttpUtil from 'utils/http-util';
import { ROUTE_API } from 'utils/route-util';

import { IformAcc } from './form';

const Account = () => {
  const [errOpen, setOpenErr] = useState(false);
  const [succOpen, setOpenSucc] = useState(false);
  const [accOpen, setaccOpen] = useState(false);
  const method = useForm<IformAcc>();

  const {
    error: errUpdatePass,

    loading: loadPass,
  } = useRequest(
    (oldPass, newPass) =>
      HttpUtil.post(ROUTE_API.changePassword, {
        oldPassword: oldPass,
        newPassword: newPass,
      }),
    {
      manual: true,
      onError: () => setOpenErr(true),
      onSuccess: () => {
        setOpenSucc(true);
      },
    },
  );
  const { error: errInfo, loading: loadInfo } = useRequest(
    async (data) => HttpUtil.post(ROUTE_API.editSellerInfo, data),
    {
      manual: true,
      onError: (err) => console.log('Upadate', err),
      onSuccess: () => {
        setaccOpen(true);
      },
    },
  );

  const onSubmit: SubmitHandler<IformAcc> = async (data) => {
    console.log('Data', data);
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('username', data.userName);

    // if (
    //   getValues("name") !== sellerInfo?.userInfo.name ||
    //   getValues("email") !== sellerInfo?.userInfo.email ||
    //   getValues("userName") !== sellerInfo.username
    // ) {
    //   await runUpdateInfo(formData);
    // } else {
    //   run(getValues("oldPass"), getValues("newPass"));
    // }
  };

  return (
    <Box px={{ xs: 2, md: 7 }} py={{ xs: 0, md: 2 }} mb={{ xs: 10, md: 0 }}>
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
      {loadInfo || loadPass ? (
        <BackdropLoading open />
      ) : errInfo ? (
        <>
          <ErrorDialog
            errorTitle='Error Occured'
            open={errOpen}
            errorMessage={
              errInfo?.message || errInfo?.error || errInfo?.error_description
            }
            onCloseDialog={() => setOpenErr(false)}
          />
        </>
      ) : (
        errUpdatePass && (
          <>
            <ErrorDialog
              errorTitle='Error Occured'
              open={errOpen}
              errorMessage={
                errUpdatePass?.error ||
                errUpdatePass?.message ||
                errUpdatePass?.error_description
              }
              onCloseDialog={() => setOpenErr(false)}
            />
          </>
        )
      )}
      <Box
        sx={{ display: 'flex', flexDirection: 'row', alignItems: 'stretch' }}
      >
        <MdPermIdentity size={30} />
        <Typography variant='h6' fontWeight={'bold'} sx={{ ml: 1 }}>
          Account Setting
        </Typography>
      </Box>
      {/* <Box sx={{ px: 3, pt: 3 }}>
        <FormProvider {...method}>
          <Accform sellerInfo={sellerInfo} />
        </FormProvider>
      </Box> */}

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

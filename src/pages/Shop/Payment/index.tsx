import { useRequest } from 'ahooks';
import React, { useRef, useState } from 'react';
import { MdAdd, MdDelete } from 'react-icons/md';
import { MdEdit } from 'react-icons/md';

import {
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import PAYMENT_API from 'api/Payment';

import ConfirmDialog from 'components/Dialog/ConfirmDialog';
import CusDialog, { ICusDialogHandler } from 'components/Dialog/CusDialog';
import ErrorDialog from 'components/Dialog/ErrorDialog';
import { LoadingSpiner } from 'components/Loading';

import theme from 'themes';

import PaymentForm from './CreatePaymentForm';

function Payment() {
  const [deletePay, setDeletePayment] = useState('');
  const [open, setOpen] = useState(false);
  const [updateData, setUpdateData] = useState<Ipayment.Root2>();
  const {
    refresh: refreshListBank,
    loading: loadingListAllBank,
    data: listPayment,
  } = useRequest(PAYMENT_API.listAllPayment, {
    onSuccess: (data) => {
      console.log('listPayment', data);
    },
  });
  const { run: deletePayment, loading: loadingDeletePayment } = useRequest(
    (id: string) => PAYMENT_API.deletePayment(id),
    {
      manual: true,
      onSuccess: () => {
        refreshListBank();
        setDeletePayment('');
      },
      onError: () => {
        setOpen(true);
      },
    },
  );

  const { error: errAddPayment } = useRequest(PAYMENT_API.addPayment, {
    manual: true,
    onSuccess: () => {
      refreshListBank();
    },
    onError: () => {
      setOpen(true);
    },
  });
  const cateFormRef = useRef<ICusDialogHandler>(null);
  const handleOpen = () => {
    setUpdateData(undefined);
  };
  const { run: updatePayment, loading: loadingupdatePayment } = useRequest(
    PAYMENT_API.updatePayment,
    {
      manual: true,
      onSuccess: () => {
        handleOpen();
        cateFormRef.current?.close();
        refreshListBank();
      },
      onError: (error) => {
        console.error('Error adding payment:', error);
      },
    },
  );
  return (
    <Box
      sx={{
        background: theme.palette.background.default,
        p: 2,
      }}
    >
      <ConfirmDialog
        title='Delete Payment'
        onCancel={() => setDeletePayment('')}
        onConfirm={() => deletePayment(deletePay)}
        open={deletePay !== ''}
        maxWidth='sm'
        loading={loadingDeletePayment}
        message='Are you sure?'
      />
      <CusDialog
        ref={cateFormRef}
        handleCloseDialog={() => {
          handleOpen();
        }}
      >
        <PaymentForm
          closeForm={cateFormRef}
          refreshList={refreshListBank}
          updateInfo={updateData}
          updatePayment={updatePayment}
          loading={loadingupdatePayment}
        />
      </CusDialog>
      {loadingListAllBank ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: 'calc(100vh - 294px)',
          }}
        >
          <LoadingSpiner size={25} />
        </Box>
      ) : errAddPayment ? (
        <ErrorDialog
          open={open}
          onCloseDialog={() => setOpen(false)}
          errorTitle='Error Occured'
          errorMessage={
            errAddPayment.message ||
            errAddPayment.error ||
            errAddPayment.error_description
          }
        />
      ) : listPayment && listPayment.length > 0 ? (
        <Box sx={{ height: 'calc(100vh - 310px)', overflow: 'scroll' }}>
          {listPayment.map((i) => (
            <Grid
              key={i._id}
              container
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mt: 2,
              }}
            >
              <Grid item xs={4} md={2}>
                <Typography
                  sx={{
                    fontSize: {
                      xs: 14,
                      md: 16,
                    },
                  }}
                >
                  {i.name}
                </Typography>
              </Grid>
              <Grid
                item
                xs={8}
                md={10}
                display={'flex'}
                flexDirection={'row'}
                justifyContent={'flex-end'}
              >
                <Button
                  color='error'
                  sx={{ minWidth: '0px' }}
                  variant='text'
                  onClick={() => {
                    setDeletePayment(i._id);
                  }}
                >
                  <MdDelete size={20} />
                </Button>
                <Button
                  color='primary'
                  sx={{ minWidth: '0px' }}
                  variant='text'
                  onClick={() => {
                    setUpdateData(i);
                    cateFormRef.current?.open(i);
                  }}
                >
                  <MdEdit size={20} />
                </Button>
              </Grid>
              <Grid item xs={12} container alignItems={'center'}>
                <Grid item xs={4} md={2}>
                  <Avatar
                    src={i.imageUrl || ''}
                    variant='rounded'
                    sx={{
                      width: 'auto',
                      height: '90px',
                      aspectRatio: '1 / 1',
                    }}
                  />
                </Grid>
                <Grid item xs={8} sx={{ marginTop: '15px' }} md={10}>
                  <Typography
                    sx={{
                      fontSize: {
                        xs: 14,
                        md: 16,
                      },
                    }}
                  >
                    Account Name
                  </Typography>
                  <TextField
                    error={true}
                    fullWidth
                    defaultValue={i.name}
                    size='small'
                    sx={{
                      '& fieldset': { border: 'none' },
                      borderRadius: 2,
                      background: (theme) => theme.palette.background.paper,
                      fontSize: { xs: 14, md: 16 },
                    }}
                  />
                  <Typography
                    sx={{
                      fontSize: {
                        xs: 14,
                        md: 16,
                      },
                      marginTop: '10px',
                    }}
                  >
                    Account Number
                  </Typography>
                  <TextField
                    error={true}
                    fullWidth
                    defaultValue={i.accountNumber}
                    size='small'
                    sx={{
                      '& fieldset': { border: 'none' },
                      borderRadius: 2,
                      background: (theme) => theme.palette.background.paper,
                      fontSize: { xs: 14, md: 16 },
                    }}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Divider sx={{ mt: 2 }} />
              </Grid>
            </Grid>
          ))}
        </Box>
      ) : (
        <Box
          sx={{
            height: 'calc(100vh - 310px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography
            sx={{
              fontSize: {
                xs: 14,
                md: 16,
              },
              textAlign: 'center',
            }}
          >
            No payment methods available.
          </Typography>
        </Box>
      )}
      <Stack
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          flexWrap: 'wrap',
          justifyContent: 'flex-end',
          mt: { xs: 0.8, md: 2 },
        }}
      >
        <Typography
          sx={{
            fontSize: {
              xs: 14,
              md: 16,
            },
          }}
        >
          Do you accept more payment methods?
        </Typography>
        <Button
          onClick={cateFormRef.current?.open}
          color='primary'
          variant='outlined'
          sx={{ ml: { md: 4, xs: 0 }, mt: { xs: 1, md: 0 } }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              fontSize: {
                xs: 14,
                md: 16,
              },
            }}
          >
            <MdAdd style={{ marginRight: '5px' }} />
            Add Payment
          </Box>
        </Button>
      </Stack>
    </Box>
  );
}

export default Payment;

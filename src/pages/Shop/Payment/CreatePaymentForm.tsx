import { useRequest } from 'ahooks';
import React, { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { GrUpload } from 'react-icons/gr';
import { MdClear } from 'react-icons/md';

import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import PAYMENT_API from 'api/Payment';

import { ICusDialogHandler } from 'components/Dialog/CusDialog';
import { LoadingSpiner } from 'components/Loading';

import theme from 'themes';

interface IFormInput {
  image: File | '';
  accountName: string;
  accountNumber: string;
}

function PaymentForm({
  closeForm,
  refreshList,
  updateInfo,
  updatePayment,
  loading,
}: {
  closeForm: React.RefObject<ICusDialogHandler>;
  refreshList: () => void;
  updateInfo: Ipayment.Root2 | undefined;
  updatePayment: (params_0: {
    paymentId: string;
    name: string;
    accountNumber: number;
    image: File | '';
  }) => void;
  loading: boolean;
}) {
  const { control, handleSubmit, reset, setValue } = useForm<IFormInput>({
    defaultValues: {
      image: '',
      accountName: '',
      accountNumber: '',
    },
  });
  const [imagePreview, setImagePreview] = useState<string>('');
  const inputFileRef = React.useRef<HTMLInputElement | null>(null);

  const { run: addPayment, loading: loadingAddPayment } = useRequest(
    PAYMENT_API.addPayment,
    {
      manual: true,
      onSuccess: () => {
        reset();
        setImagePreview('');
        closeForm.current?.close();
        refreshList();
      },
      onError: (error) => {
        console.error('Error adding payment:', error);
      },
    },
  );

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    if (updateInfo) {
      updatePayment({
        name: data.accountName,
        accountNumber: +data.accountNumber,
        image: data.image,
        paymentId: updateInfo._id,
      });
    } else {
      addPayment({
        accountNumber: +data.accountNumber,
        image: data.image,
        name: data.accountName,
      });
    }
  };

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    onChange?: (file: File | '') => void,
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      if (onChange) onChange(file);
    }
  };
  useEffect(() => {
    if (updateInfo) {
      setValue('accountName', updateInfo.name);
      setValue('accountNumber', updateInfo.accountNumber);
    } else {
      reset();
    }
  }, [updateInfo]);
  console.log('updateInfo', updateInfo);
  return (
    <Box
      component='form'
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        background: theme.palette.background.default,
        p: 2,
        borderRadius: 1,
        boxShadow: 2,
      }}
    >
      <Stack spacing={3}>
        <Box>
          <Typography variant='h6'>Add Payment</Typography>
        </Box>

        <Box>
          <Controller
            name='image'
            control={control}
            render={({ field }) => (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar
                  src={imagePreview || (updateInfo && updateInfo.imageUrl)}
                  sx={{ width: 80, height: 80, cursor: 'pointer' }}
                  variant='rounded'
                  onClick={() => inputFileRef.current?.click()}
                />
                <input
                  type='file'
                  accept='image/*'
                  hidden
                  ref={inputFileRef}
                  onChange={(e) => handleImageChange(e, field.onChange)}
                />
                {imagePreview && (
                  <Button
                    variant='text'
                    color='error'
                    startIcon={<MdClear />}
                    onClick={() => {
                      setImagePreview('');
                      field.onChange('');
                    }}
                    sx={{ ml: 2 }}
                  >
                    Remove
                  </Button>
                )}
                {!imagePreview && (
                  <Button
                    variant='text'
                    color='primary'
                    startIcon={<GrUpload size={15} />}
                    onClick={() => inputFileRef.current?.click()}
                    sx={{ ml: 2 }}
                  >
                    Upload
                  </Button>
                )}
              </Box>
            )}
          />
        </Box>

        <Box>
          <Controller
            name='accountName'
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label='Account Name'
                fullWidth
                error={!!error}
                helperText={error ? error.message : null}
                sx={{
                  '& fieldset': { border: 'none' },
                  borderRadius: 2,
                  background: theme.palette.background.paper,
                  fontSize: { xs: 14, md: 16 },
                }}
              />
            )}
          />
        </Box>

        <Box>
          <Controller
            name='accountNumber'
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label='Account Number'
                fullWidth
                error={!!error}
                helperText={error ? error.message : null}
                sx={{
                  '& fieldset': { border: 'none' },
                  borderRadius: 2,
                  background: theme.palette.background.paper,
                  fontSize: { xs: 14, md: 16 },
                }}
              />
            )}
          />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            type='submit'
            variant='contained'
            color='primary'
            disabled={loadingAddPayment}
            sx={{
              fontSize: { xs: 14, md: 16 },
              width: '140px',
              height: '40px',
            }}
          >
            {loadingAddPayment || loading ? (
              <LoadingSpiner size={20} />
            ) : updateInfo ? (
              'Save Change'
            ) : (
              'Save'
            )}
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}

export default PaymentForm;

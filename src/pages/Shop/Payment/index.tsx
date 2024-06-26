import { useRequest } from 'ahooks';
import React, { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { MdAdd, MdClear, MdDelete } from 'react-icons/md';

import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import PAYMENT_API from 'api/Payment';

import ErrorDialog from 'components/Dialog/ErrorDialog';
import { BackdropLoading } from 'components/Loading';

import theme from 'themes';

interface Ibank {
  image: File | '';
  accountName: string;
  accountNumber: string;
}

function Payment() {
  const [bankName, setBankName] = useState<string>();
  const [logo, setLogo] = useState<any>();
  const [isShow, setShow] = useState(0);
  const [hideButton, setHideButton] = useState(0);
  const [accName, setAccName] = useState<string>();
  const [accNum, setAccNum] = useState<string>();
  // const [add, setAdd] = useState(true);
  const [open, setOpen] = useState(false);
  const { control, handleSubmit } = useForm<Ibank>({
    shouldUnregister: true,
  });

  const { refresh: refreshListBank, loading: loadingListAllBank } = useRequest(
    PAYMENT_API.listAllPayment,
    {
      onSuccess: () => {},
    },
  );

  const { error: errRemovePayment } = useRequest(
    (id: string) => PAYMENT_API.deletePayment(id),
    {
      manual: true,
      onSuccess: () => {
        refreshListBank();
      },
      onError: () => {
        setOpen(true);
      },
    },
  );

  // const removePayment = (id: string) => {
  //   run(id);
  // };

  const { run: addPayment, error: errAddPayment } = useRequest(
    PAYMENT_API.addPayment,
    {
      manual: true,
      onSuccess: (data, param) => {
        refreshListBank();
        // setAdd(true);
        // props.refresh();
        setBankName(undefined);
      },
      onError: () => {
        setOpen(true);
      },
    },
  );

  const onSubmit: SubmitHandler<Ibank> = (data) => {
    addPayment({ name: '', accountNumber: 1, image: '' });
  };

  return (
    <Box
      sx={{
        background: theme.palette.background.default,
        p: 2,
      }}
    >
      {errAddPayment ? (
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
      ) : (
        errRemovePayment && (
          <ErrorDialog
            open={open}
            onCloseDialog={() => setOpen(false)}
            errorTitle='Error Occured'
            errorMessage={
              errRemovePayment.error ||
              errRemovePayment.message ||
              errRemovePayment.error_description
            }
          />
        )
      )}
      <Grid
        // key={el.paymentOption.id}
        key={0}
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
            test
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
            color='inherit'
            sx={{ minWidth: '0px' }}
            variant='text'
            // onClick={() => removePayment(el.paymentOption.id.toString())}
          >
            <MdDelete />
          </Button>
        </Grid>

        <>
          <Grid item xs={12} container alignItems={'center'}>
            <Grid item xs={2}></Grid>
            {/* <Grid item xs={10}>
              <Controller
                name={`ebank.${index}.paymentOptionId`}
                control={control}
                defaultValue={;}
                render={({ field, fieldState: { error } }) => (
                  <input hidden {...field} />
                )}
              />
            </Grid> */}

            <Grid item xs={4} md={2}>
              <Avatar
                src={''}
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

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Controller
                  control={control}
                  name={`accountName`}
                  defaultValue={''}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      error={true}
                      fullWidth
                      size='small'
                      sx={{
                        '& fieldset': { border: 'none' },
                        borderRadius: 2,
                        background: (theme) => theme.palette.background.paper,
                        fontSize: { xs: 14, md: 16 },
                      }}
                      {...field}
                    />
                  )}
                />
              </div>

              <div style={{ marginTop: '10px' }}>
                <Typography
                  sx={{
                    fontSize: {
                      xs: 14,
                      md: 16,
                    },
                  }}
                >
                  Account Number
                </Typography>

                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Controller
                    name={`accountNumber`}
                    control={control}
                    defaultValue={''}
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        error={true}
                        fullWidth
                        size='small'
                        sx={{
                          '& fieldset': { border: 'none' },
                          borderRadius: 2,
                          background: (theme) => theme.palette.background.paper,
                          fontSize: { xs: 14, md: 16 },
                        }}
                        {...field}
                      />
                    )}
                  />
                </div>
              </div>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            {/* <hr style={{ backgroundColor: theme.palette.grey["50"] }} /> */}
            <Divider sx={{ mt: 2 }} />
          </Grid>
        </>
      </Grid>

      {loadingListAllBank ? (
        <BackdropLoading open />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box>
            <Grid
              key={0}
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
                      xs: 'body2.fontSize',
                      md: 'body1.fontSize',
                    },
                  }}
                >
                  {bankName === undefined ? 'Bank Name' : bankName}
                </Typography>
              </Grid>
              <Grid item xs={8} md={10}>
                <Controller
                  name={`image`}
                  render={({ field, fieldState: { error } }) => (
                    <>
                      {field.value ? (
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                          }}
                        >
                          <Button
                            sx={{ minWidth: '0px' }}
                            onClick={() => {
                              // setAdd(true);
                              setBankName(undefined);
                              setLogo(undefined);
                            }}
                          >
                            <MdClear />
                          </Button>
                        </Box>
                      ) : (
                        <Select
                          onClick={() => setShow(isShow + 1)}
                          error={true}
                          label='Select Bank'
                          fullWidth
                          size='small'
                          sx={{
                            '& fieldset': { border: 'none' },
                            borderRadius: 2,
                            background: (theme) =>
                              theme.palette.background.paper,
                          }}
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                          }}
                        >
                          <MenuItem
                            // onClick={() => {
                            //   setBankName(el.name);
                            //   setLogo(el.logo);
                            // }}
                            value={1}
                            key={1}
                            // disabled={id?.includes(el.id)}
                            // watchPaymentID === el.id ||
                            // paymentId.includes(el.id)
                            sx={{ fontSize: { xs: 14, md: 16 } }}
                          >
                            test
                          </MenuItem>
                        </Select>
                      )}
                      {error && (
                        <Typography
                          color='error.main'
                          variant='caption'
                          role='alert'
                        >
                          {error.message}
                        </Typography>
                      )}
                    </>
                  )}
                  rules={{
                    required: {
                      value: true,
                      message: 'Please Choose One Option',
                    },
                  }}
                  defaultValue={''}
                  control={control}
                />
              </Grid>

              <>
                <Grid item xs={12} container alignItems={'center'}>
                  <Grid item xs={4} md={2}>
                    <Avatar
                      src={logo !== undefined && logo}
                      variant='rounded'
                      sx={{
                        width: 'auto',
                        height: '90px',
                        aspectRatio: '1 / 1',
                      }}
                    />
                  </Grid>
                  <Grid item xs={8} md={10} sx={{ marginTop: '15px' }}>
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
                    <Controller
                      defaultValue={accName}
                      name={`accountName`}
                      control={control}
                      rules={{
                        required: {
                          value: true,
                          message: 'Invalid input',
                        },
                      }}
                      render={({ field, fieldState: { error } }) => (
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                          }}
                        >
                          <TextField
                            error={true}
                            fullWidth
                            size='small'
                            sx={{
                              '& fieldset': { border: 'none' },
                              borderRadius: 2,
                              background: (theme) =>
                                theme.palette.background.paper,
                              fontSize: { xs: 14, md: 16 },
                            }}
                            {...field}
                            onChange={(e) => {
                              setAccName(e.target.value);
                              field.onChange(e);
                            }}
                          />

                          {error && (
                            <span
                              style={{
                                color: 'red',
                                marginBottom: '10px',
                              }}
                              role='alert'
                            >
                              {error.message}
                            </span>
                          )}
                        </div>
                      )}
                    />
                    <div style={{ marginTop: '10px' }}>
                      <Typography
                        sx={{
                          fontSize: {
                            xs: 14,
                            md: 16,
                          },
                        }}
                      >
                        Account Number
                      </Typography>
                      <Controller
                        defaultValue={accNum}
                        // name='accNum'

                        name={`accountNumber`}
                        control={control}
                        rules={{
                          required: {
                            value: true,
                            message: 'Invalid input',
                          },
                          pattern: {
                            value: /^[0-9]*$/,
                            message: 'Input must be numbers',
                          },
                        }}
                        render={({ field, fieldState: { error } }) => (
                          <div
                            style={{
                              display: 'flex',
                              flexDirection: 'column',
                            }}
                          >
                            <TextField
                              error={true}
                              fullWidth
                              size='small'
                              sx={{
                                '& fieldset': { border: 'none' },
                                borderRadius: 2,
                                background: (theme) =>
                                  theme.palette.background.paper,
                                fontSize: { xs: 14, md: 16 },
                              }}
                              {...field}
                              onChange={(e) => {
                                setAccNum(e.target.value);
                                field.onChange(e);
                              }}
                            />

                            {error && (
                              <span style={{ color: 'red' }} role='alert'>
                                {error.message}
                              </span>
                            )}
                          </div>
                        )}
                      />
                    </div>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  {/* <hr
                          style={{ backgroundColor: theme.palette.grey["50"] }}
                        /> */}
                  <Divider sx={{ mt: 2 }} />
                </Grid>
              </>
            </Grid>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
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
                Do you acccept more payment methods?
              </Typography>
              <Button
                onClick={() => {
                  setHideButton(hideButton + 1);
                  // setAdd(false);
                }}
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

            <Box>
              {/* {add === true && listSelectBank?.data.length !== 6 && ( */}
              <hr style={{ backgroundColor: theme.palette.grey['50'] }} />
              <Divider sx={{ mt: 2 }} />
              {/* )} */}
            </Box>

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                mt: { xs: 2, md: 2 },
                mb: { xs: 7, md: 2 },
              }}
            >
              <Button
                sx={{
                  fontSize: {
                    xs: 14,
                    md: 16,
                  },
                }}
                variant='contained'
                color='primary'
                onClick={() => handleSubmit(onSubmit)()}
              >
                {loadingListAllBank ? <CircularProgress size={20} /> : 'Save'}
              </Button>
            </Box>
          </Box>
        </form>
      )}
    </Box>
  );
}

export default Payment;

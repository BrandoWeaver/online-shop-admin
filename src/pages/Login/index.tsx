import { useRequest } from 'ahooks';
import { useRef } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Navigate } from 'react-router';

import {
  Avatar,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Link,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import Container from '@mui/material/Container';

import { useAuthContext } from 'contexts/AuthContext';

import AUTH_API from 'api/Auth';

import { CusTextField, PasswordInput } from 'components/CusMuiComp/CusInputs';
import ErrDialog, { IErrDialogRef } from 'components/Dialog/ErrDialog';
import { LoadingSpiner } from 'components/Loading';

import { ROUTE_PATH } from 'utils/route-util';

interface IFormInputs {
  username: string;
  password: string;
  rememberMe: boolean;
}

const Login = () => {
  const errRef = useRef<IErrDialogRef>(null);
  const { control, handleSubmit, watch } = useForm<IFormInputs>();
  const { authState, setAuthState } = useAuthContext();

  const {
    runAsync: runLogin,
    data: login,
    loading: loadingLogin,
  } = useRequest(AUTH_API.login, {
    manual: true,
    onSuccess: (data) => {
      console.log('SuccessRes', data);
      if (data.token) {
        setAuthState({
          authed: true,
          rememberMe: watch('rememberMe'),
          ...data,
        });
      }
    },
    onError: (err) => {
      console.log('errRes', err);
    },
  });

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    // console.log('onSubmit:', data);
    runLogin(data);
  };

  if (authState.authed) return <Navigate to={ROUTE_PATH.home} replace />;

  return (
    <Container
      maxWidth={false}
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

        backgroundImage: `url(/images/bg_image.png)`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
    >
      <ErrDialog ref={errRef} />
      <Paper
        sx={{
          bgcolor: 'background.default',
          width: 420,
          padding: (theme) => [
            theme.spacing(2, 4, 4, 4),
            theme.spacing(2, 4, 4, 4),
            theme.spacing(2, 6, 5, 6),
          ],
          borderRadius: (theme) => theme.spacing(5),
          boxShadow: '0px 4px 10px 0px #00000026',
        }}
      >
        <Avatar
          variant='square'
          src={`/images/logo.png`}
          sx={{
            width: '100%',
            height: (theme) => theme.spacing(10),
            mt: [2, 2, 4],
            '&>img': {
              objectFit: 'contain',
            },
          }}
        />
        <Typography align='center' variant='h3' fontWeight='bold' mt={1} mb={2}>
          online shop
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
          <Stack mt={2} mb={1}>
            <Typography
              fontWeight='bold'
              align='center'
              variant='h5'
              gutterBottom
            >
              Login
            </Typography>
            <Typography align='center' variant='body2' color='text.secondary'>
              to access your shop and manage products
            </Typography>
          </Stack>

          <Stack spacing={2}>
            <Controller
              control={control}
              name='username'
              defaultValue=''
              rules={{ required: true }}
              render={({ field, fieldState: { error } }) => (
                <CusTextField
                  fullWidth
                  size='small'
                  variant='filled'
                  label='Username'
                  error={Boolean(error)}
                  {...field}
                />
              )}
            />

            <Controller
              control={control}
              name='password'
              defaultValue=''
              rules={{ required: true }}
              render={({ field, fieldState: { error } }) => (
                <Stack>
                  <PasswordInput
                    size='small'
                    variant='filled'
                    label='Password'
                    error={Boolean(error)}
                    {...field}
                  />
                  <Typography
                    color='error'
                    variant='caption'
                    sx={{ visibility: error ? 'visible' : 'hidden' }}
                  >
                    Password must contain at least 6 characters
                  </Typography>
                </Stack>
              )}
            />
          </Stack>

          <Controller
            control={control}
            name='rememberMe'
            defaultValue={true}
            render={({ field: { value, onChange, ...rest } }) => (
              <FormControlLabel
                control={<Checkbox checked={value} onChange={onChange} />}
                label='Remember Me'
                slotProps={{ typography: { variant: 'body2' } }}
                sx={{ mt: -1 }}
                {...rest}
              />
            )}
          />

          <Box display='flex' flexDirection='column' alignItems='center' mt={1}>
            <Button
              disabled={loadingLogin}
              variant='contained'
              type='submit'
              size='large'
              fullWidth
              sx={{
                bgcolor: 'primary.light',
                color: 'primary.main',
                fontWeight: 'bold',
              }}
            >
              {!loadingLogin ? 'Login' : <LoadingSpiner size={26.25} />}
            </Button>
            {/* <Link variant='caption' color='text.secondary' my={1}>
              Forget your password?
            </Link> */}
            {/* <Typography variant='body2'>
              Don’t have an account? <Link underline='hover'>Register.</Link>
            </Typography> */}
          </Box>
        </form>
      </Paper>
    </Container>
  );
};
export default Login;

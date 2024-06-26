import { Navigate, Outlet } from 'react-router-dom';

import { Box, LinearProgress, Stack, Toolbar, Typography } from '@mui/material';

import { useAuthContext } from 'contexts/AuthContext';

import { ROUTE_PATH } from 'utils/route-util';

import Menubar from './Menubar';
import Navbar from './Navbar';

const drawerWidth = 150;

function Layout() {
  // console.log('Layout');
  const { authState } = useAuthContext();
  if (!authState?.authed) return <Navigate to={ROUTE_PATH.login} replace />;
  return (
    <Box sx={{ display: 'flex' }}>
      <Navbar {...{ drawerWidth }} />
      <Menubar {...{ drawerWidth }} />
      <Box
        component='main'
        flexGrow={1}
        sx={{ overflow: 'auto', minHeight: '100vh' }}
      >
        <Toolbar sx={{ height: [80, 80, 100] }} />
        {!false ? (
          <Outlet />
        ) : (
          <Stack
            justifyContent='center'
            alignItems='center'
            width='100%'
            height={['70%', '70%', '80%']}
          >
            <Typography
              color='primary'
              variant='h4'
              fontWeight={600}
              gutterBottom
              sx={{ fontSize: { xs: 'h5.fontSize', md: 'h4.fontSize' } }}
            >
              Getting seller info...
            </Typography>
            <div style={{ width: '60%' }}>
              <LinearProgress />
            </div>
          </Stack>
        )}
        <Toolbar sx={{ height: 62, display: { xs: 'flex', md: 'none' } }} />
      </Box>
    </Box>
  );
}

export default Layout;

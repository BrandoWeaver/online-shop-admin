import { memo, useRef, useState } from 'react';
import {
  MdArrowDropDown,
  MdCheck,
  MdChevronRight,
  MdLogout,
  MdOutlineHome,
} from 'react-icons/md';
import { matchPath, useLocation } from 'react-router';
import { Link } from 'react-router-dom';

import {
  Avatar,
  Breadcrumbs,
  Divider,
  Link as MuiLink,
  Tooltip,
} from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { useAuthContext } from 'contexts/AuthContext';

import ConfDialog, { IConfDialogRef } from 'components/Dialog/ConfDialog';

import { ROUTE_PATH } from 'utils/route-util';

import { menuItems } from './Menubar';

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  drawerWidth: number;
}

function Navbar({ drawerWidth }: Props) {
  // console.log("Navbar");
  const { pathname } = useLocation();
  const { sellerInfo, selectedShop, setAuthState } = useAuthContext();
  const [open, setOpen] = useState(false);

  const logoutRef = useRef<IConfDialogRef>(null);

  const matched = menuItems.find((menu) =>
    Boolean(matchPath(menu.path, pathname)),
  );

  const onConfirmLogout = () => {
    setAuthState((prev) => ({ authed: false, rememberMe: prev.rememberMe }));
  };

  return (
    <AppBar
      elevation={0}
      position='fixed'
      color='default'
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
      }}
    >
      <ConfDialog
        ref={logoutRef}
        onConfirm={() => {
          logoutRef.current?.close();
          onConfirmLogout();
        }}
      />

      <Toolbar sx={{ height: [80, 80, 100] }}>
        <Stack>
          <Typography variant='h6' fontWeight={600} gutterBottom>
            {matched?.title === 'Home' ? 'Dashboard' : matched?.title}
          </Typography>
          {matched?.title !== 'Home' && (
            <Breadcrumbs
              separator={<MdChevronRight />}
              sx={{ display: { xs: 'none', md: 'block' } }}
            >
              <MuiLink
                component={Link}
                underline='hover'
                color='inherit'
                to={ROUTE_PATH.home}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <MdOutlineHome size={18} />
              </MuiLink>
              <Typography color='text.primary'>{matched?.title}</Typography>
            </Breadcrumbs>
          )}
        </Stack>

        <Stack flexGrow={1} />
        <Tooltip
          open={open}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          slotProps={{
            tooltip: {
              sx: {
                // p: 0,
                minWidth: 180,
                bgcolor: 'common.white',
                color: 'common.black',
                boxShadow: 2,
              },
            },
          }}
          title={
            <Stack>
              {/* {sellerInfo?.shops.map((sh) => (
                <Button
                  color={selectedShop?.id === sh.id ? 'primary' : 'inherit'}
                  key={sh.id}
                  size='large'
                  onClick={() => {
                    setAuthState((prev) => ({
                      ...prev,
                      selectedShopId: sh.id,
                    }));
                    setOpen(false);
                  }}
                >
                  <Avatar
                    src={sh.logo}
                    imgProps={{ loading: 'lazy' }}
                    sx={{ width: 30, height: 30, bgcolor: 'divider', mr: 1 }}
                  />
                  <Typography align='left' variant='body2' sx={{ flexGrow: 1 }}>
                    {sh.name}
                  </Typography>
                  {selectedShop?.id === sh.id && <MdCheck />}
                </Button>
              ))} */}
              {/* <Divider /> */}
              <Button
                size='large'
                color='error'
                startIcon={<MdLogout />}
                onClick={() => logoutRef.current?.open('Logout')}
              >
                Logout
              </Button>
            </Stack>
          }
        >
          <Button
            variant='contained'
            color='inherit'
            startIcon={
              <Avatar src={`/images/logo.png`} sx={{ bgcolor: 'divider' }} />
            }
            sx={{
              borderRadius: 2,
              bgcolor: 'background.paper',
              ':hover': { bgcolor: 'grey.200' },
            }}
            onClick={() => setOpen((prev) => !prev)}
          >
            {selectedShop?.name}
          </Button>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
}

export default memo(Navbar);

import { memo } from 'react';
import {
  MdOutlineFeaturedPlayList,
  MdOutlineHome,
  MdOutlineLocalMall,
  MdOutlineStore,
} from 'react-icons/md';
import { matchPath, useLocation, useNavigate } from 'react-router';

import { AppBar, Avatar, Button } from '@mui/material';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';

import { ROUTE_PATH } from 'utils/route-util';

export const menuItems = [
  {
    title: 'Home',
    icon: <MdOutlineHome size={30} />,
    path: ROUTE_PATH.home,
  },
  {
    title: 'Order',
    icon: <MdOutlineFeaturedPlayList size={30} />,
    path: ROUTE_PATH.order,
  },
  {
    title: 'Shop',
    icon: <MdOutlineStore size={30} />,
    path: ROUTE_PATH.shop,
  },
  {
    title: 'Product',
    icon: <MdOutlineLocalMall size={30} />,
    path: ROUTE_PATH.product,
  },
  // {
  //   title: 'Account',
  //   icon: <MdPersonOutline />,
  //   path: ROUTE_PATH.account,
  //   custom: (key: number, matched: boolean, onClick: () => void) => (
  //     <Fragment key={key}>
  //       <Stack flexGrow={1} sx={{ display: { xs: 'none', md: 'flex' } }} />
  //       <Stack
  //         justifyContent='center'
  //         alignItems='center'
  //         my={3}
  //         sx={{ display: { xs: 'none', md: 'flex' } }}
  //       >
  //         <IconButton
  //           size='large'
  //           sx={{
  //             border: '1px solid',
  //             borderColor: !matched ? 'divider' : 'primary.main',
  //             color: !matched ? 'text.secondary' : 'primary.main',
  //           }}
  //           onClick={onClick}
  //         >
  //           <MdPersonOutline />
  //         </IconButton>
  //       </Stack>
  //     </Fragment>
  //   ),
  // },
];

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  drawerWidth: number;
}

function Menubar(props: Props) {
  // console.log('Menubar');
  const { drawerWidth } = props;
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const drawer = (
    <Stack height={['auto', 'auto', '100%']} width='100%' px={[1, 1, 3]}>
      <Stack
        alignItems='center'
        my={3}
        sx={{ display: { xs: 'none', md: 'flex' } }}
      >
        <Avatar
          variant='rounded'
          src={`/images/logo.png`}
          sx={{ width: 80, height: 80, borderRadius: 2 }}
        />
      </Stack>
      <Stack direction={['row', 'row', 'column']} height='inherit'>
        {menuItems.map((menu, i) => {
          const matched = Boolean(menu.path && matchPath(menu.path, pathname));
          return (
            <Button
              key={i}
              sx={{
                py: [1, 1, 1.5],
                mb: [0, 0, 2],
                flex: [1, 1, 0],
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: [
                  'body2.fontSize',
                  'body2.fontSize',
                  'body1.fontSize',
                ],
                borderRadius: 2,
                borderWidth: { xs: 0, md: 1 },
                borderStyle: 'solid',
                borderColor: !matched ? 'divider' : 'primary.main',
                color: !matched ? 'text.secondary' : 'primary.main',

                '&>svg': {
                  width: [25, 25, 30],
                  height: [25, 25, 30],
                },
              }}
              onClick={() => navigate(menu.path)}
            >
              {menu.icon}
              {menu.title}
            </Button>
          );
        })}
      </Stack>
    </Stack>
  );

  return (
    <Box
      component='nav'
      sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
    >
      <Drawer
        variant='permanent'
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
            bgcolor: 'background.default',
          },
        }}
        open
      >
        {drawer}
      </Drawer>

      <AppBar
        position='fixed'
        color='default'
        sx={{ top: 'auto', bottom: 0, display: { xs: 'block', md: 'none' } }}
      >
        {drawer}
      </AppBar>
    </Box>
  );
}

export default memo(Menubar);

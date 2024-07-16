import { useState } from 'react';

import { AppBar } from '@mui/material';
import { Box } from '@mui/system';

import { StyledTab, StyledTabs, TabPanel } from 'components/CusMuiComp/CusTabs';

import Payment from './Payment';
import ShopInfo from './ShopInfo';

function Shop() {
  const [active, setActive] = useState(0);
  return (
    <Box m={{ xs: 2, md: 3 }}>
      <AppBar
        position='static'
        elevation={0}
        sx={{
          background: (theme) => theme.palette.background.paper,
          borderTopRightRadius: '10px',
          borderTopLeftRadius: '10px',
          mt: 3,
        }}
      >
        <>
          <StyledTabs value={active} onChange={(e, n) => setActive(+n)}>
            <StyledTab
              label='Shop Info'
              sx={{ flex: 1, maxWidth: '50px', py: 1 }}
            />
            <StyledTab
              label='Payment'
              sx={{ flex: 1, maxWidth: '50px', py: 1 }}
            />
            {/* <StyledTab
              label='Operating Hours'
              sx={{ flex: 1, maxWidth: '50px', py: 1 }}
            /> */}
          </StyledTabs>
        </>
      </AppBar>

      <TabPanel value={active} index={0}>
        <ShopInfo />
      </TabPanel>
      <TabPanel value={active} index={1}>
        <Payment />
      </TabPanel>
    </Box>
  );
}
export default Shop;

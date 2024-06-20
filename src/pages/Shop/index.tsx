import { StyledTab, StyledTabs, TabPanel } from 'components/CusMuiComp/CusTabs';
import { Box } from '@mui/system';
import { AppBar } from '@mui/material';
import ShopInfo from './ShopInfo';
import Payment from './Payment';
import OperatingHours from './OperatiingHours';

import { useContext, useState } from 'react';
import { useRequest } from 'ahooks';
import SHOP from 'api/Shop';
import { AuthContext } from 'contexts/AuthContext';

function Shop() {
  // const [open, setOpen] = useState(false);
  const { selectedShop } = useContext(AuthContext);
  const [active, setActive] = useState(0);

  const { data, refresh, error, loading } = useRequest(
    () => SHOP.getShopInfo(`${selectedShop?.id}`),
    {
      ready: selectedShop?.id ? true : false,
      refreshDeps: [selectedShop?.id],
      onError: () => {
        // setOpen(true);
      },
    }
  );

  // console.log("Data", data);
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
            <StyledTab
              label='Operating Hours'
              sx={{ flex: 1, maxWidth: '50px', py: 1 }}
            />
          </StyledTabs>
        </>
      </AppBar>

      <TabPanel value={active} index={0}>
        <ShopInfo
          refresh={refresh}
          addr={data?.addr}
          contact={data?.contact}
          domain={data?.domain}
          logo={data?.logo}
          lang={data?.lang}
          location={data?.location}
          name={data?.name}
          poi={data?.poi}
          primaryColor={data?.primaryColor}
          secondaryColor={data?.secondaryColor}
          tagline={data?.tagline}
          telegramId={data?.telegramId}
          telegramStatus={data?.telegramStatus}
          facebookPageId={data?.facebookPageId}
          groupShopId={data?.groupShopId}
          mapUrl={data?.mapUrl}
          tadaLocationId={data?.tadaLocationId}
          id={data?.id}
          shopError={error}
          shoploding={loading}
        />
      </TabPanel>
      <TabPanel value={active} index={1}>
        <Payment refresh={refresh} />
      </TabPanel>
      <TabPanel value={active} index={2}>
        <OperatingHours
          Operating={data?.operatingHour}
          shopError={error}
          refresh={refresh}
          shoploding={loading}
        />
      </TabPanel>
    </Box>
  );
}
export default Shop;

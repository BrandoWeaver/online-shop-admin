import Box from '@mui/material/Box';
import { StyledTabs, StyledTab, TabPanel } from 'components/CusMuiComp/CusTabs';
import ProductTab from './ProductTab';
import useRouter, { ROUTE_PATH } from 'hooks/useRouter';

const Product = () => {
  const { urlParams, navigate } = useRouter();
  const active =
    !urlParams.tab || urlParams.tab === ':tab' ? 'product' : urlParams.tab;

  return (
    <Box sx={{ px: [2, 2, 3] }}>
      {/* <AppBar
        position='sticky'
        color='default'
        elevation={0}
        sx={{ top: 80 }}
      > */}
      <StyledTabs
        value={active}
        onChange={(_, newVal) =>
          navigate(ROUTE_PATH.product.replace(':tab', newVal.toString()), {
            replace: true,
          })
        }
      >
        <StyledTab label='Product' value='product' />
        <StyledTab label='Banner' value='banner' />
      </StyledTabs>
      {/* </AppBar> */}

      <TabPanel value={active} index='product'>
        <ProductTab />
      </TabPanel>
    </Box>
  );
};
export default Product;

import CustomizedTables from 'pages/Shop/ShopInfo/TableView';

import { Avatar, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';

function ShopInfo() {
  return (
    <>
      <Box m={{ md: 1 }} ml={{ md: 5 }}>
        <Grid container spacing={3}>
          <Grid
            item
            xs={4}
            md={2}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar
              sx={{
                width: { xs: 100, md: 120 },
                height: { xs: 100, md: 120 },
                boxShadow: '0px 0px 2px 0px',
                border: '6px solid white',
              }}
              src={`/images/logo.png`}
            />
            <Typography
              variant='h5'
              fontWeight={'bold'}
              sx={{
                fontSize: { xs: 'body2.fontSize', md: 'body1.fontSize' },
                mt: 1,
              }}
            >
              Online Shop
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <CustomizedTables />
    </>
  );
}

export default ShopInfo;

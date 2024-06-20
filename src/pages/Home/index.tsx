import { Avatar, Paper, Stack, Typography, Grid } from '@mui/material';

const DashboardItem = ({
  title,
  count,
  icon,
}: {
  title: string;
  count: number;
  icon?: string;
}) => {
  return (
    <Paper elevation={0} sx={{ p: 2 }}>
      <Stack direction='row' justifyContent='space-between' alignItems='center'>
        <Stack>
          <Typography
            gutterBottom
            sx={{
              fontSize: ['body2.fontSize', 'body2.fontSize', 'body1.fontSize'],
            }}
          >
            {title}
          </Typography>
          {icon ? (
            <Avatar
              variant='square'
              src={icon}
              sx={{ width: [30, 30, 40], height: 'auto', aspectRatio: '1/1' }}
            />
          ) : (
            <Typography fontWeight='bold' variant='h6'>
              {count}
            </Typography>
          )}
        </Stack>
        {icon && (
          <Typography fontWeight='bold' variant='h6'>
            {count}
          </Typography>
        )}
      </Stack>
    </Paper>
  );
};

const Home = () => {
  return (
    <Grid container spacing={2} sx={{ p: [2, 2, 3] }}>
      <Grid item xs={12} md={7}>
        <Paper variant='outlined' sx={{ p: 2, bgcolor: 'common.white' }}>
          <Typography
            variant='h6'
            fontWeight='bold'
            gutterBottom
            sx={{
              fontSize: ['body1.fontSize', 'body1.fontSize', 'h6.fontSize'],
            }}
          >
            Weekly Performance
          </Typography>
          <Grid container spacing={2} mb={2}>
            <Grid item xs={6}>
              <DashboardItem
                {...{
                  title: 'Orders',
                  count: 0,
                  icon: '/images/dashboard-icons/box.svg',
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <DashboardItem
                {...{
                  title: 'Orders',
                  count: 0,
                  icon: '/images/dashboard-icons/hash2.svg',
                }}
              />
            </Grid>
          </Grid>
          <DashboardItem
            {...{
              title: 'Orders',
              count: 0,
              icon: '/images/dashboard-icons/trending-up2.svg',
            }}
          />
        </Paper>
      </Grid>
      <Grid item xs={12} md={5}>
        <Paper variant='outlined' sx={{ p: 2, bgcolor: 'common.white' }}>
          <Typography
            variant='h6'
            fontWeight='bold'
            gutterBottom
            sx={{
              fontSize: ['body1.fontSize', 'body1.fontSize', 'h6.fontSize'],
            }}
          >
            Active Orders
          </Typography>
          <Typography color='primary' fontWeight='bold' variant='h6' mb={1.5}>
            0
          </Typography>

          <Grid container spacing={2}>
            {['Pending', 'Confirm', 'Delivering'].map((status, i) => (
              <Grid key={i} item xs={4}>
                <DashboardItem
                  {...{
                    title: status,
                    count: 0,
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};
export default Home;

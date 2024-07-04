import { Box, Grid, Typography } from '@mui/material';

interface Ipayment {
  paymentType: string | undefined;
  amount: number | undefined;
  deliveryFee: number | undefined;
  afterDiscount: number | undefined;
  afterDiscountRiel: number | undefined;
  reciept: any;
}

function PaymentMethod(props: Ipayment) {
  return (
    <Grid container mt={2} sx={{ display: 'flex', alignItems: 'center' }}>
      <Grid item xs={7} md={8}>
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          <Typography
            fontWeight={'bold'}
            sx={{
              fontSize: {
                xs: 'body2.fontSize',
                md: 'body1.fontSize',
              },
            }}
          >
            Payment method:
          </Typography>
          {/* <Typography
            sx={{
              fontSize: {
                xs: 'body2.fontSize',
                md: 'body1.fontSize',
              },
              ml: 0.5,
            }}
          >
            {props.paymentType === 'online'
              ? 'Online'
              : props.paymentType === 'cash' && 'Cash'}
          </Typography> */}
        </Box>
      </Grid>
      {/* <Grid
        item
        xs={5}
        md={4}
        sx={{ display: 'flex', justifyContent: 'flex-end' }}
      >
        {props.paymentType === 'online' && (
          <Button
            variant='outlined'
            onClick={() => setOpen(true)}
            sx={{
              fontSize: {
                xs: 'body2.fontSize',
                md: 'body1.fontSize',
              },
            }}
          >
            View Reciept
          </Button>
        )}
        <VeiwReciept
          open={open}
          onClose={() => setOpen(false)}
          receipt={props.reciept}
        />
      </Grid> */}

      <Grid item xs={7} md={8}></Grid>
      <Grid item xs={5} md={4} mt={3}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'end',
            mb: 4,
          }}
        >
          {/* <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'end',
            mb: 4,
          }}
        >
          <Typography
            sx={{
              mb: 1,
              fontSize: {
                xs: 'body2.fontSize',
                md: 'body1.fontSize',
              },
            }}
          >
            Subtotal: {`${props.amount && props.amount.toFixed(2)}$`}
          </Typography> */}
          {/* <Typography
            sx={{
              mb: 1,
              fontSize: {
                xs: 'body2.fontSize',
                md: 'body1.fontSize',
              },
            }}
          >
            Delivery Fee: {`${deliveryFee}$`}
          </Typography> */}
          {/* <Typography
            sx={{
              mb: 1,
              fontSize: {
                xs: 'body2.fontSize',
                md: 'body1.fontSize',
              },
            }}
          >
            Discount:{' '}
            {`${
              props.afterDiscount &&
              props.amount &&
              (props.amount - props.afterDiscount).toFixed(2)
            }$`}
          </Typography>
          <Divider
            flexItem
            sx={{
              mb: 3,
              fontSize: {
                xs: 'body2.fontSize',
                md: 'body1.fontSize',
              },
            }}
          /> */}
          Button
          <Typography
            fontWeight={'bold'}
            sx={{
              fontSize: {
                xs: 'body2.fontSize',
                md: 'body1.fontSize',
              },
            }}
          >
            Total: {`${props.amount && +props.amount.toFixed(2)}$`}
          </Typography>
          <Typography
            fontWeight={'bold'}
            sx={{
              fontSize: {
                xs: 'body2.fontSize',
                md: 'body1.fontSize',
              },
            }}
          >
            KHR: {`${props.amount && +props.amount.toFixed(2) * 4000}`}
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
}

export default PaymentMethod;

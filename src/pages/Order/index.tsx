import { useJsApiLoader } from '@react-google-maps/api';
import ErrorResponse from 'ErrorRespone';
import { useRequest } from 'ahooks';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { RangePicker } from 'react-trip-date';

import {
  CircularProgress,
  Dialog,
  DialogContent,
  Fade,
  Paper,
  Typography,
  useMediaQuery,
} from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { CalendarIcon } from '@mui/x-date-pickers';

import ORDER from 'api/Order';

import { StyledTab, StyledTabs, TabPanel } from 'components/CusMuiComp/CusTabs';
import ErrDialog, { IErrDialogRef } from 'components/Dialog/ErrDialog';
import FullScreenDialog from 'components/Dialog/FullDialog';

import theme from 'themes';

import NodataMessageHistory from './OrderDetail/MessageComponent/NodataMessageHistory';
import ListOrder from './OrderDetail/Order/ListOrder/ListOrder';
import StepButton from './OrderDetail/Order/StepButton';
import TrackingPage from './OrderDetail/Order/Tracking/TrackingPage';
import OrderPage from './OrderDetail/Order/pageOrder';
import DataHistory from './OrderSumary/History';

const activeOrderStatus = [
  { label: 'Pending', value: 'pending' },
  { label: 'Delivering', value: 'processing' },
  { label: 'Confirmed', value: 'completed' },
];
const historyOrderStatus = [
  { label: 'All', value: '' },
  { label: 'Completed', value: 'completed' },
  { label: 'Cancelled', value: 'cancelled' },
];
export interface ISearchRef {
  reset: () => void;
}
export const defaultCoord = { lat: 11.5752041, lng: 104.9000041 };
const libraries: ('places' | 'visualization' | 'drawing' | 'geometry')[] = [
  'places',
  'visualization',
];
const Order = () => {
  const [orderId, setId] = useState('');
  const [open, setOpen] = useState(false);
  const [pickData, setPickDate] = useState(false);
  const [activeTab, setActiveTab] = React.useState(0);
  const [active, setActive] = React.useState(0);
  const [history, setHistory] = useState(0);
  const errRef = useRef<IErrDialogRef>(null);
  const [activeOrder, setActiveOrder] = React.useState('activeOrder');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [mapCenter, setMapCenter] = useState<ICoord>(defaultCoord);
  const [address, setAddress] = useState<string>();
  const searchRef = useRef<ISearchRef>(null);
  const [location, setLocation] = useState<string>('');
  const mediumDown = useMediaQuery(theme.breakpoints.down('md'));
  const currentDate = new Date().toISOString().split('T')[0];
  const [order, setOrder] = React.useState<string>('order');
  const orderStatus = activeOrderStatus[active].value;
  const ordreHistoryStatus = historyOrderStatus[active].value;
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyAvQvanOfyr5a0qtcDmWrvtE3uFWRqt_lw',
    libraries,
  });
  const {
    data,
    loading: listDetailLoading,
    refresh: refDetail,
    error: errListDetail,
  } = useRequest(() => ORDER.getOrderInfo(`${orderId}`), {
    manual: true,
    ready: orderId !== '',
    onSuccess: (data) => {
      console.log('orderDetail:');
    },
    onError: () => {
      errRef.current?.open('Error Occured');
    },
  });
  const handleClose = () => {
    setPickDate(false);
    refDetail();
  };
  useEffect(() => {
    if (startDate && endDate) {
      setPickDate(false);
    }
    if (startDate === '' && endDate === '') {
      setStartDate(currentDate);
      setEndDate(currentDate);
    }
  }, [startDate, endDate, currentDate]);
  useEffect(() => {
    setOrder('order');
  }, [orderId]);
  const {
    data: listOrder,
    refresh: refreshListOrder,
    error: errListorder,
    loading: loadingListOrder,
  } = useRequest(() => ORDER.getListOrder(orderStatus), {
    onSuccess: (data) => {
      console.log('dataListOrder', data);
    },
    onError: () => {
      errRef.current?.open('Error Occured');
    },
    refreshDeps: [orderStatus],
  });

  const {
    data: listHistory,
    loading: loadListHistory,
    error: errListHistory,
    refresh: refreshListHistory,
  } = useRequest(
    () => ORDER.getListHistoryOrder(ordreHistoryStatus, startDate, endDate),
    {
      onSuccess: (data) => {
        setPickDate(false);
        console.log('history', data);
      },
      onError: (err) => {
        errRef.current?.open('Error Occured');
      },
      refreshDeps: [startDate, endDate, orderStatus],
    },
  );
  const { data: dataHistory, loading: loadingBystatus } = useRequest(
    () => ORDER.SummaryOrder(startDate, endDate),
    {
      onSuccess: (data) => {
        setPickDate(false);
        console.log('summ', data);
      },
      onError: (err) => {
        errRef.current?.open('Error Occured');
      },

      refreshDeps: [startDate, endDate],
    },
  );
  useEffect(() => {
    if (orderId !== '') {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [orderId]);

  const handleMapChange = (coord: ICoord) => {
    setMapCenter(coord);
    var geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: coord }, (results, status) => {
      if (status !== window.google.maps.GeocoderStatus.OK) {
        alert(status);
      }
      if (status === window.google.maps.GeocoderStatus.OK) {
        if (results) {
          setAddress(results[0].formatted_address);
          searchRef.current?.reset();
        }
      }
    });
  };
  if (!isLoaded) {
    return null;
  }
  return (
    <Paper
      elevation={0}
      variant={mediumDown ? 'elevation' : 'outlined'}
      sx={{
        mb: { xs: 10, md: 0 },
        m: { md: 3, xs: 0 },
        background: theme.palette.background.default,
        overflow: 'hidden',
      }}
    >
      <ErrDialog ref={errRef} />
      <Grid
        container
        sx={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline' }}
      >
        <Grid
          item
          sx={{
            borderRight: {
              md: `1px solid ${theme.palette.divider}`,
              xs: 'none',
            },
          }}
          xs={12}
          md={5}
        >
          <AppBar
            position='static'
            elevation={0}
            sx={{
              background: (theme) => theme.palette.background.default,
            }}
          >
            <StyledTabs
              value={activeTab}
              onChange={(e, n) => {
                setActiveTab(+n);
              }}
              sx={{
                p: 0,

                borderBottom: 'none',
              }}
              TabIndicatorProps={{
                style: {
                  display: 'none',
                },
              }}
              textColor='secondary'
            >
              <StyledTab
                label='Active Order'
                sx={{
                  minWidth: 0,
                  ':hover': {
                    backgroundColor: (theme) => theme.palette.grey['300'],
                  },
                  ':focus': {
                    color: 'black',
                  },
                }}
                onClick={() => {
                  setActiveOrder('activeOrder');
                  // setOrder('');
                  setId('');
                }}
              />
              <StyledTab
                label='History'
                sx={{
                  minWidth: 0,
                  ':hover': {
                    backgroundColor: (theme) => theme.palette.grey['300'],
                  },
                  ':focus': {
                    color: 'black',
                  },
                }}
                onClick={() => {
                  setActiveOrder('history');
                  setId('');
                }}
              />
            </StyledTabs>
          </AppBar>
          <Box>
            {activeOrder === 'activeOrder' ? (
              <>
                <Box>
                  <AppBar
                    position='static'
                    elevation={0}
                    sx={{
                      background: (theme) => theme.palette.background.default,
                    }}
                  >
                    <>
                      <StyledTabs
                        value={active}
                        onChange={(e, n) => {
                          setActive(+n);
                        }}
                        sx={{ p: 0 }}
                      >
                        {activeOrderStatus.map((el, index) => {
                          return (
                            <StyledTab
                              onClick={() => {
                                setId('');
                              }}
                              key={el.value}
                              label={el.label}
                              sx={{ minWidth: 0 }}
                            />
                          );
                        })}
                      </StyledTabs>
                    </>
                  </AppBar>
                </Box>

                <TabPanel value={active} index={active}>
                  <Box
                    id='container-scroll'
                    sx={{
                      overflow: 'scroll',
                      height: 'calc(100vh - 270px)',
                      overflowX: 'hidden',
                      '::-webkit-scrollbar': { display: 'none' },
                    }}
                  >
                    {loadingListOrder ? (
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'center',
                          py: 3,
                          height: 'calc(100vh - 270px)',
                        }}
                      >
                        <CircularProgress size={25} />
                      </Box>
                    ) : errListorder ? (
                      <ErrorResponse
                        message={
                          errListorder.message ||
                          errListorder.error ||
                          errListorder.error_description
                        }
                        typographyProps={{ textAlign: 'center' }}
                        buttonAction={refreshListOrder}
                        height='calc(100vh - 270px)'
                      />
                    ) : listOrder?.orders.length === 0 ? (
                      <Box
                        height='calc(100vh - 270px)'
                        display={'flex'}
                        justifyContent={'center'}
                        alignItems={'center'}
                      >
                        {/* <NodataMessage
                            data={curentListOrder.length}
                            height='calc(100vh - 270px)'
                            status={activeOrderStatus[active].label}
                          /> */}
                        <Typography>No Data</Typography>
                      </Box>
                    ) : (
                      listOrder?.orders?.map((el, index) => {
                        return (
                          <ListOrder
                            active={el?._id === orderId || false}
                            setId={setId}
                            date={el.createdAt}
                            amount={el.totalPrice}
                            customerName={el.userName}
                            id={el?._id || ''}
                            key={el?._id || ''}
                            productQty={el.items.length}
                            orderNote={el.notes !== ''}
                          />
                        );
                      })
                    )}
                  </Box>
                </TabPanel>
              </>
            ) : (
              activeOrder === 'history' && (
                <TabPanel value={active} index={active}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      p: 2,
                    }}
                  >
                    <CalendarIcon color='primary' />
                    <Button
                      onClick={() => {
                        setPickDate(true);
                      }}
                      sx={{
                        background: theme.palette.grey['50'],
                        color: theme.palette.secondary.main,
                        ml: { xs: 1, md: 1 },
                        ':hover': { background: theme.palette.grey['300'] },
                      }}
                    >
                      {moment(startDate).format('DD MMM YYYY')} -{' '}
                      {moment(endDate).format('DD MMM YYYY')}
                    </Button>
                    {pickData === true && (
                      <>
                        <Dialog
                          open={pickData}
                          onClose={handleClose}
                          fullWidth
                          maxWidth={'lg'}
                        >
                          <DialogContent sx={{ pt: 0, px: 0 }}>
                            <RangePicker
                              disabledAfterDate={currentDate}
                              autoResponsive={true}
                              numberOfMonths={3}
                              onChange={(e) => {
                                setEndDate(e.to);
                                setStartDate(e.from);
                              }}
                              theme={theme.palette}
                            />
                          </DialogContent>
                        </Dialog>
                      </>
                    )}
                  </Box>
                  <DataHistory
                    orderNum={dataHistory?.totalOrders}
                    Totalearn={dataHistory?.totalEarnings}
                    TotalSold={dataHistory?.completedOrders}
                    loading={loadingBystatus}
                  />
                  <Box>
                    <AppBar
                      position='static'
                      elevation={0}
                      sx={{
                        background: (theme) => theme.palette.background.default,
                        borderTopRightRadius: '10px',
                        borderTopLeftRadius: '10px',
                      }}
                    >
                      <>
                        <StyledTabs
                          value={history}
                          onChange={(e, n) => {
                            setHistory(+n);
                            setId('');
                            setActive(+n);
                          }}
                        >
                          {historyOrderStatus.map((el, index) => {
                            return (
                              <StyledTab
                                sx={{ minWidth: 0 }}
                                label={el.label}
                                key={el.value}
                                onClick={() => {}}
                              />
                            );
                          })}
                        </StyledTabs>
                      </>
                    </AppBar>
                  </Box>
                  <Box
                    id='container-scroll'
                    sx={{
                      overflow: 'scroll',
                      height: 'calc(100vh - 450px)',
                      overflowX: 'hidden',
                      '::-webkit-scrollbar': { display: 'none' },
                    }}
                  >
                    {loadListHistory ? (
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'center',
                          py: 3,
                          height: 'calc(100vh - 450px)',
                        }}
                      >
                        <CircularProgress size={16} />
                      </Box>
                    ) : listHistory?.orders.length === 0 ? (
                      <Box>
                        <NodataMessageHistory
                          data={1}
                          height='calc(100vh - 450px)'
                          status={historyOrderStatus[history].value}
                        />
                      </Box>
                    ) : errListHistory ? (
                      <ErrorResponse
                        message={
                          errListHistory.message ||
                          errListHistory.error ||
                          errListHistory.error_description
                        }
                        typographyProps={{ textAlign: 'center' }}
                        buttonAction={refreshListHistory}
                        height='calc(100vh - 450px)'
                      />
                    ) : (
                      listHistory?.orders.map((el) => {
                        return (
                          <ListOrder
                            active={el?._id === orderId || false}
                            setId={setId}
                            date={el.createdAt}
                            amount={el.totalPrice}
                            customerName={el.userName}
                            id={el?._id || ''}
                            key={el?._id || ''}
                            productQty={el.items.length}
                            orderNote={el.notes !== ''}
                          />
                        );
                      })
                    )}
                  </Box>
                </TabPanel>
              )
            )}
          </Box>
        </Grid>

        <Grid item xs={0} md={7}>
          <Box sx={{ display: { md: 'block', xs: 'none' } }}>
            {/* {listDetailLoading ? (
              <Stack
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div></div>
              </Stack>
            ) : (
              orderId !== -1 &&
              !errListDetail && (
                <Box>
                  <Fade in={orderId !== -1 ? true : false} timeout={500}>
                    <Box>
                      <StepButton
                        order={order}
                        setOrder={setOrder}
                        orderNote={data?.orderNotes}
                        detailId={orderId}
                      />
                    </Box>
                  </Fade>
                </Box>
              )
            )} */}

            {order === 'order' && orderId !== '' ? (
              <Box>
                <Fade in={orderId !== '' ? true : false} timeout={500}>
                  <Box>
                    <OrderPage
                      currentAdd={address || ''}
                      setAddress={setAddress}
                      centerMap={mapCenter}
                      setCenter={setMapCenter}
                      onChange={handleMapChange}
                      detailId={orderId}
                      refDetail={refDetail}
                      loading={listDetailLoading}
                      status={data?.status}
                      customerName={data?.userName}
                      isFirstOrder={true}
                      customerContact={data?.phoneNumber}
                      zone={''}
                      orderDetails={data}
                      paymentType={''}
                      amount={data?.totalPrice}
                      deliveryFee={1}
                      afterDiscount={1}
                      afterDiscountRiel={1}
                      date={data?.createdAt}
                      driverName={data?.userName}
                      driverPhone={data?.phoneNumber}
                      plateNumber={data?.phoneNumber}
                      refreshOrderList={refreshListOrder}
                      setOrder={setOrder}
                      buyerAddressId={data?.userId?._id || ''}
                      reciept={data}
                      setId={setId}
                      location={location}
                      setLoction={setLocation}
                      errListDetail={errListDetail}
                    />
                  </Box>
                </Fade>
              </Box>
            ) : order === 'note' && orderId !== '' ? (
              // <NotePage
              //   detailId={orderId}
              //   status={data?.status}
              //   orderNote={data?.orderNotes}
              //   shopName={selectedShop?.name}
              //   logo={selectedShop?.logo}
              //   date={data?.createdAt}
              //   refDetail={refDetail}
              //   mark={data?.note}
              // />
              <></>
            ) : order === 'track' && orderId !== '' ? (
              <TrackingPage
                detailId={orderId}
                status={data?.status}
                date={data?.createdAt}
                orderTracking={[]}
              />
            ) : null}
          </Box>

          <Box>
            <FullScreenDialog
              open={open}
              handleClose={() => setOpen(false)}
              children={
                <>
                  {orderId !== '' && (
                    <StepButton
                      order={order}
                      setOrder={setOrder}
                      orderNote={[]}
                      detailId={orderId}
                    />
                  )}
                  {order === 'order' && orderId !== '' ? (
                    <OrderPage
                      currentAdd={address || ''}
                      setAddress={setAddress}
                      centerMap={mapCenter}
                      setCenter={setMapCenter}
                      onChange={handleMapChange}
                      detailId={orderId}
                      refDetail={refDetail}
                      loading={listDetailLoading}
                      status={data?.status}
                      customerName={data?.userName}
                      isFirstOrder={data?._id !== ''}
                      customerContact={data?.phoneNumber}
                      zone={''}
                      orderDetails={data}
                      paymentType={''}
                      amount={data?.totalPrice}
                      deliveryFee={1}
                      afterDiscount={1}
                      afterDiscountRiel={1}
                      date={data?.createdAt}
                      driverName={data?.userName}
                      driverPhone={data?.phoneNumber}
                      plateNumber={data?.phoneNumber}
                      refreshOrderList={refreshListOrder}
                      setOrder={setOrder}
                      buyerAddressId={data?.userId?._id || ''}
                      reciept={data}
                      setId={setId}
                      location={location}
                      setLoction={setLocation}
                      errListDetail={errListDetail}
                    />
                  ) : order === 'note' ? (
                    // <NotePage
                    //   detailId={orderId}
                    //   status={data?.status}
                    //   orderNote={data?.orderNotes}
                    //   shopName={selectedShop?.name}
                    //   logo={selectedShop?.logo}
                    //   date={data?.createdAt}
                    //   refDetail={refDetail}
                    //   mark={data?.note}
                    // />
                    <></>
                  ) : order === 'track' ? (
                    <TrackingPage
                      detailId={orderId}
                      status={data?.status}
                      date={data?.createdAt}
                      orderTracking={[]}
                    />
                  ) : null}
                </>
              }
            />
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};
export default Order;

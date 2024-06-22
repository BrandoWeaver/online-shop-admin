import { useJsApiLoader } from '@react-google-maps/api';
import ErrorResponse from 'ErrorRespone';
import { useRequest } from 'ahooks';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { RangePicker } from 'react-trip-date';

import {
  CircularProgress,
  Dialog,
  DialogContent,
  Fade,
  Paper,
  Stack,
  useMediaQuery,
} from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { CalendarIcon } from '@mui/x-date-pickers';

import { AuthContext } from 'contexts/AuthContext';

import ORDER from 'api/Order';

import { StyledTab, StyledTabs, TabPanel } from 'components/CusMuiComp/CusTabs';
import ErrDialog, { IErrDialogRef } from 'components/Dialog/ErrDialog';
import FullScreenDialog from 'components/Dialog/FullDialog';

import theme from 'themes';

import NodataMessage from './OrderDetail/MessageComponent/NodataMessageActive';
import NodataMessageHistory from './OrderDetail/MessageComponent/NodataMessageHistory';
import ListOrder from './OrderDetail/Order/ListOrder/ListOrder';
import NotePage from './OrderDetail/Order/Note/notePage';
import StepButton from './OrderDetail/Order/StepButton';
import TrackingPage from './OrderDetail/Order/Tracking/TrackingPage';
import OrderPage from './OrderDetail/Order/pageOrder';
import DataHistory from './OrderSumary/History';

const activeOrderStatus = [
  { label: 'Pending', value: 'pending' },
  { label: 'Delivering', value: 'delivering,delivering_province' },
  { label: 'Confirmed', value: 'confirmed' },
];

const historyOrderStatus = [
  { label: 'All', value: 'completed,cancelled' },
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
  const { selectedShop } = React.useContext(AuthContext);
  const [orderId, setId] = useState<number>(-1);
  const [open, setOpen] = useState(false);
  const [pickData, setPickDate] = useState(false);
  const [activeTab, setActiveTab] = React.useState(0);
  const [active, setActive] = React.useState(0);
  const [history, setHistory] = useState(0);
  const errRef = useRef<IErrDialogRef>(null);
  const [activeOrder, setActiveOrder] = React.useState('activeOrder');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [page, setPage] = useState(0);
  const [mapCenter, setMapCenter] = useState<ICoord>(defaultCoord);
  const [address, setAddress] = useState<string>();
  const searchRef = useRef<ISearchRef>(null);
  const [curentItem, setCurentItem] = useState<number>();
  const [curentListOrder, setcurentListOrder] = useState<Iorder.Datum[]>([]);
  const [location, setLocation] = useState<string>('');
  const mediumDown = useMediaQuery(theme.breakpoints.down('md'));
  const currentDate = new Date().toISOString().split('T')[0];
  const [order, setOrder] = React.useState<string>('order');
  const orderStatus = activeOrderStatus[active].value;
  const historyStatus = historyOrderStatus[history].value;
  const [curentItemHistory, setCurentItemHistory] = useState<number>();
  const [curentListOrderHistory, setcurentListOrderHistory] = useState<
    Iorder.Datum[]
  >([]);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyAvQvanOfyr5a0qtcDmWrvtE3uFWRqt_lw',
    libraries,
  });
  const {
    data,
    loading: listDetailLoading,
    refresh: refDetail,
    error: errListDetail,
  } = useRequest(
    () => ORDER.getOrderInfo(`${selectedShop?.id}`, `${orderId}`),
    {
      ready: orderId !== -1 ? true : false,
      refreshDeps: [orderId, selectedShop?.id],
    },
  );
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
  } = useRequest(
    () =>
      ORDER.getListOrder(`${selectedShop?.id}`, page, orderStatus, 'active'),
    {
      onSuccess: (data) => {
        setCurentItem(data.pagination.page);
        if (page > 0) {
          setcurentListOrder(curentListOrder.concat(data.data));
        } else {
          setcurentListOrder(data.data);
        }
      },
      ready: selectedShop?.id ? true : false,
      refreshDeps: [selectedShop?.id, active, page],
    },
  );
  useEffect(() => {
    setPage(0);
  }, [active]);

  const {
    data: listHistory,
    loading: loadListHistory,
    error: errListHistory,
    refresh: refreshListHistory,
  } = useRequest(
    () =>
      ORDER.getListHistoryOrder(
        `${selectedShop?.id}`,
        page,
        historyStatus,
        'history',
        startDate,
        endDate,
      ),
    {
      onSuccess: (data) => {
        setPickDate(false);
        setCurentItemHistory(data.pagination.page);
        if (page > 0) {
          setcurentListOrderHistory(curentListOrderHistory.concat(data.data));
        } else {
          setcurentListOrderHistory(data.data);
        }
      },
      onError: (err) => {},
      ready: startDate && endDate && activeOrder === 'history' ? true : false,
      refreshDeps: [selectedShop?.id, history, startDate, endDate, page],
    },
  );
  const { data: dataHistory, loading: loadingBystatus } = useRequest(
    () =>
      ORDER.getOrderSummary(
        `${selectedShop?.id}`,
        startDate,
        endDate,
        historyStatus,
      ),
    {
      onSuccess: () => {
        setPickDate(false);
      },
      onError: (e) => {
        errRef.current?.open(e);
      },
      ready: startDate && endDate && activeOrder === 'history' ? true : false,
      refreshDeps: [selectedShop?.id, history, startDate, endDate],
    },
  );
  useEffect(() => {
    if (orderId !== -1) {
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
                  setId(-1);
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
                  setId(-1);
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
                                setId(-1);
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
                    <InfiniteScroll
                      scrollableTarget={'container-scroll'}
                      loader={
                        <Stack
                          sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            py: 3,
                          }}
                        >
                          <CircularProgress size={25} />
                        </Stack>
                      }
                      hasMore={
                        listOrder &&
                        curentItem &&
                        curentItem < listOrder?.pagination.totalPage
                          ? true
                          : false
                      }
                      dataLength={curentListOrder.length}
                      next={() => {
                        setPage((prev) => prev + 1);
                      }}
                    >
                      {loadingListOrder && !listOrder ? (
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
                      ) : curentListOrder.length === 0 ? (
                        <Box>
                          <NodataMessage
                            data={curentListOrder.length}
                            height='calc(100vh - 270px)'
                            status={activeOrderStatus[active].value}
                          />
                        </Box>
                      ) : (
                        curentListOrder?.map((el, index) => {
                          return (
                            <ListOrder
                              active={el.id === orderId}
                              setId={setId}
                              date={el.createdAt}
                              amount={el.afterDiscount}
                              customerName={el.customerName}
                              id={el.id}
                              key={el.id}
                              productQty={el.totalQty}
                              orderNote={el.orderNotes.length !== 0}
                            />
                          );
                        })
                      )}
                    </InfiniteScroll>
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
                    orderNum={dataHistory?.totalOrder}
                    Totalearn={dataHistory?.totalAmount}
                    TotalSold={dataHistory?.totalProduct}
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
                            setId(-1);
                          }}
                        >
                          {historyOrderStatus.map((el, index) => {
                            return (
                              <StyledTab
                                sx={{ minWidth: 0 }}
                                label={el.label}
                                key={el.value}
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
                    <InfiniteScroll
                      scrollableTarget={'container-scroll'}
                      loader={
                        <Stack
                          sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            py: 3,
                          }}
                        >
                          <CircularProgress size={25} />
                        </Stack>
                      }
                      hasMore={
                        listHistory &&
                        curentItemHistory &&
                        curentItemHistory < listHistory?.pagination.totalPage
                          ? true
                          : false
                      }
                      dataLength={curentListOrderHistory.length}
                      next={() => {
                        setPage((prev) => prev + 1);
                      }}
                    >
                      {loadListHistory && !listHistory ? (
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
                      ) : listHistory?.data.length === 0 ? (
                        <Box>
                          <NodataMessageHistory
                            data={listHistory?.data.length}
                            height='calc(100vh - 450px)'
                            status={historyOrderStatus[history].value}
                          />
                        </Box>
                      ) : (
                        curentListOrderHistory.map((el) => {
                          return (
                            <ListOrder
                              active={el.id === orderId}
                              setId={setId}
                              date={el.createdAt}
                              amount={el.afterDiscount}
                              customerName={el.customerName}
                              id={el.id}
                              key={el.id}
                              productQty={el.totalQty}
                              orderNote={el.orderNotes.length !== 0}
                            />
                          );
                        })
                      )}
                    </InfiniteScroll>
                  </Box>
                </TabPanel>
              )
            )}
          </Box>
        </Grid>

        <Grid item xs={0} md={7}>
          <Box sx={{ display: { md: 'block', xs: 'none' } }}>
            {listDetailLoading ? (
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
            )}
            {order === 'order' && orderId !== -1 ? (
              <Box>
                <Fade in={orderId !== -1 ? true : false} timeout={500}>
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
                      customerName={data?.customerName}
                      isFirstOrder={data?.isFirstOrder}
                      customerContact={data?.customerContact}
                      zone={data?.zone}
                      orderDetails={data?.orderDetails}
                      paymentType={data?.paymentType}
                      amount={data?.amount}
                      deliveryFee={data?.deliveryFee}
                      afterDiscount={data?.afterDiscount}
                      afterDiscountRiel={data?.afterDiscountRiel}
                      date={data?.createdAt}
                      driverName={data?.driverName}
                      driverPhone={data?.driverPhone}
                      plateNumber={data?.plateNumber}
                      refreshOrderList={refreshListOrder}
                      setOrder={setOrder}
                      buyerAddressId={data?.buyerAddressId}
                      reciept={data?.paymentReceipt}
                      setId={setId}
                      location={location}
                      setLoction={setLocation}
                      errListDetail={errListDetail}
                    />
                  </Box>
                </Fade>
              </Box>
            ) : order === 'note' && orderId !== -1 ? (
              <NotePage
                detailId={orderId}
                status={data?.status}
                orderNote={data?.orderNotes}
                shopName={selectedShop?.name}
                logo={selectedShop?.logo}
                date={data?.createdAt}
                refDetail={refDetail}
                mark={data?.note}
              />
            ) : order === 'track' && orderId !== -1 ? (
              <TrackingPage
                detailId={orderId}
                status={data?.status}
                date={data?.createdAt}
                orderTracking={data?.orderTrackings || []}
              />
            ) : null}
          </Box>

          <Box>
            <FullScreenDialog
              open={open}
              handleClose={() => setOpen(false)}
              children={
                <>
                  {orderId !== -1 && (
                    <StepButton
                      order={order}
                      setOrder={setOrder}
                      orderNote={data?.orderNotes}
                      detailId={orderId}
                    />
                  )}
                  {order === 'order' && orderId !== -1 ? (
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
                      customerName={data?.customerName}
                      isFirstOrder={data?.isFirstOrder}
                      customerContact={data?.customerContact}
                      zone={data?.zone}
                      orderDetails={data?.orderDetails}
                      paymentType={data?.paymentType}
                      amount={data?.amount}
                      deliveryFee={data?.deliveryFee}
                      afterDiscount={data?.afterDiscount}
                      afterDiscountRiel={data?.afterDiscountRiel}
                      date={data?.createdAt}
                      driverName={data?.driverName}
                      driverPhone={data?.driverPhone}
                      plateNumber={data?.plateNumber}
                      refreshOrderList={refreshListOrder}
                      setOrder={setOrder}
                      buyerAddressId={data?.buyerAddressId}
                      reciept={data?.paymentReceipt}
                      setId={setId}
                      location={location}
                      setLoction={setLocation}
                      errListDetail={errListDetail}
                    />
                  ) : order === 'note' ? (
                    <NotePage
                      detailId={orderId}
                      status={data?.status}
                      orderNote={data?.orderNotes}
                      shopName={selectedShop?.name}
                      logo={selectedShop?.logo}
                      date={data?.createdAt}
                      refDetail={refDetail}
                      mark={data?.note}
                    />
                  ) : order === 'track' ? (
                    <TrackingPage
                      detailId={orderId}
                      status={data?.status}
                      date={data?.createdAt}
                      orderTracking={data?.orderTrackings || []}
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

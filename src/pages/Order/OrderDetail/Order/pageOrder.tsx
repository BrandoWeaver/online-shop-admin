import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import ErrorResponse from 'ErrorRespone';
import { useRequest } from 'ahooks';
import React, { useCallback, useRef, useState } from 'react';

import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import { Paper } from '@mui/material';

import ORDER from 'api/Order';

import { IErrDialogRef } from 'components/Dialog/ErrDialog';
import ErrDialog from 'components/Dialog/ErrDialog';

import HttpUtil from 'utils/http-util';
import { ROUTE_API } from 'utils/route-util';

import theme from 'themes';

import ConfrimBtn from './BtnBystatus/ConfirmBtn';
import PendingBtn from './BtnBystatus/PendingBtn';
import ReviewBtn from './BtnBystatus/ReviewBtn';
import Customer from './Customer/Customer';
import { SelectLocation } from './DeliveryLocation/SaveLocation';
import SelectMap from './DeliveryLocation/SelectMap';
import DialogCancel from './Dialog/DialogCancel';
import DialogLocation from './Dialog/DialogLocation';
import Driver from './Driver/Driver';
import TopCom from './OrderID';
import PaymentMethod from './Payment/Payment';
import ShopingBage from './ShoppingBage/ShopingBage';

interface Iorder {
  orderDetails: any;
  detailId?: string;
  refDetail: () => void;
  loading: boolean;
  status: string | undefined;
  customerName: string | undefined;
  isFirstOrder: boolean | undefined;
  customerContact: string | undefined;
  zone: string | undefined;
  paymentType: string | undefined;
  amount: number | undefined;
  deliveryFee: number | undefined;
  afterDiscount: number | undefined;
  afterDiscountRiel: number | undefined;
  date: string | undefined;
  driverName: string | undefined;
  driverPhone: string | undefined;
  plateNumber: string | undefined;
  onChange: (data: google.maps.LatLngLiteral) => void;
  currentAdd: string;
  centerMap: ICoord;
  setCenter: React.Dispatch<React.SetStateAction<ICoord>>;
  setAddress: React.Dispatch<React.SetStateAction<string | undefined>>;
  refreshOrderList: () => void;
  setOrder: React.Dispatch<React.SetStateAction<string>>;
  buyerAddressId: string | undefined;
  reciept: any;
  // setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setId: React.Dispatch<React.SetStateAction<string>>;
  location: string;
  setLoction: React.Dispatch<React.SetStateAction<string>>;
  errListDetail: Error | undefined;
}
export const defaultCoord = { lat: 11.5752538, lng: 104.9000484 };
const libraries: ('places' | 'visualization' | 'drawing' | 'geometry')[] = [
  'places',
  'visualization',
];
const containerStyle = {
  width: '100%',
  height: '400px',
};
function OrderPage(props: Iorder) {
  const errRef = useRef<IErrDialogRef>(null);
  // const { selectedShop } = React.useContext(AuthContext);
  const [editId, setEditId] = useState<number | ''>();
  const [selectMap, setSelectMap] = useState(true);
  const [cancel, setCancel] = useState(false);
  const [open, setOpen] = useState(false);
  // const [rejectOrder, setRejectOrder] = useState(false);
  const [buyerAddressId, setBuyerAddressId] = useState<number>();
  const [openSavedAddr, setOpenSavedAddr] = useState(false);
  const [label, setLabel] = useState<string>('');
  const [edit, setEdit] = useState(false);

  const { run: runDeleteProduct, loading: loadDeleteProduct } = useRequest(
    (data) =>
      HttpUtil.post(
        ROUTE_API.deleteOrderProduct
          .replace(':id', `${1}`)
          .replace(':orderDetailId', data),
      ),
    {
      manual: true,
      onSuccess: () => {
        props.refDetail();
      },
      onError: (e) => {
        errRef.current?.open(e);
      },
    },
  );

  const { run: runUpdateQty } = useRequest(
    (orderDetailId, qty) =>
      HttpUtil.post(ROUTE_API.updateOrderQty.replace(':id', `${1}`), {
        orderDetailId: orderDetailId,
        qty: qty,
      }),
    {
      manual: true,
      onError: (e) => errRef.current?.open(e),
      onSuccess: () => {
        props.refDetail();
        setEditId('');
      },
    },
  );

  const { runAsync: runUpdateOrder } = useRequest(
    (id) => ORDER.updateOrder(`${props.detailId}`, 'proccessing'),
    {
      manual: true,
      onError: (e) => errRef.current?.open(e),
      onSuccess: () => {
        props.refDetail();
        setSelectMap(false);
        setEdit(false);
        props.refreshOrderList();
      },
    },
  );

  const { runAsync: runAddress } = useRequest(
    () =>
      ORDER.runUpdateAdrr(
        `${1}`,
        `${props.customerContact}`,
        props.currentAdd,
        props.location || 'home',
        props.centerMap,
      ),
    {
      manual: true,
      onError: (e) => errRef.current?.open(e),
      onSuccess: (data) => {
        const newIdAddr =
          data?.buyerAddresses?.[data?.buyerAddresses?.length - 1]?.id;
        if (newIdAddr) {
          runUpdateOrder(newIdAddr);
          refreshListAddr();
        }
      },
    },
  );

  const {
    data: listAddress,
    refresh: refreshListAddr,
    loading: loadListAddr,
    error: errListAddr,
  } = useRequest(
    () => ORDER.runListAddress(`${1}`, `${props.customerContact}`),
    {
      ready: props.customerContact ? true : false,
      refreshDeps: [props.customerContact],
    },
  );
  //useCallback use with fn
  const handleSetBuyerAddressId = useCallback(
    (id: number) => setBuyerAddressId(id),
    [],
  );
  const {
    data: orderDetail,
    loading: listDetailLoading,
    refresh: refDetail,
    error: errListDetail,
  } = useRequest(() => ORDER.getOrderInfo(`${props.detailId}`), {
    onSuccess: (data) => {
      console.log('orderDetail:', data);
    },
    refreshDeps: [props.detailId],
    onError: (e) => errRef.current?.open(e),
  });

  return (
    <Box
      sx={{
        p: 3,
        overflow: 'scroll',
        height: { md: 'calc(100vh - 207px)', xs: 'calc(100vh - 50px)' },
        overflowX: 'hidden',
        '::-webkit-scrollbar': { display: 'none' },
      }}
    >
      <Box sx={{ visibility: 'hidden' }}>hdf</Box>
      <ErrDialog ref={errRef} />
      {listDetailLoading ? (
        <Stack
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: 0,
            m: 0,
            height: 'calc(100vh - 300px)',
          }}
        >
          <CircularProgress size={25} />
        </Stack>
      ) : errListDetail ? (
        <>
          <Stack
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div></div>
          </Stack>
          {/* <ErrorResponse
            message={
              errListDetail.message ||
              errListDetail.error ||
              errListDetail.error_description
            }
            typographyProps={{ textAlign: 'center' }}
            buttonAction={props.refDetail}
            height='calc(100vh - 200px)'
          /> */}
        </>
      ) : (
        <Grid container>
          <TopCom
            detailId={props.detailId}
            status={orderDetail?.status}
            date={props.date}
          />
          <Customer
            customerContact={orderDetail?.phoneNumber}
            customerName={orderDetail?.userName}
            zone={'NA'}
          />
          {props.status === 'delivering' ? (
            <Driver
              driverName={props.driverName}
              driverPhone={props.driverPhone}
              plateNumber={props.plateNumber}
            />
          ) : null}

          <Grid item xs={12}>
            <Typography
              fontWeight={'bold'}
              sx={{
                fontSize: {
                  xs: 'body2.fontSize',
                  md: 'body1.fontSize',
                },
              }}
            >
              Delivery Location
            </Typography>
            <Box sx={{ mt: 2 }}>
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={
                  {
                    lat: orderDetail?.lat || -1,
                    lng: orderDetail?.lng || -1,
                  } || defaultCoord
                }
                zoom={17}
                options={{
                  fullscreenControl: false,
                  streetViewControl: false,
                  mapTypeControl: false,
                  zoomControl: false,
                }}

                //   onClick={handleClick}
              >
                <Marker
                  position={
                    {
                      lat: orderDetail?.lat || -1,
                      lng: orderDetail?.lng || -1,
                    } || defaultCoord
                  }
                />
              </GoogleMap>
            </Box>
          </Grid>
          <ShopingBage
            editId={editId}
            setEditId={setEditId}
            runUpdateQty={runUpdateQty}
            runDeleteProduct={runDeleteProduct}
            detailId={props.detailId}
            orderDetails={orderDetail}
            refDetail={props.refDetail}
            listLoading={props.loading}
            loadDeleteProduct={loadDeleteProduct}
          />
          <PaymentMethod
            afterDiscount={props.afterDiscount}
            afterDiscountRiel={props.afterDiscountRiel}
            amount={orderDetail?.totalPrice}
            deliveryFee={props.deliveryFee}
            paymentType={props.paymentType}
            reciept={props.reciept}
          />

          {orderDetail?.status === 'pending' ? (
            <>
              <PendingBtn
                setRejectOrder={setCancel}
                id={props.detailId}
                refreshOrderList={props.refreshOrderList}
                setOrder={props.setOrder}
                refreshListDetail={props.refDetail}
                // setOpen={props.setOpen}
                setId={props.setId}
              />
            </>
          ) : (
            orderDetail?.status === 'processing' && (
              <ConfrimBtn
                id={props.detailId}
                refreshOrderList={props.refreshOrderList}
                setOrder={props.setOrder}
                refreshListDetail={props.refDetail}
                // setOpen={props.setOpen}
                setId={props.setId}
              />
            )
          )}
        </Grid>
      )}
      {/* <DialogReject
        rejectOrder={rejectOrder}
        setRejectOrder={setRejectOrder}
        id={props.detailId}
        refreshOrderList={props.refreshOrderList}
        setOrder={props.setOrder}
        // setOpen={props.setOpen}
        setId={props.setId}
      /> */}
      <DialogCancel
        setOrder={props.setOrder}
        cancel={cancel}
        setCancel={setCancel}
        id={props.detailId}
        refreshOrderList={props.refreshOrderList}
        // setOpen={props.setOpen}
        setId={props.setId}
      />
      {/* <ShopingBage
        editId={editId}
        setEditId={setEditId}
        runUpdateQty={runUpdateQty}
        runDeleteProduct={runDeleteProduct}
        detailId={props.detailId}
        orderDetails={orderDetail?.items}
        refDetail={props.refDetail}
        listLoading={props.loading}
        loadDeleteProduct={loadDeleteProduct}
      /> */}
      {/* {props.status === 'review' ? (
            <ReviewBtn
              setCancel={setCancel}
              id={props.detailId}
              refreshOrderList={props.refreshOrderList}
              setOrder={props.setOrder}
              refreshListDetail={props.refDetail}
              // setOpen={props.setOpen}
              setId={props.setId}
            />
          ) : props.status === 'pending' ? (
            // <PendingBtn
            //   setRejectOrder={setRejectOrder}
            //   id={props.detailId}
            //   refreshOrderList={props.refreshOrderList}
            //   setOrder={props.setOrder}
            //   refreshListDetail={props.refDetail}
            //   // setOpen={props.setOpen}
            //   setId={props.setId}
            // />
            <></>
          ) : (
            props.status === 'confirmed' && (
              <ConfrimBtn
                id={props.detailId}
                refreshOrderList={props.refreshOrderList}
                setOrder={props.setOrder}
                refreshListDetail={props.refDetail}
                // setOpen={props.setOpen}
                setId={props.setId}
              />
            )
          )} */}
    </Box>
  );
}
export default OrderPage;

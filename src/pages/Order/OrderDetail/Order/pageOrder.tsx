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

import { AuthContext } from 'contexts/AuthContext';

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
import DialogReject from './Dialog/DialogReject';
import Driver from './Driver/Driver';
import TopCom from './OrderID';
import PaymentMethod from './Payment/Payment';
import ShopingBage from './ShoppingBage/ShopingBage';

interface Iorder {
  orderDetails: Iorder.OrderDetail[] | undefined;
  detailId?: number;
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
  buyerAddressId: number | undefined;
  reciept: any;
  // setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setId: React.Dispatch<React.SetStateAction<number>>;
  location: string;
  setLoction: React.Dispatch<React.SetStateAction<string>>;
  errListDetail: Error | undefined;
}

function OrderPage(props: Iorder) {
  const errRef = useRef<IErrDialogRef>(null);
  const { selectedShop } = React.useContext(AuthContext);
  const [editId, setEditId] = useState<number | ''>();
  const [selectMap, setSelectMap] = useState(true);
  const [cancel, setCancel] = useState(false);
  const [open, setOpen] = useState(false);
  const [rejectOrder, setRejectOrder] = useState(false);
  const [buyerAddressId, setBuyerAddressId] = useState<number>();
  const [openSavedAddr, setOpenSavedAddr] = useState(false);
  const [label, setLabel] = useState<string>('');
  const [edit, setEdit] = useState(false);

  const { run: runDeleteProduct, loading: loadDeleteProduct } = useRequest(
    (data) =>
      HttpUtil.post(
        ROUTE_API.deleteOrderProduct
          .replace(':id', `${selectedShop?.id}`)
          .replace(':orderDetailId', data),
      ),
    {
      manual: true,
      ready: selectedShop?.id ? true : false,
      refreshDeps: [selectedShop?.id],
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
      HttpUtil.post(
        ROUTE_API.updateOrderQty.replace(':id', `${selectedShop?.id}`),
        {
          orderDetailId: orderDetailId,
          qty: qty,
        },
      ),
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
    (id) =>
      ORDER.updateOrder(
        `${selectedShop?.id}`,
        id || buyerAddressId,
        'Manage Own Delivery',
        props.detailId,
        props.zone,
      ),
    {
      manual: true,
      onError: (e) => errRef.current?.open(e),
      onSuccess: () => {
        props.refDetail();
        setSelectMap(false);
        setEdit(false);
      },
    },
  );

  const { runAsync: runAddress } = useRequest(
    () =>
      ORDER.runUpdateAdrr(
        `${selectedShop?.id}`,
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
    () =>
      ORDER.runListAddress(`${selectedShop?.id}`, `${props.customerContact}`),
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
      <ErrDialog ref={errRef} />
      {props.loading ? (
        <Stack
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: 0,
            m: 0,
            height: 'calc(100vh - 200px)',
          }}
        >
          <CircularProgress size={25} />
        </Stack>
      ) : props.errListDetail ? (
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
          <ErrorResponse
            message={
              props.errListDetail.message ||
              props.errListDetail.error ||
              props.errListDetail.error_description
            }
            typographyProps={{ textAlign: 'center' }}
            buttonAction={props.refDetail}
            height='calc(100vh - 200px)'
          />
        </>
      ) : (
        <Grid container>
          <TopCom
            detailId={props.detailId}
            status={props.status}
            date={props.date}
          />
          <Customer
            customerContact={props.customerContact}
            customerName={props.customerName}
            isFirstOrder={props.isFirstOrder}
            zone={props.zone}
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
          </Grid>

          {!edit ? (
            !props.buyerAddressId ? (
              <>
                <Grid item xs={12} sx={{ mt: 2 }}>
                  <Typography
                    sx={{
                      fontSize: {
                        xs: 'body2.fontSize',
                        md: 'body1.fontSize',
                      },
                    }}
                  >
                    No address selected
                  </Typography>
                </Grid>
                <Grid item xs={5}></Grid>
                <Grid item xs={7}>
                  {listAddress && listAddress?.buyerAddresses.length < 0 ? (
                    <Button
                      onClick={() => {
                        // setNoaddress(true);
                        // setChooseMap(true);
                        setEdit(true);
                        if (
                          listAddress &&
                          listAddress.buyerAddresses.length > 0
                        ) {
                          setOpenSavedAddr(true);
                        }
                      }}
                      sx={{
                        fontSize: {
                          xs: 'body2.fontSize',
                          md: 'body1.fontSize',
                        },
                      }}
                    >
                      Use saved address
                    </Button>
                  ) : (
                    <Button
                      onClick={() => {
                        // setNoaddress(true);
                        // setChooseMap(true);
                        setEdit(true);
                      }}
                      sx={{
                        fontSize: {
                          xs: 'body2.fontSize',
                          md: 'body1.fontSize',
                        },
                      }}
                    >
                      Add new address
                    </Button>
                  )}
                </Grid>
              </>
            ) : (
              <Grid
                container
                component={Paper}
                variant='outlined'
                sx={{
                  p: 2,
                  background: theme.palette.background.default,
                  mt: 1,
                  mb: 2,
                }}
              >
                {errListAddr ? (
                  <Grid
                    item
                    xs={12}
                    sx={{ display: 'flex', justifyContent: 'center' }}
                  >
                    <ErrorResponse
                      message={
                        errListAddr.message ||
                        errListAddr.error ||
                        errListAddr.error_description
                      }
                      typographyProps={{ textAlign: 'center' }}
                      buttonAction={refreshListAddr}
                      height='calc(100vh - 580px)'
                    />
                  </Grid>
                ) : (
                  listAddress?.buyerAddresses.length !== 0 && (
                    <>
                      {loadListAddr ? (
                        <Grid
                          item
                          xs={12}
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'row',
                          }}
                        >
                          <CircularProgress size={25} />
                        </Grid>
                      ) : (
                        listAddress?.buyerAddresses
                          .filter((el) => el.id === props.buyerAddressId)
                          .map((task) => {
                            // console.log("Task", task.id);
                            return (
                              <Grid container key={task.id}>
                                <Grid item xs={10} md={11}>
                                  <SelectLocation
                                    Address={task.address}
                                    labe={task.label}
                                  />
                                </Grid>
                                <Grid
                                  item
                                  xs={2}
                                  md={1}
                                  sx={{
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                  }}
                                >
                                  <Button
                                    onClick={() => {
                                      // console.log('task', task);
                                      setSelectMap(true);
                                      setLabel(task.label);
                                      // setUseLocation(true);
                                      props.setCenter(task.location);
                                      props.setAddress(task.address);
                                      setEdit(true);
                                    }}
                                    sx={{
                                      fontSize: {
                                        xs: 'body2.fontSize',
                                        md: 'body1.fontSize',
                                      },
                                      minWidth: 0,
                                      minHeight: 0,
                                    }}
                                  >
                                    Edit
                                  </Button>
                                </Grid>
                              </Grid>
                            );
                          })
                      )}
                    </>
                  )
                )}
              </Grid>
            )
          ) : openSavedAddr ? (
            <>
              <Grid
                container
                component={Paper}
                variant='outlined'
                sx={{
                  p: 2,
                  background: theme.palette.background.default,
                  mt: 1,
                  mb: 2,
                }}
              >
                <>
                  {listAddress && (
                    <DialogLocation
                      buyerAddressId={buyerAddressId}
                      setBuyerAddressId={handleSetBuyerAddressId}
                      open={open}
                      setOpen={() => setOpen(false)}
                      listAddress={listAddress?.buyerAddresses}
                      idCurrentPlace={props.buyerAddressId}
                    />
                  )}
                  <Grid
                    item
                    xs={12}
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                    }}
                  >
                    <Button
                      onClick={() => {
                        if (
                          buyerAddressId &&
                          buyerAddressId !== props.buyerAddressId
                        ) {
                          runUpdateOrder(buyerAddressId);
                        }
                      }}
                      sx={{
                        fontSize: {
                          xs: 'body2.fontSize',
                          md: 'body1.fontSize',
                        },
                      }}
                    >
                      Confirm
                    </Button>
                    <Button
                      color='secondary'
                      onClick={() => {
                        setEdit(false);
                      }}
                      sx={{
                        fontSize: {
                          xs: 'body2.fontSize',
                          md: 'body1.fontSize',
                        },
                      }}
                    >
                      Close
                    </Button>
                  </Grid>
                </>
              </Grid>
            </>
          ) : (
            <Grid
              container
              component={Paper}
              variant='outlined'
              sx={{
                px: 2,
                pt: 2,
                background: theme.palette.background.default,
                mt: 1,
                mb: 2,
                position: 'relative',
              }}
            >
              <Grid item xs={12} md={12}>
                <SelectMap
                  currentAdd={props.currentAdd}
                  selectMap={selectMap}
                  onChange={props.onChange}
                  currentLocationButton={true}
                  location={props.location}
                  setLocation={props.setLoction}
                  setAddress={props.setAddress}
                  setCenter={props.setCenter}
                  centerMap={props.centerMap}
                  label={label}
                />
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                  }}
                >
                  <Button
                    onClick={async () => {
                      await runAddress();
                    }}
                    sx={{
                      fontSize: {
                        xs: 'body2.fontSize',
                        md: 'body1.fontSize',
                      },
                    }}
                  >
                    Save
                  </Button>
                  <Button
                    onClick={() => {
                      setEdit(false);
                    }}
                    color='secondary'
                    sx={{
                      fontSize: {
                        xs: 'body2.fontSize',
                        md: 'body1.fontSize',
                      },
                    }}
                  >
                    Cancel
                  </Button>
                </Box>
              </Grid>

              <Grid item xs={12} display={'flex'} justifyContent={'flex-end'}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    mt: 1,
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                    }}
                  ></Box>
                </Box>
              </Grid>
            </Grid>
          )}
          {edit && listAddress && listAddress?.buyerAddresses.length > 0 && (
            <>
              <Grid
                item
                xs={12}
                sx={{
                  xs: 'body2.fontSize',
                  md: 'body1.fontSize',
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                }}
              >
                <Button
                  onClick={() => {
                    setOpenSavedAddr((prev) => !prev);
                    setSelectMap(true);
                  }}
                >
                  {listAddress &&
                  listAddress?.buyerAddresses.length > 0 &&
                  !openSavedAddr
                    ? 'Use Saved Addresses'
                    : 'Add New Address'}
                </Button>
              </Grid>
            </>
          )}

          <ShopingBage
            editId={editId}
            setEditId={setEditId}
            runUpdateQty={runUpdateQty}
            runDeleteProduct={runDeleteProduct}
            detailId={props.detailId}
            orderDetails={props.orderDetails}
            refDetail={props.refDetail}
            listLoading={props.loading}
            loadDeleteProduct={loadDeleteProduct}
          />
          <PaymentMethod
            afterDiscount={props.afterDiscount}
            afterDiscountRiel={props.afterDiscountRiel}
            amount={props.amount}
            deliveryFee={props.deliveryFee}
            paymentType={props.paymentType}
            reciept={props.reciept}
          />
          {props.status === 'review' ? (
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
            <PendingBtn
              setRejectOrder={setRejectOrder}
              id={props.detailId}
              refreshOrderList={props.refreshOrderList}
              setOrder={props.setOrder}
              refreshListDetail={props.refDetail}
              // setOpen={props.setOpen}
              setId={props.setId}
            />
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
          )}
        </Grid>
      )}
      <DialogReject
        rejectOrder={rejectOrder}
        setRejectOrder={setRejectOrder}
        id={props.detailId}
        refreshOrderList={props.refreshOrderList}
        setOrder={props.setOrder}
        // setOpen={props.setOpen}
        setId={props.setId}
      />
      <DialogCancel
        setOrder={props.setOrder}
        cancel={cancel}
        setCancel={setCancel}
        id={props.detailId}
        refreshOrderList={props.refreshOrderList}
        // setOpen={props.setOpen}
        setId={props.setId}
      />
    </Box>
  );
}
export default OrderPage;

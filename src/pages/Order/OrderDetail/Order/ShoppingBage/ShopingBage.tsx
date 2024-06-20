import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FaPen } from 'react-icons/fa';

import {
  Avatar,
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';

import theme from 'themes';

import AddNewProduct from './AddNewProduct';
import Selectvariants from './Selectvariants';

interface Ishop {
  editId: number | '' | undefined;
  orderDetails: Iorder.OrderDetail[] | undefined;
  detailId: number | undefined;
  refDetail: () => void;
  setEditId: React.Dispatch<React.SetStateAction<number | '' | undefined>>;
  runUpdateQty: (orderDetailId: any, qty: any) => void;
  runDeleteProduct: (data: any) => void;
  listLoading: boolean;
  loadDeleteProduct: boolean;
}
interface Ifrom {
  qty: number | '';
}

function ShopingBage(props: Ishop) {
  const { control, watch } = useForm<Ifrom>({ shouldUnregister: true });
  const watchqty = watch('qty');
  const [addProduct, setProduct] = useState(false);
  const [open, setOpen] = useState(false);
  const [proId, setProId] = useState<number>();
  return (
    <>
      <Grid item xs={12}>
        <Selectvariants
          open={open}
          id={proId}
          onClose={() => setOpen(false)}
          productDetail={props.orderDetails?.filter(
            (el) => el.productId === proId,
          )}
          productId={props.editId}
          close={setOpen}
          setId={props.setEditId}
          refDetail={props.refDetail}
        />
        <Typography
          fontWeight={'bold'}
          sx={{
            fontSize: {
              xs: 'body2.fontSize',
              md: 'body1.fontSize',
            },
          }}
        >
          Shopping Bag
        </Typography>
        <Paper
          sx={{
            p: 2,
            background: theme.palette.background.default,
            mt: 1,
            mb: 2,
          }}
          variant='outlined'
        >
          {props.orderDetails?.map((el) => {
            return (
              <Grid
                container
                key={el.id}
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  mb: 2,
                }}
              >
                <Grid item md={3} xs={3}>
                  <Avatar
                    variant='rounded'
                    src={el.url}
                    sx={{
                      width: { md: '75px', xs: '60px' },
                      height: { md: '75px', xs: '60px' },
                    }}
                  />
                </Grid>
                <Grid
                  item
                  xs={7}
                  md={7}
                  sx={{
                    display: 'flex',
                    flexDirection: { md: 'column', xs: 'column' },
                  }}
                >
                  <Box
                    sx={{
                      width: { xs: '120px', md: '500px' },
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'baseline',
                    }}
                  >
                    <Box
                      sx={{
                        width: { xs: '120px', md: '200px' },
                      }}
                    >
                      <Typography
                        sx={{
                          display: '-webkit-box',
                          WebkitBoxOrient: 'vertical',
                          WebkitLineClamp: { xs: 1, md: 2 },
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          fontSize: {
                            xs: 'body2.fontSize',
                            md: 'body1.fontSize',
                          },
                          ml: {
                            xs: 0,
                            md: 0,
                          },
                        }}
                      >
                        {el.name}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          mt: 1,
                        }}
                      >
                        {el.options?.map((op, index) => {
                          return (
                            <Box key={op.id}>
                              <Typography
                                sx={{
                                  px: { md: 2, xs: 1 },
                                  py: { md: 1, xs: 0.5 },
                                  background: theme.palette.grey['300'],
                                  mr: 1,
                                  borderRadius: 2,
                                  display: 'flex',
                                  alignItems: 'center',
                                  fontSize: {
                                    xs: 'body2.fontSize',
                                    md: 'body1.fontSize',
                                  },
                                }}
                              >
                                {op.title}
                              </Typography>
                            </Box>
                          );
                        })}
                      </Box>

                      <Box>
                        {props.editId === el.id && (
                          <Button
                            onClick={() => {
                              setOpen(true);
                              setProId(el.productId);
                            }}
                            sx={{
                              minWidth: 0,
                            }}
                          >
                            <FaPen />
                          </Button>
                        )}
                      </Box>
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      flexDirection: 'row',
                      mt: { xs: 2, md: 0 },
                      fontSize: {
                        xs: 'body2.fontSize',
                        md: 'body1.fontSize',
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width:
                          props.editId === el.id
                            ? { xs: '150px', md: '75px' }
                            : 'auto',
                      }}
                    >{`$${el.afterDiscount.toFixed(2)} x`}</Box>
                    {props.editId === el.id ? (
                      <Controller
                        defaultValue={el.qty}
                        rules={{ required: true }}
                        name='qty'
                        control={control}
                        render={({ field }) => (
                          <TextField
                            type='number'
                            size='small'
                            sx={{
                              '& fieldset': { border: 'none' },
                              borderRadius: 2,
                              mt: { md: 1, xs: 0 },
                              background: (theme) =>
                                theme.palette.background.paper,
                              ml: 2,
                              mr: { md: 3, xs: 6 },
                            }}
                            {...field}
                          />
                        )}
                      />
                    ) : (
                      <span style={{ marginLeft: '5px' }}>{el.qty}</span>
                    )}
                  </Box>
                </Grid>

                {/* </Grid> */}
                <Grid
                  item
                  xs={2}
                  md={2}
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                  >
                    <div
                      style={{
                        height: '50px',
                        width: '1px',
                        background: theme.palette.grey['300'],
                        marginRight: '10px',
                      }}
                    ></div>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'baseline',
                      }}
                    >
                      <Button
                        disabled={props.loadDeleteProduct ? true : false}
                        onClick={() => {
                          props.setEditId(el.id);
                          if (props.editId === el.id) {
                            props.runUpdateQty(el.id, watchqty);
                          }
                        }}
                        sx={{
                          fontSize: {
                            xs: 'body2.fontSize',
                            md: 'body1.fontSize',
                          },
                          minWidth: 0,
                        }}
                      >
                        {props.editId === el.id ? 'Save' : 'Edit'}
                      </Button>
                      <Button
                        disabled={props.loadDeleteProduct ? true : false}
                        sx={{
                          fontSize: {
                            xs: 'body2.fontSize',
                            md: 'body1.fontSize',
                          },
                        }}
                        color='secondary'
                        onClick={() => {
                          props.setEditId('');
                          if (props.editId === '') {
                            props.runDeleteProduct(el.id);
                          }
                        }}
                      >
                        {props.editId === el.id ? 'Cancel' : 'Remove'}
                      </Button>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            );
          })}

          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            {!props.listLoading && (
              <Button
                sx={{
                  fontSize: {
                    xs: 'body2.fontSize',
                    md: 'body1.fontSize',
                  },
                }}
                onClick={() => {
                  setProduct(true);
                }}
              >
                + Add New Product
              </Button>
            )}
          </Box>

          <Box>
            <SwipeableDrawer
              anchor={'bottom'}
              open={addProduct}
              onClose={() => setProduct(false)}
              onOpen={() => setProduct(true)}
              sx={{
                zIndex: 1300,
              }}
            >
              <AddNewProduct
                refresh={props.refDetail}
                setProduct={setProduct}
                orderId={props.detailId}
                productId={props.orderDetails?.map((el) => el.productId)}
                runDeleteProduct={props.runDeleteProduct}
                loadDeleteProduct={props.loadDeleteProduct}
              />
            </SwipeableDrawer>
          </Box>
        </Paper>
      </Grid>
    </>
  );
}

export default ShopingBage;

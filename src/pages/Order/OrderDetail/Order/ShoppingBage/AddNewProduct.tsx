import ErrorResponse from 'ErrorRespone';
import { useDebounce, useRequest } from 'ahooks';
import React, { memo, useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { MdSearch } from 'react-icons/md';
import { MdOutlineClose } from 'react-icons/md';

import {
  Box,
  Button,
  CircularProgress,
  Grid,
  InputAdornment,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { Checkbox } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import { AuthContext } from 'contexts/AuthContext';

import ORDER from 'api/Order';

import ErrDialog, { IErrDialogRef } from 'components/Dialog/ErrDialog';

import theme from 'themes';

interface Column {
  id: 'name' | 'Category' | 'Price' | 'Select';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'name', label: 'Product Name', minWidth: 200 },
  { id: 'Category', label: 'Category', minWidth: 170 },
  {
    id: 'Price',
    label: 'Price',
    minWidth: 170,
  },
  {
    id: 'Select',
    label: 'Select',
    minWidth: 100,
  },
];

interface Iform {
  Search: string;
}
interface IaddProduct {
  setProduct: React.Dispatch<React.SetStateAction<boolean>>;
  orderId: number | undefined;
  refresh: () => void;
  productId: number[] | undefined;
  runDeleteProduct: (data: any) => void;
  loadDeleteProduct: boolean;
}

function AddNewProduct(props: IaddProduct) {
  const errRef = useRef<IErrDialogRef>(null);
  const { selectedShop } = React.useContext(AuthContext);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [productId, setProductId] = useState<number[]>([]);
  const { control, watch, formState } = useForm<Iform>();
  const searchShop = watch('Search', '');
  const debouncedSearch = useDebounce(searchShop, { wait: 500 });
  useEffect(() => {
    if (props.productId) {
      setProductId(props.productId);
    }
  }, [props.productId]);
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const updatedRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(updatedRowsPerPage);
  };
  const {
    data: listProduct,
    error: errListProduct,
    refresh: refreshListProduct,
    loading: loadingListProduct,
  } = useRequest(
    () =>
      ORDER.getListProduct(
        `${selectedShop?.id}`,
        page,
        debouncedSearch,
        rowsPerPage,
      ),
    {
      onError: (e) => {},
      refreshDeps: [page, rowsPerPage, debouncedSearch, formState.isSubmitting],
    },
  );

  const addProductId = (currentID: number) => {
    const storeProId = [...productId];
    const index = storeProId.indexOf(currentID);
    if (index === -1) {
      storeProId.push(currentID);
    } else {
      storeProId.splice(index, 1);
    }
    setProductId(storeProId);
  };

  const { run: addOrderProduct } = useRequest(
    () =>
      ORDER.addProductOrder(`${selectedShop?.id}`, props.orderId, productId),
    {
      refreshDeps: [selectedShop?.id],
      manual: true,
      onSuccess: (data) => {
        props.refresh();
        props.setProduct(false);
      },
      onError: (e) => {},
    },
  );
  const mediumDown = useMediaQuery(theme.breakpoints.down('md'));
  const [pagi, setPagi] = useState<number[]>([]);
  useEffect(() => {
    if (mediumDown) {
      setPagi([]);
    } else {
      setPagi([5, 10, 25, 100]);
    }
  }, [mediumDown]);

  return (
    <Box sx={{ p: 3, zIndex: theme.zIndex.modal + 1 }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <ErrDialog ref={errRef} />
        <Typography
          variant='h6'
          fontWeight={'bold'}
          sx={{
            color: theme.palette.primary.main,
          }}
        >
          Add Product
        </Typography>
        <Button
          sx={{
            minWidth: 0,
            fontSize: {
              xs: 'body2.fontSize',
              md: 'body1.fontSize',
            },
          }}
          onClick={() => {
            props.setProduct(false);
          }}
        >
          <MdOutlineClose size={25} />
        </Button>
      </Box>
      <form>
        <Grid container>
          <Grid item xs={12}>
            <Controller
              defaultValue={''}
              rules={{ required: true }}
              name='Search'
              control={control}
              render={({ field }) => (
                <TextField
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <MdSearch size={20} />
                      </InputAdornment>
                    ),
                  }}
                  fullWidth
                  placeholder='Search Product'
                  autoComplete='off'
                  size='small'
                  sx={{
                    '& fieldset': { border: 'none' },
                    borderRadius: 2,
                    background: (theme) => theme.palette.background.default,
                  }}
                  {...field}
                />
              )}
            />
          </Grid>
        </Grid>
      </form>
      <Paper
        sx={{
          width: '100%',
          overflow: 'hidden',
          mt: 2,
          background: theme.palette.background.default,
        }}
        variant='outlined'
        elevation={0}
      >
        {loadingListProduct ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: { md: 'calc(100vh - 420px)', xs: 'calc(100vh - 345px)' },
            }}
          >
            <CircularProgress size={25} />
          </Box>
        ) : errListProduct ? (
          <ErrorResponse
            message={
              errListProduct.message ||
              errListProduct.error ||
              errListProduct.error_description
            }
            typographyProps={{ textAlign: 'center' }}
            buttonAction={refreshListProduct}
            height='calc(100vh - 420px)'
          />
        ) : (
          listProduct?.data && (
            <TableContainer
              sx={{
                '::-webkit-scrollbar': {
                  display: 'none',
                },
                height: {
                  md: 'calc(100vh - 420px)',
                  xs: 'calc(100vh - 345px)',
                },
              }}
            >
              <Table stickyHeader aria-label='sticky table'>
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{
                          minWidth: column.minWidth,
                          background: theme.palette.background.paper,
                        }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {listProduct?.data?.map((task) => {
                    return (
                      <TableRow role='checkbox' tabIndex={-1} key={task.id}>
                        <TableCell sx={{ pl: 2 }}>{task.name}</TableCell>
                        <TableCell sx={{ pl: 2 }}>
                          {task.category?.name}
                        </TableCell>
                        <TableCell sx={{ pl: 2 }}>{`$${task.price.toFixed(
                          2,
                        )}`}</TableCell>
                        <TableCell sx={{ p: 0 }}>
                          <Checkbox
                            color='primary'
                            checked={productId.includes(task.id)}
                            onClick={() => {
                              addProductId(task.id);
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          )
        )}
        {!errListProduct && (
          <Box>
            <TablePagination
              rowsPerPageOptions={pagi}
              component='div'
              count={listProduct?.pagination?.totalCount || 0}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Box>
        )}
      </Paper>
      <Button
        disabled={productId.length === 0}
        sx={{
          px: 6,
          mt: 2,
          fontSize: {
            xs: 'body2.fontSize',
            md: 'body1.fontSize',
          },
        }}
        variant='contained'
        onClick={() => {
          addOrderProduct();
        }}
      >
        Continue
      </Button>
    </Box>
  );
}

export default memo(AddNewProduct);

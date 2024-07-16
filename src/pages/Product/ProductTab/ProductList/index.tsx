import { useRequest } from 'ahooks';
import { memo, useRef, useState } from 'react';
import { MdDelete, MdDragIndicator, MdEdit, MdSearch } from 'react-icons/md';

import {
  Box,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  ListItem,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';

import { PRODUCT_API } from 'api/Product';

import { CusTextField } from 'components/CusMuiComp/CusInputs';
import ConfDialog, { IConfDialogRef } from 'components/Dialog/ConfDialog';
import ErrDialog, { IErrDialogRef } from 'components/Dialog/ErrDialog';
import { BackdropLoading, LoadingSpiner } from 'components/Loading';

export interface IDragDropItem {
  id: number;
  index: number;
}

export const dragDropItemType = 'cate-item';

interface IProductList {
  shopId?: number;
  selectPro: string | 'new';
  setSelectPro: React.Dispatch<React.SetStateAction<string | 'new'>>;
  allProduct?: IProduct.Product[];
  selectCate: string;
  loadingListCate: boolean;
  errListCate?: Error;
  refreshListCate: () => void;
  disableAdd: boolean;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
  loadingProductList: boolean;
  allListProduct: IProduct.IproductListNew | undefined;
  refreshProduct: () => void;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
  searchText: string;
  setProToUpdate: React.Dispatch<
    React.SetStateAction<IProduct.IProductNew | undefined>
  >;
}

const ProductList = ({
  shopId,
  selectPro,
  setSelectPro,
  refreshListCate,
  disableAdd,
  setEdit,
  searchText,
  loadingProductList,
  allListProduct,
  refreshProduct,
  setSearchText,
  setProToUpdate,
}: IProductList) => {
  const deleteAlert = useRef<IConfDialogRef>(null);
  const errAlert = useRef<IErrDialogRef>(null);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const { run: runDeleteProduct, loading: loadingDeleteProduct } = useRequest(
    PRODUCT_API.deleteProduct,
    {
      manual: true,
      onError: (err) => errAlert.current?.open(err),
      onSuccess: () => {
        refreshListCate();
        refreshProduct();
      },
    },
  );
  const handleAddNew = () => {
    setSelectPro('new');
  };

  return (
    <>
      <BackdropLoading open={loadingDeleteProduct} />

      <ErrDialog ref={errAlert} />

      <ConfDialog
        ref={deleteAlert}
        onConfirm={(data) => {
          console.log('onConfirm:', data);
          runDeleteProduct(selectPro);
          deleteAlert.current?.close();
        }}
      />

      <Box sx={{ px: [0, 0, 2], top: 0 }}>
        <Typography fontWeight='bold' color='text.secondary' sx={{ py: 2 }}>
          Product
        </Typography>
        <Divider sx={{ width: 60, mb: 1 }} />

        <CusTextField
          variant='outlined'
          size='small'
          placeholder='Search'
          fullWidth
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <MdSearch size={18} />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Box mt={2} sx={{ height: 'calc(100vh - 380px)', overflow: 'scroll' }}>
        {loadingProductList ? (
          <Stack
            justifyContent='center'
            alignItems='center'
            height='calc(100vh - 390px)'
          >
            <LoadingSpiner />
          </Stack>
        ) : allListProduct?.products.length !== 0 ? (
          allListProduct &&
          allListProduct.products.map((e, i) => (
            <ListItem
              disablePadding
              key={e._id}
              secondaryAction={
                <Stack direction='row' spacing={0.25} color='text.secondary'>
                  <IconButton
                    color='inherit'
                    size='small'
                    sx={{
                      cursor: 'move',
                    }}
                    onClick={(event) => {
                      setAnchorEl(event.currentTarget);
                      setSelectPro(e._id);
                      setProToUpdate(e);
                    }}
                  >
                    <MdDragIndicator />
                  </IconButton>
                </Stack>
              }
            >
              <ListItemButton
                onClick={() => {
                  setProToUpdate(e);
                  setSelectPro(e._id);
                  console.log('prodetail', e);
                }}
                sx={{
                  px: [0, 0, 2],
                  bgcolor: selectPro === e._id ? 'background.paper' : '',
                  color: selectPro === e._id ? 'primary.main' : '',
                }}
              >
                <ListItemText
                  primary={e.name}
                  primaryTypographyProps={{
                    noWrap: true,
                    sx: { maxWidth: '90%' },
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))
        ) : (
          <Stack
            justifyContent='center'
            alignItems='center'
            height='calc(100vh - 400px)'
          >
            <Typography>No products found.</Typography>
          </Stack>
        )}
      </Box>

      {/* <List
        ref={drop}
        sx={{ flexGrow: 1, overflowY: 'auto', overflowX: 'hidden' }}
      >
        {selectPro === 'new' && (
          <DragableListItem
            {...{
              type: dragDropItemType,
              id: 'new',
              index: -1,
              title: 'New Product',
              active: selectPro === 'new',
              onClick: () => {},
            }}
          />
        )}
      </List> */}

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        slotProps={{
          paper: { sx: { borderRadius: 1, bgcolor: 'common.white' } },
        }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem
          onClick={() => {
            if (anchorEl) {
              setEdit(true);
            }
            setAnchorEl(null);
          }}
          sx={{
            '&>svg': { mr: 1.5 },
            color: 'text.secondary',
            fontWeight: 500,
            px: 1.5,
            py: 1,
            minHeight: 'auto',
          }}
        >
          <MdEdit />
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            deleteAlert.current?.open('Deleting Category', anchorEl?.id);
          }}
          sx={{
            '&>svg': { mr: 1.5 },
            color: 'error.main',
            fontWeight: 500,
            px: 1.5,
            py: 1,
            minHeight: 'auto',
          }}
        >
          <MdDelete />
          Delete
        </MenuItem>
      </Menu>

      <Stack justifyContent='center' alignItems='center' my={2}>
        <Button
          variant='contained'
          disabled={disableAdd}
          onClick={handleAddNew}
        >
          Add Product
        </Button>
      </Stack>
    </>
  );
};

export default memo(ProductList);

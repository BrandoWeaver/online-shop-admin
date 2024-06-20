import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { useDebounce, useRequest } from 'ahooks';
import { useDrop } from 'react-dnd';

import {
  Box,
  Button,
  Divider,
  InputAdornment,
  List,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';
import { MdSearch, MdEdit, MdDelete } from 'react-icons/md';

import { PRODUCT_API } from 'api/Product';

import { CusTextField } from 'components/CusMuiComp/CusInputs';
import { BackdropLoading, LoadingSpiner } from 'components/Loading';
import ConfDialog, { IConfDialogRef } from 'components/Dialog/ConfDialog';
import ErrDialog, { IErrDialogRef } from 'components/Dialog/ErrDialog';
import DragableListItem from 'components/DragableList/ListItem';
import ErrorResponse from 'ErrorRespone';

export interface IDragDropItem {
  id: number;
  index: number;
}

export const dragDropItemType = 'cate-item';

interface IProductList {
  shopId?: number;
  selectPro: number | 'new';
  setSelectPro: React.Dispatch<React.SetStateAction<number | 'new'>>;

  allProduct?: IProduct.Product[];
  allCategory?: IProduct.IProCategory[];

  loadingListCate: boolean;
  errListCate?: Error;
  refreshListCate: () => void;
  disableAdd: boolean;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProductList = ({
  shopId,
  allProduct,
  loadingListCate,
  errListCate,

  selectPro,
  setSelectPro,
  refreshListCate,
  disableAdd,
  setEdit,
}: IProductList) => {
  const deleteAlert = useRef<IConfDialogRef>(null);
  const errAlert = useRef<IErrDialogRef>(null);

  const [products, setProducts] = useState<IProduct.Product[]>(
    allProduct || []
  );
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [searchText, setSearchText] = useState('');

  const debouncedText = useDebounce(searchText, { wait: 500 });

  const { run: runRearrangeProduct } = useRequest(
    PRODUCT_API.rearrangeProduct,
    {
      manual: true,
      ready: Boolean(shopId),
    }
  );

  const { run: runDeleteProduct, loading: loadingDeleteProduct } = useRequest(
    PRODUCT_API.deleteProduct,
    {
      manual: true,
      ready: Boolean(shopId),
      onError: (err) => errAlert.current?.open(err),
      onSuccess: refreshListCate,
    }
  );

  const findCard = useCallback(
    (id: string) => {
      const card = products?.filter((pro) => `${pro.id}` === id)[0];
      if (card) {
        return {
          index: products?.indexOf(card),
        };
      } else {
        return { card, index: -1 };
      }
    },
    [products]
  );

  const moveCard = useCallback(
    (id: number, atIndex: number) => {
      const { index } = findCard(id.toString());

      if (products) {
        setProducts((prev) => {
          let arr = [...(prev || [])];
          arr.splice(atIndex, 0, arr.splice(index, 1)[0]);
          return arr;
        });
      }
    },
    [setProducts, products, findCard]
  );

  const [, drop] = useDrop(
    () => ({
      accept: dragDropItemType,
      drop(item: IDragDropItem) {
        if (shopId) {
          runRearrangeProduct(shopId, {
            id: item.id,
            sort: item.index + 1,
          });
        }
      },
    }),
    [shopId]
  );

  const handleAddNew = () => {
    // const newPro: IProduct.Product = {
    //   thumbnail: '',
    //   id: 'new',
    //   name: 'New Product',
    //   price: 0,
    //   afterDiscount: 0,
    //   sort: 0,
    //   checkoutLink: '',
    // };
    // setProducts((prev) =>
    //   prev.find((p) => p.id !== 'new') ? [newPro, ...prev] : prev
    // );
    setSelectPro('new');
  };

  useEffect(() => {
    if (allProduct) {
      setProducts(allProduct);
    }
  }, [allProduct]);

  useEffect(() => {
    if (selectPro === -1) {
      setProducts((prev) => prev.filter((p) => p.id !== 'new'));
    }
  }, [selectPro]);

  if (!products && loadingListCate) {
    return (
      <Stack
        justifyContent='center'
        alignItems='center'
        height='calc(100vh - 250px)'
      >
        <LoadingSpiner />
      </Stack>
    );
  }

  if (errListCate) {
    return (
      <ErrorResponse
        message={
          errListCate.error_description ||
          errListCate.error ||
          errListCate.message
        }
        buttonAction={refreshListCate}
      />
    );
  }
  return (
    <>
      <BackdropLoading open={loadingDeleteProduct} />

      <ErrDialog ref={errAlert} />

      <ConfDialog
        ref={deleteAlert}
        onConfirm={(data) => {
          console.log('onConfirm:', data);
          shopId && runDeleteProduct(shopId, data);
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

      <List
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
        {products
          ?.filter((pro) =>
            pro.name.toUpperCase().includes(debouncedText.toUpperCase())
          )
          ?.map((pro, i) => (
            <DragableListItem
              key={pro.id}
              {...{
                type: dragDropItemType,
                id: pro.id,
                index: i,
                title: pro.name,
                active: selectPro === pro.id,
                onClick: () =>
                  setSelectPro((prev) => (prev === pro.id ? -1 : pro.id)),
                findCard,
                moveCard,
                onMenuClick: (e) => setAnchorEl(e.currentTarget),
              }}
            />
          ))}
      </List>
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
            // console.log('anchorEl:', anchorEl?.id);
            if (anchorEl) {
              setSelectPro(+anchorEl?.id);
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

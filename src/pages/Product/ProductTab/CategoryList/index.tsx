import { memo, useCallback, useRef, useState } from 'react';
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
import CusDialog, { ICusDialogHandler } from 'components/Dialog/CusDialog';
import ConfDialog, { IConfDialogRef } from 'components/Dialog/ConfDialog';
import ErrDialog, { IErrDialogRef } from 'components/Dialog/ErrDialog';
import DragableListItem from 'components/DragableList/ListItem';
import ErrorResponse from 'ErrorRespone';

import CategoryForm from './CateForm';

export interface IDragDropItem {
  id: number;
  index: number;
}

export const dragDropItemType = 'cate-item';

interface ICategories {
  shopId?: number;
  selectCate: number | 'all';
  setSelectCate: React.Dispatch<React.SetStateAction<number | 'all'>>;
  setSelectPro: React.Dispatch<React.SetStateAction<number | 'new'>>;

  mutateListCate: (
    data?:
      | IProduct.IProCategory[]
      | ((
          oldData?: IProduct.IProCategory[] | undefined
        ) => IProduct.IProCategory[] | undefined)
      | undefined
  ) => void;
  allCategory?: IProduct.IProCategory[];
  loadingListCate: boolean;
  errListCate?: Error;
  refreshListCate: () => void;
  disableAdd: boolean;
}

const Categories = ({
  shopId,

  allCategory,
  loadingListCate,
  errListCate,
  refreshListCate,
  mutateListCate,

  selectCate,
  setSelectCate,
  setSelectPro,
  disableAdd,
}: ICategories) => {
  const deleteAlert = useRef<IConfDialogRef>(null);
  const cateFormRef = useRef<ICusDialogHandler>(null);
  const errAlert = useRef<IErrDialogRef>(null);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [searchText, setSearchText] = useState('');

  const debouncedText = useDebounce(searchText, { wait: 500 });

  const { run: runRearrangeCategory } = useRequest(
    PRODUCT_API.rearrangeCategory,
    {
      manual: true,
      ready: Boolean(shopId),
    }
  );

  const { run: runAddCategory, loading: loadingAddCategory } = useRequest(
    PRODUCT_API.addNewCategory,
    {
      manual: true,
      ready: Boolean(shopId),
      onError: (err) => errAlert.current?.open(err),
      onSuccess: refreshListCate,
    }
  );

  const { run: runEditCategory, loading: loadingEditCategory } = useRequest(
    PRODUCT_API.editCategory,
    {
      manual: true,
      ready: Boolean(shopId),
      onError: (err) => errAlert.current?.open(err),
      onSuccess: refreshListCate,
    }
  );

  const { run: runDeleteCategory, loading: loadingDeleteCategory } = useRequest(
    PRODUCT_API.deleteCategory,
    {
      manual: true,
      ready: Boolean(shopId),
      onError: (err) => errAlert.current?.open(err),
      onSuccess: refreshListCate,
    }
  );

  const findCard = useCallback(
    (id: string) => {
      const card = allCategory?.filter((cate) => `${cate.id}` === id)[0];
      if (card) {
        return {
          index: allCategory?.indexOf(card),
        };
      } else {
        return { card, index: -1 };
      }
    },
    [allCategory]
  );

  const moveCard = useCallback(
    (id: number, atIndex: number) => {
      const { index } = findCard(id.toString());

      if (allCategory) {
        mutateListCate((prev) => {
          let arr = [...(prev || [])];
          arr.splice(atIndex, 0, arr.splice(index, 1)[0]);
          return arr;
        });
      }
    },
    [mutateListCate, allCategory, findCard]
  );

  const [, drop] = useDrop(
    () => ({
      accept: dragDropItemType,
      drop(item: IDragDropItem) {
        if (shopId) {
          runRearrangeCategory(shopId, {
            id: item.id,
            sort: item.index + 1,
          });
        }
      },
    }),
    [shopId]
  );

  if (!allCategory && loadingListCate) {
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
      <BackdropLoading
        open={
          loadingAddCategory ||
          loadingDeleteCategory ||
          loadingListCate ||
          loadingEditCategory
        }
      />

      <ErrDialog ref={errAlert} />

      <ConfDialog
        ref={deleteAlert}
        onConfirm={(data) => {
          console.log('onConfirm:', data);
          shopId && runDeleteCategory(shopId, data);
          deleteAlert.current?.close();
        }}
      />

      <CusDialog ref={cateFormRef}>
        <CategoryForm
          onAddSubmit={(data) => {
            if (shopId) {
              runAddCategory(shopId, data);
            }
            cateFormRef.current?.close();
          }}
          onEditSubmit={(data) => {
            if (shopId) {
              runEditCategory(shopId, data);
            }
            cateFormRef.current?.close();
          }}
          onCancel={() => cateFormRef.current?.close()}
        />
      </CusDialog>

      <Box sx={{ px: [0, 0, 2], top: 0 }}>
        <Typography fontWeight='bold' color='text.secondary' sx={{ py: 2 }}>
          Categories
        </Typography>
        <Divider sx={{ width: 80, mb: 1 }} />

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
        <DragableListItem
          {...{
            type: dragDropItemType,
            id: 'all',
            index: -1,
            title: 'All',
            active: selectCate === 'all',
            onClick: () => {
              setSelectCate((prev) => (prev === 'all' ? -1 : 'all'));
              setSelectPro(-1);
            },
          }}
        />
        {allCategory
          ?.filter((cate) =>
            cate.name.toUpperCase().includes(debouncedText.toUpperCase())
          )
          ?.map((cate, i) => (
            <DragableListItem
              key={cate.id}
              {...{
                type: dragDropItemType,
                id: cate.id,
                index: i,
                title: cate.name,
                active: selectCate === cate.id,
                onClick: () => {
                  setSelectCate((prev) => (prev === cate.id ? -1 : cate.id));
                  setSelectPro(-1);
                },
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
            console.log('anchorEl:', anchorEl?.id);
            setAnchorEl(null);
            if (anchorEl?.id) {
              const cate = allCategory?.find(
                (cate) => cate.id === +anchorEl.id
              );
              if (cate) {
                cateFormRef.current?.open(cate);
              }
            }
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
          onClick={() => cateFormRef.current?.open()}
        >
          Add Category
        </Button>
      </Stack>
    </>
  );
};
export default memo(Categories);

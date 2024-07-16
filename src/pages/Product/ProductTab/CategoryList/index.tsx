import { useDebounce, useRequest } from 'ahooks';
import { memo, useCallback, useRef, useState } from 'react';
import { useDrop } from 'react-dnd';
import {
  MdDelete,
  MdDragIndicator,
  MdEdit,
  MdOutlineExpandCircleDown,
  MdSearch,
} from 'react-icons/md';

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

import CategoryAPI from 'api/Category';
import { PRODUCT_API } from 'api/Product';

import { CusTextField } from 'components/CusMuiComp/CusInputs';
import ConfDialog, { IConfDialogRef } from 'components/Dialog/ConfDialog';
import CusDialog, { ICusDialogHandler } from 'components/Dialog/CusDialog';
import ErrDialog, { IErrDialogRef } from 'components/Dialog/ErrDialog';
import DragableListItem from 'components/DragableList/ListItem';
import { BackdropLoading, LoadingSpiner } from 'components/Loading';

import CategoryForm from './CateForm';

export interface IDragDropItem {
  id: number;
  index: number;
}

export const dragDropItemType = 'cate-item';

interface ICategories {
  shopId?: number;
  selectCate: string | 'all';
  setSelectCate: React.Dispatch<React.SetStateAction<string | 'all'>>;
  setSelectPro: React.Dispatch<React.SetStateAction<string | 'new'>>;
  loadingListCate: boolean;
  errListCate?: Error;
  refreshListCate: () => void;
  disableAdd: boolean;
}

const Categories = ({
  shopId,
  loadingListCate,
  errListCate,
  refreshListCate,
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
  const [cateToUpdate, setCateToUpdate] = useState<IProduct.Category>();
  const debouncedText = useDebounce(searchText, { wait: 500 });

  const {
    loading: loadingCategory,
    data: listCategories,
    refresh: refreshListCategories,
  } = useRequest(() => PRODUCT_API.rearrangeCategory(debouncedText), {
    onSuccess: (data) => {
      console.log('My Cate', data);
    },
    refreshDeps: [debouncedText],
  });

  const { run: runAddCategory, loading: loadingAddCategory } = useRequest(
    PRODUCT_API.addNewCategory,
    {
      manual: true,
      onError: (err) => errAlert.current?.open(err),
      onSuccess: () => {
        refreshListCategories();
        cateFormRef.current?.close();
      },
    },
  );

  const { run: runEditCategory, loading: loadingEditCategory } = useRequest(
    PRODUCT_API.editCategory,
    {
      manual: true,
      ready: Boolean(shopId),
      onError: (err) => errAlert.current?.open(err),
      onSuccess: () => {
        cateFormRef.current?.close();
        refreshListCategories();
        setCateToUpdate(undefined);
      },
    },
  );

  const { run: runDeleteCategory, loading: loadingDeleteCategory } = useRequest(
    () => CategoryAPI.deleteCategory(selectCate),
    {
      manual: true,
      onError: (err) => errAlert.current?.open(err),
      onSuccess: refreshListCategories,
    },
  );

  console.log('param index', cateToUpdate);
  return (
    <>
      {/* <BackdropLoading
        open={
          loadingAddCategory ||
          loadingDeleteCategory ||
          loadingListCate ||
          loadingEditCategory ||
          loadingCategory
        }
      /> */}

      <ErrDialog ref={errAlert} />

      <ConfDialog
        ref={deleteAlert}
        onConfirm={(data) => {
          console.log('onConfirm:', data);
          shopId && runDeleteCategory();
          deleteAlert.current?.close();
        }}
      />

      <CusDialog ref={cateFormRef}>
        <CategoryForm
          cateToUpdate={cateToUpdate}
          loading={loadingAddCategory || loadingEditCategory}
          onAddSubmit={runAddCategory}
          onEditSubmit={runEditCategory}
          onCancel={() => cateFormRef.current?.close()}
          cateId={selectCate}
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
        <Box mt={2}>
          {loadingCategory ? (
            <Stack
              justifyContent='center'
              alignItems='center'
              height='calc(100vh - 390px)'
            >
              <LoadingSpiner />
            </Stack>
          ) : listCategories?.categories?.length !== 0 ? (
            <Box sx={{ height: 'calc(100vh - 390px)', overflow: 'scroll' }}>
              {listCategories &&
                listCategories.categories.map((e, i) => (
                  <Box key={e._id}>
                    <ListItem
                      disablePadding
                      secondaryAction={
                        <Stack
                          direction='row'
                          spacing={0.25}
                          color='text.secondary'
                        >
                          <IconButton
                            color='inherit'
                            size='small'
                            sx={{ cursor: 'move' }}
                            onClick={(event) => {
                              console.log(cateToUpdate);
                              setAnchorEl(event.currentTarget);
                              setSelectCate(e.cate_id);
                            }}
                          >
                            <MdDragIndicator />
                          </IconButton>
                        </Stack>
                      }
                    >
                      <ListItemButton
                        onClick={() => {
                          setSelectCate(e.cate_id);
                          setCateToUpdate(e);
                        }}
                        sx={{
                          px: [0, 0, 2],
                          bgcolor:
                            selectCate === e.cate_id ? 'background.paper' : '',
                          color: selectCate === e.cate_id ? 'primary.main' : '',
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
                  </Box>
                ))}
            </Box>
          ) : (
            <Stack
              justifyContent='center'
              alignItems='center'
              height='calc(100vh - 390px)'
            >
              <Typography>No categories found.</Typography>
            </Stack>
          )}
        </Box>
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        slotProps={{
          paper: { sx: { borderRadius: 1, bgcolor: 'common.white' } },
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem
          onClick={() => {
            cateFormRef.current?.open();
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

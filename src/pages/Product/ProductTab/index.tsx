import { useDebounce, useRequest } from 'ahooks';
import { useEffect, useMemo, useState } from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import { PRODUCT_API } from 'api/Product';

import FullDialog from 'components/Dialog/FullDialog';

import useMQ from 'hooks/useMQ';

import CategoryList from './CategoryList';
import ProductDetail from './ProductDetail';
import ProductList from './ProductList';

const ProductTab = () => {
  const { isSmDown } = useMQ();
  const [productToUpdate, setProToUpdate] = useState<IProduct.IProductNew>();
  const [searchText, setSearchText] = useState('');

  const debouncedText = useDebounce(searchText, { wait: 500 });
  const [selectCate, setSelectCate] = useState<string | 'all'>('');
  const [selectPro, setSelectPro] = useState<string | 'new'>('');
  const [edit, setEdit] = useState(false);

  const {
    data: listCategories,
    loading: loadingListCate,
    error: errListCate,
    mutate: mutateListCate,
    refresh: refreshListCate,
  } = useRequest(PRODUCT_API.listCategory, {
    cacheKey: `get-shop-${1}-categories`,
    refreshDeps: [selectCate],
  });

  const allCategory = useMemo(() => listCategories, [listCategories]);

  useEffect(() => {
    if (selectCate !== '' && selectPro !== '' && selectPro !== 'new') {
      setEdit(false);
    }
  }, [selectCate, selectPro]);
  const {
    loading: loadingProductList,
    data: allListProduct,
    refresh: refreshProduct,
  } = useRequest(() => PRODUCT_API.listProducts(selectCate, debouncedText), {
    onSuccess: (data) => {
      console.log('SuccessResListProduct', data);
    },
    onError: (err) => {
      console.log('errRes', err);
    },
    refreshDeps: [selectCate, debouncedText],
  });

  return (
    <Grid
      container
      sx={{
        mt: [0, 0, 3],
        height: { xs: 'auto', md: 'calc(100vh - 205px)' },
        overflow: { xs: 'auto', md: 'hidden' },
        border: (theme) => ({
          xs: 'none',
          md: `1px solid ${theme.palette.divider}`,
        }),
        borderRadius: 2,
      }}
    >
      <Grid
        item
        xs={12}
        md={3}
        sx={{
          borderRight: { xs: 'none', md: `1px solid` },
          borderColor: { md: 'divider' },
          display: 'flex',
          flexDirection: 'column',
          height: 'inherit',
          overflow: 'scroll',
        }}
      >
        <CategoryList
          {...{
            shopId: 1,

            selectCate,
            setSelectCate,
            setSelectPro,

            allCategory,
            loadingListCate,
            errListCate,
            refreshListCate,
            mutateListCate,

            disableAdd: edit,
          }}
        />
      </Grid>
      <Grid
        item
        xs={0}
        md={3}
        sx={{
          borderRight: `1px solid`,
          borderColor: 'divider',
          display: { xs: 'none', md: 'flex' },
          flexDirection: 'column',
          height: 'inherit',
          overflow: 'scroll',
        }}
      >
        {selectCate !== '' && (
          <ProductList
            {...{
              shopId: 1,
              selectPro,
              setSelectPro,
              selectCate,
              allCategory,
              productToUpdate,
              setProToUpdate,
              errListCate,
              loadingListCate,
              refreshListCate,
              disableAdd: edit || selectCate === 'all',
              setEdit,
              loadingProductList,
              allListProduct,
              refreshProduct,
              setSearchText,
              searchText,
            }}
          />
        )}
        {isSmDown && (
          <FullDialog
            open={selectCate !== ''}
            handleClose={() => setSelectCate('')}
          >
            <Box
              sx={{
                px: [2, 2, 3],
                display: 'flex',
                flexDirection: 'column',
                minHeight: 'calc(100% - 56px)',
              }}
            >
              <ProductList
                {...{
                  shopId: 1,
                  selectPro,
                  setSelectPro,
                  selectCate,
                  allCategory,
                  productToUpdate,
                  setProToUpdate,
                  errListCate,
                  loadingListCate,
                  refreshListCate,
                  disableAdd: edit,
                  setEdit,
                  loadingProductList,
                  allListProduct,
                  refreshProduct,
                  searchText,
                  setSearchText,
                }}
              />
            </Box>
          </FullDialog>
        )}
      </Grid>
      <Grid
        item
        xs={0}
        md={6}
        sx={{
          borderRight: `1px solid`,
          borderColor: 'divider',
          display: { xs: 'none', md: 'flex' },
          flexDirection: 'column',
          height: 'inherit',
        }}
      >
        {selectPro !== '' && (
          <ProductDetail
            {...{
              selectCate,
              selectPro,
              setSelectPro,
              allCategory,
              setSelectCate,
              listCategories,
              refreshListCate,
              edit,
              setEdit,
              productToUpdate,
              loadingProductList,
              allListProduct,
              refreshProduct,
            }}
          />
        )}
        {isSmDown && (
          <FullDialog
            open={selectPro !== ''}
            handleClose={() => setSelectPro('')}
          >
            <Box
              sx={{
                px: [2, 2, 3],
                display: 'flex',
                flexDirection: 'column',
                minHeight: 'calc(100% - 56px)',
              }}
            >
              <ProductDetail
                {...{
                  selectCate,
                  selectPro,
                  setSelectPro,
                  listCategories,
                  setSelectCate,
                  refreshListCate,
                  edit,
                  setEdit,
                  productToUpdate,
                  loadingProductList,
                  allListProduct,
                  refreshProduct,
                }}
              />
            </Box>
          </FullDialog>
        )}
      </Grid>
    </Grid>
  );
};
export default ProductTab;

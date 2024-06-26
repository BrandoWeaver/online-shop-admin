import { useRequest } from 'ahooks';
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

  const [selectCate, setSelectCate] = useState<number | 'all'>(-1);
  const [selectPro, setSelectPro] = useState<number | 'new'>(-1);
  const [edit, setEdit] = useState(false);

  const {
    data: listCategories,
    loading: loadingListCate,
    error: errListCate,
    mutate: mutateListCate,
    refresh: refreshListCate,
  } = useRequest(() => PRODUCT_API.listCategory(1), {
    cacheKey: `get-shop-${1}-categories`,
    ready: Boolean(1),
  });

  const allProduct = useMemo(
    () => {
      if (selectCate !== 'all') {
        return listCategories?.find((cate) => cate.id === selectCate)?.products;
      } else {
        return listCategories?.reduce(
          (acc, item) => [...acc, ...item.products],
          [] as IProduct.Product[],
        );
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectCate, listCategories],
  );

  const allCategory = useMemo(() => listCategories, [listCategories]);

  useEffect(() => {
    if (selectCate !== -1 && selectPro !== -1 && selectPro !== 'new') {
      setEdit(false);
    }
  }, [selectCate, selectPro]);

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
        }}
      >
        {selectCate !== -1 && (
          <ProductList
            {...{
              shopId: 1,
              selectPro,
              setSelectPro,

              allProduct,
              allCategory,

              errListCate,
              loadingListCate,
              refreshListCate,
              disableAdd: edit || selectCate === 'all',
              setEdit,
            }}
          />
        )}
        {isSmDown && (
          <FullDialog
            open={selectCate !== -1}
            handleClose={() => setSelectCate(-1)}
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

                  allProduct,
                  allCategory,

                  errListCate,
                  loadingListCate,
                  refreshListCate,
                  disableAdd: edit,
                  setEdit,
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
        {selectPro !== -1 && (
          <ProductDetail
            {...{
              selectCate,
              selectPro,
              setSelectPro,
              allCategory,
              setSelectCate,
              refreshListCate,
              edit,
              setEdit,
            }}
          />
        )}
        {isSmDown && (
          <FullDialog
            open={selectPro !== -1}
            handleClose={() => setSelectPro(-1)}
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
                  allCategory,
                  setSelectCate,
                  refreshListCate,
                  edit,
                  setEdit,
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

import { memo, useEffect, useRef, useState } from 'react';
import { useRequest } from 'ahooks';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import { Box, Button, Stack } from '@mui/material';

import { PRODUCT_API } from 'api/Product';

import { useAuthContext } from 'contexts/AuthContext';
import ErrDialog, { IErrDialogRef } from 'components/Dialog/ErrDialog';
import { StyledTab, StyledTabs } from 'components/CusMuiComp/CusTabs';

import DetailView from './DetailTab/DetailView';
import ProductForm from './DetailTab/ProForm';

import VariantsView from './VariantsTab';

export interface IProductForm
  extends Omit<IProduct.ICreateProData, 'videoFile' | 'thumbnailFile'> {
  discount: boolean;
  videoFile: File | string;
  thumbnailFile: File | string;
  productMedias: IProduct.ProductMedia[];

  deletedIds?: string[];
  show: boolean;
}
interface IProductDetail {
  selectCate: number | 'all';
  selectPro: number | 'new';
  setSelectPro: React.Dispatch<React.SetStateAction<number | 'new'>>;

  allCategory?: IProduct.IProCategory[];
  refreshListCate: () => void;
  setSelectCate: React.Dispatch<React.SetStateAction<number | 'all'>>;

  edit: boolean;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProductDetail = ({
  selectCate,
  selectPro,
  setSelectPro,
  refreshListCate,
  setSelectCate,
  allCategory,
  edit,
  setEdit,
}: IProductDetail) => {
  // console.log('ProductDetail:', allCategory);
  const errAlert = useRef<IErrDialogRef>(null);

  const [active, setActive] = useState(0);

  const { selectedShop } = useAuthContext();

  const {
    data: productDetail,
    run: runGetProDetail,
    loading: loadingGetProDetail,
    error: errGetProDetail,
    refresh: refreshProDetail,
    mutate: mutateProductDetail,
  } = useRequest(PRODUCT_API.getProductDetail, {
    manual: true,
    ready: Boolean(selectedShop?.id && selectPro !== 'new'),
    onSuccess(data) {
      // console.log('getProductDetail onSuccess:', data);
    },
  });

  const { run: runAddNewProduct, loading: loadingAddNewProduct } = useRequest(
    PRODUCT_API.addNewProduct,
    {
      manual: true,
      ready: selectPro === 'new',
      onSuccess: (data) => {
        // console.log('addNewProduct onSuccess:', data);
        refreshListCate();
        setSelectCate(+data.categoryId);
        setSelectPro(data.id);
        setEdit(false);
      },
      onError: (err) => errAlert.current?.open(err),
    }
  );

  const { run: runEditProduct, loading: loadingEditProduct } = useRequest(
    PRODUCT_API.editProduct,
    {
      manual: true,
      ready: selectPro !== 'new',
      onSuccess: (data) => {
        // console.log('editProduct onSuccess:', data);
        setEdit(false);
        refreshListCate();
        setSelectCate(+data.categoryId);
        setSelectPro(data.id);
        mutateProductDetail(data);
      },
      onError: (err) => errAlert.current?.open(err),
    }
  );

  // console.log('productDetail:', productDetail);
  // console.log('errGetProDetail:', errGetProDetail);

  const methods = useForm<IProductForm>({ shouldUnregister: true });

  const onSubmit: SubmitHandler<IProductForm> = ({
    discount,
    thumbnailFile,
    videoFile,
    productMedias,
    ...data
  }) => {
    console.log('onSubmit', data);
    if (selectedShop && selectCate) {
      if (selectPro === 'new') {
        runAddNewProduct(selectedShop?.id, {
          ...data,
          afterDiscount: discount ? data.afterDiscount : data.price,
          qty: '999999',
          unit: 'pcs',
          // categoryId: selectCate.toString(),
          ...(thumbnailFile &&
            typeof thumbnailFile !== 'string' && {
              thumbnailFile,
            }),
          ...(videoFile &&
            typeof videoFile !== 'string' && {
              videoFile,
            }),
        });
      } else {
        runEditProduct(selectedShop?.id, {
          ...data,
          id: selectPro,
          afterDiscount: discount ? data.afterDiscount : data.price,
          qty: '999999',
          unit: 'pcs',
          ...(thumbnailFile &&
            typeof thumbnailFile !== 'string' && {
              thumbnailFile,
            }),
          ...(videoFile &&
            typeof videoFile !== 'string' && {
              videoFile,
            }),
        });
      }
    }
  };

  const onCancelClick = () => {
    if (selectPro === 'new') {
      setSelectPro(-1);
    }
    setEdit(false);
  };

  useEffect(() => {
    if (selectedShop && selectPro !== 'new') {
      runGetProDetail(selectedShop?.id, selectPro);
    } else if (selectPro === 'new') {
      setEdit(true);
      methods.setValue('name', 'New Product');
      methods.setValue('thumbnailFile', '');
      methods.setValue('desc', '');
      methods.setValue('price', '');
      methods.setValue('discount', false);
      methods.setValue('afterDiscount', '');
      methods.setValue('categoryId', selectCate?.toString() || '');
      methods.setValue('inventoryStatus', '');
      methods.setValue('videoFile', '');
      methods.setValue('productMedias', []);
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectPro, selectedShop]);

  useEffect(() => {
    if (edit && productDetail && productDetail.id === selectPro) {
      methods.setValue('name', productDetail.name);
      methods.setValue('thumbnailFile', productDetail?.thumbnail || '');
      methods.setValue('desc', productDetail.desc);
      methods.setValue('price', (+(productDetail.price || 0)).toFixed(2));
      if (productDetail.price !== productDetail.afterDiscount) {
        methods.setValue('discount', true);
      } else {
        methods.setValue('discount', false);
      }
      methods.setValue(
        'afterDiscount',
        (+(productDetail.afterDiscount || 0)).toFixed(2)
      );
      methods.setValue('categoryId', productDetail.categoryId.toString());
      methods.setValue('inventoryStatus', productDetail.inventoryStatus);
      methods.setValue('videoFile', productDetail?.video || '');
      methods.setValue('photoFiles', []);
      methods.setValue('productMedias', productDetail?.productMedias || []);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [edit, productDetail]);

  const isLoading = loadingEditProduct || loadingAddNewProduct;

  return (
    <>
      <ErrDialog ref={errAlert} />

      <Box sx={{ px: [0, 0, 2], top: 0 }}>
        <StyledTabs
          value={active}
          onChange={(_, v) => setActive(+v)}
          sx={{
            fontSize: 'body1.fontSize',
            borderBottom: 'none',
            '& .MuiTabs-indicator': {
              height: '0.5px',
              backgroundColor: (theme) => theme.palette.divider,
            },
          }}
        >
          <StyledTab
            label='Details'
            sx={{
              minWidth: 'auto',
              py: 2,
              px: 0,
              mr: 4,
              color: 'text.disabled',
              '&.Mui-selected': {
                color: 'text.secondary',
              },
            }}
          />
          <StyledTab
            label='Variants'
            sx={{
              minWidth: 'auto',
              py: 2,
              px: 0,
              color: 'text.disabled',
              '&.Mui-selected': {
                color: 'text.secondary',
              },
            }}
          />
        </StyledTabs>
      </Box>

      {active === 0 && (
        <>
          <Box sx={{ flexGrow: 1, overflowY: 'auto', overflowX: 'hidden' }}>
            {edit ? (
              <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                  <ProductForm {...{ allCategory }} />
                </form>
              </FormProvider>
            ) : (
              <DetailView
                {...{
                  data: productDetail
                    ? {
                        ...productDetail,
                        categoryName: allCategory?.find(
                          (cate) => cate.id === productDetail?.categoryId
                        )?.name,
                      }
                    : undefined,
                  loading: loadingGetProDetail,
                  refresh: refreshProDetail,
                  error: errGetProDetail,
                }}
              />
            )}
          </Box>
          <Stack direction='row' justifyContent='center' spacing={2} my={2}>
            {!edit ? (
              <Button
                variant='contained'
                color='inherit'
                sx={{ minWidth: 100 }}
                onClick={() => setEdit(true)}
              >
                Edit
              </Button>
            ) : (
              <>
                <Button
                  onClick={onCancelClick}
                  disabled={isLoading}
                  sx={{ minWidth: 100 }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={methods.handleSubmit(onSubmit)}
                  variant='contained'
                  disabled={isLoading}
                  sx={{ minWidth: 100 }}
                >
                  Save
                </Button>
              </>
            )}
          </Stack>
        </>
      )}

      {active === 1 && (
        <>
          {selectedShop && selectPro !== 'new' && productDetail && (
            <VariantsView
              edit={edit}
              proId={selectPro}
              shopId={selectedShop?.id}
              basePrice={+productDetail?.afterDiscount}
              onEditClick={() => setEdit(true)}
              onCancelClick={() => setEdit(false)}
            />
          )}
        </>
      )}

      {/* <Box sx={{ flexGrow: 1, overflowY: 'auto', overflowX: 'hidden' }}>
        <TabPanel value={active} index={0}>
          {edit ? (
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(onSubmit)}>
                <ProductForm {...{ allCategory }} />
              </form>
            </FormProvider>
          ) : (
            <DetailView
              {...{
                data: productDetail
                  ? {
                      ...productDetail,
                      categoryName: allCategory?.find(
                        (cate) => cate.id === productDetail?.categoryId
                      )?.name,
                    }
                  : undefined,
                loading: loadingGetProDetail,
                refresh: refreshProDetail,
                error: errGetProDetail,
              }}
            />
          )}
        </TabPanel>
        <TabPanel value={active} index={1}>
          {selectedShop && selectPro !== 'new' && productDetail && (
            <VariantsView
              edit={edit}
              proId={selectPro}
              shopId={selectedShop?.id}
              basePrice={+productDetail?.afterDiscount}
            />
          )}
        </TabPanel>
      </Box>

      <Stack direction='row' justifyContent='center' spacing={2} my={2}>
        {!edit ? (
          <Button
            variant='contained'
            color='inherit'
            sx={{ minWidth: 100 }}
            onClick={() => setEdit(true)}
          >
            Edit
          </Button>
        ) : (
          <>
            <Button
              onClick={onCancelClick}
              disabled={isLoading}
              sx={{ minWidth: 100 }}
            >
              Cancel
            </Button>
            <Button
              onClick={methods.handleSubmit(onSubmit)}
              variant='contained'
              disabled={isLoading}
              sx={{ minWidth: 100 }}
            >
              Save
            </Button>
          </>
        )}
      </Stack> */}
    </>
  );
};
export default memo(ProductDetail);

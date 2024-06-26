import { useRequest } from 'ahooks';
import { memo, useRef, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import { Box, Button, Stack } from '@mui/material';

import { PRODUCT_API } from 'api/Product';

import { StyledTab, StyledTabs } from 'components/CusMuiComp/CusTabs';
import ErrDialog, { IErrDialogRef } from 'components/Dialog/ErrDialog';

import DetailView from './DetailTab/DetailView';
import ProductForm from './DetailTab/ProForm';

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

  const {
    data: productDetail,
    loading: loadingGetProDetail,
    error: errGetProDetail,
    refresh: refreshProDetail,
  } = useRequest(PRODUCT_API.getProductDetail, {
    manual: true,
    // ready: Boolean(1 && selectPro !== 'new'),
    onSuccess(data) {
      // console.log('getProductDetail onSuccess:', data);
    },
  });

  // const { run: runAddNewProduct, loading: loadingAddNewProduct } = useRequest(
  //   PRODUCT_API.addNewProduct,
  //   {
  //     manual: true,
  //     ready: selectPro === 'new',
  //     onSuccess: (data) => {
  //       // console.log('addNewProduct onSuccess:', data);
  //       refreshListCate();
  //       setSelectCate(+data.categoryId);
  //       setSelectPro(data.id);
  //       setEdit(false);
  //     },
  //     onError: (err) => errAlert.current?.open(err),
  //   },
  // );

  // const { run: runEditProduct, loading: loadingEditProduct } = useRequest(
  //   PRODUCT_API.editProduct,
  //   {
  //     manual: true,
  //     ready: selectPro !== 'new',
  //     onSuccess: (data) => {
  //       // console.log('editProduct onSuccess:', data);
  //       setEdit(false);
  //       refreshListCate();
  //       setSelectCate(+data.categoryId);
  //       setSelectPro(data.id);
  //       mutateProductDetail(data);
  //     },
  //     onError: (err) => errAlert.current?.open(err),
  //   },
  // );

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
  };

  const onCancelClick = () => {
    if (selectPro === 'new') {
      setSelectPro(-1);
    }
    setEdit(false);
  };

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
                          (cate) => cate.id === productDetail?.categoryId,
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
                <Button onClick={onCancelClick} sx={{ minWidth: 100 }}>
                  Cancel
                </Button>
                <Button
                  onClick={methods.handleSubmit(onSubmit)}
                  variant='contained'
                  sx={{ minWidth: 100 }}
                >
                  Save
                </Button>
              </>
            )}
          </Stack>
        </>
      )}

      {/* {active === 1 && (
        <>
         
            <VariantsView
              edit={edit}
              proId={selectPro}
              shopId={1}
              basePrice={+productDetail?.afterDiscount}
              onEditClick={() => setEdit(true)}
              onCancelClick={() => setEdit(false)}
            />
          
        </>
      )} */}

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
              shopId={1}
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

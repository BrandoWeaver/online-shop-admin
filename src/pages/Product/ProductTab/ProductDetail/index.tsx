import { memo, useState } from 'react';

import { Box } from '@mui/material';

import { StyledTab, StyledTabs } from 'components/CusMuiComp/CusTabs';

import ProductDetailPage from '../ProductList/ProductDetail';
import CreateProductForm from '../ProductList/ProductForm';

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
  selectCate: string | 'all';
  selectPro: string | 'new';
  setSelectPro: React.Dispatch<React.SetStateAction<string | 'new'>>;
  refreshListCate: () => void;
  setSelectCate: React.Dispatch<React.SetStateAction<string | 'all'>>;
  productToUpdate: IProduct.IProductNew | undefined;
  edit: boolean;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
  loadingProductList: boolean;
  allListProduct: IProduct.IproductListNew | undefined;
  refreshProduct: () => void;
}

const ProductDetail = ({
  selectPro,
  setSelectPro,
  edit,
  setEdit,
  productToUpdate,
  refreshProduct,
}: IProductDetail) => {
  const [active, setActive] = useState(0);
  return (
    <>
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
            label={selectPro !== 'new' ? 'Product Detail' : 'Add Product'}
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
        </StyledTabs>
      </Box>

      {active === 0 && (
        <>
          <Box sx={{ flexGrow: 1, overflowY: 'auto', overflowX: 'hidden' }}>
            {/* {edit ? (
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
            )} */}
            {selectPro === 'new' || edit ? (
              <CreateProductForm
                setSelectPro={setSelectPro}
                refreshProduct={refreshProduct}
                productToUpdate={productToUpdate}
                proId={selectPro}
              />
            ) : (
              <ProductDetailPage {...productToUpdate} />
            )}
          </Box>
          {/* <Stack direction='row' justifyContent='center' spacing={2} my={2}>
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
          </Stack> */}
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

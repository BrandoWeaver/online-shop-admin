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
        </>
      )}
    </>
  );
};
export default memo(ProductDetail);

import HttpUtil from 'utils/http-util';
import { ROUTE_API } from 'utils/route-util';

const PRODUCT_API = {
  listProduct: async (shopId: number) => {
    const res = await HttpUtil.get<IProduct.IProductList>(
      ROUTE_API.productList.replace(':id', shopId.toString())
    );
    return res.data;
  },

  listCategory: async (shopId: number) => {
    const res = await HttpUtil.get<IProduct.IProCategory[]>(
      ROUTE_API.listProCate.replace(':id', shopId.toString())
    );
    return res.data;
  },

  rearrangeCategory: async (
    shopId: number,
    data: { id: number; sort: number }
  ) => {
    const res = await HttpUtil.post<{ message: string }>(
      ROUTE_API.rearrangeProCate.replace(':id', shopId.toString()),
      data
    );
    return res.data;
  },

  addNewCategory: async (shopId: number, data: { name: string }) => {
    const res = await HttpUtil.post<{ message: string }>(
      ROUTE_API.addProCate.replace(':id', shopId.toString()),
      data
    );
    return res.data;
  },

  editCategory: async (shopId: number, data: { id: number; name: string }) => {
    const res = await HttpUtil.post<{ message: string }>(
      ROUTE_API.editProCate.replace(':id', shopId.toString()),
      data
    );
    return res.data;
  },

  deleteCategory: async (shopId: number, cateId: number) => {
    const res = await HttpUtil.post<{ message: string }>(
      ROUTE_API.deleteProCate
        .replace(':id', shopId.toString())
        .replace(':cateId', cateId.toString())
    );
    return res.data;
  },

  rearrangeProduct: async (
    shopId: number,
    data: { id: number; sort: number }
  ) => {
    const res = await HttpUtil.post<{ message: string }>(
      ROUTE_API.rearrangeProduct.replace(':id', shopId.toString()),
      data
    );
    return res.data;
  },

  deleteProduct: async (shopId: number, proId: number) => {
    const res = await HttpUtil.post<{ message: string }>(
      ROUTE_API.deleteProduct
        .replace(':id', shopId.toString())
        .replace(':proId', proId.toString())
    );
    return res.data;
  },

  getProductDetail: async (shopId: number, proId: number) => {
    const res = await HttpUtil.get<IProduct.IProductDetail>(
      ROUTE_API.getProductDetail
        .replace(':id', shopId.toString())
        .replace(':proId', proId.toString())
    );
    return res.data;
  },

  addNewProduct: async (shopId: number, data: IProduct.ICreateProData) => {
    let formData = new FormData();
    let objKey: keyof IProduct.ICreateProData;
    for (objKey in data) {
      const val = data[objKey];
      if (val !== undefined && val !== null) {
        if (Array.isArray(val)) {
          for (let index = 0; index < val.length; index++) {
            const v = val[index];
            formData.append(`${objKey}`, v);
          }
        } else {
          formData.append(objKey, val);
        }
      }
    }
    const res = await HttpUtil.post<IProduct.IProductDetail>(
      ROUTE_API.addNewProduct.replace(':id', shopId.toString()),
      formData
    );
    return res.data;
  },

  editProduct: async (shopId: number, data: IProduct.IEditProData) => {
    let formData = new FormData();
    let objKey: keyof IProduct.IEditProData;
    for (objKey in data) {
      const val = data[objKey];
      if (val !== undefined && val !== null) {
        if (Array.isArray(val)) {
          for (let index = 0; index < val.length; index++) {
            const v = val[index];
            formData.append(`${objKey}[]`, v);
          }
        } else {
          formData.append(objKey, val.toString());
        }
      }
    }
    const res = await HttpUtil.post<IProduct.IProductDetail>(
      ROUTE_API.updateProduct.replace(':id', shopId.toString()),
      formData
    );
    return res.data;
  },

  listProductVariants: async (shopId: number, proId: number) => {
    const res = await HttpUtil.get<IProduct.IProVariant[]>(
      ROUTE_API.listProductVariant
        .replace(':id', shopId.toString())
        .replace(':proId', proId.toString())
    );
    return res.data;
  },

  listProductOptions: async (
    shopId: number,
    proId: number,
    filters: string[]
  ) => {
    const res = await HttpUtil.post<IProduct.IProOption[]>(
      ROUTE_API.filterProductOption
        .replace(':id', shopId.toString())
        .replace(':proId', proId.toString()),
      { productId: proId, filters }
    );
    return res.data;
  },

  updateProVariant: async (
    shopId: number,
    proId: number,
    data: {
      level: number;
      groupTitle: string;
    }
  ) => {
    const res = await HttpUtil.post<IProduct.IUpdateVarRes>(
      ROUTE_API.updateVariant
        .replace(':id', shopId.toString())
        .replace(':proId', proId.toString()),
      data
    );
    return res.data;
  },

  addNewVariant: async (
    shopId: number,
    proId: number,
    data: IProduct.IAddNewVariant
  ) => {
    const res = await HttpUtil.post<IProduct.IProVariant[]>(
      ROUTE_API.addProductVariant
        .replace(':id', shopId.toString())
        .replace(':proId', proId.toString()),
      data
    );
    return res.data;
  },

  addNewVarOption: async (
    shopId: number,
    proId: number,
    data: IProduct.IAddNewVarOpt
  ) => {
    const res = await HttpUtil.post<IProduct.IUpdateVarRes>(
      ROUTE_API.addGroupOption
        .replace(':id', shopId.toString())
        .replace(':proId', proId.toString()),
      data
    );
    return res.data;
  },

  deleteProVariant: async (
    shopId: number,
    proId: number,
    data: { level: number }
  ) => {
    const res = await HttpUtil.post<IProduct.IUpdateVarRes>(
      ROUTE_API.deleteProductVariant
        .replace(':id', shopId.toString())
        .replace(':proId', proId.toString()),
      data
    );
    return res.data;
  },

  deleteProVariantOpt: async (
    shopId: number,
    proId: number,
    data: { level: number; titles: string[] }
  ) => {
    const res = await HttpUtil.post<IProduct.IUpdateVarRes>(
      ROUTE_API.deleteGroupOption
        .replace(':id', shopId.toString())
        .replace(':proId', proId.toString()),
      data
    );
    return res.data;
  },

  updateVarOptionsPrice: async (
    shopId: number,
    proId: number,
    data: IProduct.IOptionPrice[]
  ) => {
    const res = await HttpUtil.post<IProduct.IUpdateVarRes>(
      ROUTE_API.updateOptionPrice
        .replace(':id', shopId.toString())
        .replace(':proId', proId.toString()),
      data
    );
    return res.data;
  },

  deleteVariantOptions: async (
    shopId: number,
    proId: number,
    data: number[]
  ) => {
    const res = await HttpUtil.post<IProduct.IUpdateVarRes>(
      ROUTE_API.deleteProductOption
        .replace(':id', shopId.toString())
        .replace(':proId', proId.toString()),
      data
    );
    return res.data;
  },
};

export { PRODUCT_API };

import HttpUtil from 'utils/http-util';
import { ROUTE_API } from 'utils/route-util';

const PRODUCT_API = {
  listProducts: async (cateId?: string, name?: string) => {
    const res = await HttpUtil.get<IProduct.IproductListNew>(
      ROUTE_API.listProduct,
      {
        params: {
          cate_id: cateId,
          name: name,
        },
      },
    );
    return res.data;
  },
  listCategory: async () => {
    const res = await HttpUtil.get<IProduct.IlistCategory>(
      ROUTE_API.listCategory,
    );
    return res.data;
  },
  rearrangeCategory: async (search?: string) => {
    const res = await HttpUtil.get<IProduct.IlistCategory>(
      ROUTE_API.listCategory,
      {
        params: {
          search: search,
        },
      },
    );
    return res.data;
  },
  addNewCategory: async (data: {
    name: string;
    image: File | null;
    des?: string;
  }) => {
    const formData = new FormData();
    formData.append('name', data.name);
    if (data.image) {
      formData.append('image', data.image);
    }
    if (data.des) {
      formData.append('des', data.des);
    }
    const res = await HttpUtil.post(ROUTE_API.createCategory, formData);
    return res.data;
  },
  editCategory: async (
    cateId: string,
    data: {
      name?: string;
      image?: File | null;
      des?: string;
    },
  ) => {
    const formData = new FormData();
    formData.append('name', data.name || '');
    if (data.image) {
      formData.append('image', data.image);
    }
    if (data.des) {
      formData.append('des', data.des);
    }
    const res = await HttpUtil.put(
      ROUTE_API.editProCate.replace(':id', cateId),
      data,
    );
    return res.data;
  },
  deleteProduct: async (proId: string) => {
    const res = await HttpUtil.delete(
      ROUTE_API.deleteProduct.replace(':id', proId),
    );
    return res.data;
  },
  addProduct: async (data: IProduct.ICreate) => {
    let formData = new FormData();
    let objKey: keyof IProduct.ICreate;
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
      ROUTE_API.createProduct,
      formData,
    );
    return res.data;
  },
  editProduct: async (proId: string, data: IProduct.ICreate) => {
    let formData = new FormData();
    let objKey: keyof IProduct.ICreate;
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
    const res = await HttpUtil.put<IProduct.IProductDetail>(
      ROUTE_API.updateProduct.replace(':id', proId),
      formData,
    );
    return res.data;
  },
  //my api
  editProductApi: async (
    productId: string,
    formData: IprodcType.EditProductFormData,
  ): Promise<IprodcType.ProductResponse> => {
    const { name, description, price, cate_id, quantity, status, image } =
      formData;
    const bodyFormData = new FormData();
    bodyFormData.append('name', name);
    bodyFormData.append('description', description);
    bodyFormData.append('price', String(price));
    bodyFormData.append('cate_id', cate_id);
    bodyFormData.append('quantity', String(quantity));
    bodyFormData.append('status', status);
    if (image instanceof File) {
      bodyFormData.append('image', image);
    } else {
      bodyFormData.append('image', image); // Assuming image is already a string URL
    }

    const res = await HttpUtil.put<IprodcType.ProductResponse>(
      `${ROUTE_API.editProduct}/${productId}`,
      bodyFormData,
    );
    return res.data;
  },
  deleteProductAPI: async (productId: string): Promise<void> => {
    await HttpUtil.delete(`${ROUTE_API.deleteProduct}/${productId}`);
  },
};

export { PRODUCT_API };

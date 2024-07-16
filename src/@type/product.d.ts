declare namespace IProduct {
  interface IProductList {
    pagination: Pagination;
    data: IProduct[];
  }

  interface IProduct {
    video?: any;
    id: number;
    name: string;
    price: number;
    categoryId: number;
    productMedias: ProductMedia[];
    productTags: any[];
    category: Category;
  }

  interface Category {
    id: number;
    name: string;
  }

  interface ProductMedia {
    url: string;
    id: number;
    type?: any;
  }

  interface Pagination {
    page: number;
    pageSize: number;
    totalPage: number;
    totalCount: number;
  }

  export interface ICategoryProduct {
    categories: Category[];
  }

  export interface Category {
    _id: string;
    cate_id: string;
    name: string;
    description: string;
    image: string;
    createdAt: string;
    updatedAt: string;
  }

  interface Product {
    thumbnail: string;
    id: number | 'new';
    name: string;
    price: number;
    afterDiscount: number;
    sort: number;
    checkoutLink: string;
  }

  interface ICreateProData {
    name: string;
    price: string;
    afterDiscount: string;
    qty: string;
    unit: string;
    desc: string;
    categoryId: string;
    brand: string;
    condition: string;
    inventoryStatus: string;
    photoFiles?: File[];
    videoFile?: File | null;
    thumbnailFile?: File | null;
  }

  interface IProductDetail {
    thumbnail: string;
    inventoryStatus: string;
    eta: number;
    sort: number;
    show: boolean;
    id: number;
    name: string;
    price: string;
    afterDiscount: string;
    qty: string;
    unit: string;
    desc: string;
    categoryId: number;
    categoryName?: string;
    productMedias: ProductMedia[];
    productOptions: IProOption[];
    shopId: number;
    video?: string;
    updatedAt: string;
    createdAt: string;
  }

  interface ProductMedia {
    url: string;
    sort: number;
    id: number;
    productId: number;
    updatedAt: string;
    createdAt: string;
  }

  interface IEditProData extends ICreateProData {
    id: number;
    deletedIds?: string[];
    show: boolean;
  }

  interface IProVariant {
    product_id: number;
    group_title: string;
    level: number;
    children: string[];
  }

  export interface IProOption {
    id: number;
    groupTitle: string;
    sku?: any;
    title: string;
    price: number;
    afterDiscount: number;
    url?: any;
    qty: number;
    unit?: any;
    level: number;
    sort: number;
    productId: number;
    productOptionId: number;
  }

  interface IAddNewVariant {
    groupTitle: string;
    price: number;
    options: string[];
  }

  interface IUpdateVarRes {
    totalCount: number;
    message: string;
  }

  interface IAddNewVarOpt {
    level: number;
    price: number;
    title: string;
  }

  interface IOptionPrice {
    id: number;
    price: number;
    afterDiscount: number;
  }

  //My Category API
  export interface IlistCategory {
    categories: Category[];
  }

  export interface Category {
    _id: string;
    cate_id: string;
    name: string;
    description: string;
    image: string;
    createdAt: string;
    updatedAt: string;
  }

  export interface IproductListNew {
    products: IProductNew[];
  }

  export interface IProductNew {
    _id: string;
    name: string;
    description: string;
    price: number;
    cate_id: string;
    quantity: number;
    image: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    isProductIdIncluded?: boolean;
  }

  // create pro
  interface ICreate {
    name: string;
    description: string;
    price: string;
    quantity: string;
    image: File | string;
    status: string;
    cate_id: string;
  }
  // cate
  export interface IlistCategory {
    categories: Category[];
  }

  export interface Category {
    _id: string;
    cate_id: string;
    name: string;
    description: string;
    image: string;
    createdAt: string;
    updatedAt: string;
  }
}

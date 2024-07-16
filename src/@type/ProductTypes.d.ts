declare namespace IprodcType {
  export interface EditProductFormData {
    name: string;
    description: string;
    price: number;
    cate_id: string;
    quantity: number;
    status: string;
    image: File | string; // Assuming image is either a File or a string URL
  }

  export interface ProductResponse {
    message: string;
    product: Product;
  }

  export interface Product {
    _id: string;
    sku: string;
    name: string;
    description: string;
    price: number;
    cate_id: string;
    quantity: number;
    image: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    discountedPrice: number;
    isOnPromotion: boolean;
    salesVolume: number;
    __v: number;
  }
}

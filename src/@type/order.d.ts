declare namespace Iorder {
  export interface IorderAcitve {
    totalOrders: number;
    statusCounts: StatusCount[];
  }

  export interface StatusCount {
    status: string;
    count: number;
  }

  export interface IlistOrder {
    orders: Order[];
    totalPages: number;
    currentPage: number;
  }
  export interface Isummary {
    totalOrders: number;
    completedOrders: number;
    totalEarnings: number;
  }
  export interface Order {
    _id: string;
    userId: UserId;
    userName: string;
    lat: number;
    lng: number;
    phoneNumber: string;
    notes: string;
    status: string;
    items: Item[];
    totalPrice: number;
    createdAt: string;
    __v: number;
  }

  export interface UserId {
    _id: string;
    username: string;
  }

  export interface Item {
    product: Product;
    quantity: number;
    _id: string;
  }

  export interface Product {
    _id: string;
    name: string;
    price: number;
    image: string;
  }

  export interface IhistoryOrder {
    orders: Order[];
    totalOrders: number;
  }

  export interface Order {
    _id: string;
    userId: UserId;
    userName: string;
    lat: number;
    lng: number;
    phoneNumber: string;
    notes: string;
    status: string;
    items: Item[];
    totalPrice: number;
    createdAt: string;
    __v: number;
  }

  export interface UserId {
    _id: string;
    username: string;
    email: string;
  }

  export interface Item {
    product: Product;
    quantity: number;
    _id: string;
  }

  export interface Product {
    _id: string;
    name: string;
    price: number;
  }
}

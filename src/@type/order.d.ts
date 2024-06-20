declare namespace Iorder {
    interface IlistOrder {
        pagination: Pagination;
        data: Datum[];
      }
      
      interface Datum {
        trackingId: string;
        amountRiel: number;
        afterDiscount: number;
        afterDiscountRiel: number;
        deliveryFee: number;
        deliveryFeeRiel: number;
        paidDeliveryFeeRiel: number;
        totalAmount: number;
        totalAmountRiel: number;
        paymentReceipt?: any;
        id: number;
        consensus: boolean;
        tranId?: any;
        tranSessionId?: any;
        isPaid: boolean;
        amount: number;
        paidDeliveryFee: number;
        deliveryOption: string;
        customerName: string;
        customerAddress?: any;
        customerContact: string;
        isFirstOrder: boolean;
        resumeReason?: any;
        rejectReason?: any;
        poi?: any;
        mapUrl?: any;
        bookingId?: any;
        provinceBookingId?: any;
        fulfillmentOption: FulfillmentOption;
        trackingUrl?: any;
        driverName?: any;
        driverPhone?: any;
        plateNumber?: any;
        totalQty: number;
        paymentType: string;
        zone: string;
        note?: string;
        status: string;
        tadaId?: any;
        createdAt: string;
        updatedAt: string;
        buyerAddressId?: number;
        communeId?: any;
        districtId?: any;
        shopId: number;
        paymentOptionId?: number;
        provinceId: number;
        villageId?: any;
        orderDetails: OrderDetail[];
        orderTrackings: OrderTracking[];
        province: Province;
        district?: any;
        orderNotes: Note[];
      }
      
     interface Note {
        note: string;
        status: boolean;
        id: number;
        userId: number;
        name: string;
        createdAt?: null | string | string;
        orderId: number;
        type:string;
        visibleToSeller:boolean;
      }
      
      interface Province {
        id: number;
        nameEn: string;
        nameKh: string;
      }
      
      export interface OrderTracking {
        id: number;
        status: string;
        url?: any;
        address?: any;
        createdAt: string;
        updatedAt: string;
        orderId: number;
      }
      
      export interface OrderDetail {
        afterDiscount: number;
        id: number;
        options: IProOption[];
        name: string;
        unit?: any;
        price: number;
        qty: number;
        unavailable: boolean;
        url: string;
        inventoryStatus: string;
        eta?: null | string | string;
        orderId: number;
        productId: number;
      }
      interface IProOption {
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
    
      interface FulfillmentOption {
        ppDelivery: number;
        ppDeliveryOption: PpDeliveryOption[];
        provinceDelivery: number;
        ppManageOwnDeliveryFee: number;
        provinceDeliveryOption: PpDeliveryOption[];
        provinceManageOwnDeliveryFee: number;
      }
      
      interface PpDeliveryOption {
        icon: string;
        name: string;
        price: number;
        selected: number;
        changePrice: number;
        description: string[];
        customizedPrice: number;
      }
      
      interface Pagination {
        page: number;
        pageSize: number;
        totalPage: number;
        totalCount: number;
      }
      interface Ihistory {
        totalOrder: number;
        totalAmount: number;
        totalProduct: number;
      }
      interface Iaddress {
        id: number;
        fullName?: any;
        phone: string;
        createdAt: string;
        updatedAt: string;
        buyerAddresses: BuyerAddress[];
      }
      interface BuyerAddress {
        location: Location;
        id: number;
        name?: string;
        label: string;
        address: string;
        createdAt: string;
        updatedAt: string;
        buyerId: number;
      }
      
      interface Location {
        lat: number;
        lng: number;
      }
      
interface Ilisproduct {
    pagination: Pagination;
    data: Datum[];
  }
  
  interface Datum {
    video?: string;
    id: number;
    name: string;
    price: number;
    categoryId?: number;
    productMedias: ProductMedia[];
    productTags: any[];
    category?: Category;
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
  interface Ihistory {
    totalOrder: number;
    totalAmount: number;
    totalProduct: number;
  }
}

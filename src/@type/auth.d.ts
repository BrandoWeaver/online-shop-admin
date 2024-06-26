declare namespace IAuth {
  export interface ILoginRes {
    status: string;
    token: string;
    user: User;
  }

  export interface User {
    id: string;
    username: string;
    email: string;
    phone: string;
  }
  interface ILoginReq {
    username: string;
    password: string;
    rememberMe: boolean;
  }
  // interface ILoginRes {
  //   access_token: string;
  //   token_type: string;
  // }

  interface IUserInfo {
    id: number;
    username: string;
    verified: boolean;
    admin: boolean;
    activeShopId?: any;
    suspended: boolean;
    lastActiveDate?: any;
    thirdPartyId?: any;
    createdAt: string;
    updatedAt: string;
    clientId: number;
  }

  interface ISellerInfo {
    username: string;
    id: number;
    onlineId: string;
    admin: boolean;
    type: string;
    activeShopId: number;
    lastActiveDate?: any;
    thirdPartyId?: any;
    shops: Shop[];
    userInfo?: any;
  }

  interface Shop {
    logo: string;
    telegramStatus: string;
    id: number;
    name: string;
    tagline?: any;
    domain: string;
    contact: Contact;
    telegramId: string;
    addr: string;
    fulfillmentOption: FulfillmentOption;
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

  interface Contact {
    phone1: string;
    phone2: string;
  }
}

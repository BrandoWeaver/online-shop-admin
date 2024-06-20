declare namespace IShop {
  interface IShopInfo {
    logo: string;
    previewBanner?: any;
    video?: any;
    telegramStatus: string;
    alertMessage?: any;
    location: Location;
    id: number;
    name: string;
    status?: any;
    subscriptionType: string;
    tagline?: any;
    domain: string;
    primaryColor: string;
    secondaryColor: string;
    lang: string;
    isExpired: boolean;
    facebookPageId?: any;
    tadaLocationId?: any;
    telegramId: string;
    operatingHour: OperatingHour[];
    contact: Contact;
    mapUrl?: any;
    addr: string;
    poi?: any;
    fulfillmentOption: FulfillmentOption;
    apiKey?: any;
    createdAt: string;
    updatedAt: string;
    groupShopId?: any;
    adminId?: any;
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

  interface OperatingHour {
    day: number;
    open: boolean;
    hours: string[];
  }

  interface Location {
    lat: number;
    lng: number;
  }


  
interface Ibank {
  accountName: string;
  accountNumber: string;
  status: boolean;
  sort: number;
  paymentOptionId: number;
  shopId: number;
  paymentOption: PaymentOption;
}

interface PaymentOption {
  logo: string;
  id: number;
  name: string;
}
}

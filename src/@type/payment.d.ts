declare namespace Ipayment {
  export type IpaymentList = Root2[];

  export interface Root2 {
    _id: string;
    name: string;
    accountNumber: string;
    imageUrl: string;
    createdAt: string;
    __v: number;
  }
}

import HttpUtil from 'utils/http-util';
import { ROUTE_API } from 'utils/route-util';

const PAYMENT_API = {
  addPayment: async ({
    name,
    accountNumber,
    image,
  }: {
    name: string;
    accountNumber: number;
    image: File | '';
  }) => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('accountNumber', accountNumber.toString());
    formData.append('image', image);
    const res = await HttpUtil.post(ROUTE_API.addShopPayment, formData);
    return res.data;
  },
  deletePayment: async (id: string) => {
    const res = await HttpUtil.delete(
      ROUTE_API.removePaymentOpt.replace(':id', id),
    );
    return res.data;
  },
  listAllPayment: async () => {
    const res = await HttpUtil.get<Ipayment.IlistPayment[]>(
      ROUTE_API.listShopPayment,
    );
    return res.data;
  },
};
export default PAYMENT_API;

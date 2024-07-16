import HttpUtil from 'utils/http-util';
import { ROUTE_API } from 'utils/route-util';

const SHOP = {
  getPayment: async (shopId: string) => {
    const res = await HttpUtil.get(
      ROUTE_API.listShopPayment.replace(':id', shopId.toString),
    );
    return res.data;
  },
};

export default SHOP;

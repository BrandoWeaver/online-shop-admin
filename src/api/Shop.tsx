import HttpUtil from "utils/http-util";
import { ROUTE_API } from "utils/route-util";

const SHOP = {
  getShopInfo: async (shopId: string) => {
    const res = await HttpUtil.get<IShop.IShopInfo>(
      ROUTE_API.getShopInfo.replace(":id", shopId.toString())
    );
    return res.data;
  },
  //shopId.toString()
  // getUserProfile: async () => {
  //   const res = await HttpUtil.get<IAuth.IUserInfo>(ROUTE_API.getAuthInfo);
  //   return res.data;
  // },
  getPayment: async (shopId: string) => {
    const res = await HttpUtil.get(
      ROUTE_API.listShopPayment.replace(":id", shopId.toString)
    );
    return res.data;
  },
};

export default SHOP;

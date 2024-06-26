import HttpUtil from 'utils/http-util';
import { ROUTE_API } from 'utils/route-util';

const SHOP_PERFORMANCE = {
  shopPerformance: async () => {
    const res = await HttpUtil.get<IshopPerformance.IWeeklyPerformance>(
      ROUTE_API.getShopPerformance,
    );
    console.log('res', res);
    return res.data;
  },
};

export default SHOP_PERFORMANCE;

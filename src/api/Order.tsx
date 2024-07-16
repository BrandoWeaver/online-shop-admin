import HttpUtil from 'utils/http-util';
import { ROUTE_API } from 'utils/route-util';

const ORDER = {
  getOrderActive: async () => {
    const res = await HttpUtil.get<Iorder.IorderAcitve>(
      ROUTE_API.getOrderActive,
    );
    return res.data;
  },
  getListOrder: async (status: string) => {
    const res = await HttpUtil.get<Iorder.IlistOrder>(ROUTE_API.listOrder, {
      params: {
        status,
      },
    });
    return res.data;
  },
  SummaryOrder: async (startDate?: string, endDate?: string) => {
    const res = await HttpUtil.get<Iorder.Isummary>(ROUTE_API.summary, {
      params: {
        startDate,
        endDate,
      },
    });
    return res.data;
  },

  updateOrder: async (orderId: string, status: string) => {
    const res = await HttpUtil.patch(
      ROUTE_API.updateOrderStatus.replace(':orderId', orderId.toString()),
      {
        status: status,
      },
    );
    return res.data;
  },
  getOrderInfo: async (orderId: string) => {
    const res = await HttpUtil.get<Iorder.IorderDetail>(
      ROUTE_API.orderDetail.replace(':orderId', orderId.toString()),
    );
    return res.data;
  },

  getListHistoryOrder: async (status: string) => {
    const res = await HttpUtil.get<Iorder.IhistoryOrder>(ROUTE_API.history, {
      params: {
        status,
      },
    });
    return res.data;
  },
  runRejectOrder: async (orderId: string) => {
    const res = await HttpUtil.delete(
      ROUTE_API.cancelOrder.replace(':orderId', orderId),
    );
    return res.data;
  },
};
export default ORDER;

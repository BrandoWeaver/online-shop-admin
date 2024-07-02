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
  runUpdateAdrr: async (
    shopId: string,
    customerContact: string,
    address: string,
    label: string,
    location: {
      lat: number;
      lng: number;
    },
  ) => {
    const res = await HttpUtil.post(
      ROUTE_API.addBuyerAddress
        .replace(':id', shopId.toString())
        .replace(':phone', customerContact),
      {
        address: address,
        label: label,
        location: location,
      },
    );
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
  getOrderSummary: async (
    shopId: string,
    startDate: string,
    endDate: string,
    orderStatus: string,
  ) => {
    const res = await HttpUtil.get(
      ROUTE_API.orderHistorySummary.replace(':id', shopId.toString()),
      {
        params: {
          startDate: startDate,
          endDate: endDate,
          status: orderStatus,
        },
      },
    );
    return res.data;
  },
  deleteProduct: async (shopId: string, orderDetailId: number) => {
    const res = await HttpUtil.post(
      ROUTE_API.deleteOrderProduct
        .replace(':id', shopId.toString())
        .replace(':orderDetailId', orderDetailId.toString()),
    );
    return res.data;
  },
  updateQuantity: async (
    shopId: string,
    orderDetailId: number,
    qty: number,
  ) => {
    const res = await HttpUtil.post(
      ROUTE_API.updateOrderQty.replace(':id', shopId.toString()),
      {
        orderDetailId: orderDetailId,
        qty: qty,
      },
    );
    return res.data;
  },

  runListAddress: async (shopId: string, customerContact: string) => {
    const res = await HttpUtil.get(
      ROUTE_API.listBuyerAddress
        .replace(':id', shopId.toString())
        .replace(':phone', customerContact),
    );
    return res.data;
  },
  runUpdateVaraint: async (
    shopId: string,
    productId: number | '' | undefined,
    selectId: number[],
  ) => {
    const res = await HttpUtil.post(
      ROUTE_API.updateOrderOption.replace(':id', shopId.toString()),
      {
        orderDetailId: productId,
        options: selectId,
      },
    );
    return res.data;
  },
  getProductDetail: async (shopId: string, id: any) => {
    const res = await HttpUtil.get<IProduct.IProductDetail>(
      ROUTE_API.getProductDetail
        .replace(':id', shopId.toString())
        .replace(':proId', id),
    );
    return res.data;
  },
  getListProduct: async (
    shopId: string,
    page: number,
    debouncedSearch: string,
    rowsPerPage: number,
  ) => {
    const res = await HttpUtil.get(
      ROUTE_API.productList.replace(':id', shopId.toString()),
      {
        params: {
          page: page + 1,
          name: debouncedSearch,
          pageSize: rowsPerPage,
        },
      },
    );
    return res.data;
  },
  addProductOrder: async (
    shopId: string,
    orderId: number | undefined,
    productId: number[],
  ) => {
    const res = await HttpUtil.post(
      ROUTE_API.addOrderProduct.replace(':id', shopId.toString()),
      {
        orderId: orderId,
        productIds: productId,
      },
    );
    return res.data;
  },
  runAddNote: async (
    shopId: string,
    detailId: number | undefined,
    noteData: string,
  ) => {
    const res = await HttpUtil.post(
      ROUTE_API.addOrderNote.replace(':id', shopId.toString()),
      {
        orderId: detailId,
        note: noteData,
      },
    );
    return res.data;
  },
  runRejectOrder: async (orderId: string) => {
    const res = await HttpUtil.delete(
      ROUTE_API.cancelOrder.replace(':orderId', orderId),
    );
    return res.data;
  },
  runConfirmOrder: async (
    shopId: string,
    id: number | undefined,
    status: string,
  ) => {
    const res = await HttpUtil.post(
      ROUTE_API.updateStatus.replace(':id', shopId.toString()),
      {
        orderId: id,
        status: status,
      },
    );
    return res.data;
  },
};

export default ORDER;

import HttpUtil from 'utils/http-util';
import { ROUTE_API } from 'utils/route-util';

const ORDER = {
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
    const res = await HttpUtil.post<Iorder.Iaddress>(
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
  updateOrder: async (
    shopId: string,
    id: number,
    deliveryOption: string,
    detailId: number | undefined,
    zone: string | undefined,
  ) => {
    const res = await HttpUtil.post<Iorder.Iaddress>(
      ROUTE_API.updateOrder.replace(':id', shopId.toString()),
      {
        buyerAddressId: id,
        deliveryOption: deliveryOption,
        orderId: detailId,
        shopId: shopId.toString(),
        zone: zone,
      },
    );
    return res.data;
  },
  getOrderInfo: async (shopId: string, orderId: string) => {
    const res = await HttpUtil.get<Iorder.Datum>(
      ROUTE_API.orderDetail
        .replace(':id', shopId.toString())
        .replace(':orderId', orderId.toString()),
    );
    return res.data;
  },
  getListOrder: async (
    shopId: string,
    page: number,
    orderStatus: string,
    orderType: string,
  ) => {
    const res = await HttpUtil.get<Iorder.IlistOrder>(
      ROUTE_API.orderList.replace(':id', shopId.toString()),
      {
        params: {
          orderType: orderType,
          orderStatus: orderStatus,
          page: page + 1,
        },
      },
    );
    return res.data;
  },
  getListHistoryOrder: async (
    shopId: string,
    page: number,
    orderStatus: string,
    orderType: string,
    startDate: string,
    endDate: string,
  ) => {
    const res = await HttpUtil.get<Iorder.IlistOrder>(
      ROUTE_API.orderList.replace(':id', shopId.toString()),
      {
        params: {
          orderType: orderType,
          orderStatus: orderStatus,
          page: page + 1,
          startDate: startDate,
          endDate: endDate,
        },
      },
    );
    return res.data;
  },
  getOrderSummary: async (
    shopId: string,
    startDate: string,
    endDate: string,
    orderStatus: string,
  ) => {
    const res = await HttpUtil.get<Iorder.Ihistory>(
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
    const res = await HttpUtil.get<Iorder.Iaddress>(
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
    const res = await HttpUtil.get<Iorder.Ilisproduct>(
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
  runRejectOrder: async (
    shopId: string,
    id: number | undefined,
    status: string,
    rejectReason: string[],
  ) => {
    const res = await HttpUtil.post(
      ROUTE_API.updateStatus.replace(':id', shopId.toString()),
      {
        orderId: id,
        status: status,
        rejectReason: rejectReason,
      },
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

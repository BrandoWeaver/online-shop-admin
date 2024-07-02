export const ROUTE_PATH = {
  root: '/',

  login: '/login',

  home: '/home',

  order: '/order',

  shop: '/shop/:tab',

  product: '/product/:tab',

  promotion: '/promotion',

  staff: '/staff',

  account: '/account',
};

export const ROUTE_API = {
  root: process.env.REACT_APP_API_URL,
  login: '/api/auth/login',
  getShopPerformance: '/api/orders/performance/weakly-performance',
  getOrderActive: '/api/orders/orderStatus/status-counts',
  listOrder: '/api/orders',
  summary: '/api/orders/history/summary',
  history: '/api/orders/getOrder/history',
  getShopReport: '/seller/shop/:shopId/report/:reportType/:nDayAgo',
  orderList: '/seller/shop/:id/order/list',
  updateStatus: '/seller/shop/:id/order/status/update',
  orderHistorySummary: '/seller/shop/:id/order/history/summary',
  updateOrder: '/seller/shop/:id/order/update',
  updateOrderQty: '/seller/shop/:id/order/detail/qty/update',
  updateOrderOption: '/seller/shop/:id/order/detail/option/update',
  addOrderProduct: '/seller/shop/:id/order/detail/add',
  deleteOrderProduct: '/seller/shop/:id/order/detail/delete/:orderDetailId',

  listOrderNote: '/admin/order/note/list',
  addOrderNote: '/seller/shop/:id/order/note/add',
  listBuyerAddress: '/seller/shop/:id/buyer/:phone/address/list',
  addBuyerAddress: '/seller/shop/:id/buyer/:phone/address/add',

  productList: '/seller/shop/:id/product/list',
  getProductDetail: '/seller/shop/:id/product/detail/:proId',
  rearrangeProduct: '/seller/shop/:id/product/rearrange',
  updateProduct: '/seller/shop/:id/product/update',
  addNewProduct: '/seller/shop/:id/product/create',
  deleteProduct: '/seller/shop/:id/product/delete/:proId',

  listProductVariant: '/seller/shop/:id/product/:proId/variant/list',
  deleteProductVariant: '/seller/shop/:id/product/:proId/variant/delete',
  addProductVariant: '/seller/shop/:id/product/:proId/variant/add',
  addGroupOption: '/seller/shop/:id/product/:proId/variant/option/group/add',
  updateVariant: '/seller/shop/:id/product/:proId/variant/update',
  deleteGroupOption:
    '/seller/shop/:id/product/:proId/variant/option/group/delete',
  filterProductOption: '/seller/shop/:id/product/:proId/variant/option/filter',
  updateOptionPrice:
    '/seller/shop/:id/product/:proId/variant/option/price/update',
  deleteProductOption: '/seller/shop/:id/product/:proId/variant/option/delete',

  listCollection: '/seller/shop/:id/collection/list',
  getCollectionDetail: '/seller/shop/:id/collection/:colId/detail/',
  updateCollect: '/seller/shop/:id/collection/detail/update',
  rearrangeCollectionPro:
    '/seller/shop/:id/collection/:colId/rearrange/product',
  rearrangeCol: '/seller/shop/:id/collection/:colId/rearrange',
  addNewCollection: '/seller/shop/:id/collection/create',
  deleteCollection: '/seller/shop/:id/collection/:colId/delete',

  listProCate: '/seller/shop/:id/category/list',
  rearrangeProCate: '/seller/shop/:id/category/rearrange',
  addProCate: '/seller/shop/:id/category/add',
  editProCate: '/seller/shop/:id/category/update',
  deleteProCate: '/seller/shop/:id/category/delete/:cateId',

  getShopInfo: '/seller/shop/:id/info',
  updateShopInfo: '/seller/shop/:id/update',
  updateOpHour: '/seller/shop/:id/operating/hour/update',
  testMessage: '/bot/test/message',

  listShopPayment: '/api/payments/listpayment',
  listPaymentOpt: '/seller/shop/:id/paymentoption/list/all',

  addShopPayment: '/api/payments/create',

  removePaymentOpt: '/api/payments/delete/:id',
  replacePaymentOpt: '/seller/shop/:id/paymentoption/replace',
  updateShopDelivery: 'seller/shop/:id/fulfillmentoption/update',

  getSellerInfo: '/seller/info',
  editSellerInfo: '/seller/info/edit',
  changePassword: '/seller/info/change/password',

  // order
  orderDetail: '/api/orders/:orderId',
  updateOrderStatus: '/api/orders/:orderId/status',
  cancelOrder: '/api/orders/:orderId',
};

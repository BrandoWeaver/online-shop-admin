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
  getTotalIncome: '/api/orders/total/total-income',
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
  updateProduct: '/api/products/:id',
  addNewProduct: '/seller/shop/:id/product/create',

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

  rearrangeProCate: '/seller/shop/:id/category/rearrange',
  addProCate: '/seller/shop/:id/category/add',

  deleteProCate: '/seller/shop/:id/category/delete/:cateId',

  getShopInfo: '/seller/shop/:id/info',
  updateShopInfo: '/seller/shop/:id/update',
  updateOpHour: '/seller/shop/:id/operating/hour/update',
  testMessage: '/bot/test/message',

  listPaymentOpt: '/seller/shop/:id/paymentoption/list/all',

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
  //payment
  listShopPayment: '/api/payments/listpayment',
  addShopPayment: '/api/payments/create',
  updateShopPayment: '/api/payments/edit/:id',
  //category
  listCategory: '/api/categories',
  listProduct: '/api/products',
  createCategory: '/api/product-categories',
  editCategory: '/api/categories/:id',
  deleteCategory: '/api/categories/:id',
  //product
  createProduct: '/api/products',
  listProCate: '/api/categories',
  editProduct: '/api/products/:id',
  editProCate: '/api/categories/:id',
  deleteProduct: '/api/products/:id',
};

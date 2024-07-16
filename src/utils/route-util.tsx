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
  updateProduct: '/api/products/:id',
  testMessage: '/bot/test/message',
  removePaymentOpt: '/api/payments/delete/:id',
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

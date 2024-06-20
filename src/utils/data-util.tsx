export enum OrderStatusEnum {
  urgent = 'urgent',
  review = 'review',
  pending = 'pending',
  onHold = 'on_hold',
  confirmed = 'confirmed',
  waitDriver = 'waiting_driver',
  awaitDispatch = 'await_dispatch',
  delivering = 'delivering',
  deliveringProvince = 'delivering_province',
  completed = 'completed',

  preCancel = 'pre_cancelled',
  cancel = 'cancelled',
}

export const OrderStatusLabel = {
  [OrderStatusEnum.urgent]: 'Urgent',
  [OrderStatusEnum.review]: 'Review',
  [OrderStatusEnum.pending]: 'Pending',
  [OrderStatusEnum.onHold]: 'On Hold',
  [OrderStatusEnum.confirmed]: 'Confirmed',
  [OrderStatusEnum.waitDriver]: 'Wait Driver',
  [OrderStatusEnum.awaitDispatch]: 'Await Dispatch',
  [OrderStatusEnum.delivering]: 'Delivering',
  [OrderStatusEnum.deliveringProvince]: 'Delivering',
  [OrderStatusEnum.completed]: 'Completed',
};

export enum InventoryStatusEnum {
  inStock = 'in_stock',
  outOfStock = 'out_of_stock',
  preOrder = 'preorder',
}

export const InventoryStatusLabel = {
  [InventoryStatusEnum.inStock]: 'In stock',
  [InventoryStatusEnum.outOfStock]: 'Out of stock',
  [InventoryStatusEnum.preOrder]: 'Pre order',
};

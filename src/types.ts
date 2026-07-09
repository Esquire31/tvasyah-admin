/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type OrderStatus = 'Processing' | 'Shipped' | 'Delivered' | 'Returned' | 'Pending' | 'Cancelled';
export type PaymentStatus = 'Paid' | 'Pending';

export interface Order {
  id: string;
  customerName: string;
  avatarUrl: string;
  product: string;
  amount: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  date: string;
  time: string;
}

export interface Specimen {
  sku: string;
  name: string;
  volume: string;
  category: 'Serums' | 'Elixirs' | 'Essences';
  stock: number;
  price: number;
  imageUrl: string;
  lowStockWarning?: boolean;
}

export interface Activity {
  id: string;
  text: string;
  boldText?: string;
  timestamp: string;
  type: 'order' | 'inventory' | 'customer' | 'payment';
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  unread: boolean;
  type: 'info' | 'warning' | 'success';
}

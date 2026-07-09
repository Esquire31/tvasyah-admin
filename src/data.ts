/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Order, Specimen, Activity, NotificationItem } from './types';

export const INITIAL_SPECIMENS: Specimen[] = [
  {
    sku: 'TV-MO-001',
    name: 'Moss Oak Restorative Serum',
    volume: '50ml',
    category: 'Serums',
    stock: 82,
    price: 145.00,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCSyQuF5bShPuK3gbHHsm3zbxWzOMI6PZW6Y9YlUm_NLbNDmzopPw1f14HOixSnd0AO0fwkCyPBY698GaKSJbtfrd6kCxdKoujwt8AT2N1F-JtwEs7m1BVMw28KQhnTrMsCMpSkUcJ7L4lPtmo2qlh-axquSCa0thw3vApzRfpSSTBNqsu8jhcJLYTcDZNM3WGSIPpBXfUc1mzuW1EF7bONM3eNfPALpxoAKopaYSSwbq8OwXhjXjA',
  },
  {
    sku: 'TV-AR-042',
    name: 'Amber Root Vitality Elixir',
    volume: '50ml',
    category: 'Elixirs',
    stock: 12,
    price: 185.00,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBZzt8N0AdyPUP4rIkDJi7_K3VH6efe0jwfJs47uHbxFoQ4YfvQWXRxPcB_Q8vY5vdC9VYe4ui5eib_bPSNBj4iJahAM7bJMJsvBb2_WfPK3IugyFRuZUjZ8pb5jgoAC2awZ6Lx69zLP8a2ffoHodCFL1bVbz_auWhoebJ_CkpQSI9lKb5o6mPXfQYxxTCzq6Eqz3K6MaU4Bh53JJ7LYwJKISoe36RX7e_wLmtvp05S5eQnBeDYuok',
    lowStockWarning: true,
  },
  {
    sku: 'TV-DF-018',
    name: 'Dewy Fern Hydrating Essence',
    volume: '100ml',
    category: 'Essences',
    stock: 245,
    price: 85.00,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAvnLZ5CXfjyyUxmR3vEMEUuY2pUdUo-Y-GL_iANPsziYO6qqliwDeY4XDDrH7bC8sW4Ly40dhowF4jEOquYgJijzwnKdSq374996xmBAyAvFao4x03TAtxbO4WVOaQVSiQWFi_Cmd09YnM5ZTQBUMwMyzQ6ZPvf5CcQYremGuGspFkU8fvMiihHQnMdngwWJX89cLebKKcFElV3cd-nmbBPk51h10RgEd_wyOtKtL_g8vlhHDdhB0',
  },
  {
    sku: 'TV-SB-003',
    name: 'Saffron Bright Serum',
    volume: '50ml',
    category: 'Serums',
    stock: 7,
    price: 125.00,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC_e6_V3KeAbvea88AL9Vus-Av3RobIoPQi2ZEmw-oZ3u-1d570vyGJ7SkeeOm4EAoCIsFyGc9ZI7jjMYYABzSYaoFCm3hCTCyCqu20G8c-UjL4xgy7c8pxytR3x8nuUeJfLOJERihI17g5kstwfD72jFYreXnAPtHTMb3lYnbf4exXQ5UjjwrBOP6JLd6F0o9Vt6wu_th7X_yzOxVI4mbyjrSifGDqbZJCUNNeZC_8wwJktl90EFc',
    lowStockWarning: true,
  },
  {
    sku: 'TV-NB-008',
    name: 'Night Balm Ritual Jar',
    volume: '30ml',
    category: 'Elixirs',
    stock: 18,
    price: 95.00,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD6Dy1dSDeTAs2gGUxSHNRronZI7v8YoGYqOvhZbkpD964piqKwbr9xng-R5x9ji5zRrdMU9Bp9bY9qA9oTUxCOkhRNo9UN7ES4V9UkY_k-OILpgxrhHgs01X3Ak1A4MmyybNWckomW06yd7bmV7dnQYRysFLptSk0YS54Eo1t8FDzxXrJIDJ0jFvI7BCOwneohHnRd5kTsgmL_ayomf88eBkLKBD4-GmpSOUqK_iZeB6ImsJnJqy0',
  },
  {
    sku: 'TV-BM-011',
    name: 'Botanical Mist Spray',
    volume: '120ml',
    category: 'Essences',
    stock: 110,
    price: 45.00,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCZoHzKUmbwlnvSoIpLMUF9luGVhrwQvRnbd04ZT1sXqR68Yj_TCrRoCffcrJW_Xeu107tUKhI55ZCxhmzcOI083DD-LWf6R4JdYmZdwD8XVRuOP4xL0qh7XNJ9nlSJMoSIPZvURtGfr1PERpyzaFuXXd1N2UzXaJ3yZW_MOZHc7F42VO42TLKVuU3UdIiRjK8WxZbIlB8wXcTO8fCw3Uup8NAtSF1P3Buz-Go4dBQwYiuZ7yd0sVI',
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: '#TV-9021',
    customerName: 'Eleanor Fitzwilliam',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAu9OZ3HIlmNpbKWj6BI2uNd_a-dePpSE6vErnnMEo6G4K4YeB63jTnILZqp-D3BpkRc6FPSPBjC1tXeSBIe9L2js7evQQPLQcwIfVxjgj_lnzISGENNySNm3drohJWZ9FlRmQoEwjW0xfNVRlTqogHApD7irkXZ3ktIS-XbGnONckLy3uImdZ3zz9vRptFe3du3TgGWnbrvnSxO4s9atx4rucIztlWoPcGrgxvy8QEI6C3ZRAMJR8',
    product: 'Saffron Bright Serum (2x)',
    amount: 245.00,
    status: 'Processing',
    paymentStatus: 'Paid',
    date: 'Oct 24, 2024',
    time: '14:32 PM'
  },
  {
    id: '#TV-9020',
    customerName: 'Julian Thorne',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB4GJ8-7NKMRb1VQ1r6S6HLJM39O9IJJX-YkwhotPVCpm2Wq9zsuM_Eundhl1xAoC86YJkzNZ35iyDHNvKeXdjmS6KDMfD3GiAKyIH9rYvhzzpm11q-fx0oqbqjbpSiRy2OfztApfEJM_M4Mx6AFuAwntj9ptKYhKmsftpC0LeCkHF1vq-fvc8iDYqgO_juyaHqiAWGsk59lQBF5mojZTaHXIX3AVE61WkekkzS9ycjQybbgPB45-c',
    product: 'Amber Root Vitality Elixir',
    amount: 112.50,
    status: 'Shipped',
    paymentStatus: 'Pending',
    date: 'Oct 24, 2024',
    time: '12:15 PM'
  },
  {
    id: '#TV-9019',
    customerName: 'Sienna Rose',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDxyQPS2mCUwhe9M1WeEdXYAObqlE13z0A4cgrRrl27H2b6-cWhgLNJdMQ6KxmuUbr7jIOgtZTG-em96SP6JDaTXadiQL_L4JPn4kP4v9eIWmnjfgpy8ydfVkvaitpceKWF7Y6DkW07PPU2uV1jxApitJKKrrnMvv0-MjG20qIfTiL13nDuybyOP2G_DZ6fW_TWEajQCDISkQ29UfcMx6CG0muAlT177BBexYOPuBALxmSXV2FMDlY',
    product: 'Botanical Mist Spray & Night Balm',
    amount: 560.00,
    status: 'Delivered',
    paymentStatus: 'Paid',
    date: 'Oct 23, 2024',
    time: '09:45 AM'
  },
  {
    id: '#TV-9018',
    customerName: 'Marcus Aurel',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA0GmY9Og81QJnSWg8jBD8g_ERL-pO5U7FKfYB9NdeAdsU1I90R7WDNX4kD6JEqa53ZQFCoJA59s2qW9oOuRFAflgOwsOcDL8-L_IpekCGIgTgNSRpj_TyVicHdbWrYCrnnbQS7MhD3W63hTV6oRBQy1QoKs-flXMWMosEdaRrQCYEPXJqitfxqNwdFlpUDwVbNqf6_YOS-xxrTnYUhog2LJ81CsbhhS_SzdBH1u_8QWZBzbWRu2kg',
    product: 'Moss Oak Restorative Serum',
    amount: 89.00,
    status: 'Delivered',
    paymentStatus: 'Paid',
    date: 'Oct 22, 2024',
    time: '18:20 PM'
  },
  {
    id: '#TV-9017',
    customerName: 'Isabella Vane',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAu9OZ3HIlmNpbKWj6BI2uNd_a-dePpSE6vErnnMEo6G4K4YeB63jTnILZqp-D3BpkRc6FPSPBjC1tXeSBIe9L2js7evQQPLQcwIfVxjgj_lnzISGENNySNm3drohJWZ9FlRmQoEwjW0xfNVRlTqogHApD7irkXZ3ktIS-XbGnONckLy3uImdZ3zz9vRptFe3du3TgGWnbrvnSxO4s9atx4rucIztlWoPcGrgxvy8QEI6C3ZRAMJR8',
    product: 'Dewy Fern Hydrating Essence (2x)',
    amount: 210.00,
    status: 'Returned',
    paymentStatus: 'Paid',
    date: 'Oct 21, 2024',
    time: '11:10 AM'
  }
];

export const INITIAL_ACTIVITIES: Activity[] = [
  {
    id: 'act-1',
    text: 'Shipped to London, UK',
    boldText: 'Order #123',
    timestamp: '2 mins ago',
    type: 'order'
  },
  {
    id: 'act-2',
    text: 'for Saffron Serum updated (-12 units)',
    boldText: 'Inventory',
    timestamp: '1 hour ago',
    type: 'inventory'
  },
  {
    id: 'act-3',
    text: 'registered: Clara S.',
    boldText: 'New Customer',
    timestamp: '3 hours ago',
    type: 'customer'
  },
  {
    id: 'act-4',
    text: 'of $1,240.50 initiated',
    boldText: 'Payout',
    timestamp: '5 hours ago',
    type: 'payment'
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Saffron Serum Critical Low',
    description: 'Saffron Bright Serum stock has dropped to 7 units. Immediate restock recommended.',
    timestamp: 'Just now',
    unread: true,
    type: 'warning'
  },
  {
    id: 'notif-2',
    title: 'New Specimen Registered',
    description: 'Dewy Fern Hydrating Essence has been successfully cataloged and mapped.',
    timestamp: '2 hours ago',
    unread: true,
    type: 'success'
  },
  {
    id: 'notif-3',
    title: 'Bulk Order Completed',
    description: 'Order #TV-9019 was marked as Delivered and payment processed.',
    timestamp: 'Yesterday',
    unread: false,
    type: 'info'
  }
];

export const TOP_PERFORMERS = [
  {
    name: 'Saffron Serum',
    volume: '50ml',
    sold: '1,240 sold',
    revenue: '$12,400',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC_e6_V3KeAbvea88AL9Vus-Av3RobIoPQi2ZEmw-oZ3u-1d570vyGJ7SkeeOm4EAoCIsFyGc9ZI7jjMYYABzSYaoFCm3hCTCyCqu20G8c-UjL4xgy7c8pxytR3x8nuUeJfLOJERihI17g5kstwfD72jFYreXnAPtHTMb3lYnbf4exXQ5UjjwrBOP6JLd6F0o9Vt6wu_th7X_yzOxVI4mbyjrSifGDqbZJCUNNeZC_8wwJktl90EFc'
  },
  {
    name: 'Night Balm',
    volume: '30ml',
    sold: '890 sold',
    revenue: '$8,900',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD6Dy1dSDeTAs2gGUxSHNRronZI7v8YoGYqOvhZbkpD964piqKwbr9xng-R5x9ji5zRrdMU9Bp9bY9qA9oTUxCOkhRNo9UN7ES4V9UkY_k-OILpgxrhHgs01X3Ak1A4MmyybNWckomW06yd7bmV7dnQYRysFLptSk0YS54Eo1t8FDzxXrJIDJ0jFvI7BCOwneohHnRd5kTsgmL_ayomf88eBkLKBD4-GmpSOUqK_iZeB6ImsJnJqy0'
  },
  {
    name: 'Botanical Mist',
    volume: '120ml',
    sold: '450 sold',
    revenue: '$4,500',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCZoHzKUmbwlnvSoIpLMUF9luGVhrwQvRnbd04ZT1sXqR68Yj_TCrRoCffcrJW_Xeu107tUKhI55ZCxhmzcOI083DD-LWf6R4JdYmZdwD8XVRuOP4xL0qh7XNJ9nlSJMoSIPZvURtGfr1PERpyzaFuXXd1N2UzXaJ3yZW_MOZHc7F42VO42TLKVuU3UdIiRjK8WxZbIlB8wXcTO8fCw3Uup8NAtSF1P3Buz-Go4dBQwYiuZ7yd0sVI'
  }
];

export const REGIONAL_HEATMAPS = [
  { city: 'New York, NY', share: '28%' },
  { city: 'London, UK', share: '19%' },
  { city: 'Paris, FR', share: '14%' },
  { city: 'Tokyo, JP', share: '11%' }
];

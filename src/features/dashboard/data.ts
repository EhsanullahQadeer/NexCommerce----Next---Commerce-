export interface TICKET {
  id: number;
  title: string;
  description: string;
  uploadedFileName: string;
  criticalStatus: "High" | "Normal" | "Low";
}

export interface ORDERS {
  id: number;
  imageUrl: string;
  orderNumber: string;
  statusIcon: string;
  date: string;
  price: string;
  details: string;
  status: string;
}

interface ORDER_STATUS {
  id: number;
  status: string;
}

export interface Comment {
  id: number;
  user: string;
  designation: string;
  comment: string;
  date: string;
  userType: "admin" | "user";
}

export const tickets: TICKET[] = [
  {
    id: 1,
    title: "Security Patch Update",
    description:
      "A critical security patch that needs to be applied immediately.",
    uploadedFileName: "security_patch.zip",
    criticalStatus: "High",
  },
  {
    id: 2,
    title: "Feature Enhancement",
    description: "An enhancement to the user profile feature in the app.",
    uploadedFileName: "feature_enhancement.zip",
    criticalStatus: "Normal",
  },
  {
    id: 3,
    title: "Bug Fix",
    description: "Fixes a critical bug in the payment gateway module.",
    uploadedFileName: "bug_fix.zip",
    criticalStatus: "High",
  },
  {
    id: 4,
    title: "UI Improvement",
    description:
      "Minor tweaks to improve the overall user interface of the app.",
    uploadedFileName: "ui_improvementzip",
    criticalStatus: "Low",
  },
  {
    id: 5,
    title: "Performance Optimization",
    description: "Optimizes the database queries to enhance performance.",
    uploadedFileName: "performance_optimization.zip",
    criticalStatus: "Normal",
  },
  {
    id: 6,
    title: "Documentation Update",
    description: "Updates to the API documentation for the latest release.",
    uploadedFileName: "documentation_update.zip",
    criticalStatus: "Low",
  },
];

export const orders: ORDERS[] = [
  {
    id: 1,
    imageUrl: "/images/order1.jpg",
    orderNumber: "123456789",
    status: "Ongoing",
    statusIcon: "las la-sync",
    date: "2023-08-30",
    price: "$99.99",
    details: "More information about this order...",
  },
  {
    id: 2,
    imageUrl: "/images/order2.jpg",
    orderNumber: "987654321",
    status: "Cancelled",
    statusIcon: "las la-times-circle",
    date: "2023-08-25",
    price: "$149.99",
    details: "This order was cancelled due to payment issues.",
  },
  {
    id: 3,
    imageUrl: "/images/order3.jpg",
    orderNumber: "1122334455",
    status: "Refunded",
    statusIcon: "las la-undo",
    date: "2023-08-20",
    price: "$89.99",
    details: "This order has been refunded to your account.",
  },
  {
    id: 4,
    imageUrl: "/images/order4.jpg",
    orderNumber: "5566778899",
    status: "Undeliverable",
    statusIcon: "las la-exclamation-circle",
    date: "2023-08-15",
    price: "$49.99",
    details: "This order could not be delivered due to incorrect address.",
  },
  {
    id: 5,
    imageUrl: "/images/order5.jpg",
    orderNumber: "9988776655",
    status: "Ongoing",
    statusIcon: "las la-sync",
    date: "2023-08-10",
    price: "$129.99",
    details: "Your order is on its way.",
  },
  {
    id: 6,
    imageUrl: "/images/order6.jpg",
    orderNumber: "2233445566",
    status: "Delivered",
    statusIcon: "las la-check-circle",
    date: "2023-08-05",
    price: "$199.99",
    details: "Your order has been delivered.",
  },
];

export const orderStatuses: ORDER_STATUS[] = [
  { id: 1, status: "All" },
  { id: 2, status: "pending" },
  { id: 3, status: "shipped" },
  { id: 4, status: "delivered" },
  { id: 5, status: "cancelled" },
];

export const commentList: Comment[] = [
  {
    id: 1,
    user: "John Doe",
    designation: "Customer",
    comment: "Can you provide more details about the issue?",
    date: "2024-08-29",
    userType: "user",
  },
  {
    id: 2,
    user: "Admin Support",
    designation: "Support Admin",
    comment: "Please follow the instructions sent to your email.",
    date: "2024-08-30",
    userType: "admin",
  },
];

export const statusColors = {
  High: "!bg-red-100 !text-red-700 !border-red-100",
  Normal: "!bg-yellow-100 !text-yellow-700 !border-yellow-100",
  Low: "!bg-green-100 !text-green-700 !border-green-100",
};

export const dotColors = {
  High: "bg-red-700",
  Normal: "bg-yellow-700",
  Low: "bg-green-700",
};

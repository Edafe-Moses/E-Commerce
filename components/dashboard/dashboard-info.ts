export interface DashboardData {
  sidebar: {
    items: Array<{
      label: string;
      icon?: string;
      route?: string;
      subItems?: Array<{ label: string; route?: string }>;
    }>;
  };
  mainSection: {
    title: string;
    salesChart: {
      totalSales: string;
      percentageChange: string;
      data: Array<{ date: string; value: number; color: string }>;
    };
    channelsChart: {
      data: Array<{ label: string; percentage: number; color: string }>;
    };
    orders: {
      total: number;
      icon: string;
      trendData: Array<{ value: number; color: string }>;
    };
    customerRating: {
      rating: number;
      pointChange: string;
      icon: string;
    };
    productsSold: {
      total: number;
      data: Array<{ day: string; value: number }>;
    };
    recentReviews: Array<{
      name: string;
      rating: number;
      comment: string;
    }>;
    topCountries: Array<{
      country: string;
      amount: string;
      flagIcon: string;
    }>;
    activityOverview: Array<{
      label: string;
      count: string;
      icon: string;
    }>;
    recentProducts: Array<{
      photo: string;
      name: string;
      stock: string;
      price: string;
    }>;
  };
}

export const dashboardData: DashboardData = {
  sidebar: {
    items: [
      { label: "Dashboard", icon: "", route: "/dashboard" },
      {
        label: "Orders",
        icon: "",
        subItems: [
          { label: "List", route: "/orders/list" },
          { label: "Details", route: "/orders/details" },
        ],
      },
      {
        label: "Products",
        icon: "",
        subItems: [
          { label: "List View", route: "/products/list" },
          { label: "Grid View", route: "/products/grid" },
          { label: "Product Detail", route: "/products/detail" },
          { label: "Shopping Cart", route: "/products/cart" },
          { label: "Checkout", route: "/products/checkout" },
        ],
      },
      { label: "Buyers", icon: "", route: "/buyers" },
      { label: "Customers", icon: "", route: "/customers" },
      { label: "Invoices", icon: "", route: "/invoices" },
      { label: "Apps" },
      { label: "Chats", icon: "", route: "/chats" },
      { label: "Email", icon: "", route: "/email" },
      { label: "Todo", icon: "", route: "/todo" },
      { label: "Profile", icon: "", route: "/profile" },
      { label: "Users", icon: "", route: "/users" },
      { label: "Authentication", icon: "", route: "/auth" },
      { label: "Error Pages", icon: "", route: "/error" },
      { label: "Pricing Table", icon: "", route: "/pricing" },
    ],
  },
  mainSection: {
    title: "Overview",
    salesChart: {
      totalSales: "$10,552.40",
      percentageChange: "8.2%",
      data: [
        { date: "01 May", value: 40, color: "green" },
        { date: "03 May", value: 50, color: "green" },
        { date: "05 May", value: 45, color: "purple" },
        { date: "07 May", value: 60, color: "purple" },
        { date: "09 May", value: 55, color: "green" },
        { date: "11 May", value: 70, color: "green" },
        { date: "13 May", value: 65, color: "purple" },
      ],
    },
    channelsChart: {
      data: [
        { label: "Social Media", percentage: 48, color: "purple" },
        { label: "Google", percentage: 30, color: "cyan" },
        { label: "Email", percentage: 22, color: "blue" },
      ],
    },
    orders: {
      total: 310,
      icon: "",
      trendData: [
        { value: 300, color: "red" },
        { value: 310, color: "red" },
      ],
    },
    customerRating: {
      rating: 3.0,
      pointChange: "+0.5 Point from last month (3%)",
      icon: "",
    },
    productsSold: {
      total: 89,
      data: [
        { day: "Mon", value: 20 },
        { day: "Tue", value: 25 },
        { day: "Wed", value: 15 },
        { day: "Thu", value: 30 },
        { day: "Fri", value: 35 },
        { day: "Sat", value: 10 },
        { day: "Sun", value: 5 },
      ],
    },
    recentReviews: [
      {
        name: "Johann Siddeløy",
        rating: 4,
        comment: "Very nice glasses, I ordered for my friend",
      },
    ],
    topCountries: [
      { country: "United States", amount: "$16,010", flagIcon: "" },
      { country: "Venezuela", amount: "$10,647", flagIcon: "" },
      { country: "Salvador", amount: "$10,558", flagIcon: "" },
      { country: "Russia", amount: "$10,420", flagIcon: "" },
    ],
    activityOverview: [
      { label: "Delivered Packages", count: "15 New", icon: "" },
      { label: "Ordered Items", count: "72 New", icon: "" },
      { label: "Reported 50 Support New Cases", count: "34 Upgraded", icon: "" },
      { label: "Arrived", count: "", icon: "" },
    ],
    recentProducts: [
      { photo: "", name: "Simply Orange Pulp Free Juice", stock: "In Stock", price: "$8.00" },
      { photo: "", name: "Lay's Chocolate Snack Chips", stock: "In Stock", price: "$1.99" },
      { photo: "", name: "Oscar Mayer Ham & Swiss Melt Scrambles", stock: "In Stock", price: "$1.59" },
      { photo: "", name: "Large Garden Spinach & Herb Wrap Tortillas", stock: "In Stock", price: "$10.00" },
      { photo: "", name: "Great Value Rising Crust Frozen Pizza", stock: "In Stock", price: "$8.00" },
      { photo: "", name: "Real Plant-Powered Protein Shake", stock: "In Stock", price: "$25.00" },
    ],
  },
};
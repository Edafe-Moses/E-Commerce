"use client";

import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { updateQuickStats } from "./dashboardSlice";
import { useEffect } from "react";

const MainSection = () => {
  const { mainSection, auth, cart, orders, products, user, dashboard } = useSelector((state: RootState) => ({
    mainSection: state.dashboard.mainSection,
    auth: state.auth,
    cart: state.cart,
    orders: state.orders,
    products: state.products,
    user: state.user,
    dashboard: state.dashboard,
  }));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateQuickStats({
      totalSales: mainSection.salesChart.totalSales.replace('$', '').replace(',', '') || 0,
      totalOrders: orders.orders.length,
      totalCustomers: 100, // Placeholder, replace with actual customer count API
    }));
  }, [mainSection.salesChart.totalSales, orders.orders.length, dispatch]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(user.preferences.language, {
      style: 'currency',
      currency: user.preferences.currency,
    }).format(amount);
  };

  return (
    <motion.div
      className="p-4 sm:p-6 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="flex flex-col md:flex-row justify-between items-center mb-6"
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1
          className="text-2xl sm:text-3xl font-bold"
          initial={{ x: -50 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {mainSection.title} {auth.user && `- Welcome, ${auth.user.name} (${auth.user.role})`}
          {user.showOnboarding && ` (Onboarding Step ${user.onboardingStep})`}
        </motion.h1>
        <motion.div
          className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mt-4 sm:mt-0"
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.input
            type="text"
            placeholder="Search..."
            className="p-2 border rounded w-full sm:w-64 focus:ring-2 focus:ring-purple-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileFocus={{ scale: 1.05 }}
          />
          <motion.button
            className="bg-purple-600 text-white p-2 rounded w-full sm:w-auto hover:bg-purple-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
          >
            Add Product
          </motion.button>
        </motion.div>
      </motion.div>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 },
          },
        }}
      >
        <motion.div
          className="bg-white p-4 rounded shadow"
          variants={{ hidden: { y: 50 }, visible: { y: 0 } }}
        >
          <h2 className="text-lg font-semibold">Sales Chart</h2>
          <motion.div
            className="flex flex-col sm:flex-row justify-between items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-2xl font-bold">{formatCurrency(Number(mainSection.salesChart.totalSales.replace('$', '').replace(',', '')))}</p>
              <p className="text-green-600">{mainSection.salesChart.percentageChange}</p>
            </motion.div>
            <motion.div className="w-full sm:w-1/2 mt-4 sm:mt-0">
              <motion.div
                className="h-32 flex"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {mainSection.salesChart.data.map((data, index) => (
                  <motion.div
                    key={index}
                    className={`flex-1 h-full ${data.color === "green" ? "bg-green-300" : "bg-purple-300"}`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                    whileHover={{ scale: 1.05 }}
                  ></motion.div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
        <motion.div
          className="bg-white p-4 rounded shadow"
          variants={{ hidden: { y: 50 }, visible: { y: 0 } }}
        >
          <h2 className="text-lg font-semibold">Cart Summary</h2>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-2xl font-bold">{cart.itemCount} Items</p>
            <p className="text-purple-600">{formatCurrency(cart.total)}</p>
          </motion.div>
        </motion.div>
        <motion.div
          className="bg-white p-4 rounded shadow"
          variants={{ hidden: { y: 50 }, visible: { y: 0 } }}
        >
          <h2 className="text-lg font-semibold">Orders</h2>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-2xl font-bold">{orders.orders.length} Orders</p>
            <p className="text-blue-600">{orders.currentOrder?.status || 'No current order'}</p>
          </motion.div>
        </motion.div>
        <motion.div
          className="bg-white p-4 rounded shadow"
          variants={{ hidden: { y: 50 }, visible: { y: 0 } }}
        >
          <h2 className="text-lg font-semibold">Customer Rating</h2>
          <motion.div
            className="flex items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.p
              className="text-2xl font-bold"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              {mainSection.customerRating.rating}
            </motion.p>
            <div className="ml-2">{/* Star icons placeholder */}</div>
            <motion.p
              className="text-gray-600"
              initial={{ x: 20 }}
              animate={{ x: 0 }}
              transition={{ duration: 0.5 }}
            >
              {mainSection.customerRating.pointChange}
            </motion.p>
          </motion.div>
        </motion.div>
        <motion.div
          className="bg-purple-500 text-white p-4 rounded shadow col-span-1 lg:col-span-4"
          variants={{ hidden: { y: 50 }, visible: { y: 0 } }}
        >
          <h2 className="text-lg font-semibold">Products Sold</h2>
          <motion.p
            className="text-2xl font-bold"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {mainSection.productsSold.total}
          </motion.p>
          <motion.div
            className="h-32 flex justify-between"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {mainSection.productsSold.data.map((data, index) => (
              <motion.div
                key={index}
                className="w-1/7"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
              >
                <div
                  className="h-full bg-white/20"
                  style={{ height: `${(data.value / 35) * 100}%` }}
                ></div>
                <p className="text-center">{data.day}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
        <motion.div
          className="bg-white p-4 rounded shadow"
          variants={{ hidden: { y: 50 }, visible: { y: 0 } }}
        >
          <h2 className="text-lg font-semibold">Featured Products</h2>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {products.featuredProducts.slice(0, 3).map((product, index) => (
              <p key={index}>{product.name} - {formatCurrency(product.price)}</p>
            ))}
          </motion.div>
        </motion.div>
        <motion.div
          className="bg-white p-4 rounded shadow"
          variants={{ hidden: { y: 50 }, visible: { y: 0 } }}
        >
          <h2 className="text-lg font-semibold">Recent Reviews</h2>
          {mainSection.recentReviews.map((review, index) => (
            <motion.div
              key={index}
              className="mb-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
            >
              <p>{review.name} ({review.rating})</p>
              <p>{review.comment}</p>
            </motion.div>
          ))}
        </motion.div>
        <motion.div
          className="bg-white p-4 rounded shadow"
          variants={{ hidden: { y: 50 }, visible: { y: 0 } }}
        >
          <h2 className="text-lg font-semibold">Your Top Countries</h2>
          {mainSection.topCountries.map((country, index) => (
            <motion.div
              key={index}
              className="flex justify-between mb-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              whileHover={{ scale: 1.05 }}
            >
              <span>{country.country}</span>
              <span>{formatCurrency(Number(country.amount.replace('$', '').replace(',', '')))}</span>
            </motion.div>
          ))}
        </motion.div>
        <motion.div
          className="bg-white p-4 rounded shadow"
          variants={{ hidden: { y: 50 }, visible: { y: 0 } }}
        >
          <h2 className="text-lg font-semibold">Activity Overview</h2>
          {mainSection.activityOverview.map((activity, index) => (
            <motion.div
              key={index}
              className="flex justify-between mb-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
            >
              <span>{activity.label}</span>
              <span>{activity.count}</span>
            </motion.div>
          ))}
        </motion.div>
        <motion.div
          className="bg-white p-4 rounded shadow"
          variants={{ hidden: { y: 50 }, visible: { y: 0 } }}
        >
          <h2 className="text-lg font-semibold">Recent Products</h2>
          <motion.table
            className="w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Stock</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {mainSection.recentProducts.map((product, index) => (
                <motion.tr
                  key={index}
                  className="transition-transform duration-300 hover:bg-gray-100"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <td>{product.photo && <img src={product.photo} alt={product.name} />}</td>
                  <td>{product.name}</td>
                  <td>{product.stock}</td>
                  <td>{formatCurrency(Number(product.price.replace('$', '')))}</td>
                  <td>...</td>
                </motion.tr>
              ))}
            </tbody>
          </motion.table>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default MainSection;
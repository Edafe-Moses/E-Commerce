"use client";

import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const OrderDetails = () => {
  const { orders } = useSelector((state: RootState) => state.orders);
  const currentOrder = orders.find(order => order.id === "3210") || null; // Placeholder ID, replace with dynamic selection

  return (
    <motion.div
      className="p-6 bg-gray-50 min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="flex justify-between items-center mb-6"
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold text-purple-800">Order Details</h1>
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Search..."
            className="p-2 border rounded w-64"
          />
          <button className="bg-purple-600 text-white p-2 rounded">Actions</button>
        </div>
      </motion.div>
      {currentOrder ? (
        <motion.div
          className="bg-white p-6 rounded-lg shadow"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-xl font-semibold mb-4">Order #{currentOrder.id}</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p><strong>Customer:</strong> {currentOrder.userId}</p>
              <p><strong>Date:</strong> {new Date(currentOrder.createdAt).toLocaleDateString()}</p>
              <p><strong>Total:</strong> ${currentOrder.total.toFixed(2)}</p>
              <p><strong>Status:</strong> <span className={`px-2 py-1 rounded ${currentOrder.status === 'completed' ? 'bg-green-200 text-green-800' : currentOrder.status === 'cancelled' ? 'bg-red-200 text-red-800' : 'bg-yellow-200 text-yellow-800'}`}>{currentOrder.status}</span></p>
            </div>
            <div>
              <p><strong>Shipping Address:</strong></p>
              <p>{currentOrder.shippingAddress.street}</p>
              <p>{currentOrder.shippingAddress.city}, {currentOrder.shippingAddress.state} {currentOrder.shippingAddress.zipCode}</p>
              <p>{currentOrder.shippingAddress.country}</p>
              <p><strong>Payment Method:</strong> {currentOrder.paymentMethod}</p>
              {currentOrder.trackingNumber && <p><strong>Tracking #:</strong> {currentOrder.trackingNumber}</p>}
            </div>
          </div>
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Items</h3>
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 text-left">Name</th>
                  <th className="p-2 text-left">Quantity</th>
                  <th className="p-2 text-left">Price</th>
                  <th className="p-2 text-left">Total</th>
                </tr>
              </thead>
              <tbody>
                {currentOrder.items.map((item, index) => (
                  <motion.tr
                    key={index}
                    className="border-b"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                  >
                    <td className="p-2">{item.name}</td>
                    <td className="p-2">{item.quantity}</td>
                    <td className="p-2">${item.price.toFixed(2)}</td>
                    <td className="p-2">${(item.price * item.quantity).toFixed(2)}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      ) : (
        <motion.p
          className="text-center text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          No order details available.
        </motion.p>
      )}
    </motion.div>
  );
};

export default OrderDetails;
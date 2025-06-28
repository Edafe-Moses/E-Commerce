"use client";

import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const Checkout = () => {
  const { items } = useSelector((state: RootState) => state.cart);

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
        <h1 className="text-2xl font-bold text-purple-800">Checkout</h1>
      </motion.div>
      <div className="bg-white p-6 rounded-lg shadow flex">
        <div className="w-2/3">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
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
              {items.map((item, index) => (
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
        <div className="w-1/3 pl-6">
          <h2 className="text-xl font-semibold mb-4">Payment</h2>
          <p className="text-xl font-bold mb-4">Total: ${items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}</p>
          <select className="w-full p-2 border rounded mb-4">
            <option>Credit Card</option>
            <option>PayPal</option>
          </select>
          <button className="w-full bg-purple-600 text-white p-2 rounded hover:bg-purple-700">Place Order</button>
        </div>
      </div>
    </motion.div>
  );
};

export default Checkout;
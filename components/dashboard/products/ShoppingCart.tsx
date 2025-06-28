"use client";

import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { removeFromCart, updateQuantity } from "../cart/cartSlice";

const ShoppingCart = () => {
  const { items } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

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
        <h1 className="text-2xl font-bold text-purple-800">Shopping Cart</h1>
      </motion.div>
      <div className="bg-white p-4 rounded-lg shadow">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Quantity</th>
              <th className="p-2 text-left">Price</th>
              <th className="p-2 text-left">Total</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <motion.tr
                key={index}
                className="border-b hover:bg-gray-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                whileHover={{ scale: 1.01 }}
              >
                <td className="p-2">{item.name}</td>
                <td className="p-2">
                  <input
                    type="number"
                    min="0"
                    value={item.quantity}
                    onChange={(e) => dispatch(updateQuantity({ id: item.id, quantity: Number(e.target.value) }))}
                    className="w-16 p-1 border rounded"
                  />
                </td>
                <td className="p-2">${item.price.toFixed(2)}</td>
                <td className="p-2">${(item.price * item.quantity).toFixed(2)}</td>
                <td className="p-2">
                  <button
                    onClick={() => dispatch(removeFromCart(item.id))}
                    className="text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4 text-right">
          <p className="text-xl font-bold">Total: ${items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default ShoppingCart;
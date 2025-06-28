"use client";

import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const ProductsList = () => {
  const { recentProducts } = useSelector((state: RootState) => state.dashboard.mainSection);

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
        <h1 className="text-2xl font-bold text-purple-800">Products</h1>
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Search..."
            className="p-2 border rounded w-64"
          />
          <button className="bg-purple-600 text-white p-2 rounded">Add Product</button>
        </div>
      </motion.div>
      <div className="bg-white p-4 rounded-lg shadow">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Stock</th>
              <th className="p-2 text-left">Price</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {recentProducts.map((product, index) => (
              <motion.tr
                key={index}
                className="border-b hover:bg-gray-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                whileHover={{ scale: 1.01 }}
              >
                <td className="p-2">{product.name}</td>
                <td className="p-2">{product.stock}</td>
                <td className="p-2">${product.price}</td>
                <td className="p-2">
                  <button className="text-purple-600 hover:text-purple-800">View</button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-6 flex justify-center">
        <button className="px-4 py-2 bg-purple-600 text-white rounded mr-2">1</button>
        <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded">2</button>
        <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded">3</button>
        <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded ml-2">›</button>
      </div>
    </motion.div>
  );
};

export default ProductsList;
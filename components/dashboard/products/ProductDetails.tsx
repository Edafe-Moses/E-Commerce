"use client";

import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useParams } from "next/navigation";

const ProductDetail = () => {
  const { recentProducts } = useSelector((state: RootState) => state.dashboard.mainSection);
  const { id } = useParams(); // Assume id is passed via URL
  const product = recentProducts.find(p => p.name.replace(/\s+/g, "").toLowerCase() === id) || recentProducts[0];

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
        <h1 className="text-2xl font-bold text-purple-800">Product Detail</h1>
        <button className="bg-purple-600 text-white p-2 rounded">Edit Product</button>
      </motion.div>
      <div className="bg-white p-6 rounded-lg shadow flex">
        <div className="w-1/3 h-64 bg-gray-200 flex items-center justify-center">
          <span className="text-gray-400">{product.name}</span>
        </div>
        <div className="w-2/3 pl-6">
          <h2 className="text-xl font-semibold">{product.name}</h2>
          <p className="text-gray-600 mt-2">Stock: {product.stock}</p>
          <p className="text-purple-600 font-bold mt-2">${product.price}</p>
          <button className="mt-4 bg-purple-600 text-white p-2 rounded hover:bg-purple-700">Add to Cart</button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductDetail;
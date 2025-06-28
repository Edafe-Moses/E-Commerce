"use client";

import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useDispatch } from "react-redux";
import { addToCart } from "../cart/cartSlice";

const ProductsPage = () => {
  const { recentProducts } = useSelector((state: RootState) => state.dashboard.mainSection);
  const dispatch = useDispatch();

  const handleAddToCart = (product: { name: string; price: string }) => {
    dispatch(addToCart({
      id: crypto.randomUUID(),
      name: product.name,
      price: Number(product.price.replace("$", "")),
      image: "", // Placeholder, replace with actual image URL
      category: "general",
    }));
  };

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
      <div className="flex">
        <div className="w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentProducts.map((product, index) => (
            <motion.div
              key={index}
              className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-300"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="h-48 flex items-center justify-center bg-gray-200">
                {/* Placeholder for image, replace with actual image */}
                <span className="text-gray-400">{product.name}</span>
              </div>
              <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
              <div className="flex items-center justify-between mt-2">
                <span className="text-purple-600 font-bold">${product.price}</span>
                <div className="flex space-x-1">
                  <span>★★★★☆</span> <span className="text-gray-500">(5)</span>
                </div>
              </div>
              <button
                onClick={() => handleAddToCart(product)}
                className="mt-2 w-full bg-purple-600 text-white p-2 rounded hover:bg-purple-700 transition duration-200"
              >
                Add to Cart
              </button>
              <button className="mt-2 w-full text-purple-600 hover:text-purple-800">♥</button>
            </motion.div>
          ))}
        </div>
        <div className="w-1/4 ml-6 p-4 bg-white rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Filter Products</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Keywords</label>
              <input
                type="text"
                placeholder="Phone, Headphone, Shoe..."
                className="mt-1 p-2 border rounded w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Categories</label>
              <select className="mt-1 p-2 border rounded w-full">
                <option>All</option>
                <option>Accessories</option>
                <option>Phone</option>
                <option>Headphone</option>
                <option>Camera</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Price</label>
              <select className="mt-1 p-2 border rounded w-full">
                <option>$1</option>
                <option>$500</option>
                <option>$1000</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Colors</label>
              <div className="flex space-x-2 mt-1">
                <span className="w-5 h-5 bg-blue-500 rounded-full cursor-pointer"></span>
                <span className="w-5 h-5 bg-green-500 rounded-full cursor-pointer"></span>
                <span className="w-5 h-5 bg-yellow-500 rounded-full cursor-pointer"></span>
                <span className="w-5 h-5 bg-red-500 rounded-full cursor-pointer"></span>
              </div>
            </div>
          </div>
        </div>
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

export default ProductsPage;
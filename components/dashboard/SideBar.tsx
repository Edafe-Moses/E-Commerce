"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { toggleSidebar } from "./dashboardSlice";
import { useState } from "react";

const Sidebar = () => {
  const { sidebar, isSidebarOpen } = useSelector((state: RootState) => ({
    sidebar: state.dashboard.mainSection.sidebar,
    isSidebarOpen: state.dashboard.isSidebarOpen,
  }));
  const dispatch = useDispatch();
  const [isOrdersDropdownOpen, setIsOrdersDropdownOpen] = useState(false);
  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);

  const handleOrdersClick = () => setIsOrdersDropdownOpen(!isOrdersDropdownOpen);
  const handleProductsClick = () => setIsProductsDropdownOpen(!isProductsDropdownOpen);

  return (
    <motion.div
      className={`w-64 h-screen bg-purple-100 p-4 ${isSidebarOpen ? "block" : "hidden lg:block"} lg:w-64 md:w-20 sm:w-16`}
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
    >
      <motion.div
        className="flex items-center mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <span className="text-xl font-bold">JinStore</span>
      </motion.div>
      <div className="space-y-2">
        {sidebar.items.map((item, index) => {
          if (item.label === "Orders") {
            return (
              <div key={index}>
                <motion.a
                  href="#"
                  onClick={handleOrdersClick}
                  className="flex items-center p-2 text-purple-800 hover:bg-purple-200 rounded cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  whileHover={{ scale: 1.05, backgroundColor: "#e0e7ff" }}
                >
                  {item.icon && <span className="mr-2">{item.icon}</span>}
                  <span className="hidden md:inline">{item.label}</span>
                  <span className="ml-auto">▼</span>
                </motion.a>
                <AnimatePresence>
                  {isOrdersDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="ml-4 space-y-1"
                    >
                      {item.subItems?.map((subItem, subIndex) => (
                        <motion.a
                          key={subIndex}
                          href={subItem.route}
                          className="block p-2 text-purple-800 hover:bg-purple-200 rounded"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: subIndex * 0.1, duration: 0.3 }}
                          whileHover={{ scale: 1.05 }}
                        >
                          {subItem.label}
                        </motion.a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          }
          if (item.label === "Products") {
            return (
              <div key={index}>
                <motion.a
                  href="#"
                  onClick={handleProductsClick}
                  className="flex items-center p-2 text-purple-800 hover:bg-purple-200 rounded cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  whileHover={{ scale: 1.05, backgroundColor: "#e0e7ff" }}
                >
                  {item.icon && <span className="mr-2">{item.icon}</span>}
                  <span className="hidden md:inline">{item.label}</span>
                  <span className="ml-auto">▼</span>
                </motion.a>
                <AnimatePresence>
                  {isProductsDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="ml-4 space-y-1"
                    >
                      {item.subItems?.map((subItem, subIndex) => (
                        <motion.a
                          key={subIndex}
                          href={subItem.route}
                          className="block p-2 text-purple-800 hover:bg-purple-200 rounded"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: subIndex * 0.1, duration: 0.3 }}
                          whileHover={{ scale: 1.05 }}
                        >
                          {subItem.label}
                        </motion.a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          }
          return (
            <motion.a
              key={index}
              href={item.route}
              className="flex items-center p-2 text-purple-800 hover:bg-purple-200 rounded"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              whileHover={{ scale: 1.05, backgroundColor: "#e0e7ff" }}
            >
              {item.icon && <span className="mr-2">{item.icon}</span>}
              <span className="hidden md:inline">{item.label}</span>
            </motion.a>
          );
        })}
      </div>
    </motion.div>
  );
};

export default Sidebar;
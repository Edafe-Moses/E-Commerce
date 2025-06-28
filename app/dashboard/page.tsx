import React from 'react';
import { motion } from 'framer-motion';
import Sidebar from '@/components/dashboard/SideBar';

const dashboardData = {
  header: { title: 'Overview', searchPlaceholder: 'Search...' },
  salesChart: { value: '$10,332.40', change: '+ 8.2%' },
  channels: {
    data: [
      { percentage: '48%', source: 'Social Media', color: 'bg-purple-500' },
      { percentage: '30%', source: 'Google', color: 'bg-blue-500' },
      { percentage: '22%', source: 'Email', color: 'bg-green-500' }
    ]
  },
  orders: { count: 310, change: 'Over last month 14%' },
  sales: { value: '$3,759.00', change: 'Over last month 2.4%' },
  topCountries: [
    { name: 'United States', amount: '$1,210' },
    { name: 'Venezuela', amount: '$1,047' },
    { name: 'El Salvador', amount: '$1,058' },
    { name: 'Russia', amount: '$1,020' }
  ],
  reviews: [
    { name: 'Joann Siddleby', rating: '★★★★☆', comment: 'Very nice glasses, ordered for my friend' }
  ],
  activity: {
    items: [
      { title: 'Delivered', detail: '15 New Packages' },
      { title: 'Ordered', detail: '72 New Items' },
      { title: 'Reported', detail: '50 Support New Cases' },
      { title: 'Arrived', detail: '34 Uploaded Boxed' }
    ]
  },
  productsSold: {}, // Placeholder for bar chart data
  recentProducts: [
    { name: 'Cookie', stock: 'Out of Stock', price: '$50' },
    { name: 'Glass', stock: 'In Stock', price: '$20' },
    { name: 'Headphone', stock: 'In Stock', price: '$70' },
    { name: 'Perfume', stock: 'In Stock', price: '$50' }
  ]
};

const Dashboard: React.FC = () => {
  return (
    <div className="flex">
      <Sidebar />
      <motion.div 
        className="flex-1 p-6 bg-gray-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="flex justify-between items-center mb-6"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
        >
          <h1 className="text-2xl font-bold">{dashboardData.header.title}</h1>
          <div className="flex space-x-4">
            <input type="text" placeholder={dashboardData.header.searchPlaceholder} className="p-2 rounded" />
            <motion.button 
              className="bg-purple-500 text-white p-2 rounded"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Channels
            </motion.button>
          </div>
        </motion.div>
        <div className="grid grid-cols-3 gap-6">
          <motion.div 
            className="bg-white p-4 rounded shadow"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
          >
            <h2 className="text-lg font-semibold">Sales Chart</h2>
            <p className="text-2xl font-bold">{dashboardData.salesChart.value} <span className="text-green-500">{dashboardData.salesChart.change}</span></p>
            <div className="h-40 bg-gray-200 mt-2"></div>
          </motion.div>
          <motion.div 
            className="bg-white p-4 rounded shadow"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
          >
            <h2 className="text-lg font-semibold">Channels</h2>
            <div className="h-40 flex items-center justify-center bg-gray-200 mt-2">
              <div className="w-32 h-32 bg-purple-200 rounded-full"></div>
            </div>
            {dashboardData.channels.data.map((channel, index) => (
              <motion.p 
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                {channel.percentage} <span className={channel.color}>{channel.source}</span>
              </motion.p>
            ))}
          </motion.div>
          <motion.div 
            className="bg-white p-4 rounded shadow"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
          >
            <h2 className="text-lg font-semibold">Recent Reviews</h2>
            {dashboardData.reviews.map((review, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <p>{review.name} <span className="text-yellow-500">{review.rating}</span></p>
                <p>{review.comment}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
        <div className="grid grid-cols-3 gap-6 mt-6">
          <motion.div 
            className="bg-white p-4 rounded shadow"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
          >
            <h2 className="text-lg font-semibold">Orders</h2>
            <p className="text-2xl font-bold">{dashboardData.orders.count}</p>
            <p>{dashboardData.orders.change}</p>
          </motion.div>
          <motion.div 
            className="bg-white p-4 rounded shadow"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
          >
            <h2 className="text-lg font-semibold">Sales</h2>
            <p className="text-2xl font-bold">{dashboardData.sales.value}</p>
            <p>{dashboardData.sales.change}</p>
          </motion.div>
          <motion.div 
            className="bg-white p-4 rounded shadow"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
          >
            <h2 className="text-lg font-semibold">Your Top Countries</h2>
            {dashboardData.topCountries.map((country, index) => (
              <motion.p 
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                {country.name} <span>{country.amount}</span>
              </motion.p>
            ))}
          </motion.div>
        </div>
        <div className="grid grid-cols-4 gap-6 mt-6">
          <motion.div 
            className="bg-white p-4 rounded shadow"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
          >
            <h2 className="text-lg font-semibold">Activity Overview</h2>
            <div className="flex space-x-4">
              {dashboardData.activity.items.map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <p>{item.title}</p>
                  <p>{item.detail}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <motion.div 
            className="bg-purple-500 text-white p-4 rounded shadow col-span-2"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
          >
            <h2 className="text-lg font-semibold">Products Sold</h2>
            <div className="h-40 bg-gray-200 mt-2"></div>
          </motion.div>
          <motion.div 
            className="bg-white p-4 rounded shadow"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
          >
            <h2 className="text-lg font-semibold">Recent Products</h2>
            <table className="w-full">
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
                {dashboardData.recentProducts.map((product, index) => (
                  <motion.tr 
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <td><input type="checkbox" /></td>
                    <td>{product.name}</td>
                    <td>{product.stock}</td>
                    <td>{product.price}</td>
                    <td>...</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
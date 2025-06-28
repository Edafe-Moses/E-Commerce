'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '@/lib/features/cart/cartSlice';
import Link from 'next/link';
import Image from 'next/image';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: any) => state.cart.items);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 500);
  }, []);

  const handleRemoveItem = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const total = cartItems.reduce((sum: number, item: CartItem) => sum + item.price * item.quantity, 0);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  if (isLoading) {
    return <div className="text-center text-white">Loading...</div>;
  }

  return (
    <div className="min-h-screen p-4">
      <nav className="text-gray-400 text-sm mb-8">
        <Link href="/">Home</Link> 
      </nav>
      {cartItems.length === 0 ? (
        <motion.div
          className="flex flex-col items-center justify-center h-64 border border-white rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-red-500 text-[18px] font-bold">YOUR CART IS CURRENTLY EMPTY.</p>
          <Link href="/shop">
            <button className="mt-4 bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700">
              Return to shop
            </button>
          </Link>
        </motion.div>
      ) : (
        <motion.div
          className="w-full max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <h2 className="text-2xl font-bold mb-6">Your Cart</h2>
          <div className="space-y-4">
            {cartItems.map((item: CartItem) => (
              <motion.div
                key={item.id}
                className="flex items-center justify-between p-4 shadow-xl  rounded-lg"
                variants={itemVariants}
              >
                <div className="flex items-center gap-4">
                  <Image
                    src={`/icons/NewProducts/${item.id}.png`}
                    alt={item.name}
                    width={50}
                    height={50}
                    className="object-contain"
                  />
                  <div>
                    <p className="text-sm">{item.name}</p>
                    <p className="text-gray-400">${item.price.toFixed(2)} x {item.quantity}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </motion.div>
            ))}
          </div>
          <div className="mt-6 p-4 shadow-xl rounded-lg text-right">
            <p className="text-lg font-bold">Total: ${total.toFixed(2)}</p>
            <Link href={'/checkout'} className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
              Checkout
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Cart;
'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/lib/features/cart/cartSlice';
import Link from 'next/link';
import imageOne from '@/public/icons/NewProducts/1.png';
import imageTwo from '@/public/icons/NewProducts/2.png';
import imageThree from '@/public/icons/NewProducts/3.png';
import imageFour from '@/public/icons/NewProducts/4.png';
import imageFive from '@/public/icons/NewProducts/5.png';
import imageSix from '@/public/icons/NewProducts/6.png';
import Products from '@/components/ui/beautifulProducts';

interface Product {
  id: number;
  src: string;
  title: string;
  price: string;
  important1: string;
  important1Color: string;
  important2?: string;
  important2Color: string;
  originalPrice: string;
  sideText?: string;
  available?: number;
  rating?: number;
}

const NewProducts = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  const datas: Product[] = [
    {
      id: 1,
      src: imageOne.src,
      title: '100 Percent Apple Juice - 64 fl oz Bottle',
      price: '0.50',
      important1: '75%',
      important1Color: '',
      important2: 'ORGANIC',
      important2Color: 'o',
      originalPrice: '1.99',
      sideText: 'This product is about to run out',
      available: 23,
      rating: 4,
    },
    {
      id: 2,
      src: imageTwo.src,
      title: 'Great Value Rising Crust Frozen Pizza, Supreme',
      price: '8.99',
      important1: '11%',
      important1Color: '',
      important2: 'COLD SALE',
      important2Color: 'c',
      originalPrice: '9.99',
      sideText: 'This product is about to run out',
      available: 18,
      rating: 3,
    },
    {
      id: 3,
      src: imageThree.src,
      title: 'Simply Orange Pulp Free Juice – 52 fl oz',
      price: '2.45',
      important1: '41%',
      important1Color: '',
      important2: 'ORGANIC',
      important2Color: 'o',
      originalPrice: '4.13',
      sideText: 'This product is about to run out',
      available: 27,
      rating: 5,
    },
    {
      id: 5,
      src: imageFour.src,
      title: 'California Pizza Kitchen Margherita, Crispy Thin Crus…',
      price: '11.77',
      important1: '21%',
      important1Color: '',
      important2: 'COLD SALE',
      important2Color: 'c',
      originalPrice: '14.77',
      sideText: 'This product is about to run out',
      available: 19,
      rating: 4,
    },
    {
      id: 6,
      src: imageFive.src,
      title: 'Cantaloupe Melon Fresh Organic Cut',
      price: '1.25',
      important1: '59%',
      important1Color: '',
      important2: 'ORGANIC',
      important2Color: 'o',
      originalPrice: '2.98',
      sideText: 'This product is about to run out',
      available: 16,
      rating: 3,
    },
    {
      id: 7,
      src: imageSix.src,
      title: 'Angel Soft Toilet Paper, 9 Mega Rolls',
      price: '14.12',
      important1: '75%',
      important1Color: '',
      important2: 'ORGANIC',
      important2Color: 'o',
      originalPrice: '17.12',
      sideText: 'This product is about to run out',
      available: 32,
      rating: 5,
    },
  ];

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 500);
  }, []);

  const handleAddToCart = (product: Product) => {
    dispatch(
      addToCart({
        id: product.id,
        name: product.title,
        price: parseFloat(product.price),
        quantity: 1,
      })
    );
  };

  const headerVariants = {
    hidden: { x: '-100%', opacity: 0 },
    visible: { x: 0, opacity: 1 },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <motion.div
      className="w-4/5 mx-auto text-[#030712] mt-8  text-white p-4 rounded-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="flex gap-4 items-center mb-6"
        variants={headerVariants}
        initial="hidden"
        animate="visible"
      >
        <h2 className="text-white font-bold text-lg">New Products</h2>
        <p className="text-[#9CA3AF] text-[13px]">Some of the new products arriving this week</p>
        <Link href="/products/new" className="text-blue-400 text-sm ml-auto">
          View All
        </Link>
      </motion.div>
      {isLoading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          <Products datas={datas} onAddToCart={handleAddToCart} />
        </motion.div>
      )}
    </motion.div>
  );
};

export default NewProducts;
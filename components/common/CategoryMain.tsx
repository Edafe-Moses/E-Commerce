'use client';

import Products from '@/components/ui/beautifulProducts';
import { addToCart } from '@/lib/features/cart/cartSlice';
import { Menu, Transition } from '@headlessui/react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import CustomRangeSlider from './CustomRange';
import Banner from '../ui/banner';

interface Product {
  id: number;
  src: string;
  title: string;
  price: string;
  important1: string;
  important2?: string;
  important2Color: string;
  originalPrice: string;
  sideText?: string;
  available?: string;
  rating?: number;
  inStock?: boolean;
}

const CategoryMain = () => {
  const dispatch = useDispatch();
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(30);
  const [productCategories, setProductCategories] = useState([
    { id: 1, checked: true, name: 'Fruits & Vegetables', breakDownSrc: true },
    { id: 2, checked: false, name: 'Baby & Pregnancy', breakDownSrc: false },
    { id: 3, checked: false, name: 'Beverages', breakDownSrc: false },
    { id: 4, checked: false, name: 'Meats & Seafood', breakDownSrc: false },
    { id: 5, checked: false, name: 'Biscuits & Snacks', breakDownSrc: false },
    { id: 6, checked: false, name: 'Breads & Bakery', breakDownSrc: false },
    { id: 7, checked: false, name: 'Breakfast & Dairy', breakDownSrc: false },
    { id: 8, checked: false, name: 'Frozen Foods', breakDownSrc: false },
    { id: 9, checked: false, name: 'Grocery & Staples', breakDownSrc: false },
    { id: 10, checked: false, name: 'Healthcare', breakDownSrc: false },
    { id: 11, checked: false, name: 'Household Needs', breakDownSrc: false },
  ]);
  const [brands, setBrands] = useState([{ id: 13, checked: true, name: 'Fresh', count: 1 }]);
  const [status, setStatus] = useState([
    { id: 14, checked: false, name: 'In Stock' },
    { id: 15, checked: false, name: 'In Sale' },
  ]);
  const [products, setProducts] = useState<Product[]>([]);
  const [sortOption, setSortOption] = useState('Latest');
  const [visibleProducts, setVisibleProducts] = useState(8);

  useEffect(() => {
    // Simulate product data (replace with API call later)
    const initialProducts = [
      { id: 1, src: '/icons/FilterProducts/810.png', title: 'Yellow Potatoes Whole Fresh, 5lb Bag', price: '5.00', important1: '10%', important2Color: 'o', originalPrice: '5.50', sideText: 'Organic', available: '50 units', rating: 4, inStock: true },
      { id: 2, src: '/icons/FilterProducts/817.png', title: 'Large Bagged Oranges', price: '3.50', important1: '15%', important2Color: 'c', originalPrice: '4.00', sideText: 'Seasonal', available: '30 units', rating: 3, inStock: true },
      { id: 3, src: '/icons/FilterProducts/821.png', title: 'Strawberries – 1lb', price: '3.50', important1: '15%', important2Color: 'c', originalPrice: '4.00', sideText: 'Seasonal', available: '30 units', rating: 3, inStock: true },
      { id: 4, src: '/icons/FilterProducts/825.png', title: 'Simple Kitchen FD Sliced Strawberries – 1.08lb', price: '3.50', important1: '15%', important2Color: 'c', originalPrice: '4.00', sideText: 'Seasonal', available: '30 units', rating: 3, inStock: true },
      { id: 5, src: '/icons/FilterProducts/833.png', title: 'Peach – each', price: '3.50', important1: '15%', important2Color: 'c', originalPrice: '4.00', sideText: 'Seasonal', available: '30 units', rating: 3, inStock: true },
      { id: 6, src: '/icons/FilterProducts/840.png', title: 'Marketside Fresh Organic Bananas, Bunch', price: '3.50', important1: '15%', important2Color: 'c', originalPrice: '4.00', sideText: 'Seasonal', available: '30 units', rating: 3, inStock: true },
      { id: 7, src: '/icons/FilterProducts/848.png', title: 'Large Garden Spinach & Herb Wrap Tortillas –…', price: '3.50', important1: '15%', important2Color: 'c', originalPrice: '4.00', sideText: 'Seasonal', available: '30 units', rating: 3, inStock: true },
      { id: 8, src: '/icons/FilterProducts/852.png', title: 'Halloween Harvest Caramel Apple Soft Caramels –…', price: '3.50', important1: '15%', important2Color: 'c', originalPrice: '4.00', sideText: 'Seasonal', available: '30 units', rating: 3, inStock: true },
      { id: 9, src: '/icons/FilterProducts/861.png', title: 'Fresh Purple Eggplant', price: '3.50', important1: '15%', important2Color: 'c', originalPrice: '4.00', sideText: 'Seasonal', available: '30 units', rating: 3, inStock: true },
      { id: 10, src: '/icons/FilterProducts/868.png', title: 'Fresh Pomegranate, Each', price: '3.50', important1: '15%', important2Color: 'c', originalPrice: '4.00', sideText: 'Seasonal', available: '30 units', rating: 3, inStock: true },
      { id: 11, src: '/icons/FilterProducts/872.png', title: 'Fresh Lemon, Each', price: '3.50', important1: '15%', important2Color: 'c', originalPrice: '4.00', sideText: 'Seasonal', available: '30 units', rating: 3, inStock: true },
      { id: 12, src: '/icons/FilterProducts/879.png', title: 'Fresh Cauliflower, Each', price: '3.50', important1: '15%', important2Color: 'c', originalPrice: '4.00', sideText: 'Seasonal', available: '30 units', rating: 3, inStock: true },
      { id: 13, src: '/icons/FilterProducts/886.png', title: 'Fresh Broccoli Crowns, Each', price: '3.50', important1: '15%', important2Color: 'c', originalPrice: '4.00', sideText: 'Seasonal', available: '30 units', rating: 3, inStock: true },
      { id: 14, src: '/icons/FilterProducts/890.png', title: 'Blackberries – 6oz', price: '3.50', important1: '15%', important2Color: 'c', originalPrice: '4.00', sideText: 'Seasonal', available: '30 units', rating: 3, inStock: true },
      { id: 15, src: '/icons/FilterProducts/894.png', title: '30g Protein Shake – Salted Caramel – 11 fl oz-4pk', price: '3.50', important1: '15%', important2Color: 'c', originalPrice: '4.00', sideText: 'Seasonal', available: '30 units', rating: 3, inStock: true },
      { id: 16, src: '/icons/FilterProducts/903.png', title: 'Fresh Granny Smith Apple, Each', price: '3.50', important1: '15%', important2Color: 'c', originalPrice: '4.00', sideText: 'Seasonal', available: '30 units', rating: 3, inStock: true },
    ];
    setProducts(initialProducts);
  }, []);

  const updateMinMax = (index: number, value: number) => {
    if (index === 0) setMin(value);
    else setMax(value);
    // Filter products based on price range
    setProducts((prev) =>
      prev.filter((p) => parseFloat(p.price) >= min && parseFloat(p.price) <= max)
    );
  };

  const toggleCategories = (id: number) => {
    setProductCategories((prev) =>
      prev.map((cat) => (cat.id === id ? { ...cat, checked: !cat.checked } : cat))
    );
  };

  const toggleBrands = (id: number) => {
    setBrands((prev) =>
      prev.map((brand) => (brand.id === id ? { ...brand, checked: !brand.checked } : brand))
    );
  };

  const toggleStatus = (id: number) => {
    setStatus((prev) =>
      prev.map((s) => (s.id === id ? { ...s, checked: !s.checked } : s))
    );
  };

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

  const handleSortChange = (option: string) => {
    setSortOption(option);
    setProducts((prev) => {
      const sorted = [...prev];
      if (option === 'Price: Low to High') {
        sorted.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
      } else {
        sorted.sort((a, b) => b.id - a.id); // Latest based on ID
      }
      return sorted;
    });
  };

  const handleShowMore = () => {
    setVisibleProducts((prev) => Math.min(prev + 20, products.length));
  };

  return (
    <div className="w-4/5 mx-auto text-[#030712] my-10 flex gap-6">
      {/* Sidebar */}
      <motion.section
        className="w-1/4 p-4 rounded-lg hidden lg:block"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Price Filter */}
        <div className="border-b border-gray-600 pb-4 mb-4">
          <p className="text-[14px] font-semibold mb-2">Price Filter</p>
          <div className="flex items-center justify-between mb-2">
            {[{ id: 1, name: 'Min', value: min }, { id: 2, name: 'Max', value: max }].map(
              (item, index) => (
                <div key={item.id} className="flex flex-col">
                  <p className="text-[12px] text-gray-400">{item.name}</p>
                  <input
                    type="number"
                    value={item.value}
                    onChange={(e) => updateMinMax(index, parseInt(e.target.value) || 0)}
                    className="border border-gray-500 rounded-lg text-white outline-none w-20 py-1 px-2"
                    min="0"
                    max={index === 0 ? max : 100}
                  />
                </div>
              )
            )}
          </div>
          <CustomRangeSlider min={min} max={max} onChange={updateMinMax} />
        </div>

        {/* Product Categories */}
        <div className="mb-4">
          <p className="text-[14px] font-semibold mb-2">Product Categories</p>
          {productCategories.map((cat) => (
            <div
              key={cat.id}
              className="flex items-center gap-2 mb-2 cursor-pointer"
              onClick={() => toggleCategories(cat.id)}
            >
              <span
                className={`w-4 h-4 border ${
                  cat.checked ? 'bg-[#634C9F] border-[#634C9F]' : 'border-gray-500'
                } rounded-sm`}
              />
              <p className="text-[14px]">{cat.name}</p>
            </div>
          ))}
        </div>

        {/* Filter by Color */}
        <div className="mb-4 border-b border-gray-600 pb-4">
          <p className="text-[14px] font-semibold mb-2">Filter by Color</p>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-[#81D742] rounded-full" />
            <p className="text-[14px]">Green (1)</p>
          </div>
        </div>

        {/* Filter by Brands */}
        <div className="mb-4">
          <p className="text-[14px] font-semibold mb-2">Filter by Brands</p>
          {brands.map((brand) => (
            <div
              key={brand.id}
              className="flex items-center gap-2 mb-2 cursor-pointer"
              onClick={() => toggleBrands(brand.id)}
            >
              <span
                className={`w-4 h-4 border ${
                  brand.checked ? 'bg-[#634C9F] border-[#634C9F]' : 'border-gray-500'
                } rounded-sm`}
              />
              <p className="text-[14px]">{brand.name} ({brand.count})</p>
            </div>
          ))}
        </div>

        {/* Product Status */}
        <div>
          <p className="text-[14px] font-semibold mb-2">Product Status</p>
          {status.map((s) => (
            <div
              key={s.id}
              className="flex items-center gap-2 mb-2 cursor-pointer"
              onClick={() => toggleStatus(s.id)}
            >
              <span
                className={`w-4 h-4 border ${
                  s.checked ? 'bg-[#634C9F] border-[#634C9F]' : 'border-gray-500'
                } rounded-sm`}
              />
              <p className="text-[14px]">{s.name}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Main Section */}
      <motion.section
        className="w-3/4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Promotional Banner */}
        <Banner />

        {/* Product Controls */}
        <div className="bg-[#F3F4F6] p-4 rounded-lg flex justify-between items-center mb-4">
          <span className="text-sm">Showing 1-8 of 18 results</span>
          <div className="flex gap-4 items-center">
            <Menu as="div" className="relative">
              <Menu.Button className=" px-4 py-2 rounded hover:bg-purple-700 transition-colors">
                Sort by {sortOption}
              </Menu.Button>
              <Transition
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-in"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
                <Menu.Items className="absolute right-0 mt-2 w-48 bg-[#F3F4F6]  border border-gray-100 z-30 rounded shadow-lg ">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`block w-full text-left px-4 py-2 ${active ? 'bg-gray-600' : ''}`}
                        onClick={() => handleSortChange('Latest')}
                      >
                        Latest
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`block w-full text-left px-4 py-2 ${active ? 'bg-gray-600' : ''}`}
                        onClick={() => handleSortChange('Price: Low to High')}
                      >
                        Price: Low to High
                      </button>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
            <button
              className=" px-4 py-2 rounded hover:bg-purple-700 transition-colors"
              onClick={handleShowMore}
            >
              Show 20 items
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <Products
          datas={products.slice(0, visibleProducts)}
          onAddToCart={handleAddToCart}
        />
      </motion.section>
    </div>
  );
};

export default CategoryMain;
'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import Link from 'next/image';

interface CheckoutProps {}

const Checkout = () => {
  const cartItems = useSelector((state: any) => state.cart.items);
  const [isLoading, setIsLoading] = useState(true);
  const [showCoupon, setShowCoupon] = useState(false);
  const [shippingMethod, setShippingMethod] = useState('flat_rate');
  const [termsAccepted, setTermsAccepted] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 500);
  }, []);

  const subtotal = cartItems.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0);
  const shippingCost = shippingMethod === 'flat_rate' ? 15.00 : 0.00;
  const total = subtotal + shippingCost;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  const bannerVariants = {
    hidden: { y: '-100%', opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { delay: 0.2, duration: 0.5 } },
  };

  if (isLoading) {
    return <div className="text-center text-white">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[#030712] text-white p-4">
      <nav className="text-gray-400 text-sm mb-8">
        <Link href="/">Home</Link> > Checkout
      </nav>
      <motion.div
        className="w-full max-w-4xl mx-auto bg-white text-black p-6 rounded-lg shadow-lg"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Coupon and Promotion Banners */}
        <motion.div variants={bannerVariants} initial="hidden" animate="visible">
          <div className="border p-3 mb-4 rounded">
            <p className="text-gray-600">Have a coupon? <span className="text-blue-500 cursor-pointer" onClick={() => setShowCoupon(!showCoupon)}>Click here to enter your code</span></p>
            {showCoupon && <input type="text" className="w-full p-2 border rounded mt-2" placeholder="Enter coupon code" />}
          </div>
          <div className="bg-red-100 border p-3 mb-4 rounded text-red-700">
            <p>Add $299.11 to cart and get free shipping!</p>
          </div>
        </motion.div>

        {/* Billing Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-bold mb-4">Billing details</h2>
            <div className="space-y-4">
              <input type="text" placeholder="First name" className="w-full p-2 border rounded" />
              <input type="text" placeholder="Last name" className="w-full p-2 border rounded" />
              <select className="w-full p-2 border rounded">
                <option>United States (US)</option>
              </select>
              <input type="text" placeholder="House number and street name" className="w-full p-2 border rounded" />
              <input type="text" placeholder="Apartment, suite, etc. (optional)" className="w-full p-2 border rounded" />
              <input type="text" placeholder="Town / City" className="w-full p-2 border rounded" />
              <select className="w-full p-2 border rounded">
                <option>California</option>
              </select>
              <input type="text" placeholder="Postcode / ZIP" className="w-full p-2 border rounded" />
              <textarea placeholder="Notes about your order, e.g. special notes for delivery" className="w-full p-2 border rounded h-24"></textarea>
            </div>
            <div className="mt-4 space-y-2">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Create an account?
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Ship to a different address?
              </label>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-gray-100 p-4 rounded">
            <h2 className="text-xl font-bold mb-4">Your order</h2>
            <div className="space-y-2">
              <p>Product <span className="float-right">$20.00</span></p>
              <p>Subtotal <span className="float-right">$20.00</span></p>
              <p>
                Shipping
                <span className="float-right">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="shipping"
                      value="flat_rate"
                      checked={shippingMethod === 'flat_rate'}
                      onChange={() => setShippingMethod('flat_rate')}
                      className="mr-2"
                    />
                    Flat rate: $15.00
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="shipping"
                      value="local_pickup"
                      checked={shippingMethod === 'local_pickup'}
                      onChange={() => setShippingMethod('local_pickup')}
                      className="mr-2"
                    />
                    Local pickup
                  </label>
                </span>
              </p>
              <p>Total <span className="float-right">${total.toFixed(2)}</span></p>
            </div>
            <div className="mt-4 text-sm text-gray-600">
              <p>Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.</p>
            </div>
            <div className="mt-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={() => setTermsAccepted(!termsAccepted)}
                  className="mr-2"
                />
                I have read and agree to the website terms and conditions
              </label>
            </div>
            <button
              className="w-full bg-purple-700 text-white p-2 rounded mt-4 disabled:bg-gray-400"
              disabled={!termsAccepted}
            >
              Place order
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Checkout;
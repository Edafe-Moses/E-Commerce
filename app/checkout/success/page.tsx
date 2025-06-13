'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useAppSelector } from '@/lib/hooks';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PageTransition, FadeInUp } from '@/components/animations/PageTransition';
import { FloatingElement, PulsingElement, GlowingElement } from '@/components/animations/FloatingElements';
import {
  CheckCircle,
  Package,
  Truck,
  Mail,
  Download,
  Star,
  Gift,
  Sparkles,
  ArrowRight,
  Home,
  ShoppingBag,
} from 'lucide-react';

export default function CheckoutSuccessPage() {
  const { user } = useAppSelector((state) => state.auth);

  const orderNumber = 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase();
  const estimatedDelivery = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString();

  useEffect(() => {
    // Confetti effect
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      
      // Create confetti particles
      const particles = Array.from({ length: Math.floor(particleCount) }, () => ({
        ...defaults,
        particleCount: 1,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      }));

      particles.forEach(particle => {
        // Simulate confetti with DOM elements
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57'][Math.floor(Math.random() * 5)];
        confetti.style.left = particle.origin.x * window.innerWidth + 'px';
        confetti.style.top = particle.origin.y * window.innerHeight + 'px';
        confetti.style.zIndex = '9999';
        confetti.style.pointerEvents = 'none';
        confetti.style.borderRadius = '50%';
        document.body.appendChild(confetti);

        setTimeout(() => {
          if (confetti.parentNode) {
            confetti.parentNode.removeChild(confetti);
          }
        }, 3000);
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <PageTransition className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <Header />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Success Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <FloatingElement duration={3}>
              <motion.div
                className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mb-6 shadow-2xl"
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <CheckCircle className="h-12 w-12 text-white" />
              </motion.div>
            </FloatingElement>

            <motion.h1 
              className="text-4xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ 
                type: "spring", 
                stiffness: 200, 
                delay: 0.3 
              }}
            >
              Order Confirmed! 🎉
            </motion.h1>

            <motion.p 
              className="text-xl text-gray-600 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Thank you for your purchase! Your order has been successfully placed.
            </motion.p>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.7, type: "spring" }}
            >
              <Badge className="bg-gradient-to-r from-green-500 to-blue-500 text-white text-lg px-6 py-2">
                <Sparkles className="h-4 w-4 mr-2" />
                Order #{orderNumber}
              </Badge>
            </motion.div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Order Details */}
            <FadeInUp delay={0.2}>
              <GlowingElement>
                <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-md overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
                    <CardTitle className="flex items-center space-x-2">
                      <Package className="h-6 w-6" />
                      <span>Order Details</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8 space-y-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Order Number</span>
                        <span className="font-semibold">{orderNumber}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Order Date</span>
                        <span className="font-semibold">{new Date().toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Estimated Delivery</span>
                        <span className="font-semibold text-green-600">{estimatedDelivery}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Payment Status</span>
                        <Badge className="bg-green-100 text-green-800">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Paid
                        </Badge>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
                      <div className="flex items-center space-x-2 text-blue-700 mb-2">
                        <Mail className="h-4 w-4" />
                        <span className="font-medium">Confirmation Email Sent</span>
                      </div>
                      <p className="text-sm text-blue-600">
                        We've sent a confirmation email to {user?.email} with your order details and tracking information.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </GlowingElement>
            </FadeInUp>

            {/* Next Steps */}
            <FadeInUp delay={0.4}>
              <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-md">
                <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                  <CardTitle className="flex items-center space-x-2">
                    <Truck className="h-6 w-6" />
                    <span>What's Next?</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-6">
                  <div className="space-y-4">
                    <motion.div 
                      className="flex items-start space-x-3"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <PulsingElement>
                        <div className="bg-blue-100 p-2 rounded-full">
                          <Package className="h-4 w-4 text-blue-600" />
                        </div>
                      </PulsingElement>
                      <div>
                        <h4 className="font-semibold">Order Processing</h4>
                        <p className="text-sm text-gray-600">We're preparing your items for shipment</p>
                      </div>
                    </motion.div>

                    <motion.div 
                      className="flex items-start space-x-3"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="bg-green-100 p-2 rounded-full">
                        <Truck className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold">Shipping Updates</h4>
                        <p className="text-sm text-gray-600">You'll receive tracking info once shipped</p>
                      </div>
                    </motion.div>

                    <motion.div 
                      className="flex items-start space-x-3"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="bg-purple-100 p-2 rounded-full">
                        <Download className="h-4 w-4 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold">Download Receipt</h4>
                        <p className="text-sm text-gray-600">Available in your account dashboard</p>
                      </div>
                    </motion.div>
                  </div>

                  <motion.div
                    className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-lg border border-yellow-200"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1, type: "spring" }}
                  >
                    <div className="flex items-center space-x-2 text-orange-700 mb-2">
                      <Star className="h-4 w-4" />
                      <span className="font-medium">Rate Your Experience</span>
                    </div>
                    <p className="text-sm text-orange-600">
                      Help us improve by rating your shopping experience once you receive your order.
                    </p>
                  </motion.div>
                </CardContent>
              </Card>
            </FadeInUp>
          </div>

          {/* Special Offers */}
          {user?.accountType === 'B2B' && (
            <FadeInUp delay={0.6}>
              <Card className="shadow-2xl border-0 bg-gradient-to-r from-indigo-500 to-purple-600 text-white mb-12">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <FloatingElement duration={4}>
                        <div className="bg-white/20 p-3 rounded-full">
                          <Gift className="h-8 w-8" />
                        </div>
                      </FloatingElement>
                      <div>
                        <h3 className="text-2xl font-bold mb-2">Exclusive B2B Offer!</h3>
                        <p className="text-indigo-100">
                          Get 15% off your next order with code <span className="font-mono bg-white/20 px-2 py-1 rounded">B2B15</span>
                        </p>
                      </div>
                    </div>
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Sparkles className="h-12 w-12 text-yellow-300" />
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </FadeInUp>
          )}

          {/* Action Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Link href="/dashboard">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg">
                  <Package className="mr-2 h-5 w-5" />
                  Track Your Order
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </Link>

            <Link href="/products">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button variant="outline" size="lg" className="border-2 hover:bg-blue-50 shadow-lg">
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Continue Shopping
                </Button>
              </motion.div>
            </Link>

            <Link href="/">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button variant="ghost" size="lg" className="hover:bg-gray-100">
                  <Home className="mr-2 h-5 w-5" />
                  Back to Home
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </div>

      <Footer />
    </PageTransition>
  );
}
'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { fetchProducts } from '@/lib/features/product/productSlice';
import { startOnboarding } from '@/lib/features/user/userSlice';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { OnboardingModal } from '@/components/onboarding/OnboardingModal';
import { ProductCard } from '@/components/products/ProductCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PageTransition, FadeInUp, SlideInLeft, SlideInRight, StaggerContainer, StaggerItem } from '@/components/animations/PageTransition';
import { FloatingElement, PulsingElement, GlowingElement } from '@/components/animations/FloatingElements';
import { ProductCardSkeleton } from '@/components/animations/LoadingAnimations';
import {
  ArrowRight,
  Shield,
  Truck,
  Headphones,
  Star,
  Users,
  Package,
  TrendingUp,
  Sparkles,
  Zap,
  Globe,
} from 'lucide-react';

export default function HomePage() {
  const dispatch = useAppDispatch();
  const { featuredProducts, isLoading } = useAppSelector((state) => state.products);
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated && user && !user.isOnboarded) {
      dispatch(startOnboarding());
    }
  }, [dispatch, isAuthenticated, user]);

  const features = [
    {
      icon: Shield,
      title: 'Secure Payments',
      description: 'Industry-leading security for all transactions',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Truck,
      title: 'Fast Shipping',
      description: 'Free shipping on orders over $100',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: Headphones,
      title: '24/7 Support',
      description: 'Expert customer service whenever you need it',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: Users,
      title: 'B2B Solutions',
      description: 'Special pricing and bulk ordering for businesses',
      color: 'from-orange-500 to-red-500',
    },
  ];

  const stats = [
    { icon: Users, value: '10K+', label: 'Happy Customers' },
    { icon: Package, value: '5K+', label: 'Products' },
    { icon: Star, value: '4.8', label: 'Average Rating' },
    { icon: TrendingUp, value: '99%', label: 'Satisfaction Rate' },
  ];

  return (
    <PageTransition className="min-h-screen bg-background">
      <Header />
      <OnboardingModal />

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 -z-10">
          <FloatingElement duration={4} delay={0} className="absolute top-20 left-10">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-xl" />
          </FloatingElement>
          <FloatingElement duration={5} delay={1} className="absolute top-40 right-20">
            <div className="w-32 h-32 bg-gradient-to-r from-pink-400/20 to-orange-400/20 rounded-full blur-xl" />
          </FloatingElement>
          <FloatingElement duration={6} delay={2} className="absolute bottom-20 left-1/4">
            <div className="w-16 h-16 bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-full blur-xl" />
          </FloatingElement>
        </div>

        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <SlideInLeft className="space-y-8">
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Badge variant="secondary" className="w-fit bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-200">
                    <Sparkles className="h-3 w-3 mr-1" />
                    Professional eCommerce Platform
                  </Badge>
                </motion.div>
                
                <motion.h1 
                  className="text-4xl lg:text-7xl font-bold leading-tight"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  Shop Smarter with{' '}
                  <motion.span 
                    className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent"
                    animate={{ 
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity,
                      ease: "linear" 
                    }}
                  >
                    EcomPro
                  </motion.span>
                </motion.h1>
                
                <motion.p 
                  className="text-xl text-muted-foreground leading-relaxed"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  The ultimate destination for professional products. Whether you're a business or individual customer, we've got you covered with cutting-edge technology and unmatched service.
                </motion.p>
              </div>

              <motion.div 
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <Link href="/products">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg">
                      <Zap className="mr-2 h-5 w-5" />
                      Shop Now
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </motion.div>
                </Link>
                <Link href="/about">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button variant="outline" size="lg" className="w-full sm:w-auto border-2 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50">
                      <Globe className="mr-2 h-5 w-5" />
                      Learn More
                    </Button>
                  </motion.div>
                </Link>
              </motion.div>

              {/* User Account Type Display */}
              {isAuthenticated && user && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  <GlowingElement>
                    <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-3">
                          <PulsingElement>
                            <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-full p-2">
                              <Users className="h-5 w-5 text-white" />
                            </div>
                          </PulsingElement>
                          <div>
                            <p className="font-medium">Welcome back, {user.name}! 🎉</p>
                            <p className="text-sm text-muted-foreground">
                              {user.accountType === 'B2B' ? 'Enjoying special B2B pricing ✨' : 'Shopping as an individual customer 🛍️'}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </GlowingElement>
                </motion.div>
              )}
            </SlideInLeft>

            <SlideInRight className="relative">
              <motion.div 
                className="grid grid-cols-2 gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                {featuredProducts.slice(0, 4).map((product, index) => (
                  <motion.div
                    key={product.id}
                    className={`relative group ${index % 2 === 0 ? 'mt-8' : 'mb-8'}`}
                    initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ 
                      duration: 0.6, 
                      delay: 0.7 + index * 0.1,
                      type: "spring",
                      stiffness: 100
                    }}
                    whileHover={{ 
                      scale: 1.05, 
                      rotate: index % 2 === 0 ? 2 : -2,
                      transition: { duration: 0.2 }
                    }}
                  >
                    <div className="aspect-square rounded-2xl overflow-hidden bg-white shadow-lg group-hover:shadow-2xl transition-all duration-300">
                      <motion.img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                      />
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                      >
                        <div className="absolute bottom-4 left-4 text-white">
                          <p className="font-semibold text-sm">{product.name}</p>
                          <p className="text-xs opacity-90">${product.price}</p>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </SlideInRight>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20" />
        
        <div className="container mx-auto px-4 relative">
          <StaggerContainer>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <StaggerItem key={index}>
                    <motion.div 
                      className="text-center"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <FloatingElement duration={3 + index} delay={index * 0.5}>
                        <div className="bg-white/10 backdrop-blur-sm rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 border border-white/20">
                          <IconComponent className="h-8 w-8" />
                        </div>
                      </FloatingElement>
                      <motion.div 
                        className="text-3xl lg:text-4xl font-bold mb-2"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ 
                          type: "spring", 
                          stiffness: 200, 
                          delay: 0.5 + index * 0.1 
                        }}
                      >
                        {stat.value}
                      </motion.div>
                      <div className="text-white/80 font-medium">{stat.label}</div>
                    </motion.div>
                  </StaggerItem>
                );
              })}
            </div>
          </StaggerContainer>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <FadeInUp className="text-center mb-16">
            <motion.h2 
              className="text-3xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Why Choose EcomPro?
            </motion.h2>
            <motion.p 
              className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              We provide exceptional service and cutting-edge features designed for both individual customers and businesses in the digital age.
            </motion.p>
          </FadeInUp>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <StaggerItem key={index}>
                  <motion.div
                    whileHover={{ 
                      scale: 1.05, 
                      rotateY: 5,
                      transition: { duration: 0.2 }
                    }}
                    className="group"
                  >
                    <Card className="h-full hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-white to-gray-50 overflow-hidden relative">
                      <motion.div 
                        className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                      />
                      <CardContent className="p-8 text-center relative">
                        <motion.div 
                          className={`bg-gradient-to-r ${feature.color} rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 shadow-lg`}
                          whileHover={{ 
                            rotate: 360,
                            scale: 1.1,
                            transition: { duration: 0.5 }
                          }}
                        >
                          <IconComponent className="h-8 w-8 text-white" />
                        </motion.div>
                        <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors">
                          {feature.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {feature.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div 
            className="flex items-center justify-between mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div>
              <h2 className="text-3xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent">
                Featured Products
              </h2>
              <p className="text-xl text-muted-foreground">
                Discover our most popular and innovative items ✨
              </p>
            </div>
            <Link href="/products">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button variant="outline" className="border-2 hover:bg-blue-50 hover:border-blue-300">
                  View All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            </Link>
          </motion.div>

          {isLoading ? (
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <StaggerItem key={i}>
                  <ProductCardSkeleton />
                </StaggerItem>
              ))}
            </StaggerContainer>
          ) : (
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.slice(0, 4).map((product, index) => (
                <StaggerItem key={product.id}>
                  <motion.div
                    whileHover={{ y: -10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <FloatingElement duration={8} className="absolute top-10 left-10">
            <div className="w-32 h-32 bg-white/10 rounded-full blur-xl" />
          </FloatingElement>
          <FloatingElement duration={10} delay={2} className="absolute bottom-10 right-10">
            <div className="w-24 h-24 bg-white/10 rounded-full blur-xl" />
          </FloatingElement>
        </div>
        
        <div className="container mx-auto px-4 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl lg:text-6xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto leading-relaxed">
              Join thousands of satisfied customers and businesses who trust EcomPro for their shopping needs. Experience the future of eCommerce today! 🚀
            </p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {!isAuthenticated ? (
                <>
                  <Link href="/register">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100 shadow-lg">
                        <Sparkles className="mr-2 h-5 w-5" />
                        Sign Up Today
                      </Button>
                    </motion.div>
                  </Link>
                  <Link href="/products">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 border-2">
                        <Package className="mr-2 h-5 w-5" />
                        Browse Products
                      </Button>
                    </motion.div>
                  </Link>
                </>
              ) : (
                <Link href="/products">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100 shadow-lg">
                      <Zap className="mr-2 h-5 w-5" />
                      Start Shopping
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </motion.div>
                </Link>
              )}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </PageTransition>
  );
}
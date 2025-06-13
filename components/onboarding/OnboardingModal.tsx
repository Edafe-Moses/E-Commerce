'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppSelector, useAppDispatch } from '@/lib/hooks';
import {
  nextOnboardingStep,
  prevOnboardingStep,
  completeOnboarding,
} from '@/lib/features/user/userSlice';
import { updateOnboardingStatus } from '@/lib/features/auth/authSlice';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { FloatingElement, PulsingElement } from '@/components/animations/FloatingElements';
import {
  ShoppingCart,
  Search,
  User,
  Package,
  Star,
  CheckCircle,
  Sparkles,
  Zap,
  Heart,
  Gift,
} from 'lucide-react';

const onboardingSteps = [
  {
    title: 'Welcome to EcomPro! 🎉',
    description: 'Your journey to seamless online shopping begins here.',
    icon: CheckCircle,
    color: 'from-green-400 to-blue-500',
    content: (
      <motion.div 
        className="text-center space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <FloatingElement>
          <div className="bg-gradient-to-r from-green-400 to-blue-500 rounded-full w-20 h-20 flex items-center justify-center mx-auto shadow-lg">
            <CheckCircle className="h-10 w-10 text-white" />
          </div>
        </FloatingElement>
        <motion.p 
          className="text-muted-foreground text-lg"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          We'll guide you through the key features in just 5 simple steps. ✨
        </motion.p>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4, type: "spring" }}
        >
          <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
            <Sparkles className="h-3 w-3 mr-1" />
            Let's get started!
          </Badge>
        </motion.div>
      </motion.div>
    ),
  },
  {
    title: 'Discover Products 🔍',
    description: 'Browse our extensive catalog of professional products.',
    icon: Search,
    color: 'from-blue-400 to-purple-500',
    content: (
      <motion.div 
        className="space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div 
          className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border-2 border-blue-100"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <PulsingElement>
            <Search className="h-10 w-10 text-blue-600 mb-4" />
          </PulsingElement>
          <h4 className="font-bold text-lg mb-3 text-blue-900">Smart Search & Filters</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Use our powerful search to find exactly what you need, with advanced filters for category, price, ratings, and more. AI-powered suggestions help you discover new products! 🤖
          </p>
        </motion.div>
        <motion.div
          className="flex items-center justify-center space-x-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Zap className="h-4 w-4 text-yellow-500" />
          <span className="text-sm text-muted-foreground">Pro tip: Use voice search for hands-free browsing!</span>
        </motion.div>
      </motion.div>
    ),
  },
  {
    title: 'Add to Cart 🛒',
    description: 'Easily manage your selections with our intuitive cart system.',
    icon: ShoppingCart,
    color: 'from-green-400 to-teal-500',
    content: (
      <motion.div 
        className="space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div 
          className="bg-gradient-to-r from-green-50 to-teal-50 rounded-xl p-6 border-2 border-green-100"
          whileHover={{ scale: 1.02 }}
        >
          <FloatingElement duration={3}>
            <ShoppingCart className="h-10 w-10 text-green-600 mb-4" />
          </FloatingElement>
          <h4 className="font-bold text-lg mb-3 text-green-900">Smart Cart Features</h4>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            Your cart saves automatically and syncs across devices. Special B2B pricing applies automatically for business accounts! 💼
          </p>
          <div className="flex items-center space-x-2">
            <Heart className="h-4 w-4 text-red-500" />
            <span className="text-xs text-muted-foreground">Save items to wishlist for later</span>
          </div>
        </motion.div>
      </motion.div>
    ),
  },
  {
    title: 'Track Orders 📦',
    description: 'Monitor your purchases from order to delivery.',
    icon: Package,
    color: 'from-orange-400 to-red-500',
    content: (
      <motion.div 
        className="space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div 
          className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6 border-2 border-orange-100"
          whileHover={{ scale: 1.02 }}
        >
          <PulsingElement>
            <Package className="h-10 w-10 text-orange-600 mb-4" />
          </PulsingElement>
          <h4 className="font-bold text-lg mb-3 text-orange-900">Real-time Order Tracking</h4>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            Get real-time updates on your orders with push notifications, email alerts, and SMS updates. Track your package every step of the way! 📱
          </p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Order Confirmed</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>In Transit</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    ),
  },
  {
    title: 'Manage Profile 👤',
    description: 'Customize your account and preferences.',
    icon: User,
    color: 'from-purple-400 to-pink-500',
    content: (
      <motion.div 
        className="space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div 
          className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-100"
          whileHover={{ scale: 1.02 }}
        >
          <FloatingElement duration={4}>
            <User className="h-10 w-10 text-purple-600 mb-4" />
          </FloatingElement>
          <h4 className="font-bold text-lg mb-3 text-purple-900">Personal Dashboard</h4>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            Access your personalized dashboard to manage orders, update preferences, view analytics, and customize your shopping experience. 📊
          </p>
        </motion.div>
        
        <motion.div 
          className="text-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring" }}
        >
          <PulsingElement>
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3 shadow-lg">
              <Gift className="h-8 w-8 text-white" />
            </div>
          </PulsingElement>
          <p className="text-lg font-bold text-gray-800 mb-2">You're all set to start shopping! 🎊</p>
          <p className="text-sm text-muted-foreground">Welcome to the EcomPro family!</p>
        </motion.div>
      </motion.div>
    ),
  },
];

export function OnboardingModal() {
  const dispatch = useAppDispatch();
  const { showOnboarding, onboardingStep } = useAppSelector((state) => state.user);
  const { user } = useAppSelector((state) => state.auth);

  const currentStep = onboardingSteps[onboardingStep - 1];
  const progress = (onboardingStep / onboardingSteps.length) * 100;

  const handleNext = () => {
    if (onboardingStep < onboardingSteps.length) {
      dispatch(nextOnboardingStep());
    } else {
      handleComplete();
    }
  };

  const handlePrev = () => {
    dispatch(prevOnboardingStep());
  };

  const handleComplete = () => {
    dispatch(completeOnboarding());
    dispatch(updateOnboardingStatus());
  };

  const handleSkip = () => {
    dispatch(completeOnboarding());
  };

  if (!showOnboarding || !currentStep) return null;

  return (
    <AnimatePresence>
      <Dialog open={showOnboarding} onOpenChange={handleSkip}>
        <DialogContent className="sm:max-w-lg bg-white/95 backdrop-blur-md border-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <DialogHeader>
              <div className="flex items-center justify-between mb-6">
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent">
                    {currentStep.title}
                  </DialogTitle>
                </motion.div>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <Badge 
                    variant="secondary" 
                    className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 border-blue-200"
                  >
                    {onboardingStep} of {onboardingSteps.length}
                  </Badge>
                </motion.div>
              </div>
              
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Progress value={progress} className="mb-6 h-2" />
              </motion.div>
            </DialogHeader>

            <motion.div 
              className="space-y-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <motion.p 
                className="text-muted-foreground text-lg leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {currentStep.description}
              </motion.p>
              
              <motion.div 
                className="min-h-[300px] flex items-center justify-center"
                key={onboardingStep}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
              >
                {currentStep.content}
              </motion.div>

              <motion.div 
                className="flex justify-between items-center pt-6 border-t"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex space-x-3">
                  {onboardingStep > 1 && (
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button variant="outline" onClick={handlePrev}>
                        Previous
                      </Button>
                    </motion.div>
                  )}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button variant="ghost" onClick={handleSkip} className="text-muted-foreground">
                      Skip Tour
                    </Button>
                  </motion.div>
                </div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    onClick={handleNext}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    {onboardingStep === onboardingSteps.length ? (
                      <>
                        <Sparkles className="mr-2 h-4 w-4" />
                        Get Started
                      </>
                    ) : (
                      'Next'
                    )}
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </DialogContent>
      </Dialog>
    </AnimatePresence>
  );
}
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppSelector, useAppDispatch } from '@/lib/hooks';
import { clearCart } from '@/lib/features/cart/cartSlice';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { PageTransition, FadeInUp, SlideInLeft, SlideInRight } from '@/components/animations/PageTransition';
import { FloatingElement, PulsingElement, GlowingElement } from '@/components/animations/FloatingElements';
import { LoadingSpinner } from '@/components/animations/LoadingAnimations';
import {
  CreditCard,
  Lock,
  Shield,
  Truck,
  MapPin,
  User,
  Mail,
  Phone,
  Building,
  CheckCircle,
  AlertCircle,
  Sparkles,
  Zap,
  Star,
  Gift,
  ArrowRight,
  ArrowLeft,
  Wallet,
  Smartphone,
} from 'lucide-react';
import { toast } from 'sonner';

interface ShippingAddress {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company?: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface PaymentMethod {
  id: string;
  type: 'card' | 'paypal' | 'apple_pay' | 'google_pay';
  name: string;
  icon: any;
  description: string;
}

const paymentMethods: PaymentMethod[] = [
  {
    id: 'card',
    type: 'card',
    name: 'Credit/Debit Card',
    icon: CreditCard,
    description: 'Visa, Mastercard, American Express'
  },
  {
    id: 'paypal',
    type: 'paypal',
    name: 'PayPal',
    icon: Wallet,
    description: 'Pay with your PayPal account'
  },
  {
    id: 'apple_pay',
    type: 'apple_pay',
    name: 'Apple Pay',
    icon: Smartphone,
    description: 'Touch ID or Face ID'
  },
  {
    id: 'google_pay',
    type: 'google_pay',
    name: 'Google Pay',
    icon: Smartphone,
    description: 'Pay with Google'
  }
];

export default function CheckoutPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { items, total } = useAppSelector((state) => state.cart);
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('card');
  const [savePaymentMethod, setSavePaymentMethod] = useState(false);
  const [sameAsShipping, setSameAsShipping] = useState(true);

  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ')[1] || '',
    email: user?.email || '',
    phone: '',
    company: user?.company || '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US',
  });

  const [billingAddress, setBillingAddress] = useState<ShippingAddress>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US',
  });

  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: '',
  });

  const shippingCost = 15.99;
  const tax = total * 0.08;
  const finalTotal = total + shippingCost + tax;

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login?redirect=/checkout');
      return;
    }

    if (items.length === 0) {
      router.push('/cart');
      return;
    }
  }, [isAuthenticated, items.length, router]);

  const handleAddressChange = (
    type: 'shipping' | 'billing',
    field: keyof ShippingAddress,
    value: string
  ) => {
    if (type === 'shipping') {
      setShippingAddress(prev => ({ ...prev, [field]: value }));
      if (sameAsShipping) {
        setBillingAddress(prev => ({ ...prev, [field]: value }));
      }
    } else {
      setBillingAddress(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleCardChange = (field: keyof typeof cardDetails, value: string) => {
    setCardDetails(prev => ({ ...prev, [field]: value }));
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(
          shippingAddress.firstName &&
          shippingAddress.lastName &&
          shippingAddress.email &&
          shippingAddress.address1 &&
          shippingAddress.city &&
          shippingAddress.state &&
          shippingAddress.zipCode
        );
      case 2:
        if (selectedPaymentMethod === 'card') {
          return !!(
            cardDetails.number &&
            cardDetails.expiry &&
            cardDetails.cvc &&
            cardDetails.name
          );
        }
        return true;
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 3));
    } else {
      toast.error('Please fill in all required fields');
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handlePlaceOrder = async () => {
    if (!validateStep(2)) {
      toast.error('Please complete all payment details');
      return;
    }

    setIsLoading(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Clear cart and redirect to success page
      dispatch(clearCart());
      toast.success('Order placed successfully! 🎉');
      router.push('/checkout/success');
    } catch (error) {
      toast.error('Payment failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const steps = [
    { number: 1, title: 'Shipping', icon: Truck },
    { number: 2, title: 'Payment', icon: CreditCard },
    { number: 3, title: 'Review', icon: CheckCircle },
  ];

  if (!isAuthenticated || items.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <PageTransition className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Progress Steps */}
        <motion.div
          className="max-w-4xl mx-auto mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              const isActive = currentStep === step.number;
              const isCompleted = currentStep > step.number;

              return (
                <div key={step.number} className="flex items-center">
                  <motion.div
                    className={`relative flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                      isActive
                        ? 'border-blue-500 bg-blue-500 text-white shadow-lg'
                        : isCompleted
                        ? 'border-green-500 bg-green-500 text-white'
                        : 'border-gray-300 bg-white text-gray-400'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    animate={isActive ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ duration: 0.5 }}
                  >
                    {isCompleted ? (
                      <CheckCircle className="h-6 w-6" />
                    ) : (
                      <IconComponent className="h-6 w-6" />
                    )}
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 rounded-full border-2 border-blue-300"
                        animate={{ scale: [1, 1.2, 1], opacity: [1, 0, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                  </motion.div>
                  <div className="ml-3">
                    <div className={`font-medium ${isActive ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-400'}`}>
                      {step.title}
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`flex-1 h-0.5 mx-4 ${isCompleted ? 'bg-green-500' : 'bg-gray-300'}`} />
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {/* Step 1: Shipping Information */}
              {currentStep === 1 && (
                <motion.div
                  key="shipping"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                    <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
                      <CardTitle className="flex items-center space-x-2">
                        <Truck className="h-6 w-6" />
                        <span>Shipping Information</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-8 space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="firstName" className="flex items-center space-x-1">
                            <User className="h-4 w-4" />
                            <span>First Name *</span>
                          </Label>
                          <Input
                            id="firstName"
                            value={shippingAddress.firstName}
                            onChange={(e) => handleAddressChange('shipping', 'firstName', e.target.value)}
                            className="border-2 focus:border-blue-400 transition-colors"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name *</Label>
                          <Input
                            id="lastName"
                            value={shippingAddress.lastName}
                            onChange={(e) => handleAddressChange('shipping', 'lastName', e.target.value)}
                            className="border-2 focus:border-blue-400 transition-colors"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="email" className="flex items-center space-x-1">
                            <Mail className="h-4 w-4" />
                            <span>Email *</span>
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            value={shippingAddress.email}
                            onChange={(e) => handleAddressChange('shipping', 'email', e.target.value)}
                            className="border-2 focus:border-blue-400 transition-colors"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone" className="flex items-center space-x-1">
                            <Phone className="h-4 w-4" />
                            <span>Phone</span>
                          </Label>
                          <Input
                            id="phone"
                            value={shippingAddress.phone}
                            onChange={(e) => handleAddressChange('shipping', 'phone', e.target.value)}
                            className="border-2 focus:border-blue-400 transition-colors"
                          />
                        </div>
                      </div>

                      {user?.accountType === 'B2B' && (
                        <div className="space-y-2">
                          <Label htmlFor="company" className="flex items-center space-x-1">
                            <Building className="h-4 w-4" />
                            <span>Company</span>
                          </Label>
                          <Input
                            id="company"
                            value={shippingAddress.company}
                            onChange={(e) => handleAddressChange('shipping', 'company', e.target.value)}
                            className="border-2 focus:border-blue-400 transition-colors"
                          />
                        </div>
                      )}

                      <div className="space-y-2">
                        <Label htmlFor="address1" className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>Address *</span>
                        </Label>
                        <Input
                          id="address1"
                          value={shippingAddress.address1}
                          onChange={(e) => handleAddressChange('shipping', 'address1', e.target.value)}
                          className="border-2 focus:border-blue-400 transition-colors"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="address2">Apartment, suite, etc.</Label>
                        <Input
                          id="address2"
                          value={shippingAddress.address2}
                          onChange={(e) => handleAddressChange('shipping', 'address2', e.target.value)}
                          className="border-2 focus:border-blue-400 transition-colors"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="city">City *</Label>
                          <Input
                            id="city"
                            value={shippingAddress.city}
                            onChange={(e) => handleAddressChange('shipping', 'city', e.target.value)}
                            className="border-2 focus:border-blue-400 transition-colors"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="state">State *</Label>
                          <Input
                            id="state"
                            value={shippingAddress.state}
                            onChange={(e) => handleAddressChange('shipping', 'state', e.target.value)}
                            className="border-2 focus:border-blue-400 transition-colors"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="zipCode">ZIP Code *</Label>
                          <Input
                            id="zipCode"
                            value={shippingAddress.zipCode}
                            onChange={(e) => handleAddressChange('shipping', 'zipCode', e.target.value)}
                            className="border-2 focus:border-blue-400 transition-colors"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Step 2: Payment Information */}
              {currentStep === 2 && (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  {/* Payment Methods */}
                  <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                    <CardHeader className="bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-t-lg">
                      <CardTitle className="flex items-center space-x-2">
                        <CreditCard className="h-6 w-6" />
                        <span>Payment Method</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-8">
                      <RadioGroup value={selectedPaymentMethod} onValueChange={setSelectedPaymentMethod}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {paymentMethods.map((method) => {
                            const IconComponent = method.icon;
                            return (
                              <motion.div
                                key={method.id}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                <div className={`relative p-4 border-2 rounded-lg cursor-pointer transition-all ${
                                  selectedPaymentMethod === method.id
                                    ? 'border-blue-500 bg-blue-50'
                                    : 'border-gray-200 hover:border-gray-300'
                                }`}>
                                  <RadioGroupItem value={method.id} id={method.id} className="sr-only" />
                                  <Label htmlFor={method.id} className="cursor-pointer">
                                    <div className="flex items-center space-x-3">
                                      <IconComponent className="h-6 w-6 text-gray-600" />
                                      <div>
                                        <div className="font-medium">{method.name}</div>
                                        <div className="text-sm text-gray-500">{method.description}</div>
                                      </div>
                                    </div>
                                  </Label>
                                  {selectedPaymentMethod === method.id && (
                                    <motion.div
                                      className="absolute top-2 right-2"
                                      initial={{ scale: 0 }}
                                      animate={{ scale: 1 }}
                                      transition={{ type: "spring", stiffness: 500 }}
                                    >
                                      <CheckCircle className="h-5 w-5 text-blue-500" />
                                    </motion.div>
                                  )}
                                </div>
                              </motion.div>
                            );
                          })}
                        </div>
                      </RadioGroup>
                    </CardContent>
                  </Card>

                  {/* Card Details */}
                  {selectedPaymentMethod === 'card' && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                        <CardHeader>
                          <CardTitle className="flex items-center space-x-2">
                            <Lock className="h-5 w-5" />
                            <span>Card Details</span>
                            <Badge variant="secondary" className="ml-auto">
                              <Shield className="h-3 w-3 mr-1" />
                              Secure
                            </Badge>
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-8 space-y-6">
                          <div className="space-y-2">
                            <Label htmlFor="cardName">Cardholder Name *</Label>
                            <Input
                              id="cardName"
                              value={cardDetails.name}
                              onChange={(e) => handleCardChange('name', e.target.value)}
                              placeholder="John Doe"
                              className="border-2 focus:border-blue-400 transition-colors"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="cardNumber">Card Number *</Label>
                            <Input
                              id="cardNumber"
                              value={cardDetails.number}
                              onChange={(e) => handleCardChange('number', e.target.value)}
                              placeholder="1234 5678 9012 3456"
                              className="border-2 focus:border-blue-400 transition-colors"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <Label htmlFor="expiry">Expiry Date *</Label>
                              <Input
                                id="expiry"
                                value={cardDetails.expiry}
                                onChange={(e) => handleCardChange('expiry', e.target.value)}
                                placeholder="MM/YY"
                                className="border-2 focus:border-blue-400 transition-colors"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="cvc">CVC *</Label>
                              <Input
                                id="cvc"
                                value={cardDetails.cvc}
                                onChange={(e) => handleCardChange('cvc', e.target.value)}
                                placeholder="123"
                                className="border-2 focus:border-blue-400 transition-colors"
                              />
                            </div>
                          </div>

                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="savePayment"
                              checked={savePaymentMethod}
                              onCheckedChange={setSavePaymentMethod}
                            />
                            <Label htmlFor="savePayment" className="text-sm">
                              Save this payment method for future purchases
                            </Label>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}

                  {/* Billing Address */}
                  <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle>Billing Address</CardTitle>
                    </CardHeader>
                    <CardContent className="p-8">
                      <div className="flex items-center space-x-2 mb-6">
                        <Checkbox
                          id="sameAsShipping"
                          checked={sameAsShipping}
                          onCheckedChange={setSameAsShipping}
                        />
                        <Label htmlFor="sameAsShipping">Same as shipping address</Label>
                      </div>

                      {!sameAsShipping && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          transition={{ duration: 0.3 }}
                          className="space-y-6"
                        >
                          {/* Billing address fields (similar to shipping) */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <Label htmlFor="billingFirstName">First Name *</Label>
                              <Input
                                id="billingFirstName"
                                value={billingAddress.firstName}
                                onChange={(e) => handleAddressChange('billing', 'firstName', e.target.value)}
                                className="border-2 focus:border-blue-400 transition-colors"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="billingLastName">Last Name *</Label>
                              <Input
                                id="billingLastName"
                                value={billingAddress.lastName}
                                onChange={(e) => handleAddressChange('billing', 'lastName', e.target.value)}
                                className="border-2 focus:border-blue-400 transition-colors"
                              />
                            </div>
                          </div>
                          {/* Add more billing fields as needed */}
                        </motion.div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Step 3: Review Order */}
              {currentStep === 3 && (
                <motion.div
                  key="review"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                    <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-t-lg">
                      <CardTitle className="flex items-center space-x-2">
                        <CheckCircle className="h-6 w-6" />
                        <span>Review Your Order</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-8 space-y-6">
                      {/* Order Items */}
                      <div className="space-y-4">
                        <h3 className="font-semibold text-lg">Order Items</h3>
                        {items.map((item) => (
                          <motion.div
                            key={item.id}
                            className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg"
                            whileHover={{ scale: 1.02 }}
                          >
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-16 h-16 object-cover rounded-lg"
                            />
                            <div className="flex-1">
                              <h4 className="font-medium">{item.name}</h4>
                              <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      <Separator />

                      {/* Shipping & Payment Summary */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="font-semibold text-lg mb-3">Shipping Address</h3>
                          <div className="text-sm space-y-1">
                            <p>{shippingAddress.firstName} {shippingAddress.lastName}</p>
                            <p>{shippingAddress.address1}</p>
                            {shippingAddress.address2 && <p>{shippingAddress.address2}</p>}
                            <p>{shippingAddress.city}, {shippingAddress.state} {shippingAddress.zipCode}</p>
                            <p>{shippingAddress.email}</p>
                          </div>
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg mb-3">Payment Method</h3>
                          <div className="text-sm">
                            <p>{paymentMethods.find(m => m.id === selectedPaymentMethod)?.name}</p>
                            {selectedPaymentMethod === 'card' && cardDetails.number && (
                              <p>**** **** **** {cardDetails.number.slice(-4)}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <motion.div
              className="flex justify-between mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {currentStep > 1 && (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button variant="outline" onClick={prevStep} className="flex items-center space-x-2">
                    <ArrowLeft className="h-4 w-4" />
                    <span>Previous</span>
                  </Button>
                </motion.div>
              )}

              <div className="ml-auto">
                {currentStep < 3 ? (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button onClick={nextStep} className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                      <span>Continue</span>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </motion.div>
                ) : (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      onClick={handlePlaceOrder}
                      disabled={isLoading}
                      className="flex items-center space-x-2 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 min-w-[200px]"
                    >
                      {isLoading ? (
                        <>
                          <LoadingSpinner size="sm" />
                          <span>Processing...</span>
                        </>
                      ) : (
                        <>
                          <Zap className="h-4 w-4" />
                          <span>Place Order</span>
                        </>
                      )}
                    </Button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              className="sticky top-8"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <GlowingElement>
                <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-md">
                  <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-t-lg">
                    <CardTitle className="flex items-center space-x-2">
                      <Star className="h-5 w-5" />
                      <span>Order Summary</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                    <div className="space-y-3">
                      {items.map((item) => (
                        <div key={item.id} className="flex justify-between items-center">
                          <div className="flex-1">
                            <p className="font-medium text-sm">{item.name}</p>
                            <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                          </div>
                          <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      ))}
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Shipping</span>
                        <span>${shippingCost.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tax</span>
                        <span>${tax.toFixed(2)}</span>
                      </div>
                      {user?.accountType === 'B2B' && (
                        <div className="flex justify-between text-green-600">
                          <span>B2B Discount</span>
                          <span>-$50.00</span>
                        </div>
                      )}
                    </div>

                    <Separator />

                    <div className="flex justify-between items-center text-lg font-bold">
                      <span>Total</span>
                      <motion.span
                        className="text-blue-600"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        ${(finalTotal - (user?.accountType === 'B2B' ? 50 : 0)).toFixed(2)}
                      </motion.span>
                    </div>

                    {user?.accountType === 'B2B' && (
                      <motion.div
                        className="bg-gradient-to-r from-green-100 to-blue-100 p-3 rounded-lg"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200 }}
                      >
                        <div className="flex items-center space-x-2 text-green-700">
                          <Gift className="h-4 w-4" />
                          <span className="text-sm font-medium">B2B Savings Applied!</span>
                        </div>
                      </motion.div>
                    )}

                    <div className="pt-4 space-y-2">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Shield className="h-4 w-4" />
                        <span>Secure 256-bit SSL encryption</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Truck className="h-4 w-4" />
                        <span>Free returns within 30 days</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </GlowingElement>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </PageTransition>
  );
}
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { addToCart } from '@/lib/features/cart/cartSlice';
import { Product } from '@/lib/features/product/productSlice';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AddToCartButton } from '@/components/animations/CartAnimation';
import { Star, ShoppingCart, Heart, Eye } from 'lucide-react';
import { toast } from 'sonner';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const [isLiked, setIsLiked] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const displayPrice = user?.accountType === 'B2B' && product.b2bPrice 
    ? product.b2bPrice 
    : product.price;

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    dispatch(addToCart({
      id: product.id,
      name: product.name,
      price: displayPrice,
      image: product.image,
      category: product.category,
    }));
    
    toast.success(`${product.name} added to cart! 🛒`, {
      description: `$${displayPrice.toFixed(2)} - Ready for checkout`,
    });
    
    setTimeout(() => setIsAddingToCart(false), 500);
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    toast.success(isLiked ? 'Removed from wishlist' : 'Added to wishlist! ❤️');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="group"
    >
      <Card className="h-full overflow-hidden bg-white hover:shadow-2xl transition-all duration-500 border-0 shadow-md">
        <div className="relative overflow-hidden">
          <Link href={`/products/${product.id}`}>
            <div className="aspect-square relative bg-gray-100">
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full"
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </motion.div>
              
              {/* Overlay on hover */}
              <motion.div 
                className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white rounded-full p-3 shadow-lg"
                >
                  <Eye className="h-5 w-5 text-gray-700" />
                </motion.div>
              </motion.div>
            </div>
          </Link>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.featured && (
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0 shadow-lg">
                  ⭐ Featured
                </Badge>
              </motion.div>
            )}
            {user?.accountType === 'B2B' && product.b2bPrice && (
              <motion.div
                initial={{ scale: 0, rotate: 180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Badge variant="secondary" className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0">
                  B2B Price
                </Badge>
              </motion.div>
            )}
          </div>

          {/* Like Button */}
          <motion.button
            onClick={handleLike}
            className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Heart 
              className={`h-4 w-4 transition-colors ${
                isLiked ? 'text-red-500 fill-red-500' : 'text-gray-600'
              }`} 
            />
          </motion.button>
        </div>

        <CardContent className="p-6">
          <Link href={`/products/${product.id}`}>
            <motion.h3 
              className="font-bold text-lg mb-3 hover:text-blue-600 transition-colors line-clamp-2 cursor-pointer"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              {product.name}
            </motion.h3>
          </Link>
          
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          <div className="flex items-center space-x-2 mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Star 
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating) 
                        ? 'text-yellow-400 fill-yellow-400' 
                        : 'text-gray-300'
                    }`} 
                  />
                </motion.div>
              ))}
              <span className="ml-2 text-sm font-medium">{product.rating}</span>
            </div>
            <span className="text-xs text-muted-foreground">
              ({product.reviews} reviews)
            </span>
          </div>

          <div className="flex items-center justify-between mb-4">
            <div className="space-y-1">
              <motion.div 
                className="text-2xl font-bold text-blue-600"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                ${displayPrice.toFixed(2)}
              </motion.div>
              {user?.accountType === 'B2B' && product.b2bPrice && product.b2bPrice !== product.price && (
                <motion.div 
                  className="text-sm text-muted-foreground line-through"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  ${product.price.toFixed(2)}
                </motion.div>
              )}
            </div>
            <motion.div
              animate={product.stock > 0 ? { scale: [1, 1.05, 1] } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Badge 
                variant={product.stock > 0 ? 'secondary' : 'destructive'}
                className={product.stock > 0 ? 'bg-green-100 text-green-800 border-green-200' : ''}
              >
                {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
              </Badge>
            </motion.div>
          </div>
        </CardContent>

        <CardFooter className="p-6 pt-0">
          <motion.div
            className="w-full"
            animate={isAddingToCart ? { scale: [1, 1.05, 1] } : {}}
            transition={{ duration: 0.3 }}
          >
            <AddToCartButton
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              {isAddingToCart ? 'Adding...' : 'Add to Cart'}
            </AddToCartButton>
          </motion.div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
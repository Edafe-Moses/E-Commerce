'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Plus, Minus, X } from 'lucide-react';
import { ReactNode } from 'react';

interface CartAnimationProps {
  children: ReactNode;
  isAdding?: boolean;
}

export function CartBounce({ children, isAdding = false }: CartAnimationProps) {
  return (
    <motion.div
      animate={isAdding ? {
        scale: [1, 1.2, 1],
        rotate: [0, -10, 10, 0],
      } : {}}
      transition={{
        duration: 0.5,
        ease: "easeInOut"
      }}
    >
      {children}
    </motion.div>
  );
}

export function AddToCartButton({ onClick, disabled = false, children }: { 
  onClick: () => void; 
  disabled?: boolean; 
  children: ReactNode;
}) {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative overflow-hidden bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <motion.div
        initial={{ x: 0 }}
        whileHover={{ x: 5 }}
        className="flex items-center space-x-2"
      >
        <ShoppingCart className="h-4 w-4" />
        <span>{children}</span>
      </motion.div>
      
      <motion.div
        className="absolute inset-0 bg-white/20"
        initial={{ x: '-100%' }}
        whileHover={{ x: '100%' }}
        transition={{ duration: 0.5 }}
      />
    </motion.button>
  );
}

export function QuantitySelector({ 
  quantity, 
  onIncrease, 
  onDecrease, 
  onRemove 
}: {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
}) {
  return (
    <div className="flex items-center space-x-2">
      <motion.button
        onClick={onDecrease}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="p-1 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
      >
        <Minus className="h-4 w-4" />
      </motion.button>
      
      <motion.span
        key={quantity}
        initial={{ scale: 1.2, color: '#3b82f6' }}
        animate={{ scale: 1, color: '#000' }}
        className="min-w-[2rem] text-center font-medium"
      >
        {quantity}
      </motion.span>
      
      <motion.button
        onClick={onIncrease}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="p-1 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
      >
        <Plus className="h-4 w-4" />
      </motion.button>
      
      <motion.button
        onClick={onRemove}
        whileHover={{ scale: 1.1, color: '#ef4444' }}
        whileTap={{ scale: 0.9 }}
        className="p-1 rounded-full bg-destructive/10 hover:bg-destructive/20 transition-colors ml-2"
      >
        <X className="h-4 w-4" />
      </motion.button>
    </div>
  );
}

export function CartItemAnimation({ children, isRemoving = false }: { 
  children: ReactNode; 
  isRemoving?: boolean;
}) {
  return (
    <AnimatePresence>
      {!isRemoving && (
        <motion.div
          initial={{ opacity: 0, height: 0, x: -50 }}
          animate={{ opacity: 1, height: 'auto', x: 0 }}
          exit={{ opacity: 0, height: 0, x: 50 }}
          transition={{ duration: 0.3 }}
          layout
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
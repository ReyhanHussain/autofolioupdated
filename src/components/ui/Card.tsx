import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
}

export function Card({ 
  children, 
  className = '', 
  hover = false, 
  padding = 'md',
  onClick 
}: CardProps) {
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const baseClasses = `bg-white rounded-xl shadow-lg border border-gray-100 ${paddingClasses[padding]} ${className}`;
  const hoverClasses = hover ? 'hover:shadow-xl hover:-translate-y-1' : '';
  const clickableClasses = onClick ? 'cursor-pointer' : '';

  if (onClick) {
    return (
      <motion.div
        whileHover={hover ? { y: -4, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' } : {}}
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
        className={`${baseClasses} ${hoverClasses} ${clickableClasses}`}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`${baseClasses} ${hoverClasses} ${clickableClasses}`}
    >
      {children}
    </motion.div>
  );
}
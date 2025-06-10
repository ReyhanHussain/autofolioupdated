import React from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  steps: string[];
  currentStep: number;
  className?: string;
}

export function ProgressBar({ steps, currentStep, className = '' }: ProgressBarProps) {
  return (
    <div className={`w-full ${className}`}>
      <div className="flex items-center justify-between mb-2">
        {steps.map((step, index) => (
          <div key={step} className="flex flex-col items-center flex-1">
            <div className="flex items-center w-full">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-colors duration-200 ${
                  index <= currentStep
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {index + 1}
              </div>
              {index < steps.length - 1 && (
                <div className="flex-1 h-0.5 mx-2 bg-gray-200">
                  <motion.div
                    className="h-full bg-indigo-600"
                    initial={{ width: '0%' }}
                    animate={{ 
                      width: index < currentStep ? '100%' : '0%' 
                    }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              )}
            </div>
            <span className={`mt-2 text-xs font-medium ${
              index <= currentStep ? 'text-indigo-600' : 'text-gray-500'
            }`}>
              {step}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
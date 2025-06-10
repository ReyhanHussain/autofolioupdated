import React from 'react';
import { motion } from 'framer-motion';
import { useBuilder } from '../context/BuilderContext';
import { ProgressBar } from '../components/ui/ProgressBar';
import { UploadStep } from '../components/dashboard/UploadStep';
import { AnalyzeStep } from '../components/dashboard/AnalyzeStep';
import { TemplateStep } from '../components/dashboard/TemplateStep';
import { CustomizeStep } from '../components/dashboard/CustomizeStep';
import { PreviewStep } from '../components/dashboard/PreviewStep';

const steps = ['Upload', 'Analyze', 'Template', 'Customize', 'Preview'];

export function Dashboard() {
  const { state } = useBuilder();
  
  const stepIndex = steps.findIndex(step => step.toLowerCase() === state.step);

  const renderStep = () => {
    switch (state.step) {
      case 'upload':
        return <UploadStep />;
      case 'analyze':
        return <AnalyzeStep />;
      case 'template':
        return <TemplateStep />;
      case 'customize':
        return <CustomizeStep />;
      case 'preview':
        return <PreviewStep />;
      default:
        return <UploadStep />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Portfolio Builder
          </h1>
          <p className="text-gray-600">
            Create your professional portfolio in just a few steps
          </p>
        </motion.div>

        <ProgressBar steps={steps} currentStep={stepIndex} className="mb-8" />

        <motion.div
          key={state.step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {renderStep()}
        </motion.div>
      </div>
    </div>
  );
}
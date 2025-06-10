import React from 'react';
import { motion } from 'framer-motion';
import { Check, Star } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { useBuilder } from '../../context/BuilderContext';
import { portfolioTemplates } from '../../data/templates';

export function TemplateStep() {
  const { state, dispatch } = useBuilder();

  const handleSelectTemplate = (template: typeof portfolioTemplates[0]) => {
    dispatch({ type: 'SET_TEMPLATE', payload: template });
  };

  const handleContinue = () => {
    if (state.selectedTemplate) {
      dispatch({ type: 'SET_STEP', payload: 'customize' });
    }
  };

  const categoryColors = {
    executive: 'from-blue-500 to-blue-600',
    creative: 'from-purple-500 to-pink-500',
    technical: 'from-green-500 to-emerald-600',
    academic: 'from-amber-500 to-orange-500',
    startup: 'from-indigo-500 to-cyan-500',
  };

  return (
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Choose Your Template
        </h2>
        <p className="text-gray-600">
          Select a template that best represents your professional style
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {portfolioTemplates.map((template, index) => (
          <motion.div
            key={template.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card 
              hover 
              onClick={() => handleSelectTemplate(template)}
              className={`cursor-pointer border-2 transition-all duration-200 ${
                state.selectedTemplate?.id === template.id
                  ? 'border-indigo-500 ring-2 ring-indigo-200'
                  : 'border-gray-200 hover:border-indigo-300'
              }`}
            >
              {/* Template Preview */}
              <div className="relative mb-4 rounded-lg overflow-hidden">
                <img
                  src={template.preview}
                  alt={template.name}
                  className="w-full h-48 object-cover"
                />
                <div className={`absolute inset-0 bg-gradient-to-br ${categoryColors[template.category]} opacity-80`} />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-gray-900 capitalize">
                    {template.category}
                  </span>
                </div>
                {state.selectedTemplate?.id === template.id && (
                  <div className="absolute top-4 right-4">
                    <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
                      <Check className="h-5 w-5 text-white" />
                    </div>
                  </div>
                )}
              </div>

              {/* Template Info */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {template.name}
                  </h3>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm">
                  {template.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {template.features.slice(0, 3).map((feature) => (
                    <span
                      key={feature}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md"
                    >
                      {feature}
                    </span>
                  ))}
                  {template.features.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded-md">
                      +{template.features.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Popular Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-center mb-8"
      >
        <div className="inline-flex items-center px-4 py-2 bg-yellow-50 border border-yellow-200 rounded-full">
          <Star className="h-4 w-4 text-yellow-500 mr-2" />
          <span className="text-sm font-medium text-yellow-700">
            All templates are mobile-responsive and optimized for ATS systems
          </span>
        </div>
      </motion.div>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={() => dispatch({ type: 'SET_STEP', payload: 'analyze' })}
        >
          Back to Analysis
        </Button>
        <Button 
          onClick={handleContinue}
          disabled={!state.selectedTemplate}
        >
          Continue to Customization
        </Button>
      </div>
    </div>
  );
}
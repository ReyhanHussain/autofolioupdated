import React from 'react';
import { motion } from 'framer-motion';
import { Palette, Type, Layout, Eye } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { useBuilder } from '../../context/BuilderContext';

export function CustomizeStep() {
  const { state, dispatch } = useBuilder();

  const themes = [
    { id: 'indigo', name: 'Indigo', colors: ['bg-indigo-500', 'bg-indigo-400', 'bg-indigo-600'] },
    { id: 'emerald', name: 'Emerald', colors: ['bg-emerald-500', 'bg-emerald-400', 'bg-emerald-600'] },
    { id: 'rose', name: 'Rose', colors: ['bg-rose-500', 'bg-rose-400', 'bg-rose-600'] },
    { id: 'amber', name: 'Amber', colors: ['bg-amber-500', 'bg-amber-400', 'bg-amber-600'] },
    { id: 'sky', name: 'Sky', colors: ['bg-sky-500', 'bg-sky-400', 'bg-sky-600'] },
    { id: 'violet', name: 'Violet', colors: ['bg-violet-500', 'bg-violet-400', 'bg-violet-600'] },
  ];

  const fonts = [
    { id: 'modern-sans', name: 'Modern Sans', preview: 'font-sans' },
    { id: 'classic-serif', name: 'Classic Serif', preview: 'font-serif' },
    { id: 'minimal', name: 'Minimal', preview: 'font-mono' },
    { id: 'creative', name: 'Creative', preview: 'font-sans' },
  ];

  const layouts = [
    { id: 'standard', name: 'Standard', description: 'Traditional top-to-bottom layout' },
    { id: 'sidebar', name: 'Sidebar', description: 'Left sidebar with content area' },
    { id: 'minimal', name: 'Minimal', description: 'Clean, spacious design' },
    { id: 'creative', name: 'Creative', description: 'Unique, artistic layout' },
  ];

  const handleCustomizationChange = (key: string, value: any) => {
    dispatch({ type: 'SET_CUSTOMIZATION', payload: { [key]: value } });
  };

  const handleSectionToggle = (section: string) => {
    const sections = { ...state.customization.sections };
    sections[section as keyof typeof sections] = !sections[section as keyof typeof sections];
    dispatch({ type: 'SET_CUSTOMIZATION', payload: { sections } });
  };

  const handleContinue = () => {
    dispatch({ type: 'SET_STEP', payload: 'preview' });
  };

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Customize Your Portfolio
        </h2>
        <p className="text-gray-600">
          Personalize the appearance to match your style and preferences
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Theme Selection */}
        <Card>
          <div className="flex items-center mb-6">
            <Palette className="h-6 w-6 text-indigo-600 mr-3" />
            <h3 className="text-lg font-semibold">Color Theme</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {themes.map((theme) => (
              <motion.div
                key={theme.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleCustomizationChange('theme', theme.id)}
                className={`cursor-pointer p-4 rounded-lg border-2 transition-all ${
                  state.customization.theme === theme.id
                    ? 'border-indigo-500 ring-2 ring-indigo-200'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-medium text-gray-900">{theme.name}</span>
                  {state.customization.theme === theme.id && (
                    <div className="w-5 h-5 bg-indigo-600 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  )}
                </div>
                <div className="flex space-x-2">
                  {theme.colors.map((color, index) => (
                    <div key={index} className={`w-6 h-6 rounded-full ${color}`} />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </Card>

        {/* Font Selection */}
        <Card>
          <div className="flex items-center mb-6">
            <Type className="h-6 w-6 text-indigo-600 mr-3" />
            <h3 className="text-lg font-semibold">Typography</h3>
          </div>
          <div className="space-y-3">
            {fonts.map((font) => (
              <motion.div
                key={font.id}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => handleCustomizationChange('font', font.id)}
                className={`cursor-pointer p-4 rounded-lg border-2 transition-all ${
                  state.customization.font === font.id
                    ? 'border-indigo-500 ring-2 ring-indigo-200'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-900 mb-1">{font.name}</div>
                    <div className={`text-sm text-gray-600 ${font.preview}`}>
                      The quick brown fox jumps over the lazy dog
                    </div>
                  </div>
                  {state.customization.font === font.id && (
                    <div className="w-5 h-5 bg-indigo-600 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </Card>

        {/* Layout Selection */}
        <Card>
          <div className="flex items-center mb-6">
            <Layout className="h-6 w-6 text-indigo-600 mr-3" />
            <h3 className="text-lg font-semibold">Layout Style</h3>
          </div>
          <div className="space-y-3">
            {layouts.map((layout) => (
              <motion.div
                key={layout.id}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => handleCustomizationChange('layout', layout.id)}
                className={`cursor-pointer p-4 rounded-lg border-2 transition-all ${
                  state.customization.layout === layout.id
                    ? 'border-indigo-500 ring-2 ring-indigo-200'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-900 mb-1">{layout.name}</div>
                    <div className="text-sm text-gray-600">{layout.description}</div>
                  </div>
                  {state.customization.layout === layout.id && (
                    <div className="w-5 h-5 bg-indigo-600 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </Card>

        {/* Section Visibility */}
        <Card>
          <div className="flex items-center mb-6">
            <Eye className="h-6 w-6 text-indigo-600 mr-3" />
            <h3 className="text-lg font-semibold">Portfolio Sections</h3>
          </div>
          <div className="space-y-4">
            {Object.entries(state.customization.sections).map(([section, enabled]) => (
              <div key={section} className="flex items-center justify-between">
                <span className="font-medium text-gray-900 capitalize">
                  {section}
                </span>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSectionToggle(section)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    enabled ? 'bg-indigo-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      enabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </motion.button>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={() => dispatch({ type: 'SET_STEP', payload: 'template' })}
        >
          Back to Templates
        </Button>
        <Button onClick={handleContinue}>
          Preview Portfolio
        </Button>
      </div>
    </div>
  );
}
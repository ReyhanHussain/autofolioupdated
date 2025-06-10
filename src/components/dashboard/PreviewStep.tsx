import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, Share2, Download, Edit2, ExternalLink } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { useBuilder } from '../../context/BuilderContext';
import { PortfolioPreview } from '../portfolio/PortfolioPreview';

export function PreviewStep() {
  const { state, dispatch } = useBuilder();
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishedUrl, setPublishedUrl] = useState<string | null>(null);

  const handlePublish = async () => {
    setIsPublishing(true);
    
    // Simulate publishing process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const url = `https://portfoliocraft.com/p/${Math.random().toString(36).substr(2, 9)}`;
    setPublishedUrl(url);
    setIsPublishing(false);
  };

  const handleDownload = () => {
    // In a real implementation, this would generate and download the portfolio as HTML
    const element = document.createElement('a');
    const file = new Blob(['<html>Portfolio content would be here</html>'], { type: 'text/html' });
    element.href = URL.createObjectURL(file);
    element.download = 'portfolio.html';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  if (!state.resumeData || !state.selectedTemplate) {
    return (
      <div className="max-w-4xl mx-auto">
        <Card className="text-center py-16">
          <p className="text-gray-600">No data available for preview.</p>
          <Button 
            className="mt-4"
            onClick={() => dispatch({ type: 'SET_STEP', payload: 'upload' })}
          >
            Start Over
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Portfolio Preview
        </h2>
        <p className="text-gray-600">
          Review your portfolio and make final adjustments
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Controls Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full"
                icon={Edit2}
                onClick={() => dispatch({ type: 'SET_STEP', payload: 'customize' })}
              >
                Edit Design
              </Button>
              <Button 
                variant="outline" 
                className="w-full"
                icon={Download}
                onClick={handleDownload}
              >
                Download HTML
              </Button>
              {publishedUrl ? (
                <div className="space-y-2">
                  <Button 
                    className="w-full"
                    icon={ExternalLink}
                    onClick={() => window.open(publishedUrl, '_blank')}
                  >
                    View Live
                  </Button>
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm text-green-700 mb-2">Published successfully!</p>
                    <input
                      type="text"
                      value={publishedUrl}
                      readOnly
                      className="w-full px-2 py-1 text-xs bg-white border border-green-300 rounded"
                    />
                  </div>
                </div>
              ) : (
                <Button 
                  className="w-full"
                  icon={Share2}
                  loading={isPublishing}
                  onClick={handlePublish}
                >
                  {isPublishing ? 'Publishing...' : 'Publish Online'}
                </Button>
              )}
            </div>
          </Card>

          <Card>
            <h3 className="text-lg font-semibold mb-4">Portfolio Details</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Template:</span>
                <span className="font-medium">{state.selectedTemplate.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Theme:</span>
                <span className="font-medium capitalize">{state.customization.theme}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Font:</span>
                <span className="font-medium">{state.customization.font.replace('-', ' ')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Layout:</span>
                <span className="font-medium capitalize">{state.customization.layout}</span>
              </div>
            </div>
          </Card>

          <Card>
            <h3 className="text-lg font-semibold mb-4">Sections Included</h3>
            <div className="space-y-2">
              {Object.entries(state.customization.sections).map(([section, enabled]) => (
                <div key={section} className="flex items-center justify-between text-sm">
                  <span className="capitalize">{section}</span>
                  <span className={`w-2 h-2 rounded-full ${enabled ? 'bg-green-500' : 'bg-gray-300'}`} />
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Preview Area */}
        <div className="lg:col-span-3">
          <Card padding="sm" className="h-[800px] overflow-hidden">
            <div className="flex items-center justify-between mb-4 px-4 py-2 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <Eye className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600">Live Preview</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
            </div>
            <div className="h-full overflow-y-auto bg-white rounded-lg border">
              <PortfolioPreview 
                resumeData={state.resumeData}
                template={state.selectedTemplate}
                customization={state.customization}
              />
            </div>
          </Card>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <Button 
          variant="outline" 
          onClick={() => dispatch({ type: 'SET_STEP', payload: 'customize' })}
        >
          Back to Customization
        </Button>
        <Button 
          onClick={() => dispatch({ type: 'RESET_BUILDER' })}
        >
          Create Another
        </Button>
      </div>
    </div>
  );
}
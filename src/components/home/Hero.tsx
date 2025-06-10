import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Zap, Users } from 'lucide-react';
import { Button } from '../ui/Button';
import { useNavigate } from 'react-router-dom';

export function Hero() {
  const navigate = useNavigate();

  const stats = [
    { icon: Users, label: 'Portfolios Created', value: '10,000+' },
    { icon: Zap, label: 'Average Build Time', value: '5 min' },
    { icon: Sparkles, label: 'Success Rate', value: '98%' },
  ];

  return (
    <section className="relative bg-gradient-to-br from-indigo-50 via-white to-cyan-50 pt-20 pb-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-cyan-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium mb-6">
              <Sparkles className="h-4 w-4 mr-2" />
              AI-Powered Portfolio Builder
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Transform Your
              <span className="bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent"> Resume</span>
              <br />
              Into a Stunning
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"> Portfolio</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
              Upload your resume and watch our AI create a professional portfolio in minutes. 
              Choose from premium templates, customize everything, and land your dream job.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Button 
              size="lg" 
              icon={ArrowRight} 
              iconPosition="right"
              onClick={() => navigate('/dashboard')}
              className="text-lg px-8 py-4"
            >
              Start Building Now
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="text-lg px-8 py-4"
            >
              View Examples
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            {stats.map((stat, index) => (
              <div key={stat.label} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-xl mb-4">
                  <stat.icon className="h-6 w-6 text-indigo-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-16 fill-white">
          <path d="M1200 120L0 16.48V120z" />
        </svg>
      </div>
    </section>
  );
}
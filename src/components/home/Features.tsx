import React from 'react';
import { motion } from 'framer-motion';
import { 
  Upload, 
  Brain, 
  Palette, 
  Eye, 
  Share2, 
  Zap,
  FileText,
  Sparkles,
  Award
} from 'lucide-react';
import { Card } from '../ui/Card';

export function Features() {
  const features = [
    {
      icon: Upload,
      title: 'Smart Resume Upload',
      description: 'Upload PDF, DOCX, or text files. Our AI automatically extracts and organizes your information.',
      color: 'indigo'
    },
    {
      icon: Brain,
      title: 'AI Analysis',
      description: 'Advanced AI parsing identifies skills, experience, and achievements with confidence scoring.',
      color: 'purple'
    },
    {
      icon: Palette,
      title: 'Beautiful Templates',
      description: 'Choose from professionally designed templates crafted for different industries and roles.',
      color: 'emerald'
    },
    {
      icon: Sparkles,
      title: 'Content Enhancement',
      description: 'AI-powered content suggestions to make your achievements and skills shine brighter.',
      color: 'amber'
    },
    {
      icon: Eye,
      title: 'Live Preview',
      description: 'See changes in real-time as you customize colors, fonts, and layouts to match your style.',
      color: 'rose'
    },
    {
      icon: Share2,
      title: 'Instant Publishing',
      description: 'Get a shareable URL instantly or export as HTML. No hosting required, ready to share.',
      color: 'cyan'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium mb-6">
            <Award className="h-4 w-4 mr-2" />
            Powerful Features
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Everything You Need to Create
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"> Amazing Portfolios</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From AI-powered resume analysis to professional templates, we provide all the tools 
            you need to create a portfolio that stands out.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => {
            const colorClasses = {
              indigo: 'bg-indigo-100 text-indigo-600',
              purple: 'bg-purple-100 text-purple-600',
              emerald: 'bg-emerald-100 text-emerald-600',
              amber: 'bg-amber-100 text-amber-600',
              rose: 'bg-rose-100 text-rose-600',
              cyan: 'bg-cyan-100 text-cyan-600',
            };

            return (
              <motion.div key={feature.title} variants={itemVariants}>
                <Card hover className="h-full">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-6 ${colorClasses[feature.color as keyof typeof colorClasses]}`}>
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* How It Works */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-24 text-center"
        >
          <h3 className="text-3xl font-bold text-gray-900 mb-12">How It Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: FileText, title: 'Upload Resume', step: '01' },
              { icon: Brain, title: 'AI Analysis', step: '02' },
              { icon: Palette, title: 'Customize', step: '03' },
              { icon: Share2, title: 'Publish', step: '04' },
            ].map((step, index) => (
              <div key={step.title} className="relative">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
                    <step.icon className="h-8 w-8 text-indigo-600" />
                  </div>
                  <div className="text-sm font-bold text-indigo-600 mb-2">STEP {step.step}</div>
                  <h4 className="text-lg font-semibold text-gray-900">{step.title}</h4>
                </div>
                {index < 3 && (
                  <div className="hidden md:block absolute top-8 left-full w-full">
                    <div className="h-0.5 bg-gradient-to-r from-indigo-200 to-transparent"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
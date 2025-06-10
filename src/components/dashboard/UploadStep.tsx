import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { Upload, FileText, AlertCircle, Sparkles } from 'lucide-react';
import { Card } from '../ui/Card';
import { useBuilder } from '../../context/BuilderContext';
import { FileProcessor } from '../../utils/fileProcessor';

export function UploadStep() {
  const { state, dispatch } = useBuilder();

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    const validation = FileProcessor.validateFile(file);
    if (!validation.valid) {
      dispatch({ type: 'SET_ERROR', payload: validation.error || 'Invalid file' });
      return;
    }

    dispatch({ type: 'SET_ERROR', payload: null });
    dispatch({ type: 'SET_RESUME_FILE', payload: file });
    dispatch({ type: 'SET_STEP', payload: 'analyze' });
  }, [dispatch]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/plain': ['.txt']
    },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024, // 10MB
  });

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Upload Your Resume
        </h2>
        <p className="text-gray-600">
          Upload your resume in PDF, DOCX, or TXT format to get started
        </p>
      </motion.div>

      {/* Upload Area */}
      <Card className="mb-8">
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all duration-200 ${
            isDragActive
              ? 'border-indigo-500 bg-indigo-50'
              : 'border-gray-300 hover:border-indigo-400 hover:bg-gray-50'
          }`}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center">
            <div className={`p-6 rounded-full mb-6 ${
              isDragActive ? 'bg-indigo-100' : 'bg-gray-100'
            }`}>
              <Upload className={`h-12 w-12 ${
                isDragActive ? 'text-indigo-600' : 'text-gray-500'
              }`} />
            </div>
            <h3 className="text-2xl font-semibold mb-4">
              {isDragActive ? 'Drop your resume here' : 'Drag & drop your resume'}
            </h3>
            <p className="text-gray-500 mb-6 text-lg">
              or click to browse files
            </p>
            <p className="text-sm text-gray-400">
              Supports PDF, DOCX, TXT (max 10MB)
            </p>
          </div>
        </div>

        {state.error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center text-red-700"
          >
            <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
            <span className="text-sm">{state.error}</span>
          </motion.div>
        )}
      </Card>

      {/* Features */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {[
          {
            icon: FileText,
            title: 'Smart Parsing',
            description: 'AI automatically extracts and organizes your information'
          },
          {
            icon: Sparkles,
            title: 'Content Enhancement',
            description: 'AI suggests improvements to make your resume shine'
          },
          {
            icon: Upload,
            title: 'Multiple Formats',
            description: 'Support for PDF, DOCX, and plain text files'
          }
        ].map((feature, index) => (
          <Card key={feature.title} className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-xl mb-4">
              <feature.icon className="h-6 w-6 text-indigo-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">{feature.title}</h4>
            <p className="text-sm text-gray-600">{feature.description}</p>
          </Card>
        ))}
      </motion.div>
    </div>
  );
}
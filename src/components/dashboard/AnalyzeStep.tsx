import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, CheckCircle, AlertCircle, Edit2, Save } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { useBuilder } from '../../context/BuilderContext';
import { FileProcessor } from '../../utils/fileProcessor';
import { aiService } from '../../utils/aiService';
import { ResumeData } from '../../types';

export function AnalyzeStep() {
  const { state, dispatch } = useBuilder();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<string>('');

  useEffect(() => {
    if (state.resumeFile && !state.resumeData) {
      analyzeResume();
    }
  }, [state.resumeFile]);

  const analyzeResume = async () => {
    if (!state.resumeFile) return;

    setIsAnalyzing(true);
    dispatch({ type: 'SET_PROCESSING', payload: true });

    try {
      const text = await FileProcessor.extractTextFromFile(state.resumeFile);
      const resumeData = await aiService.parseResume(text);
      dispatch({ type: 'SET_RESUME_DATA', payload: resumeData });
    } catch (error) {
      console.error('Analysis error:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to analyze resume. Please try again.' });
    } finally {
      setIsAnalyzing(false);
      dispatch({ type: 'SET_PROCESSING', payload: false });
    }
  };

  const handleEdit = (field: string, value: string) => {
    setEditingField(field);
    setEditValue(value);
  };

  const handleSave = (field: string) => {
    if (!state.resumeData) return;

    const keys = field.split('.');
    const updatedData = { ...state.resumeData };
    let current: any = updatedData;

    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = editValue;

    dispatch({ type: 'SET_RESUME_DATA', payload: updatedData });
    setEditingField(null);
    setEditValue('');
  };

  const getConfidenceColor = (score: number) => {
    if (score >= 0.8) return 'text-green-600 bg-green-100';
    if (score >= 0.6) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const handleContinue = () => {
    dispatch({ type: 'SET_STEP', payload: 'template' });
  };

  if (isAnalyzing) {
    return (
      <div className="max-w-4xl mx-auto">
        <Card className="text-center py-16">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="inline-block mb-6"
          >
            <Brain className="h-16 w-16 text-indigo-600" />
          </motion.div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Analyzing Your Resume
          </h2>
          <p className="text-gray-600 mb-8">
            Our AI is extracting and organizing your information...
          </p>
          <div className="w-full bg-gray-200 rounded-full h-2 max-w-md mx-auto">
            <motion.div
              className="bg-indigo-600 h-2 rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 3, ease: "easeInOut" }}
            />
          </div>
        </Card>
      </div>
    );
  }

  if (!state.resumeData) {
    return (
      <div className="max-w-4xl mx-auto">
        <Card className="text-center py-16">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Analysis Failed
          </h2>
          <p className="text-gray-600 mb-8">
            We couldn't analyze your resume. Please try uploading again.
          </p>
          <Button onClick={() => dispatch({ type: 'SET_STEP', payload: 'upload' })}>
            Try Again
          </Button>
        </Card>
      </div>
    );
  }

  const EditableField = ({ field, value, label }: { field: string; value: string; label: string }) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      {editingField === field ? (
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <Button size="sm" onClick={() => handleSave(field)}>
            <Save className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="ghost" onClick={() => setEditingField(null)}>
            Cancel
          </Button>
        </div>
      ) : (
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
          <span className="text-gray-900">{value || 'Not specified'}</span>
          <Button size="sm" variant="ghost" onClick={() => handleEdit(field, value)}>
            <Edit2 className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Analysis Complete
        </h2>
        <p className="text-gray-600">
          Review and edit the extracted information before proceeding
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Confidence Scores */}
        <Card>
          <h3 className="text-lg font-semibold mb-4">Confidence Scores</h3>
          <div className="space-y-3">
            {Object.entries(state.resumeData.confidence).map(([key, score]) => (
              <div key={key} className="flex items-center justify-between">
                <span className="text-sm text-gray-600 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getConfidenceColor(score)}`}>
                  {Math.round(score * 100)}%
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Personal Information */}
        <Card>
          <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
          <EditableField field="personalInfo.name" value={state.resumeData.personalInfo.name} label="Name" />
          <EditableField field="personalInfo.email" value={state.resumeData.personalInfo.email} label="Email" />
          <EditableField field="personalInfo.phone" value={state.resumeData.personalInfo.phone} label="Phone" />
          <EditableField field="personalInfo.title" value={state.resumeData.personalInfo.title} label="Title" />
        </Card>

        {/* Summary */}
        <Card>
          <h3 className="text-lg font-semibold mb-4">Professional Summary</h3>
          {editingField === 'summary' ? (
            <div className="space-y-2">
              <textarea
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <div className="flex space-x-2">
                <Button size="sm" onClick={() => handleSave('summary')}>
                  <Save className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="ghost" onClick={() => setEditingField(null)}>
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-gray-700 text-sm leading-relaxed">
                {state.resumeData.summary}
              </p>
              <Button size="sm" variant="ghost" onClick={() => handleEdit('summary', state.resumeData.summary)}>
                <Edit2 className="h-4 w-4 mr-2" />
                Edit
              </Button>
            </div>
          )}
        </Card>
      </div>

      {/* Experience & Education Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <Card>
          <h3 className="text-lg font-semibold mb-4">
            Experience ({state.resumeData.experience.length} positions)
          </h3>
          <div className="space-y-3">
            {state.resumeData.experience.slice(0, 3).map((exp) => (
              <div key={exp.id} className="p-3 bg-gray-50 rounded-md">
                <div className="font-medium text-gray-900">{exp.position}</div>
                <div className="text-sm text-gray-600">{exp.company}</div>
                <div className="text-xs text-gray-500">{exp.startDate} - {exp.endDate}</div>
              </div>
            ))}
            {state.resumeData.experience.length > 3 && (
              <div className="text-sm text-gray-500 text-center">
                +{state.resumeData.experience.length - 3} more positions
              </div>
            )}
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold mb-4">
            Skills ({state.resumeData.skills.reduce((acc, group) => acc + group.skills.length, 0)} total)
          </h3>
          <div className="space-y-3">
            {state.resumeData.skills.slice(0, 3).map((group) => (
              <div key={group.category} className="p-3 bg-gray-50 rounded-md">
                <div className="font-medium text-gray-900 mb-2">{group.category}</div>
                <div className="flex flex-wrap gap-1">
                  {group.skills.slice(0, 4).map((skill) => (
                    <span key={skill} className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded">
                      {skill}
                    </span>
                  ))}
                  {group.skills.length > 4 && (
                    <span className="px-2 py-1 bg-gray-200 text-gray-600 text-xs rounded">
                      +{group.skills.length - 4}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={() => dispatch({ type: 'SET_STEP', payload: 'upload' })}
        >
          Back to Upload
        </Button>
        <Button onClick={handleContinue}>
          Continue to Templates
        </Button>
      </div>
    </div>
  );
}
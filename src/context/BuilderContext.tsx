import React, { createContext, useContext, useReducer } from 'react';
import { BuilderState, CustomizationOptions } from '../types';

interface BuilderContextType {
  state: BuilderState;
  dispatch: React.Dispatch<BuilderAction>;
}

type BuilderAction =
  | { type: 'SET_STEP'; payload: BuilderState['step'] }
  | { type: 'SET_RESUME_FILE'; payload: File }
  | { type: 'SET_RESUME_DATA'; payload: BuilderState['resumeData'] }
  | { type: 'SET_TEMPLATE'; payload: BuilderState['selectedTemplate'] }
  | { type: 'SET_CUSTOMIZATION'; payload: Partial<CustomizationOptions> }
  | { type: 'SET_PROCESSING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'RESET_BUILDER' };

const initialState: BuilderState = {
  step: 'upload',
  resumeFile: null,
  resumeData: null,
  selectedTemplate: null,
  customization: {
    theme: 'indigo',
    font: 'modern-sans',
    layout: 'standard',
    sections: {
      contact: true,
      skills: true,
      education: true,
      experience: true,
      projects: true,
    },
  },
  isProcessing: false,
  error: null,
};

function builderReducer(state: BuilderState, action: BuilderAction): BuilderState {
  switch (action.type) {
    case 'SET_STEP':
      return { ...state, step: action.payload };
    case 'SET_RESUME_FILE':
      return { ...state, resumeFile: action.payload };
    case 'SET_RESUME_DATA':
      return { ...state, resumeData: action.payload };
    case 'SET_TEMPLATE':
      return { ...state, selectedTemplate: action.payload };
    case 'SET_CUSTOMIZATION':
      return {
        ...state,
        customization: { ...state.customization, ...action.payload },
      };
    case 'SET_PROCESSING':
      return { ...state, isProcessing: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'RESET_BUILDER':
      return initialState;
    default:
      return state;
  }
}

const BuilderContext = createContext<BuilderContextType | undefined>(undefined);

export function BuilderProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(builderReducer, initialState);

  return (
    <BuilderContext.Provider value={{ state, dispatch }}>
      {children}
    </BuilderContext.Provider>
  );
}

export function useBuilder() {
  const context = useContext(BuilderContext);
  if (context === undefined) {
    throw new Error('useBuilder must be used within a BuilderProvider');
  }
  return context;
}
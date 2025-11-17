import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface FormProgressProps {
  currentStep: number;
  totalSteps: number;
  progress: number;
}

export const FormProgress = ({
  currentStep,
  totalSteps,
  progress,
}: FormProgressProps) => (
  <div className="form-progress">
    <div className="progress-bar">
      <motion.div
        className="progress-fill"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.3 }}
      />
    </div>
    <div className="progress-steps">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <div
          key={index}
          className={`step-indicator ${
            index + 1 <= currentStep ? 'active' : ''
          } ${index + 1 < currentStep ? 'completed' : ''}`}
        >
          {index + 1 < currentStep ? (
            <Check size={16} />
          ) : (
            <span>{index + 1}</span>
          )}
        </div>
      ))}
    </div>
  </div>
);

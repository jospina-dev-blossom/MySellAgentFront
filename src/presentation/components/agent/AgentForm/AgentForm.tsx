import { AnimatePresence } from 'framer-motion';
import type { AgentConfiguration } from '@core/domain/entities';
import { useAgentForm } from '@presentation/hooks/useAgentForm';
import { FormProgress } from './FormProgress';
import { FormActions } from './FormActions';
import {
  Step1BasicInfo,
  Step2Messages,
  Step3Communication,
  Step4BrandVoice,
} from './Steps';
import './AgentForm.css';

interface AgentFormProps {
  onSubmit: (config: AgentConfiguration) => void;
  onCancel: () => void;
  initialData?: AgentConfiguration | null;
}

const TOTAL_STEPS = 4;

export const AgentForm = ({ onSubmit, onCancel, initialData }: AgentFormProps) => {
  const {
    currentStep,
    formData,
    progress,
    isEditing,
    updateFormData,
    handleNext,
    handlePrevious,
    handleSubmit,
    isStepValid,
  } = useAgentForm({ onSubmit, initialData });

  return (
    <div className="agent-form-container">
      <FormProgress
        currentStep={currentStep}
        totalSteps={TOTAL_STEPS}
        progress={progress}
      />

      <div className="form-content">
        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <Step1BasicInfo
              key="step1"
              data={formData}
              onChange={updateFormData}
            />
          )}
          {currentStep === 2 && (
            <Step2Messages
              key="step2"
              data={formData}
              onChange={updateFormData}
            />
          )}
          {currentStep === 3 && (
            <Step3Communication
              key="step3"
              data={formData}
              onChange={updateFormData}
            />
          )}
          {currentStep === 4 && (
            <Step4BrandVoice
              key="step4"
              data={formData}
              onChange={updateFormData}
            />
          )}
        </AnimatePresence>
      </div>

      <FormActions
        currentStep={currentStep}
        totalSteps={TOTAL_STEPS}
        isStepValid={isStepValid()}
        isEditing={isEditing}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onSubmit={handleSubmit}
        onCancel={onCancel}
      />
    </div>
  );
};

import { useState, useEffect } from 'react';
import type { AgentConfiguration } from '@core/domain/entities';

interface UseAgentFormProps {
  onSubmit: (config: AgentConfiguration) => void;
  initialData?: AgentConfiguration | null;
  isLoading?: boolean;
}

export const useAgentForm = ({ onSubmit, initialData, isLoading }: UseAgentFormProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<AgentConfiguration>>({
    brandName: '',
    welcomeMessage: '',
    farewellMessage: '',
    tone: 'amigable y cariñoso',
    customerTreatment: 'tú',
    emojiUsage: 'uso moderado (cuando sea apropiado)',
    brandVoice: '',
    specialNotes: '',
    businessType: '',
    targetAudience: '',
  });

  // Load initial data when available
  useEffect(() => {
    if (initialData && !isLoading) {
      setFormData({
        brandName: initialData.brandName || '',
        welcomeMessage: initialData.welcomeMessage || '',
        farewellMessage: initialData.farewellMessage || '',
        tone: initialData.tone || 'amigable y cariñoso',
        customerTreatment: initialData.customerTreatment || 'tú',
        emojiUsage: initialData.emojiUsage || 'uso moderado (cuando sea apropiado)',
        brandVoice: initialData.brandVoice || '',
        specialNotes: initialData.specialNotes || '',
        businessType: initialData.businessType || '',
        targetAudience: initialData.targetAudience || '',
      });
    }
  }, [initialData, isLoading]);

  const updateFormData = (updates: Partial<AgentConfiguration>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    onSubmit(formData as AgentConfiguration);
  };

  const isStepValid = (): boolean => {
    switch (currentStep) {
      case 1:
        return !!(formData.brandName && formData.brandName.length >= 2);
      case 2:
        return !!(formData.welcomeMessage && formData.welcomeMessage.length >= 10);
      case 3:
        return !!(formData.tone && formData.customerTreatment);
      case 4:
        return !!(formData.brandVoice && formData.brandVoice.length >= 10);
      default:
        return true;
    }
  };

  const progress = (currentStep / 4) * 100;
  const isEditing = !!initialData;

  return {
    currentStep,
    formData,
    progress,
    isEditing,
    updateFormData,
    handleNext,
    handlePrevious,
    handleSubmit,
    isStepValid,
  };
};

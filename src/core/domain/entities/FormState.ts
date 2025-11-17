/**
 * Estado del formulario multi-step
 */
export interface FormState {
  currentStep: number;
  totalSteps: number;
  completedSteps: number[];
  isValid: boolean;
  isDirty: boolean;
}

export interface FormStep {
  id: number;
  title: string;
  description: string;
  isValid: boolean;
  isOptional: boolean;
}

export interface FieldValidation {
  field: string;
  isValid: boolean;
  errors: string[];
}

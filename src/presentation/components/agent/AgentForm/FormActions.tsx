import { ChevronLeft, ChevronRight, Check, Save } from 'lucide-react';

interface FormActionsProps {
  currentStep: number;
  totalSteps: number;
  isStepValid: boolean;
  isEditing?: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
  onCancel: () => void;
}

export const FormActions = ({
  currentStep,
  totalSteps,
  isStepValid,
  isEditing = false,
  onPrevious,
  onNext,
  onSubmit,
  onCancel,
}: FormActionsProps) => (
  <div className="form-actions">
    {currentStep > 1 && (
      <button className="btn btn-secondary" onClick={onPrevious}>
        <ChevronLeft size={20} />
        Anterior
      </button>
    )}

    <button className="btn btn-ghost" onClick={onCancel}>
      Cancelar
    </button>

    {currentStep < totalSteps ? (
      <button
        className="btn btn-primary"
        onClick={onNext}
        disabled={!isStepValid}
      >
        Siguiente
        <ChevronRight size={20} />
      </button>
    ) : (
      <button
        className="btn btn-primary"
        onClick={onSubmit}
        disabled={!isStepValid}
      >
        {isEditing ? (
          <>
            Guardar Cambios
            <Save size={20} />
          </>
        ) : (
          <>
            Crear Agente
            <Check size={20} />
          </>
        )}
      </button>
    )}
  </div>
);

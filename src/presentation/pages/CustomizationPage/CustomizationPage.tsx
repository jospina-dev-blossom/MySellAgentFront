import { AgentForm } from '@presentation/components/agent/AgentForm';
import { useCustomization } from '@presentation/hooks/useCustomization';
import { Loading } from '@presentation/components/common/Loading';
import './CustomizationPage.css';

export const CustomizationPage = () => {
  const { isSubmitting, isLoading, existingConfig, handleSubmit, handleCancel } = useCustomization();

  // Show loading while fetching existing configuration
  if (isLoading) {
    return (
      <div className="customization-page">
        <Loading />
      </div>
    );
  }

  return (
    <div className="customization-page">
      <div className="page-header">
        <h1>Personaliza tu Agente de IA</h1>
        <p>
          {existingConfig 
            ? 'Edita la configuración de tu agente' 
            : 'Completa los siguientes pasos para crear tu agente perfecto'}
        </p>
      </div>
      
      {isSubmitting ? (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>{existingConfig ? 'Actualizando tu agente...' : 'Creando tu agente...'}</p>
        </div>
      ) : (
        <AgentForm 
          onSubmit={handleSubmit} 
          onCancel={handleCancel}
          initialData={existingConfig}
        />
      )}
    </div>
  );
};

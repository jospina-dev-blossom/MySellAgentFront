import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './useAuth';
import { firestoreService } from '@infrastructure/api/firestoreApi';
import type { AgentConfiguration } from '@core/domain/entities';

export const useCustomization = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [existingConfig, setExistingConfig] = useState<AgentConfiguration | null>(null);

  // Load existing configuration when component mounts
  useEffect(() => {
    const loadExistingConfig = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const config = await firestoreService.getAgentConfig(user.uid);
        setExistingConfig(config);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Error al cargar la configuración';
        console.error('Error loading config:', err);
        // Don't show error alert for loading, just log it
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    loadExistingConfig();
  }, [user]);

  const handleSubmit = async (config: AgentConfiguration) => {
    if (!user) {
      setError('Debes iniciar sesión para guardar tu configuración');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // Save to Firestore (create or update)
      await firestoreService.saveAgentConfig(user.uid, config);
      
      const message = existingConfig 
        ? '¡Agente actualizado exitosamente!' 
        : '¡Agente creado exitosamente!';
      
      alert(message);
      navigate('/');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al guardar el agente';
      setError(errorMessage);
      console.error('Error saving agent:', err);
      alert(`Error al guardar el agente: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (window.confirm('¿Estás seguro de que deseas cancelar? Se perderán los cambios.')) {
      navigate('/');
    }
  };

  return {
    isSubmitting,
    isLoading,
    error,
    existingConfig,
    handleSubmit,
    handleCancel,
  };
};

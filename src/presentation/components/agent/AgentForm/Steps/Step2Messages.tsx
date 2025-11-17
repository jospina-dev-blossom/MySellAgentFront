import { motion } from 'framer-motion';
import { Lightbulb } from 'lucide-react';
import type { AgentConfiguration } from '@core/domain/entities';
import { agentService } from '@core/domain/services';
import './Steps.css';

interface StepProps {
  data: Partial<AgentConfiguration>;
  onChange: (updates: Partial<AgentConfiguration>) => void;
}

export const Step2Messages = ({ data, onChange }: StepProps) => {
  const generateExample = (type: 'welcome' | 'farewell') => {
    if (type === 'welcome') {
      const example = agentService.generateWelcomeExample(data.businessType);
      onChange({ 
        welcomeMessage: example.replace('[Tu Marca]', data.brandName || '[Tu Marca]') 
      });
    } else {
      const example = agentService.generateFarewellExample(data.businessType);
      onChange({ 
        farewellMessage: example.replace('[Tu Marca]', data.brandName || '[Tu Marca]') 
      });
    }
  };

  return (
    <motion.div
      className="form-step"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
    >
      <h2 className="step-title">Mensajes Personalizados</h2>
      <p className="step-description">
        Define cómo tu agente iniciará y finalizará las conversaciones
      </p>

      <div className="form-group">
        <div className="label-with-action">
          <label htmlFor="welcomeMessage">Mensaje de Bienvenida *</label>
          <button
            type="button"
            className="btn-suggestion"
            onClick={() => generateExample('welcome')}
          >
            <Lightbulb size={16} />
            Generar ejemplo
          </button>
        </div>
        <textarea
          id="welcomeMessage"
          rows={3}
          placeholder="Ej: ¡Hola! Bienvenido a [Tu Marca]. ¿En qué puedo ayudarte hoy?"
          value={data.welcomeMessage || ''}
          onChange={(e) => onChange({ welcomeMessage: e.target.value })}
        />
        <small>Este mensaje se mostrará al iniciar una conversación</small>
      </div>

      <div className="form-group">
        <div className="label-with-action">
          <label htmlFor="farewellMessage">Mensaje de Despedida *</label>
          <button
            type="button"
            className="btn-suggestion"
            onClick={() => generateExample('farewell')}
          >
            <Lightbulb size={16} />
            Generar ejemplo
          </button>
        </div>
        <textarea
          id="farewellMessage"
          rows={3}
          placeholder="Ej: ¡Gracias por tu visita! Esperamos verte pronto."
          value={data.farewellMessage || ''}
          onChange={(e) => onChange({ farewellMessage: e.target.value })}
        />
        <small>Este mensaje se mostrará al finalizar una interacción exitosa</small>
      </div>
    </motion.div>
  );
};

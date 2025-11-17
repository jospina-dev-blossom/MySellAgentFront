import { motion } from 'framer-motion';
import type { AgentConfiguration } from '@core/domain/entities';
import { agentService } from '@core/domain/services';
import './Steps.css';

interface StepProps {
  data: Partial<AgentConfiguration>;
  onChange: (updates: Partial<AgentConfiguration>) => void;
}

export const Step4BrandVoice = ({ data, onChange }: StepProps) => {
  const completeness = agentService.calculateCompleteness(data);

  return (
    <motion.div
      className="form-step"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
    >
      <h2 className="step-title">Voz de Marca y Notas Especiales</h2>
      <p className="step-description">Define la personalidad única de tu agente</p>

      <div className="form-group">
        <label htmlFor="brandVoice">Voz de Marca *</label>
        <textarea
          id="brandVoice"
          rows={4}
          placeholder="Ej: Apasionados por el bienestar animal. Tratamos a las mascotas como familia. Siempre dispuestos a dar consejos sobre el cuidado de los peludos."
          value={data.brandVoice || ''}
          onChange={(e) => onChange({ brandVoice: e.target.value })}
        />
        <small>Describe la personalidad y valores de tu marca. ¿Qué te hace único?</small>
      </div>

      <div className="form-group">
        <label htmlFor="specialNotes">Notas Especiales</label>
        <textarea
          id="specialNotes"
          rows={4}
          placeholder="Ej: Cuando hables de productos, menciona los beneficios. Usa términos cariñosos como 'peludo', 'consentido'. Evita lenguaje muy técnico."
          value={data.specialNotes || ''}
          onChange={(e) => onChange({ specialNotes: e.target.value })}
        />
        <small>
          Instrucciones específicas sobre lenguaje, términos a usar o evitar, etc.
        </small>
      </div>

      <div className="completion-indicator">
        <div className="completion-header">
          <span>Completitud de la configuración</span>
          <span className="completion-percentage">{completeness}%</span>
        </div>
        <div className="completion-bar">
          <div
            className="completion-fill"
            style={{ width: `${completeness}%` }}
          />
        </div>
      </div>
    </motion.div>
  );
};

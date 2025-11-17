import { motion } from 'framer-motion';
import type { AgentConfiguration } from '@core/domain/entities';
import './Steps.css';

interface StepProps {
  data: Partial<AgentConfiguration>;
  onChange: (updates: Partial<AgentConfiguration>) => void;
}

export const Step3Communication = ({ data, onChange }: StepProps) => (
  <motion.div
    className="form-step"
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
  >
    <h2 className="step-title">Estilo de Comunicación</h2>
    <p className="step-description">
      Define cómo se comunicará tu agente con los clientes
    </p>

    <div className="form-group">
      <label htmlFor="tone">Tono Principal *</label>
      <select
        id="tone"
        value={data.tone || ''}
        onChange={(e) =>
          onChange({ tone: e.target.value as AgentConfiguration['tone'] })
        }
      >
        <option value="profesional y serio">Profesional y Serio</option>
        <option value="amigable y cariñoso">Amigable y Cariñoso</option>
        <option value="casual y relajado">Casual y Relajado</option>
        <option value="formal y corporativo">Formal y Corporativo</option>
        <option value="entusiasta y energético">Entusiasta y Energético</option>
        <option value="empático y comprensivo">Empático y Comprensivo</option>
      </select>
    </div>

    <div className="form-group">
      <label htmlFor="customerTreatment">Tratamiento al Cliente *</label>
      <div className="radio-group">
        <label className="radio-label">
          <input
            type="radio"
            name="treatment"
            value="tú"
            checked={data.customerTreatment === 'tú'}
            onChange={(e) =>
              onChange({
                customerTreatment: e.target.value as 'tú' | 'usted',
              })
            }
          />
          <span>Tú (tuteo) - Más cercano y amigable</span>
        </label>
        <label className="radio-label">
          <input
            type="radio"
            name="treatment"
            value="usted"
            checked={data.customerTreatment === 'usted'}
            onChange={(e) =>
              onChange({
                customerTreatment: e.target.value as 'tú' | 'usted',
              })
            }
          />
          <span>Usted - Más formal y respetuoso</span>
        </label>
      </div>
    </div>

    <div className="form-group">
      <label htmlFor="emojiUsage">Uso de Emojis *</label>
      <select
        id="emojiUsage"
        value={data.emojiUsage || ''}
        onChange={(e) =>
          onChange({
            emojiUsage: e.target.value as AgentConfiguration['emojiUsage'],
          })
        }
      >
        <option value="sin emojis">Sin emojis - Comunicación puramente textual</option>
        <option value="uso mínimo (solo ocasionalmente)">
          Uso Mínimo - Solo ocasionalmente
        </option>
        <option value="uso moderado (cuando sea apropiado)">
          Uso Moderado - Cuando sea apropiado
        </option>
        <option value="uso frecuente (en la mayoría de mensajes)">
          Uso Frecuente - En la mayoría de mensajes
        </option>
      </select>
    </div>
  </motion.div>
);

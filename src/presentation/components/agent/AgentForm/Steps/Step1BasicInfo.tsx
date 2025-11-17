import { motion } from 'framer-motion';
import type { AgentConfiguration } from '@core/domain/entities';

interface StepProps {
  data: Partial<AgentConfiguration>;
  onChange: (updates: Partial<AgentConfiguration>) => void;
}

export const Step1BasicInfo = ({ data, onChange }: StepProps) => (
  <motion.div
    className="form-step"
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
  >
    <h2 className="step-title">Información de tu Marca</h2>
    <p className="step-description">Comencemos con los detalles básicos de tu negocio</p>

    <div className="form-group">
      <label htmlFor="brandName">Nombre de tu Marca *</label>
      <input
        id="brandName"
        type="text"
        placeholder="Ej: Huellitas Felices 🐾"
        value={data.brandName || ''}
        onChange={(e) => onChange({ brandName: e.target.value })}
      />
      <small>Puedes incluir emojis para darle personalidad</small>
    </div>

    <div className="form-group">
      <label htmlFor="businessType">Tipo de Negocio *</label>
      <select
        id="businessType"
        value={data.businessType || ''}
        onChange={(e) => onChange({ businessType: e.target.value })}
      >
        <option value="">Selecciona una opción</option>
        <option value="tienda_mascotas">Tienda de Mascotas</option>
        <option value="restaurante">Restaurante / Comida</option>
        <option value="tecnologia">Tecnología / Software</option>
        <option value="salud">Salud / Bienestar</option>
        <option value="educacion">Educación / Cursos</option>
        <option value="ecommerce">E-commerce / Tienda Online</option>
        <option value="servicios">Servicios Profesionales</option>
        <option value="otro">Otro</option>
      </select>
    </div>

    <div className="form-group">
      <label htmlFor="targetAudience">Audiencia Objetivo</label>
      <textarea
        id="targetAudience"
        rows={3}
        placeholder="Ej: Dueños de mascotas que buscan productos de calidad para sus peludos..."
        value={data.targetAudience || ''}
        onChange={(e) => onChange({ targetAudience: e.target.value })}
      />
    </div>
  </motion.div>
);

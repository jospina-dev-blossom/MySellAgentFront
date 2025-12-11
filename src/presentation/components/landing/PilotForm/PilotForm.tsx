import { motion } from 'framer-motion';
import { useState } from 'react';
import { firestoreService } from '@infrastructure/api/firestoreApi';
import type { PilotLead } from '@core/domain/entities';
import './PilotForm.css';

export const PilotForm = () => {
  const [formData, setFormData] = useState({
    contactMethod: '' as PilotLead['contactMethod'] | '',
    contactInfo: '',
    sector: '',
    businessName: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.contactMethod || !formData.contactInfo) {
      setErrorMessage('Por favor completa los campos obligatorios');
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      await firestoreService.savePilotLead({
        contactMethod: formData.contactMethod as PilotLead['contactMethod'],
        contactInfo: formData.contactInfo,
        sector: formData.sector || undefined,
        businessName: formData.businessName || undefined,
      });

      setSubmitStatus('success');
      // Reset form
      setFormData({
        contactMethod: '',
        contactInfo: '',
        sector: '',
        businessName: '',
      });

      // Clear success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } catch (error) {
      console.error('Error submitting pilot lead:', error);
      setErrorMessage('Hubo un error al enviar el formulario. Por favor intenta de nuevo.');
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getContactPlaceholder = () => {
    switch (formData.contactMethod) {
      case 'email':
        return 'ejemplo@correo.com';
      case 'phone':
        return '+57 300 123 4567';
      case 'whatsapp':
        return '+57 300 123 4567';
      default:
        return 'Selecciona un método primero';
    }
  };

  const getContactLabel = () => {
    switch (formData.contactMethod) {
      case 'email':
        return 'Correo Electrónico';
      case 'phone':
        return 'Número de Teléfono';
      case 'whatsapp':
        return 'Número de WhatsApp';
      default:
        return 'Información de Contacto';
    }
  };

  return (
    <section className="pilot-form">
      <div className="pilot-form-container">
        <motion.div
          className="pilot-form-content"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="pilot-form-title">Únete al programa piloto</h2>
          <p className="pilot-form-description">
            Sé de los primeros en experimentar el futuro de las ventas. Regístrate 
            para obtener acceso exclusivo.
          </p>

          <form className="pilot-form-fields" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="contactMethod">¿Cómo prefieres que te contactemos? *</label>
              <select
                id="contactMethod"
                value={formData.contactMethod}
                onChange={(e) =>
                  setFormData({ ...formData, contactMethod: e.target.value as PilotLead['contactMethod'] | '', contactInfo: '' })
                }
                required
              >
                <option value="">Selecciona un método</option>
                <option value="email">Email</option>
                <option value="phone">Teléfono</option>
                <option value="whatsapp">WhatsApp</option>
              </select>
            </div>

            {formData.contactMethod && (
              <div className="form-group">
                <label htmlFor="contactInfo">{getContactLabel()} *</label>
                <input
                  type={formData.contactMethod === 'email' ? 'email' : 'tel'}
                  id="contactInfo"
                  placeholder={getContactPlaceholder()}
                  value={formData.contactInfo}
                  onChange={(e) =>
                    setFormData({ ...formData, contactInfo: e.target.value })
                  }
                  required
                />
              </div>
            )}

            <div className="form-group">
              <label htmlFor="sector">Sector donde planeas vender (Opcional)</label>
              <select
                id="sector"
                value={formData.sector}
                onChange={(e) =>
                  setFormData({ ...formData, sector: e.target.value })
                }
              >
                <option value="">Selecciona tu sector</option>
                <option value="retail">Retail</option>
                <option value="servicios">Servicios</option>
                <option value="tecnologia">Tecnología</option>
                <option value="alimentos">Alimentos y Bebidas</option>
                <option value="salud">Salud</option>
                <option value="educacion">Educación</option>
                <option value="otro">Otro</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="businessName">Nombre del negocio (Opcional)</label>
              <input
                type="text"
                id="businessName"
                placeholder="Nombre de tu empresa o negocio"
                value={formData.businessName}
                onChange={(e) =>
                  setFormData({ ...formData, businessName: e.target.value })
                }
              />
            </div>

            {submitStatus === 'success' && (
              <div className="form-message form-success">
                ¡Gracias por tu interés! Te contactaremos pronto.
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="form-message form-error">
                {errorMessage}
              </div>
            )}

            <motion.button
              type="submit"
              className="pilot-form-button"
              disabled={isSubmitting || !formData.contactMethod || !formData.contactInfo}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSubmitting ? 'Enviando...' : 'Solicitar Acceso'}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

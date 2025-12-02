import { motion } from 'framer-motion';
import { useState } from 'react';
import './PilotForm.css';

export const PilotForm = () => {
  const [formData, setFormData] = useState({
    contactMethod: '',
    sector: '',
    businessName: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí se manejaría el envío del formulario
    console.log('Form submitted:', formData);
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
              <label htmlFor="contactMethod">¿Cómo prefieres que te contactemos?</label>
              <select
                id="contactMethod"
                value={formData.contactMethod}
                onChange={(e) =>
                  setFormData({ ...formData, contactMethod: e.target.value })
                }
                required
              >
                <option value="">Selecciona un método</option>
                <option value="email">Email</option>
                <option value="phone">Teléfono</option>
                <option value="whatsapp">WhatsApp</option>
              </select>
            </div>

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

            <motion.button
              type="submit"
              className="pilot-form-button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Solicitar Acceso
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

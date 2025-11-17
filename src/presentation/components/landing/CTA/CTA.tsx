import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import './CTA.css';

export const CTA = () => {
  return (
    <section className="cta">
      <motion.div
        className="cta-container"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="cta-glow"></div>
        
        <div className="cta-content">
          <h2 className="cta-title">
            ¿Listo para crear tu Agente de IA?
          </h2>
          <p className="cta-description">
            Únete a miles de empresas que ya están transformando
            su atención al cliente con agentes inteligentes.
          </p>
          
          <Link to="/login">
            <motion.button
              className="cta-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Comenzar Gratis
              <ArrowRight size={20} />
            </motion.button>
          </Link>

          <p className="cta-note">
            No se requiere tarjeta de crédito • Configuración en minutos
          </p>
        </div>
      </motion.div>
    </section>
  );
};

import { motion } from 'framer-motion';
import humanImage from '@shared/utils/images/human.png';
import './AISalesman.css';

export const AISalesman = () => {
  return (
    <section className="ai-salesman">
      <div className="ai-salesman-container">
        <motion.div
          className="ai-salesman-image"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <img src={humanImage} alt="Mejor vendedor" />
        </motion.div>

        <motion.div
          className="ai-salesman-content"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="ai-salesman-title">
            Recreamos con <span className="ai-text">AI</span> al<br />
            <span className="gradient-text-mejor">mejor vendedor</span>
          </h2>
          <p className="ai-salesman-description">
            La forma inteligente y segura de vender optimizando tus 
            estrategias con agentes inteligentes y transforma cada 
            interacción en una oportunidad.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

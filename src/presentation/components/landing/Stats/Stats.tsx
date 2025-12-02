import { motion } from 'framer-motion';
import cellphoneImage from '@shared/utils/images/cellphone.png';
import './Stats.css';

const stats = [
  { label: 'Atención inmediata', color: '#ec4899' },
  { label: 'Conversaciones que venden', color: '#8b5cf6' },
  { label: 'Organización y seguimiento', color: '#7c3aed' },
  { label: 'Ahorro de tiempo y recursos', color: '#f59e0b' },
];

export const Stats = () => {
  return (
    <section className="stats">
      <div className="stats-container">
        <motion.div
          className="stats-content"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="stats-badge">
            +DE <span className="stats-number">27</span>
          </div>
          <p className="stats-subtitle">
            Comercios Registrados<br />
            con nuestros servicios
          </p>

          <div className="stats-list">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="stat-item"
                style={{ backgroundColor: stat.color }}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {stat.label}
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="stats-image"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <img src={cellphoneImage} alt="Stats visual" />
        </motion.div>
      </div>
    </section>
  );
};

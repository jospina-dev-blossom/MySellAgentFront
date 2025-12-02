import { motion } from 'framer-motion';
import searchIcon from '@shared/utils/images/search.png';
import chatIcon from '@shared/utils/images/chat.png';
import folderIcon from '@shared/utils/images/folder.png';
import relojIcon from '@shared/utils/images/reloj.png';
import './Features.css';

const features = [
  {
    icon: searchIcon,
    title: 'Búsqueda inteligente con IA',
    description: '',
  },
  {
    icon: chatIcon,
    title: 'Atención Inmediata 24/7',
    description: '',
  },
  {
    icon: folderIcon,
    title: 'Integración con Whatsapp',
    description: '',
  },
  {
    icon: relojIcon,
    title: 'Reduce tu tiempo de respuesta',
    description: 'Encuentra la información que tus clientes necesitan en segundos.',
  },
];

export const Features = () => {
  return (
    <section className="features">
      <div className="features-container">
        <motion.div
          className="features-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="features-title">
            Transforma la forma en que tus clientes<br />
            interactúan con tu <span className="gradient-underline">marca</span>
          </h2>
        </motion.div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="feature-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
            >
              <div className="feature-icon">
                <img src={feature.icon} alt={feature.title} />
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              {feature.description && (
                <p className="feature-description">{feature.description}</p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

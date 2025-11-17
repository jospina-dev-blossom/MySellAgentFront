import { motion } from 'framer-motion';
import { Bot, Zap, Shield, Puzzle, Brain, Rocket } from 'lucide-react';
import './Features.css';

const features = [
  {
    icon: Bot,
    title: 'Personalización Total',
    description: 'Configura la personalidad, tono y estilo de tu agente según tus necesidades.',
    color: '#8b5cf6',
  },
  {
    icon: Zap,
    title: 'Implementación Rápida',
    description: 'Despliega tu agente en minutos sin necesidad de conocimientos técnicos.',
    color: '#3b82f6',
  },
  {
    icon: Brain,
    title: 'IA Avanzada',
    description: 'Potenciado por los modelos de lenguaje más avanzados del mercado.',
    color: '#06b6d4',
  },
  {
    icon: Puzzle,
    title: 'Integraciones',
    description: 'Conecta con tus herramientas favoritas y APIs sin complicaciones.',
    color: '#10b981',
  },
  {
    icon: Shield,
    title: 'Seguro y Privado',
    description: 'Tus datos están protegidos con los más altos estándares de seguridad.',
    color: '#f59e0b',
  },
  {
    icon: Rocket,
    title: 'Escalable',
    description: 'Crece con tu negocio. Desde startups hasta grandes empresas.',
    color: '#ef4444',
  },
];

export const Features = () => {
  return (
    <section className="features" id="features">
      <div className="features-container">
        <motion.div
          className="features-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="features-title">
            Todo lo que necesitas para crear tu
            <span className="gradient-text"> Agente Perfecto</span>
          </h2>
          <p className="features-description">
            Herramientas poderosas y una interfaz intuitiva para diseñar agentes de IA
            que se adaptan perfectamente a tu caso de uso.
          </p>
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
              <div
                className="feature-icon"
                style={{ backgroundColor: `${feature.color}15` }}
              >
                <feature.icon size={28} color={feature.color} />
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

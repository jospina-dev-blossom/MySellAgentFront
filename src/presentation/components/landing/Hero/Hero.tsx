import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Hero.css';

interface HeroProps {
  onGetStarted: () => void;
}

export const Hero = ({ onGetStarted }: HeroProps) => {
  return (
    <section className="hero">
      <div className="hero-nav">
        <Link to="/login" className="btn-login-hero">
          <LogIn size={18} />
          Iniciar Sesión
        </Link>
      </div>

      <motion.div
        className="hero-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="hero-badge"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Sparkles size={16} />
          <span>Personaliza tu Agente de IA</span>
        </motion.div>

        <h1 className="hero-title">
          Crea tu Agente de IA
          <span className="hero-gradient"> Personalizado</span>
        </h1>

        <p className="hero-description">
          Diseña, configura y despliega agentes de inteligencia artificial adaptados
          a tus necesidades específicas. Sin código, en minutos.
        </p>

        <div className="hero-actions">
          <motion.button
            className="btn btn-primary"
            onClick={onGetStarted}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Comenzar Ahora
            <ArrowRight size={20} />
          </motion.button>

          <motion.button
            className="btn btn-secondary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Ver Demo
          </motion.button>
        </div>

        <div className="hero-stats">
          <div className="stat">
            <div className="stat-value">10K+</div>
            <div className="stat-label">Agentes Creados</div>
          </div>
          <div className="stat">
            <div className="stat-value">98%</div>
            <div className="stat-label">Satisfacción</div>
          </div>
          <div className="stat">
            <div className="stat-value">24/7</div>
            <div className="stat-label">Disponibilidad</div>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="hero-visual"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div className="visual-glow"></div>
        <div className="visual-grid"></div>
      </motion.div>
    </section>
  );
};

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import piaLogo from '@shared/utils/images/Pia.png';
import cellphoneImage from '@shared/utils/images/cellphone.png';
import './Hero.css';

interface HeroProps {
  onGetStarted: () => void;
}

export const Hero = ({ onGetStarted }: HeroProps) => {
  return (
    <section className="hero">
      <div className="hero-nav">
        <img src={piaLogo} alt="Pia Logo" className="hero-logo" />
        <Link to="/login" className="btn-login-hero">
          Únete al piloto
        </Link>
      </div>

      <div className="hero-container">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="hero-title">
            Impulsa tus <span className="gradient-text-ventas">ventas</span> con<br />
            <span className="gradient-text-atencion">atención inteligente</span> 24/7
          </h1>

          <p className="hero-description">
            Pia es una IA diseñada para responder consultas al instante, 
            manejar pedidos y adaptarse a la forma en que tu negocio se 
            comunica. Una solución flexible, confiable y disponible las 24/7.
          </p>

          <motion.button
            className="btn-cta"
            onClick={onGetStarted}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Conoce la plataforma
          </motion.button>
        </motion.div>

        <motion.div
          className="hero-phone"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <img src={cellphoneImage} alt="Chat en celular" className="phone-image" />
        </motion.div>
      </div>
    </section>
  );
};

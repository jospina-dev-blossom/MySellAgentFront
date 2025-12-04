import { motion } from "framer-motion";
import cellphoneImage from "@shared/utils/images/cellphone.png";
import "./Stats.css";

const stats = [
  {
    label: "Atención inmediata",
    gradient: "linear-gradient(90deg, #B570AE 0%, #E7967B 100%)",
  },
  {
    label: "Conversaciones que venden",
    gradient: "linear-gradient(90deg, #B570AE 0%, #2BB2E9 100%)",
  },
  {
    label: "Organización y seguimiento",
    gradient: "linear-gradient(90deg, #652D92 0%, #652D92 100%)",
    color: "#652D92",
  },
  {
    label: "Ahorro de tiempo y recursos",
    gradient: "linear-gradient(90deg, #E7967B 0%, #E7967B 100%)",
    color: "#E7967B",
  },
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
          <div className="stats-header">
            <div className="stats-badge">
              <span className="stats-number">+DE 27</span>
            </div>
            <p className="stats-subtitle">
              Comercios Registrados
              <br />
              con nuestros servicios
            </p>
          </div>

          <div className="stats-list">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="stat-item-wrapper"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div
                  className="stat-item"
                  style={{ background: stat.gradient || stat.color }}
                >
                  {stat.label}
                </div>
                <div className="stat-connector"></div>
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

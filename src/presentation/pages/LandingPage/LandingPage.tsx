import { useNavigate } from 'react-router-dom';
import { Hero } from '@presentation/components/landing/Hero';
import { Features } from '@presentation/components/landing/Features';
import { CTA } from '@presentation/components/landing/CTA';
import { Footer } from '@presentation/components/common/Footer';
import './LandingPage.css';

export const LandingPage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/login');
  };

  return (
    <div className="landing-page">
      <Hero onGetStarted={handleGetStarted} />
      <Features />
      <CTA />
      <Footer />
    </div>
  );
};

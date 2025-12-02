import { useNavigate } from 'react-router-dom';
import { Hero } from '@presentation/components/landing/Hero';
import { Features } from '@presentation/components/landing/Features';
import { AISalesman } from '@presentation/components/landing/AISalesman';
import { Stats } from '@presentation/components/landing/Stats';
import { PilotForm } from '@presentation/components/landing/PilotForm';
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
      <AISalesman />
      <Stats />
      <PilotForm />
    </div>
  );
};

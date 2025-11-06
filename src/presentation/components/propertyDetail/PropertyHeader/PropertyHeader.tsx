import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { MillionLogo } from '@presentation/components/common/MillionLogo';
import './PropertyHeader.css';

export const PropertyHeader = () => {
  return (
    <header className="property-header">
      <div className="property-header__content">
        <Link to="/" className="property-header__back">
          <ArrowLeft size={20} />
        </Link>
        <div className="property-header__logo">
          <MillionLogo />
        </div>
        <div className="property-header__spacer"></div>
      </div>
    </header>
  );
};

import { SearchX } from 'lucide-react';
import type { Property } from '@core/domain/entities';
import { PropertyCard } from '../PropertyCard/PropertyCard';
import { TEXTS } from '@/shared/constants/texts';
import './PropertyGrid.css';

interface PropertyGridProps {
  properties: Property[];
}

export const PropertyGrid = ({ properties }: PropertyGridProps) => {
  if (properties.length === 0) {
    return (
      <div className="property-grid property-grid--empty">
        <div className="property-grid__empty">
          <SearchX className="property-grid__empty-icon" size={64} strokeWidth={1.5} />
          <h3 className="property-grid__empty-title">
            {TEXTS.propertiesPage.emptyStateTitle}
          </h3>
          <p className="property-grid__empty-text">
            {TEXTS.propertiesPage.emptyStateDescription}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="property-grid">
      <div className="property-grid__container">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
};

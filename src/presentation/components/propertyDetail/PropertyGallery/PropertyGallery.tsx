import type { PropertyImage } from '@core/domain/entities';
import './PropertyGallery.css';

interface PropertyGalleryProps {
  images: PropertyImage[];
  propertyName: string;
}

export const PropertyGallery = ({ images, propertyName }: PropertyGalleryProps) => {
  if (images.length === 0) {
    return null;
  }

  return (
    <div className="property-gallery">
      <div className="property-gallery__images">
        {images.map((img) => (
          <img
            key={img.idPropertyImage}
            src={img.file}
            alt={propertyName}
            className="property-gallery__image"
          />
        ))}
      </div>
    </div>
  );
};

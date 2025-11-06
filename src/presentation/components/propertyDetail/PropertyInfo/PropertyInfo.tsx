import { TEXTS } from '@shared/constants/texts';
import { formatCurrency } from '@shared/utils';
import './PropertyInfo.css';

interface PropertyInfoProps {
  basePrice: number;
  priceWithTaxes: number;
  year: number;
  codeInternal: string | number;
}

export const PropertyInfo = ({
  basePrice,
  priceWithTaxes,
  year,
  codeInternal,
}: PropertyInfoProps) => {
  return (
    <div className="property-info">
      <h2 className="property-info__title">{TEXTS.propertyDetail.generalInfo}</h2>
      <div className="property-info__grid">
        <div className="property-info__item">
          <span className="property-info__label">{TEXTS.propertyDetail.basePrice}</span>
          <span className="property-info__value property-info__price">
            {formatCurrency(basePrice)}
          </span>
        </div>
        <div className="property-info__item">
          <span className="property-info__label">{TEXTS.propertyDetail.priceWithTaxes}</span>
          <span className="property-info__value property-info__price">
            {formatCurrency(priceWithTaxes)}
          </span>
        </div>
        <div className="property-info__item">
          <span className="property-info__label">{TEXTS.propertyDetail.buildYear}</span>
          <span className="property-info__value">{year}</span>
        </div>
        <div className="property-info__item">
          <span className="property-info__label">{TEXTS.propertyDetail.internalCode}</span>
          <span className="property-info__value">{codeInternal}</span>
        </div>
      </div>
    </div>
  );
};

import type { Owner } from '@core/domain/entities';
import { TEXTS } from '@shared/constants/texts';
import { formatDate } from '@shared/utils';
import './PropertyOwner.css';

interface PropertyOwnerProps {
  owner: Owner;
  ownerAge: number | null;
}

export const PropertyOwner = ({ owner, ownerAge }: PropertyOwnerProps) => {
  return (
    <div className="property-owner">
      <img
        src={owner.photo}
        alt={owner.name}
        className="property-owner__photo"
      />
      <h3 className="property-owner__name">{owner.name}</h3>
      <p className="property-owner__info">{owner.address}</p>
      {ownerAge && (
        <p className="property-owner__info">
          {ownerAge} {TEXTS.propertyDetail.years}
        </p>
      )}
      <p className="property-owner__info">{formatDate(owner.birthday)}</p>
    </div>
  );
};

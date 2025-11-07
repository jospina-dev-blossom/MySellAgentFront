/**
 * Domain Services - Barrel Export
 * Funciones puras de lógica de negocio
 */

// PropertyDetail Services
export {
  getEnabledImages,
  getLatestTrace,
  getTotalPriceWithTax,
  sortTracesByDate,
} from './propertyDetailService';

// Owner Services
export {
  getOwnerAge,
} from './ownerService';

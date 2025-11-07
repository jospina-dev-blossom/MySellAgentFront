import { useState, useEffect } from 'react';
import type { PropertyFilters } from '@core/domain/entities';

interface UseFilterModalProps {
  isOpen: boolean;
  currentFilters?: Partial<PropertyFilters>;
}

interface UseFilterModalReturn {
  address: string;
  minPrice: string;
  maxPrice: string;
  priceError: string;
  setAddress: (value: string) => void;
  handleMinPriceChange: (value: string) => void;
  handleMaxPriceChange: (value: string) => void;
  handleApply: (onApply: (filters: Partial<PropertyFilters>) => void, onClose: () => void) => void;
  handleClear: (onClear: () => void, onClose: () => void) => void;
  resetFilters: () => void;
}

export const useFilterModal = ({
  isOpen,
  currentFilters = {},
}: UseFilterModalProps): UseFilterModalReturn => {
  const [address, setAddress] = useState(currentFilters.address || '');
  const [minPrice, setMinPrice] = useState(currentFilters.minPrice?.toString() || '');
  const [maxPrice, setMaxPrice] = useState(currentFilters.maxPrice?.toString() || '');
  const [priceError, setPriceError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setAddress(currentFilters.address || '');
      setMinPrice(currentFilters.minPrice?.toString() || '');
      setMaxPrice(currentFilters.maxPrice?.toString() || '');
      setPriceError('');
    }
  }, [isOpen, currentFilters]);

  const validatePriceRange = (min: string, max: string): boolean => {
    if (min && max) {
      const minValue = parseFloat(min);
      const maxValue = parseFloat(max);
      
      if (maxValue < minValue) {
        setPriceError('El precio máximo no puede ser menor al precio mínimo');
        return false;
      }
    }
    setPriceError('');
    return true;
  };

  const handleMinPriceChange = (value: string) => {
    setMinPrice(value);
    validatePriceRange(value, maxPrice);
  };

  const handleMaxPriceChange = (value: string) => {
    setMaxPrice(value);
    validatePriceRange(minPrice, value);
  };

  const buildFilters = (): Partial<PropertyFilters> => {
    const filters: Partial<PropertyFilters> = {};
    
    if (address.trim()) {
      filters.address = address.trim();
    }
    if (minPrice) {
      filters.minPrice = minPrice;
    }
    if (maxPrice) {
      filters.maxPrice = maxPrice;
    }
    
    return filters;
  };

  const handleApply = (
    onApply: (filters: Partial<PropertyFilters>) => void,
    onClose: () => void
  ) => {
    if (!validatePriceRange(minPrice, maxPrice)) {
      return;
    }

    const filters = buildFilters();
    onApply(filters);
    onClose();
  };

  const resetFilters = () => {
    setAddress('');
    setMinPrice('');
    setMaxPrice('');
    setPriceError('');
  };

  const handleClear = (onClear: () => void, onClose: () => void) => {
    resetFilters();
    onClear();
    onClose();
  };

  return {
    address,
    minPrice,
    maxPrice,
    priceError,
    setAddress,
    handleMinPriceChange,
    handleMaxPriceChange,
    handleApply,
    handleClear,
    resetFilters,
  };
};

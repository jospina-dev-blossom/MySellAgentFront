import { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { useGetPropertiesQuery } from '@infrastructure/api/propertyApi';
import type { PropertyFilters, Property } from '@core/domain/entities/Property';

/**
 * Custom Hook para manejar propiedades con scroll infinito
 * Acumula propiedades a medida que se cargan más páginas
 */
export const useInfiniteProperties = (initialFilters?: PropertyFilters) => {
  const [filters, setFilters] = useState<PropertyFilters>(
    initialFilters || { pageNumber: 1, pageSize: 10 }
  );
  const [allProperties, setAllProperties] = useState<Property[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const previousFiltersRef = useRef<string>('');

  // Query de RTK Query con los filtros actuales
  const {
    data,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useGetPropertiesQuery({ ...filters, pageNumber: currentPage });

  // Acumular propiedades cuando lleguen nuevos datos
  useEffect(() => {
    if (!data?.items) return;

    // Crear clave de filtros sin pageNumber para detectar cambios
    const getPureFiltersKey = (f: PropertyFilters) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { pageNumber, pageSize, ...rest } = f;
      return JSON.stringify(rest);
    };

    const currentFiltersKey = getPureFiltersKey(filters);
    const filtersChanged = previousFiltersRef.current && previousFiltersRef.current !== currentFiltersKey;

    if (filtersChanged) {
      // Filtros cambiaron, resetear todo
      setAllProperties(data.items);
      previousFiltersRef.current = currentFiltersKey;
    } else if (currentPage === 1) {
      // Primera página (inicial o reset)
      previousFiltersRef.current = currentFiltersKey;
      setAllProperties(data.items);
    } else {
      // Páginas siguientes, agregar solo nuevos
      setAllProperties((prev) => {
        const existingIds = new Set(prev.map(p => p.id));
        const newProperties = data.items.filter(p => !existingIds.has(p.id));
        return [...prev, ...newProperties];
      });
    }
  }, [data, filters, currentPage]);

  /**
   * Actualiza los filtros de búsqueda
   */
  const updateFilters = useCallback((newFilters: Partial<PropertyFilters>) => {
    setFilters((prev) => {
      const updated = { ...prev, ...newFilters };
      
      // Eliminar propiedades undefined
      Object.keys(updated).forEach((key) => {
        if (updated[key as keyof PropertyFilters] === undefined) {
          delete updated[key as keyof PropertyFilters];
        }
      });
      
      return updated;
    });
    setCurrentPage(1); // Resetear a página 1 cuando cambien filtros
  }, []);

  /**
   * Limpia todos los filtros
   */
  const clearFilters = useCallback(() => {
    setFilters({ pageNumber: 1, pageSize: 10 });
    setAllProperties([]);
    setCurrentPage(1);
  }, []);

  /**
   * Carga la siguiente página
   */
  const loadMore = useCallback(() => {
    if (data?.hasNextPage && !isFetching) {
      setCurrentPage((prev) => prev + 1);
    }
  }, [data?.hasNextPage, isFetching]);

  /**
   * Handler para búsqueda por nombre
   */
  const handleSearch = useCallback((searchTerm: string) => {
    updateFilters({ name: searchTerm || undefined });
  }, [updateFilters]);

  /**
   * Handler para aplicar filtros del modal
   */
  const handleApplyFilters = useCallback((newFilters: Partial<PropertyFilters>) => {
    updateFilters(newFilters);
  }, [updateFilters]);

  /**
   * Handler para limpiar filtros del modal (mantiene búsqueda por nombre)
   */
  const handleClearFilters = useCallback(() => {
    updateFilters({
      address: undefined,
      minPrice: undefined,
      maxPrice: undefined,
    });
  }, [updateFilters]);

  /**
   * Verifica si hay filtros activos (excluyendo paginación)
   */
  const hasActiveFilters = useMemo(() => {
    return !!(filters.name || filters.address || filters.minPrice || filters.maxPrice);
  }, [filters]);

  return {
    // Datos
    properties: allProperties,
    hasMore: data?.hasNextPage || false,
    totalCount: data?.totalCount || 0,
    
    // Estados
    isLoading: isLoading && currentPage === 1, // Solo mostrar loading en primera carga
    isFetching,
    isError,
    error,
    
    // Filtros
    filters,
    hasActiveFilters,
    
    // Acciones
    updateFilters,
    clearFilters,
    refetch,
    loadMore,

    // Handlers
    handleSearch,
    handleApplyFilters,
    handleClearFilters,
  };
};

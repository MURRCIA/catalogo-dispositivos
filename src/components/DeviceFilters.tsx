'use client';

import { useDevices } from '@/context/DeviceContext';

export default function DeviceFilters() {
  const { filters, setFilters, devices } = useDevices();

  // Obtener marcas únicas para el filtro
  const uniqueBrands = Array.from(new Set(devices.map(device => device.brand))).sort();
  
  // Obtener tipos únicos para el filtro
  const uniqueTypes = Array.from(new Set(devices.map(device => device.type))).sort();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ searchTerm: e.target.value });
  };

  const handleBrandChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters({ brand: e.target.value });
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters({ type: e.target.value });
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const [sortBy, sortOrder] = e.target.value.split('-') as ['name' | 'releaseDate' | 'price' | 'rating', 'asc' | 'desc'];
    setFilters({ sortBy, sortOrder });
  };

  const clearFilters = () => {
    setFilters({
      searchTerm: '',
      brand: '',
      type: '',
      sortBy: 'name',
      sortOrder: 'asc'
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
        Filtros y Búsqueda
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Búsqueda por texto */}
        <div>
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Buscar dispositivo
          </label>
          <input
            type="text"
            id="search"
            value={filters.searchTerm}
            onChange={handleSearchChange}
            placeholder="Nombre, marca o descripción..."
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100 text-sm"
          />
        </div>

        {/* Filtro por marca */}
        <div>
          <label htmlFor="brand" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Marca
          </label>
          <select
            id="brand"
            value={filters.brand}
            onChange={handleBrandChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100 text-sm"
          >
            <option value="">Todas las marcas</option>
            {uniqueBrands.map(brand => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>

        {/* Filtro por tipo */}
        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Tipo de dispositivo
          </label>
          <select
            id="type"
            value={filters.type}
            onChange={handleTypeChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100 text-sm"
          >
            <option value="">Todos los tipos</option>
            {uniqueTypes.map(type => (
              <option key={type} value={type}>
                {type === 'smartphone' ? 'Smartphone' : 'Laptop'}
              </option>
            ))}
          </select>
        </div>

        {/* Ordenamiento */}
        <div>
          <label htmlFor="sort" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Ordenar por
          </label>
          <select
            id="sort"
            value={`${filters.sortBy}-${filters.sortOrder}`}
            onChange={handleSortChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100 text-sm"
          >
            <option value="name-asc">Nombre (A-Z)</option>
            <option value="name-desc">Nombre (Z-A)</option>
            <option value="price-asc">Precio (Menor a Mayor)</option>
            <option value="price-desc">Precio (Mayor a Menor)</option>
            <option value="rating-desc">Rating (Mayor a Menor)</option>
            <option value="rating-asc">Rating (Menor a Mayor)</option>
            <option value="releaseDate-desc">Más Reciente</option>
            <option value="releaseDate-asc">Más Antiguo</option>
          </select>
        </div>
      </div>

      {/* Botón para limpiar filtros */}
      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={clearFilters}
          className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
        >
          Limpiar filtros
        </button>
        
        {/* Contador de resultados */}
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {filters.searchTerm || filters.brand || filters.type ? (
            <span>Filtros activos</span>
          ) : (
            <span>Mostrando todos los dispositivos</span>
          )}
        </div>
      </div>
    </div>
  );
}

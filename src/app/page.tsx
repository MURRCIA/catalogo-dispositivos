'use client';

import { useDevices } from '@/context/DeviceContext';
import DeviceCard from '@/components/DeviceCard';
import DeviceFilters from '@/components/DeviceFilters';

export default function HomePage() {
  const { getFilteredDevices } = useDevices();
  const filteredDevices = getFilteredDevices();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              📱 TechCatalogo
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Descubre los mejores dispositivos inteligentes
            </p>
            <p className="text-lg opacity-80 max-w-2xl mx-auto">
              Compara smartphones y laptops con reseñas detalladas, especificaciones completas 
              y comentarios de usuarios reales para tomar la mejor decisión de compra.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filtros */}
        <DeviceFilters />

        {/* Estadísticas rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              {filteredDevices.length}
            </div>
            <div className="text-gray-600 dark:text-gray-400">
              Dispositivos disponibles
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400">
              {filteredDevices.filter(d => d.type === 'smartphone').length}
            </div>
            <div className="text-gray-600 dark:text-gray-400">
              Smartphones
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
              {filteredDevices.filter(d => d.type === 'laptop').length}
            </div>
            <div className="text-gray-600 dark:text-gray-400">
              Laptops
            </div>
          </div>
        </div>

        {/* Lista de dispositivos */}
        {filteredDevices.length > 0 ? (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                Dispositivos
              </h2>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Mostrando {filteredDevices.length} resultado{filteredDevices.length !== 1 ? 's' : ''}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredDevices.map((device) => (
                <div key={device.id} className="animate-fade-in">
                  <DeviceCard device={device} />
                </div>
              ))}
            </div>
            {/* Mensaje de no se encontraron dispositivos */}
          </>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl opacity-50 mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              No se encontraron dispositivos
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Intenta ajustar los filtros para encontrar lo que buscas
            </p>
            <button
              onClick={() => window.location.reload()}
              className="btn-primary"
            >
              Limpiar filtros
            </button>
          </div>
        )}

        {/* Sección informativa */}
        <div className="mt-16 bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                ¿Por qué elegir TechCatalogo?
              </h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li className="flex items-center">
                  <span className="mr-3">✅</span>
                  Reseñas detalladas y objetivas
                </li>
                <li className="flex items-center">
                  <span className="mr-3">✅</span>
                  Especificaciones técnicas completas
                </li>
                <li className="flex items-center">
                  <span className="mr-3">✅</span>
                  Comentarios de usuarios reales
                </li>
                <li className="flex items-center">
                  <span className="mr-3">✅</span>
                  Comparativas actualizadas
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Categorías disponibles
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="text-3xl mb-2">📱</div>
                  <div className="font-medium text-gray-900 dark:text-gray-100">
                    Smartphones
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    iPhone, Samsung, Google, OnePlus
                  </div>
                </div>
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="text-3xl mb-2">💻</div>
                  <div className="font-medium text-gray-900 dark:text-gray-100">
                    Laptops
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    MacBook, Dell, HP, Lenovo
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

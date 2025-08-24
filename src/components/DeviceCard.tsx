'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Device } from '@/types';

interface DeviceCardProps {
  device: Device;
}

export default function DeviceCard({ device }: DeviceCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'COP'
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getTypeIcon = (type: string) => {
    return type === 'smartphone' ? '📱' : '💻';
  };

  const getTypeLabel = (type: string) => {
    return type === 'smartphone' ? 'Smartphone' : 'Laptop';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      {/* Imagen del dispositivo */}
      <div className="relative h-48 bg-gray-100 dark:bg-gray-700">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-6xl opacity-50">
            {getTypeIcon(device.type)}
          </div>
        </div>
        {/* Badge del tipo */}
        <div className="absolute top-3 left-3">
          <span className="bg-blue-500 text-white text-xs font-medium px-2 py-1 rounded-full">
            {getTypeLabel(device.type)}
          </span>
        </div>
        {/* Rating */}
        <div className="absolute top-3 right-3 bg-white dark:bg-gray-800 rounded-full px-2 py-1 shadow">
          <div className="flex items-center space-x-1">
            <span className="text-yellow-400">⭐</span>
            <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {device.rating}
            </span>
          </div>
        </div>
      </div>

      {/* Contenido de la tarjeta */}
      <div className="p-6">
        {/* Marca y nombre */}
        <div className="mb-2">
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
            {device.brand}
          </p>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 line-clamp-1">
            {device.name}
          </h3>
        </div>

        {/* Descripción */}
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
          {device.description}
        </p>

        {/* Especificaciones destacadas */}
        <div className="mb-4 space-y-1">
          {device.specs.processor && (
            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
              <span className="mr-2">🔧</span>
              <span>{device.specs.processor}</span>
            </div>
          )}
          {device.specs.ram && (
            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
              <span className="mr-2">💾</span>
              <span>{device.specs.ram} RAM</span>
            </div>
          )}
          {device.specs.storage && (
            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
              <span className="mr-2">💿</span>
              <span>{device.specs.storage}</span>
            </div>
          )}
        </div>

        {/* Precio y fecha */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {formatPrice(device.price)}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Lanzado: {formatDate(device.releaseDate)}
            </p>
          </div>
        </div>

        {/* Botón de ver detalles */}
        <Link
          href={`/device/${device.id}`}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 text-center block"
        >
          Ver Detalles
        </Link>
      </div>
    </div>
  );
}

'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Device, Comment, DeviceFilters, DeviceContextType } from '@/types';
import { mockDevices } from '@/data/mockDevices';
import { mockComments } from '@/data/mockComments';

const DeviceContext = createContext<DeviceContextType | undefined>(undefined);

const initialFilters: DeviceFilters = {
  searchTerm: '',
  brand: '',
  type: '',
  sortBy: 'name',
  sortOrder: 'asc'
};

export function DeviceProvider({ children }: { children: React.ReactNode }) {
  const [devices, setDevices] = useState<Device[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [filters, setFiltersState] = useState<DeviceFilters>(initialFilters);

  // Inicializar datos del localStorage o usar mock data
  useEffect(() => {
    const savedDevices = localStorage.getItem('devices');
    const savedComments = localStorage.getItem('comments');

    if (savedDevices) {
      setDevices(JSON.parse(savedDevices));
    } else {
      setDevices(mockDevices);
      localStorage.setItem('devices', JSON.stringify(mockDevices));
    }

    if (savedComments) {
      setComments(JSON.parse(savedComments));
    } else {
      setComments(mockComments);
      localStorage.setItem('comments', JSON.stringify(mockComments));
    }
  }, []);

  // Guardar cambios en localStorage
  useEffect(() => {
    if (devices.length > 0) {
      localStorage.setItem('devices', JSON.stringify(devices));
    }
  }, [devices]);

  useEffect(() => {
    if (comments.length > 0) {
      localStorage.setItem('comments', JSON.stringify(comments));
    }
  }, [comments]);

  const addDevice = (deviceData: Omit<Device, 'id'>) => {
    const newDevice: Device = {
      ...deviceData,
      id: Date.now().toString()
    };
    setDevices(prev => [...prev, newDevice]);
  };

  const updateDevice = (id: string, deviceData: Partial<Device>) => {
    setDevices(prev => 
      prev.map(device => 
        device.id === id ? { ...device, ...deviceData } : device
      )
    );
  };

  const deleteDevice = (id: string) => {
    setDevices(prev => prev.filter(device => device.id !== id));
    // También eliminar comentarios relacionados
    setComments(prev => prev.filter(comment => comment.deviceId !== id));
  };

  const addComment = (commentData: Omit<Comment, 'id' | 'createdAt'>) => {
    const newComment: Comment = {
      ...commentData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    setComments(prev => [...prev, newComment]);
  };

  const setFilters = (newFilters: Partial<DeviceFilters>) => {
    setFiltersState(prev => ({ ...prev, ...newFilters }));
  };

  const getDeviceById = (id: string): Device | undefined => {
    return devices.find(device => device.id === id);
  };

  const getCommentsByDeviceId = (deviceId: string): Comment[] => {
    return comments.filter(comment => comment.deviceId === deviceId);
  };

  const getFilteredDevices = (): Device[] => {
    let filteredDevices = [...devices];

    // Filtrar por término de búsqueda
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      filteredDevices = filteredDevices.filter(device =>
        device.name.toLowerCase().includes(searchLower) ||
        device.brand.toLowerCase().includes(searchLower) ||
        device.description.toLowerCase().includes(searchLower)
      );
    }

    // Filtrar por marca
    if (filters.brand) {
      filteredDevices = filteredDevices.filter(device => device.brand === filters.brand);
    }

    // Filtrar por tipo
    if (filters.type) {
      filteredDevices = filteredDevices.filter(device => device.type === filters.type);
    }

    // Ordenar
    filteredDevices.sort((a, b) => {
      let compareValue = 0;
      
      switch (filters.sortBy) {
        case 'name':
          compareValue = a.name.localeCompare(b.name);
          break;
        case 'price':
          compareValue = a.price - b.price;
          break;
        case 'rating':
          compareValue = a.rating - b.rating;
          break;
        case 'releaseDate':
          compareValue = new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime();
          break;
        default:
          compareValue = 0;
      }

      return filters.sortOrder === 'desc' ? -compareValue : compareValue;
    });

    return filteredDevices;
  };

  const value: DeviceContextType = {
    devices,
    comments,
    filters,
    addDevice,
    updateDevice,
    deleteDevice,
    addComment,
    setFilters,
    getDeviceById,
    getCommentsByDeviceId,
    getFilteredDevices
  };

  return (
    <DeviceContext.Provider value={value}>
      {children}
    </DeviceContext.Provider>
  );
}

export function useDevices() {
  const context = useContext(DeviceContext);
  if (context === undefined) {
    throw new Error('useDevices must be used within a DeviceProvider');
  }
  return context;
}

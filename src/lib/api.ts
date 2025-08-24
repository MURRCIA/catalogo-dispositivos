// Este archivo está preparado para futuras integraciones con APIs
// Actualmente usa datos mockeados pero puede ser fácilmente reemplazado

import { Device, Comment } from '@/types';

// URLs base para las APIs (configurar según el backend)
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

// Tipos para las respuestas de la API
interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

// ============================================================================
// SERVICIOS DE DISPOSITIVOS
// ============================================================================

export const deviceService = {
  // Obtener todos los dispositivos
  async getAll(): Promise<Device[]> {
    try {
      // TODO: Reemplazar con llamada real a la API
      // const response = await fetch(`${API_BASE_URL}/devices`);
      // const data: ApiResponse<Device[]> = await response.json();
      // return data.data;
      
      // Por ahora retorna datos mockeados desde localStorage
      const devices = localStorage.getItem('devices');
      return devices ? JSON.parse(devices) : [];
    } catch (error) {
      console.error('Error fetching devices:', error);
      throw new Error('Error al obtener los dispositivos');
    }
  },

  // Obtener un dispositivo por ID
  async getById(id: string): Promise<Device | null> {
    try {
   
      
      const devices = await this.getAll();
      return devices.find(device => device.id === id) || null;
    } catch (error) {
      console.error('Error fetching device:', error);
      throw new Error('Error al obtener el dispositivo');
    }
  },

  // Crear un nuevo dispositivo
  async create(device: Omit<Device, 'id'>): Promise<Device> {
    try {
     
      
      const newDevice: Device = {
        ...device,
        id: Date.now().toString()
      };
      
      const devices = await this.getAll();
      const updatedDevices = [...devices, newDevice];
      localStorage.setItem('devices', JSON.stringify(updatedDevices));
      
      return newDevice;
    } catch (error) {
      console.error('Error creating device:', error);
      throw new Error('Error al crear el dispositivo');
    }
  },

  // Actualizar un dispositivo
  async update(id: string, updates: Partial<Device>): Promise<Device> {
    try {
    
      const devices = await this.getAll();
      const deviceIndex = devices.findIndex(device => device.id === id);
      
      if (deviceIndex === -1) {
        throw new Error('Dispositivo no encontrado');
      }
      
      const updatedDevice = { ...devices[deviceIndex], ...updates };
      devices[deviceIndex] = updatedDevice;
      localStorage.setItem('devices', JSON.stringify(devices));
      
      return updatedDevice;
    } catch (error) {
      console.error('Error updating device:', error);
      throw new Error('Error al actualizar el dispositivo');
    }
  },

  // Eliminar un dispositivo
  async delete(id: string): Promise<boolean> {
    try {
      // TODO: Reemplazar con llamada real a la API
      // const response = await fetch(`${API_BASE_URL}/devices/${id}`, {
      //   method: 'DELETE'
      // });
      // const data: ApiResponse<boolean> = await response.json();
      // return data.success;
      
      const devices = await this.getAll();
      const filteredDevices = devices.filter(device => device.id !== id);
      localStorage.setItem('devices', JSON.stringify(filteredDevices));
      
      return true;
    } catch (error) {
      console.error('Error deleting device:', error);
      throw new Error('Error al eliminar el dispositivo');
    }
  }
};

// ============================================================================
// SERVICIOS DE COMENTARIOS
// ============================================================================

export const commentService = {
  // Obtener comentarios por dispositivo
  async getByDeviceId(deviceId: string): Promise<Comment[]> {
    try {
      // TODO: Reemplazar con llamada real a la API
      // const response = await fetch(`${API_BASE_URL}/devices/${deviceId}/comments`);
      // const data: ApiResponse<Comment[]> = await response.json();
      // return data.data;
      
      const comments = localStorage.getItem('comments');
      const allComments: Comment[] = comments ? JSON.parse(comments) : [];
      return allComments.filter(comment => comment.deviceId === deviceId);
    } catch (error) {
      console.error('Error fetching comments:', error);
      throw new Error('Error al obtener los comentarios');
    }
  },

  // Crear un nuevo comentario
  async create(comment: Omit<Comment, 'id' | 'createdAt'>): Promise<Comment> {
    try {
      // TODO: Reemplazar con llamada real a la API
      // const response = await fetch(`${API_BASE_URL}/comments`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(comment)
      // });
      // const data: ApiResponse<Comment> = await response.json();
      // return data.data;
      
      const newComment: Comment = {
        ...comment,
        id: Date.now().toString(),
        createdAt: new Date().toISOString()
      };
      
      const comments = localStorage.getItem('comments');
      const allComments: Comment[] = comments ? JSON.parse(comments) : [];
      const updatedComments = [...allComments, newComment];
      localStorage.setItem('comments', JSON.stringify(updatedComments));
      
      return newComment;
    } catch (error) {
      console.error('Error creating comment:', error);
      throw new Error('Error al crear el comentario');
    }
  }
};

// ============================================================================
// UTILIDADES DE API
// ============================================================================

// Interceptor para manejo de errores HTTP
export const apiInterceptor = {
  async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP Error: ${response.status}`);
    }
    
    return response.json();
  }
};

// Headers comunes para las peticiones
export const getApiHeaders = () => {
  return {
    'Content-Type': 'application/json',
    // TODO: Agregar token de autenticación cuando esté disponible
    // 'Authorization': `Bearer ${getAuthToken()}`
  };
};

// ============================================================================
// CONFIGURACIÓN PARA DESARROLLO
// ============================================================================

// Simulador de latencia de red para testing
export const simulateNetworkDelay = (ms: number = 1000) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// Mock de respuestas de API para desarrollo
export const mockApiResponse = <T>(data: T, success: boolean = true, message?: string): ApiResponse<T> => {
  return {
    data,
    success,
    message
  };
};

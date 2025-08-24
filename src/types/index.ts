export interface Device {
  id: string;
  name: string;
  brand: string;
  type: 'smartphone' | 'laptop';
  price: number;
  image: string;
  releaseDate: string;
  specs: DeviceSpecs;
  description: string;
  review: string;
  rating: number;
}

export interface DeviceSpecs {
  // Specs comunes
  processor?: string;
  ram?: string;
  storage?: string;
  operatingSystem?: string;
  
  // Specs específicas para smartphones
  screenSize?: string;
  camera?: string;
  battery?: string;
  
  // Specs específicas para laptops
  graphics?: string;
  ports?: string[];
  weight?: string;
  displayType?: string;
}

export interface Comment {
  id: string;
  deviceId: string;
  userName: string;
  userEmail: string;
  content: string;
  rating: number;
  createdAt: string;
}

export interface DeviceFilters {
  searchTerm: string;
  brand: string;
  type: string;
  sortBy: 'name' | 'releaseDate' | 'price' | 'rating';
  sortOrder: 'asc' | 'desc';
}

export interface DeviceContextType {
  devices: Device[];
  comments: Comment[];
  filters: DeviceFilters;
  addDevice: (device: Omit<Device, 'id'>) => void;
  updateDevice: (id: string, device: Partial<Device>) => void;
  deleteDevice: (id: string) => void;
  addComment: (comment: Omit<Comment, 'id' | 'createdAt'>) => void;
  setFilters: (filters: Partial<DeviceFilters>) => void;
  getDeviceById: (id: string) => Device | undefined;
  getCommentsByDeviceId: (deviceId: string) => Comment[];
  getFilteredDevices: () => Device[];
}

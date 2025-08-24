// Utilidades generales para el proyecto

// ============================================================================
// FORMATEO DE DATOS
// ============================================================================

// Formatear precio en Pesos
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'COP'
  }).format(price);
};

// Formatear fecha en español
export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Formatear fecha relativa (ej: "hace 2 días")
export const formatRelativeDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  
  if (diffInDays === 0) return 'Hoy';
  if (diffInDays === 1) return 'Ayer';
  if (diffInDays < 7) return `Hace ${diffInDays} días`;
  if (diffInDays < 30) return `Hace ${Math.floor(diffInDays / 7)} semanas`;
  if (diffInDays < 365) return `Hace ${Math.floor(diffInDays / 30)} meses`;
  
  return `Hace ${Math.floor(diffInDays / 365)} años`;
};

// ============================================================================
// FUNCIONES DE DISPOSITIVOS
// ============================================================================

// Obtener icono del tipo de dispositivo
export const getTypeIcon = (type: string): string => {
  return type === 'smartphone' ? '📱' : '💻';
};

// Obtener etiqueta del tipo de dispositivo
export const getTypeLabel = (type: string): string => {
  return type === 'smartphone' ? 'Smartphone' : 'Laptop';
};

// Generar estrellas para rating
export const renderStars = (rating: number): string => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - Math.ceil(rating);
  
  return '⭐'.repeat(fullStars) + 
         (hasHalfStar ? '⭐' : '') + 
         '☆'.repeat(emptyStars);
};

// Obtener color del rating
export const getRatingColor = (rating: number): string => {
  if (rating >= 4.5) return 'text-green-500';
  if (rating >= 4.0) return 'text-yellow-500';
  if (rating >= 3.0) return 'text-orange-500';
  return 'text-red-500';
};

// ============================================================================
// VALIDACIONES
// ============================================================================

// Validar email
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validar URL
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Validar precio
export const isValidPrice = (price: number): boolean => {
  return price > 0 && price < 100000;
};

// Validar rating
export const isValidRating = (rating: number): boolean => {
  return rating >= 1 && rating <= 5;
};

// ============================================================================
// FUNCIONES DE TEXTO
// ============================================================================

// Truncar texto
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
};

// Capitalizar primera letra
export const capitalize = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

// Limpiar texto para búsqueda
export const normalizeText = (text: string): string => {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, ''); // Remover acentos
};

// ============================================================================
// FUNCIONES DE ARRAY
// ============================================================================

// Obtener elementos únicos de un array
export const getUniqueItems = <T>(array: T[], key?: keyof T): T[] => {
  if (!key) {
    return Array.from(new Set(array));
  }
  
  const seen = new Set();
  return array.filter(item => {
    const value = item[key];
    if (seen.has(value)) {
      return false;
    }
    seen.add(value);
    return true;
  });
};

// Agrupar array por clave
export const groupBy = <T>(array: T[], key: keyof T): Record<string, T[]> => {
  return array.reduce((groups, item) => {
    const group = String(item[key]);
    groups[group] = groups[group] || [];
    groups[group].push(item);
    return groups;
  }, {} as Record<string, T[]>);
};

// ============================================================================
// FUNCIONES DE ALMACENAMIENTO
// ============================================================================

// Guardar en localStorage con manejo de errores
export const saveToLocalStorage = (key: string, data: any): boolean => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error('Error saving to localStorage:', error);
    return false;
  }
};

// Leer de localStorage con manejo de errores
export const loadFromLocalStorage = <T>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return defaultValue;
  }
};

// ============================================================================
// FUNCIONES DE DEBOUNCE Y THROTTLE
// ============================================================================

// Debounce para búsquedas
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void => {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Throttle para eventos de scroll
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void => {
  let inThrottle = false;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, wait);
    }
  };
};

// ============================================================================
// FUNCIONES DE GENERACIÓN
// ============================================================================

// Generar ID único simple
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Generar slug de URL
export const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

// ============================================================================
// FUNCIONES DE CLASE CSS
// ============================================================================

// Combinar clases CSS condicionalmente
export const classNames = (...classes: (string | undefined | null | boolean)[]): string => {
  return classes.filter(Boolean).join(' ');
};

// ============================================================================
// CONSTANTES ÚTILES
// ============================================================================

export const DEVICE_TYPES = {
  SMARTPHONE: 'smartphone',
  LAPTOP: 'laptop'
} as const;

export const SORT_OPTIONS = {
  NAME_ASC: 'name-asc',
  NAME_DESC: 'name-desc',
  PRICE_ASC: 'price-asc',
  PRICE_DESC: 'price-desc',
  RATING_ASC: 'rating-asc',
  RATING_DESC: 'rating-desc',
  DATE_ASC: 'releaseDate-asc',
  DATE_DESC: 'releaseDate-desc'
} as const;

export const STORAGE_KEYS = {
  DEVICES: 'devices',
  COMMENTS: 'comments',
  DARK_MODE: 'darkMode',
  FILTERS: 'filters'
} as const;

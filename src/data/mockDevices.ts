import { Device } from '@/types';

export const mockDevices: Device[] = [
  {
    id: '1',
    name: 'iPhone 15 Pro',
    brand: 'Apple',
    type: 'smartphone',
    price: 15000000,
    image: '/images/iphone-15-pro.jpg',
    releaseDate: '2023-09-22',
    rating: 4.8,
    description: 'El iPhone 15 Pro redefine la innovación con el chip A17 Pro, cámara avanzada de 48MP y diseño en titanio premium.',
    review: 'Un smartphone excepcional que combina rendimiento de clase mundial con un diseño elegante. La cámara es impresionante para fotografía profesional y el chip A17 Pro ofrece un rendimiento sin igual.',
    specs: {
      processor: 'A17 Pro Bionic',
      ram: '8GB',
      storage: '128GB / 256GB / 512GB / 1TB',
      operatingSystem: 'iOS 17',
      screenSize: '6.1 pulgadas',
      camera: '48MP + 12MP + 12MP',
      battery: '3274 mAh'
    }
  },
  {
    id: '2',
    name: 'Samsung Galaxy S24 Ultra',
    brand: 'Samsung',
    type: 'smartphone',
    price: 1199,
    image: '/images/galaxy-s24-ultra.jpg',
    releaseDate: '2024-01-24',
    rating: 4.7,
    description: 'El Galaxy S24 Ultra lleva la fotografía móvil al siguiente nivel con IA integrada y S Pen incorporado.',
    review: 'Samsung ha creado un verdadero flagship con el S24 Ultra. La pantalla es absolutamente brillante, el S Pen es útil para productividad, y las capacidades de IA son impresionantes.',
    specs: {
      processor: 'Snapdragon 8 Gen 3',
      ram: '12GB',
      storage: '256GB / 512GB / 1TB',
      operatingSystem: 'Android 14',
      screenSize: '6.8 pulgadas',
      camera: '200MP + 50MP + 12MP + 10MP',
      battery: '5000 mAh'
    }
  },
  {
    id: '3',
    name: 'Google Pixel 8 Pro',
    brand: 'Google',
    type: 'smartphone',
    price: 899,
    image: '/images/pixel-8-pro.jpg',
    releaseDate: '2023-10-12',
    rating: 4.6,
    description: 'El Pixel 8 Pro ofrece la mejor experiencia Android con fotografía computacional avanzada y actualizaciones garantizadas.',
    review: 'Google demuestra su dominio en software con el Pixel 8 Pro. La fotografía computacional es simplemente la mejor del mercado, y Android puro es una delicia de usar.',
    specs: {
      processor: 'Google Tensor G3',
      ram: '12GB',
      storage: '128GB / 256GB / 512GB',
      operatingSystem: 'Android 14',
      screenSize: '6.7 pulgadas',
      camera: '50MP + 48MP + 48MP',
      battery: '5050 mAh'
    }
  },
  {
    id: '4',
    name: 'MacBook Pro 16" M3',
    brand: 'Apple',
    type: 'laptop',
    price: 2499,
    image: '/images/macbook-pro-16-m3.jpg',
    releaseDate: '2023-10-30',
    rating: 4.9,
    description: 'El MacBook Pro de 16 pulgadas con chip M3 ofrece rendimiento profesional excepcional para creativos y desarrolladores.',
    review: 'Apple ha alcanzado la perfección con este MacBook Pro. El chip M3 es increíblemente potente, la pantalla Liquid Retina XDR es espectacular, y la duración de la batería es excepcional.',
    specs: {
      processor: 'Apple M3 Pro / M3 Max',
      ram: '18GB / 36GB',
      storage: '512GB / 1TB / 2TB / 4TB / 8TB SSD',
      operatingSystem: 'macOS Sonoma',
      graphics: 'M3 Pro / M3 Max GPU',
      ports: ['3x Thunderbolt 4', 'HDMI', 'SDXC', 'MagSafe 3'],
      weight: '2.16 kg',
      displayType: '16.2" Liquid Retina XDR'
    }
  },
  {
    id: '5',
    name: 'Dell XPS 13 Plus',
    brand: 'Dell',
    type: 'laptop',
    price: 1299,
    image: '/images/dell-xps-13-plus.jpg',
    releaseDate: '2023-08-15',
    rating: 4.5,
    description: 'El Dell XPS 13 Plus redefinió el diseño ultrabook con un teclado edge-to-edge y pantalla InfinityEdge.',
    review: 'Dell ha creado un ultrabook verdaderamente innovador. El diseño es minimalista y moderno, el rendimiento es sólido para trabajo diario, aunque la duración de batería podría ser mejor.',
    specs: {
      processor: 'Intel Core i7-1360P',
      ram: '16GB / 32GB LPDDR5',
      storage: '512GB / 1TB / 2TB SSD',
      operatingSystem: 'Windows 11',
      graphics: 'Intel Iris Xe',
      ports: ['2x Thunderbolt 4'],
      weight: '1.26 kg',
      displayType: '13.4" InfinityEdge'
    }
  },
  {
    id: '6',
    name: 'HP Spectre x360 14',
    brand: 'HP',
    type: 'laptop',
    price: 1199,
    image: '/images/hp-spectre-x360-14.jpg',
    releaseDate: '2023-09-01',
    rating: 4.4,
    description: 'El HP Spectre x360 combina elegancia premium con versatilidad 2-en-1 para profesionales creativos.',
    review: 'Un convertible elegante y versátil. La bisagra funciona perfectamente, la pantalla táctil es responsiva, y el diseño premium justifica el precio. Ideal para presentaciones y trabajo creativo.',
    specs: {
      processor: 'Intel Core i7-1355U',
      ram: '16GB LPDDR4x',
      storage: '512GB / 1TB SSD',
      operatingSystem: 'Windows 11',
      graphics: 'Intel Iris Xe',
      ports: ['2x Thunderbolt 4', '1x USB-A', 'MicroSD'],
      weight: '1.39 kg',
      displayType: '13.5" OLED Táctil'
    }
  },
  {
    id: '7',
    name: 'OnePlus 12',
    brand: 'OnePlus',
    type: 'smartphone',
    price: 799,
    image: '/images/oneplus-12.jpg',
    releaseDate: '2024-01-23',
    rating: 4.5,
    description: 'El OnePlus 12 ofrece velocidad flagship con carga ultrarrápida y cámaras mejoradas por Hasselblad.',
    review: 'OnePlus vuelve a sus raíces con el 12. La carga rápida de 100W es impresionante, el rendimiento es fluido, y las cámaras han mejorado significativamente con la colaboración de Hasselblad.',
    specs: {
      processor: 'Snapdragon 8 Gen 3',
      ram: '12GB / 16GB',
      storage: '256GB / 512GB',
      operatingSystem: 'OxygenOS 14 (Android 14)',
      screenSize: '6.82 pulgadas',
      camera: '50MP + 64MP + 48MP',
      battery: '5400 mAh'
    }
  },
  {
    id: '8',
    name: 'Lenovo ThinkPad X1 Carbon Gen 11',
    brand: 'Lenovo',
    type: 'laptop',
    price: 1599,
    image: '/images/thinkpad-x1-carbon-gen11.jpg',
    releaseDate: '2023-07-20',
    rating: 4.6,
    description: 'El ThinkPad X1 Carbon Gen 11 mantiene la legendaria durabilidad ThinkPad con procesadores Intel de 13ª generación.',
    review: 'La serie ThinkPad sigue siendo el estándar de oro para laptops empresariales. El teclado es excepcional, la construcción es sólida como una roca, y el rendimiento es confiable para trabajo intensivo.',
    specs: {
      processor: 'Intel Core i7-1355U',
      ram: '16GB / 32GB LPDDR5',
      storage: '512GB / 1TB / 2TB SSD',
      operatingSystem: 'Windows 11 Pro',
      graphics: 'Intel Iris Xe',
      ports: ['2x Thunderbolt 4', '2x USB-A', 'HDMI'],
      weight: '1.12 kg',
      displayType: '14" IPS Anti-Glare'
    }
  }
];

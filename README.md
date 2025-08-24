# 📱 TechCatalogo - Catálogo de Dispositivos Inteligentes

Un catálogo moderno de dispositivos inteligentes (smartphones y laptops) construido con Next.js 14, App Router y Tailwind CSS. Este proyecto funciona completamente en el frontend con datos mockeados, pero está estructurado para ser fácilmente conectado a un backend en el futuro.

## 🚀 Características

### ✨ Funcionalidades principales
- **Catálogo completo**: Visualización de smartphones y laptops con información detallada
- **Filtros avanzados**: Búsqueda por nombre, filtrado por marca y tipo, ordenamiento múltiple
- **Páginas de detalle**: Especificaciones completas, reseñas y sistema de comentarios
- **Panel de administración**: CRUD completo para gestionar dispositivos
- **Modo oscuro**: Toggle automático con persistencia en localStorage
- **Diseño responsivo**: Optimizado para móviles, tablets y desktop

### 🎨 Características de UI/UX
- Interfaz moderna y limpia con Tailwind CSS
- Animaciones suaves y transiciones
- Cards de dispositivos con información relevante
- Sistema de rating con estrellas
- Formularios intuitivos y validación
- Indicadores de estado y feedback visual

## 🛠️ Tecnologías utilizadas

- **Framework**: Next.js 14 con App Router
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **Estado**: React Context API
- **Persistencia**: localStorage (mock data)
- **Iconos**: Emojis nativos para mejor rendimiento

## 📁 Estructura del proyecto

```
catalogo-dispositivos/
├── src/
│   ├── app/                    # App Router de Next.js 14
│   │   ├── admin/              # Panel de administración
│   │   ├── device/[id]/        # Páginas de detalle dinámicas
│   │   ├── layout.tsx          # Layout principal
│   │   ├── page.tsx            # Página de inicio
│   │   └── globals.css         # Estilos globales
│   ├── components/             # Componentes reutilizables
│   │   ├── DeviceCard.tsx      # Card de dispositivo
│   │   ├── DeviceFilters.tsx   # Filtros y búsqueda
│   │   ├── Footer.tsx          # Footer del sitio
│   │   └── Navbar.tsx          # Navegación principal
│   ├── context/                # Context API para estado global
│   │   └── DeviceContext.tsx   # Contexto de dispositivos
│   ├── data/                   # Datos mockeados
│   │   ├── mockDevices.ts      # Dispositivos de ejemplo
│   │   └── mockComments.ts     # Comentarios de ejemplo
│   ├── lib/                    # Utilidades y servicios (preparado para APIs)
│   └── types/                  # Definiciones de TypeScript
│       └── index.ts            # Tipos e interfaces
├── public/                     # Archivos estáticos
├── package.json                # Dependencias y scripts
├── tailwind.config.ts          # Configuración de Tailwind
├── tsconfig.json               # Configuración de TypeScript
└── README.md                   # Documentación
```

## 📄 Páginas y funcionalidades

### 🏠 Página de inicio (`/`)
- Listado de todos los dispositivos en formato grid
- Filtros por:
  - Búsqueda de texto (nombre, marca, descripción)
  - Marca (Apple, Samsung, Google, etc.)
  - Tipo (Smartphone o Laptop)
- Ordenamiento por:
  - Nombre (A-Z / Z-A)
  - Precio (Menor a Mayor / Mayor a Menor)
  - Rating (Mayor a Menor / Menor a Mayor)
  - Fecha de lanzamiento (Más reciente / Más antiguo)
- Estadísticas rápidas del catálogo
- Sección informativa sobre las categorías

### 📱 Página de detalle (`/device/[id]`)
- Información completa del dispositivo
- Especificaciones técnicas detalladas
- Descripción y reseña profesional
- Sistema de comentarios:
  - Visualización de comentarios existentes
  - Formulario para agregar nuevos comentarios
  - Sistema de calificación por estrellas
- Navegación breadcrumb
- Botón para volver al catálogo

### ⚙️ Panel de administración (`/admin`)
- Estadísticas del catálogo
- Lista completa de dispositivos en formato tabla
- Formulario modal para agregar/editar dispositivos:
  - Información básica (nombre, marca, tipo, precio, etc.)
  - Especificaciones técnicas dinámicas según el tipo
  - Validación de formularios
- Funciones CRUD completas:
  - **Create**: Agregar nuevos dispositivos
  - **Read**: Visualizar lista de dispositivos
  - **Update**: Editar dispositivos existentes
  - **Delete**: Eliminar dispositivos con confirmación

## 💾 Datos mockeados

### Dispositivos incluidos:
**Smartphones:**
- iPhone 15 Pro (Apple)
- Samsung Galaxy S24 Ultra
- Google Pixel 8 Pro
- OnePlus 12

**Laptops:**
- MacBook Pro 16" M3 (Apple)
- Dell XPS 13 Plus
- HP Spectre x360 14
- Lenovo ThinkPad X1 Carbon Gen 11

### Estructura de datos:
- **Dispositivos**: Nombre, marca, tipo, precio, especificaciones, descripción, reseña, rating
- **Comentarios**: Usuario, email, contenido, calificación, fecha
- **Filtros**: Término de búsqueda, marca, tipo, ordenamiento

## 🔧 Instalación y uso

### Prerrequisitos
- Node.js 18+ 
- npm o yarn

### Pasos de instalación

1. **Clonar o descargar el proyecto**
```bash
# Si tienes git
git clone [url-del-repositorio]
cd catalogo-dispositivos

# O simplemente descomprimir el archivo ZIP en una carpeta
```

2. **Instalar dependencias**
```bash
npm install
# o
yarn install
```

3. **Ejecutar en modo desarrollo**
```bash
npm run dev
# o
yarn dev
```

4. **Abrir en el navegador**
```
http://localhost:3000
```

### Scripts disponibles
```bash
npm run dev      # Servidor de desarrollo
npm run build    # Construir para producción
npm run start    # Ejecutar versión de producción
npm run lint     # Linter de código
```

## 🌙 Modo oscuro

El proyecto incluye un sistema completo de modo oscuro que:
- Se activa/desactiva con el botón en la navbar
- Respeta la preferencia del sistema operativo al cargar por primera vez
- Persiste la elección del usuario en localStorage
- Cambia todos los componentes y colores automáticamente

## 🔮 Preparado para el futuro

### Conexión con backend
La arquitectura está diseñada para facilitar la conexión con un backend:

1. **Context API**: Centraliza el estado y las operaciones de datos
2. **Carpeta `/lib`**: Lista para servicios de API
3. **Tipos TypeScript**: Definen la estructura de datos esperada
4. **Funciones separadas**: Easy refactoring para llamadas HTTP

### Ejemplo de migración:
```typescript
// En lugar de usar mockDevices directamente
const devices = mockDevices;

// Se cambiaría por llamadas a API
const devices = await fetch('/api/devices').then(res => res.json());
```

## 🎯 Funcionalidades adicionales que se pueden agregar

- **Autenticación**: Sistema de login para usuarios y admin
- **Base de datos**: PostgreSQL/MongoDB para persistencia real
- **Imágenes**: Upload y gestión de imágenes de dispositivos
- **Búsqueda avanzada**: Filtros por rango de precio, especificaciones
- **Comparador**: Comparar múltiples dispositivos lado a lado
- **Favoritos**: Sistema de wishlist para usuarios
- **Reviews**: Sistema de reseñas más completo con pros/cons
- **API REST**: Endpoints para todas las operaciones CRUD
- **SEO**: Meta tags dinámicos y sitemap
- **PWA**: Convertir en Progressive Web App

## 📝 Notas de desarrollo

### Datos de prueba
- Los datos se guardan en localStorage para simular persistencia
- Al agregar/editar/eliminar dispositivos, los cambios se mantienen hasta limpiar el navegador
- Los datos iniciales se cargan automáticamente la primera vez

### Responsividad
- Diseño mobile-first con Tailwind CSS
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Grid adaptativo para diferentes tamaños de pantalla

### Rendimiento
- Componentes optimizados con re-renders mínimos
- Lazy loading preparado para imágenes
- CSS optimizado con purge de Tailwind

## 🤝 Contribución

Este es un proyecto de demostración. Para mejoras:
1. Fork del repositorio
2. Crear rama para feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crear Pull Request

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

---

**Desarrollado con ❤️ por Murrcia usando Next.js 14 y Tailwind CSS**

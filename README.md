# 🏭 PICM-VITE - Sistema de Gestión de Inventario

Un sistema moderno de gestión de inventario desarrollado con **Vite**, **JavaScript Vanilla** y **Tailwind CSS**. Diseñado para gestionar productos, categorías, insumos, proveedores y movimientos de inventario de manera eficiente, realizado como proyecto académico para la asignatura Desarrollo de Software.

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Tecnologías](#-tecnologías)
- [Instalación](#-instalación)
- [Uso](#-uso)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [API Endpoints](#-api-endpoints)
- [Funcionalidades Implementadas](#-funcionalidades-implementadas)
- [Estado del Desarrollo](#-estado-del-desarrollo)
- [Contribución](#-contribución)

## ✨ Características

- 🎨 **Interfaz Moderna**: Diseño limpio y profesional con Tailwind CSS
- 📱 **Responsive Design**: Adaptable a diferentes tamaños de pantalla (En desarrollo)
- 🔐 **Autenticación Completa**: Login, logout, recuperación de contraseña
- 📊 **Dashboard Interactivo**: Panel de control con métricas y estadísticas
- 🛍️ **Gestión de Productos**: CRUD completo para productos con paginación
- 🏷️ **Sistema de Categorías**: Organización de productos por categorías
- 📦 **Gestión de Insumos**: Control de materias primas e insumos con métricas
- 👥 **Proveedores**: Gestión completa de proveedores y sus datos
- 🔔 **Notificaciones**: Sistema de notificaciones en tiempo real
- 🎯 **Modales Dinámicos**: Componentes modales reutilizables
- ⚡ **Sistema de Secciones**: Gestión dinámica de secciones del dashboard
- 🔍 **Búsqueda Avanzada**: Filtros y búsqueda en tiempo real
- 📄 **Paginación Inteligente**: Navegación eficiente por grandes volúmenes de datos
- 💰 **Movimientos**: Registro de entradas y salidas de inventario con filtros avanzados
- 📄 **Reportes PDF**: Descarga de reportes de movimientos de productos e insumos
- 📊 **Estadísticas**: Dashboard con gráficos y métricas de rendimiento

## 🛠️ Tecnologías

### Frontend
- **Vite** - Build tool y servidor de desarrollo
- **JavaScript ES6+** - Lenguaje principal
- **Tailwind CSS** - Framework de CSS utilitario
- **CSS Modules** - Estilos organizados por componentes
- **Chart.js** - Librería para gráficos interactivos

### Arquitectura
- **SPA (Single Page Application)** - Navegación sin recarga de página
- **Component-Based Architecture** - Componentes reutilizables
- **Service Layer Pattern** - Separación de lógica de negocio
- **API Client Pattern** - Cliente HTTP centralizado
- **Section Management System** - Sistema dinámico de gestión de secciones
- **Utility-First CSS** - Estilos con Tailwind CSS
- **Modular JavaScript** - Código organizado en módulos ES6+

## 🚀 Instalación

### Prerrequisitos
- Node.js (versión 16 o superior)
- npm o yarn
- Backend API funcionando

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone [URL_DEL_REPOSITORIO]
   cd picm-vite
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   ```bash
   # Crear archivo .env en la raíz del proyecto
   VITE_API_BASE_URL=http://localhost:8000/api
   ```

4. **Ejecutar en modo desarrollo**
   ```bash
   npm run dev
   ```

5. **Abrir en el navegador**
   ```
   http://localhost:5173
   ```

## 📖 Uso

### Inicio de Sesión
1. Accede a la aplicación
2. Ingresa tus credenciales
3. El sistema te redirigirá al dashboard principal

### Dashboard Principal
- **Inicio**: Vista general del sistema
- **Productos**: Gestión completa de productos
- **Categorías**: Organización de productos
- **Insumos**: Gestión de materias primas
- **Proveedores**: Administración de proveedores
- **Movimientos**: Registro de transacciones
- **Documentos**: Generación de reportes

### Gestión de Productos
- ➕ **Agregar**: Modal con formulario completo
- ✏️ **Editar**: Modificación de datos existentes
- 🗑️ **Eliminar**: Confirmación antes de eliminar
- 🔍 **Buscar**: Filtrado en tiempo real
- 📄 **Paginación**: Navegación por páginas

### Gestión de Movimientos
- 📊 **Filtros Avanzados**: Por tipo de movimiento, fechas y productos/insumos
- 📈 **Estadísticas**: Visualización de tendencias y métricas
- 📄 **Reportes PDF**: Descarga de reportes detallados de movimientos
- 🔄 **Gestión de Stock**: Actualización automática de inventarios

### Sistema de Reportes
- 📋 **Reportes de Productos**: Descarga de PDF con historial de movimientos
- 📦 **Reportes de Insumos**: Documentación completa de transacciones
- 🎯 **Integración Directa**: Botones de descarga integrados en las tablas
- 💾 **Descarga Automática**: Generación y descarga instantánea de archivos

## 📁 Estructura del Proyecto

```
picm-vite/
├── public/
│   └── PICM.png                 # Logo de la aplicación
├── src/
│   ├── api/
│   │   ├── config/
│   │   │   └── apiConfig.js     # Configuración de la API
│   │   ├── constants/
│   │   │   └── endpoints.js     # Endpoints de la API
│   │   ├── services/
│   │   │   ├── authService.js   # Servicios de autenticación
│   │   │   ├── productService.js # Servicios de productos
│   │   │   ├── supplyService.js # Servicios de insumos y proveedores
│   │   │   ├── movementService.js # Servicios de movimientos
│   │   │   ├── statisticService.js # Servicios de estadísticas
│   │   │   └── reportService.js # Servicios de reportes PDF
│   │   └── utils/
│   │       ├── apiClient.js     # Cliente HTTP
│   │       ├── dashboardUtils.js # Utilidades del dashboard
│   │       └── sectionManager.js # Gestor de secciones dinámico
│   ├── components/
│   │   └── ui/
│   │       ├── modal.js         # Componente modal
│   │       ├── Notification.js  # Sistema de notificaciones
│   │       ├── table.js         # Tabla de datos
│   │       └── charts.js        # Componentes de gráficos
│   ├── css/
│   │   ├── components.css       # Estilos de componentes
│   │   ├── dashboard.css        # Estilos del dashboard
│   │   ├── login.css           # Estilos de login
│   │   ├── recovery.css        # Estilos de recuperación
│   │   └── resetPassword.css   # Estilos de reset de contraseña
│   ├── pages/
│   │   ├── dashboard.js        # Página principal del dashboard
│   │   ├── login.js           # Página de login
│   │   ├── recovery.js        # Página de recuperación
│   │   └── resetPassword.js   # Página de reset de contraseña
│   ├── main.js                # Punto de entrada de la aplicación
│   ├── router.js              # Enrutador de la aplicación
│   ├── input.css              # Estilos base de Tailwind
│   └── style.css              # Estilos globales
├── index.html                 # Archivo HTML principal
├── package.json               # Dependencias y scripts
├── tailwind.config.js         # Configuración de Tailwind
└── vite.config.js            # Configuración de Vite
```

## 🌐 API Endpoints

### Autenticación
- `POST /auth/login` - Iniciar sesión
- `POST /auth/logout` - Cerrar sesión
- `POST /auth/password-reset` - Solicitar reset de contraseña
- `POST /auth/confirm-reset-password` - Confirmar reset de contraseña

### Productos
- `GET /products/get` - Obtener productos (paginado)
- `POST /products/create` - Crear producto
- `GET /products/get/{id}` - Obtener producto por ID
- `PUT /products/update/{id}` - Actualizar producto
- `DELETE /products/delete/{id}` - Eliminar producto
- `GET /products/total-stock` - Total de productos
- `GET /products/total-stock-value` - Valor total del inventario

### Categorías
- `GET /products/get-categories` - Obtener categorías
- `GET /products/get-categories-all` - Obtener todas las categorías
- `GET /products/get-category/{id}` - Obtener categoría por ID
- `POST /products/create-category` - Crear categoría
- `PUT /products/update-category/{id}` - Actualizar categoría
- `DELETE /products/delete-category/{id}` - Eliminar categoría

### Insumos
- `GET /supplies/get-paginated` - Obtener insumos (paginado)
- `POST /supplies/create` - Crear insumo
- `GET /supplies/get/{id}` - Obtener insumo por ID
- `PUT /supplies/update/{id}` - Actualizar insumo
- `DELETE /supplies/delete/{id}` - Eliminar insumo
- `GET /supplies/total-stock` - Total de insumos
- `GET /supplies/total-inventory-value` - Valor total del inventario de insumos

### Proveedores
- `GET /supplies/get-suppliers` - Obtener proveedores
- `GET /supplies/get-suppliers-paginated` - Obtener proveedores (paginado)
- `GET /supplies/get-supplier/{id}` - Obtener proveedor por ID
- `POST /supplies/create-supplier` - Crear proveedor
- `PUT /supplies/update-supplier/{id}` - Actualizar proveedor
- `DELETE /supplies/delete-supplier/{id}` - Eliminar proveedor

### Movimientos
- `GET /movements/get-movements` - Obtener movimientos (paginado)
- `POST /movements/create-movement/{tipo}` - Crear movimiento
- `GET /movements/get-movement/{id}/{tipo}` - Obtener movimiento por ID
- `PUT /movements/update-movement/{id}/{tipo}` - Actualizar movimiento
- `DELETE /movements/delete-movement/{id}/{tipo}` - Eliminar movimiento

### Estadísticas
- `GET /statistics/top-products-sales` - Top productos con más salidas
- `GET /statistics/top-products-entries` - Top productos con más entradas
- `GET /statistics/product-movements-volume` - Volumen de movimientos de productos
- `GET /statistics/monthly-movements` - Movimientos mensuales

### Reportes
- `GET /reports/download-product-report/{id}` - Descargar reporte PDF de producto
- `GET /reports/download-supply-report/{id}` - Descargar reporte PDF de insumo

## ✅ Funcionalidades Implementadas

### 🔐 Autenticación
- [x] Login con validación
- [x] Logout seguro
- [x] Recuperación de contraseña
- [x] Reset de contraseña
- [x] Protección de rutas

### 📊 Dashboard
- [x] Navegación lateral responsive
- [x] Métricas principales (Total productos, Valor inventario)
- [x] Secciones organizadas por módulos
- [x] Diseño moderno y profesional
- [x] Sistema de gestión de secciones dinámico
- [x] Gráficos interactivos con Chart.js
- [x] Estadísticas de rendimiento en tiempo real

### 🛍️ Gestión de Productos
- [x] Listado con paginación
- [x] Búsqueda en tiempo real
- [x] Filtros avanzados
- [x] CRUD completo
- [x] Validación de formularios
- [x] Notificaciones de éxito/error

### 🏷️ Gestión de Categorías
- [x] Listado con paginación
- [x] Búsqueda en tiempo real
- [x] CRUD completo
- [x] Validación de formularios
- [x] Integración con productos

### 📦 Gestión de Insumos
- [x] Listado con paginación
- [x] Búsqueda en tiempo real
- [x] Filtros avanzados
- [x] CRUD completo
- [x] Validación de formularios
- [x] Métricas de inventario
- [x] Gestión de stock

### 👥 Gestión de Proveedores
- [x] Listado con paginación
- [x] Búsqueda en tiempo real
- [x] CRUD completo
- [x] Validación de formularios
- [x] Integración con insumos

### 💰 Gestión de Movimientos
- [x] Registro de entradas y salidas
- [x] Filtros avanzados por tipo y fecha
- [x] Búsqueda en tiempo real
- [x] CRUD completo
- [x] Integración con productos e insumos
- [x] Gestión de stock automática

### 📄 Sistema de Reportes
- [x] Descarga de reportes PDF
- [x] Reportes de movimientos de productos
- [x] Reportes de movimientos de insumos
- [x] Integración con sistema de movimientos

### 🎨 Componentes UI
- [x] Modal dinámico y reutilizable
- [x] Sistema de notificaciones
- [x] Tabla de datos con funcionalidades avanzadas
- [x] Formularios con validación
- [x] Sistema de gestión de secciones reutilizable
- [x] Componentes de gráficos interactivos
- [x] Botones de descarga de PDF integrados

## 🚧 Estado del Desarrollo

### ✅ Completado
- Sistema de autenticación completo
- Dashboard principal funcional con gráficos
- Gestión completa de productos
- Gestión completa de categorías
- Gestión completa de insumos
- Gestión completa de proveedores
- Gestión completa de movimientos
- Sistema de reportes PDF
- Componentes UI base
- Sistema de gestión de secciones dinámico
- Integración con API backend
- Sistema de notificaciones
- Modales dinámicos y reutilizables
- Gráficos interactivos con Chart.js

### 🔄 En Desarrollo
- Optimización del responsive design
- Mejoras en la experiencia de usuario
- Validaciones adicionales
- Refactorización de servicios (reducción de código duplicado)

### 📋 Pendiente
- [ ] Módulo de Documentos adicionales
- [ ] Optimización completa del responsive design
- [ ] Testing automatizado
- [ ] Documentación de API
- [ ] Refactorización completa de servicios
- [ ] Implementación de caché para mejor rendimiento
- [ ] Exportación de datos en múltiples formatos
- [ ] Sistema de alertas y notificaciones avanzadas

## ⚠️ Notas Importantes

### Responsive Design
> **⚠️ Advertencia**: El diseño responsive aún no está completamente implementado en todas las secciones. Se está trabajando en optimizar la experiencia en dispositivos móviles y tablets.

### Compatibilidad
- **Navegadores**: Chrome, Firefox, Safari, Edge (versiones recientes)
- **Dispositivos**: Desktop (completo), Tablet (parcial), Mobile (en desarrollo)

## 🤝 Contribución

### Cómo Contribuir
1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

### Estándares de Código
- Usar camelCase para variables y funciones
- Comentarios en ingles
- Estructura de componentes modular
- Validación de formularios
- Manejo de errores consistente

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

**Desarrollado con ❤️ para StayAwayCo**

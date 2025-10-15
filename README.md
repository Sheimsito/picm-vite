# 🏭 PICM-VITE - Sistema de Gestión de Inventario

Un sistema moderno de gestión de inventario desarrollado con **Vite**, **JavaScript Vanilla** y **Tailwind CSS**. Diseñado para gestionar productos, categorías, insumos, proveedores y movimientos de inventario de manera eficiente.

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
- 📱 **Responsive Design**: Adaptable a diferentes tamaños de pantalla (Aún no implementado del todo)
- 🔐 **Autenticación Completa**: Login, logout, recuperación de contraseña
- 📊 **Dashboard Interactivo**: Panel de control con métricas y estadísticas
- 🛍️ **Gestión de Productos**: CRUD completo para productos con paginación
- 🏷️ **Sistema de Categorías**: Organización de productos por categorías
- 📦 **Gestión de Insumos**: Control de materias primas e insumos
- 👥 **Proveedores**: Gestión de proveedores y sus datos
- 💰 **Movimientos**: Registro de entradas y salidas de inventario
- 📄 **Documentos**: Generación y gestión de documentos del sistema
- 🔔 **Notificaciones**: Sistema de notificaciones en tiempo real
- 🎯 **Modales Dinámicos**: Componentes modales reutilizables

## 🛠️ Tecnologías

### Frontend
- **Vite** - Build tool y servidor de desarrollo
- **JavaScript ES6+** - Lenguaje principal
- **Tailwind CSS** - Framework de CSS utilitario
- **CSS Modules** - Estilos organizados por componentes

### Arquitectura
- **SPA (Single Page Application)** - Navegación sin recarga de página
- **Component-Based Architecture** - Componentes reutilizables
- **Service Layer Pattern** - Separación de lógica de negocio
- **API Client Pattern** - Cliente HTTP centralizado

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
│   │   │   └── productService.js # Servicios de productos
│   │   └── utils/
│   │       └── apiClient.js     # Cliente HTTP
│   ├── components/
│   │   └── ui/
│   │       ├── modal.js         # Componente modal
│   │       ├── Notification.js  # Sistema de notificaciones
│   │       └── table.js         # Tabla de datos
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
- `GET /products/get-categories` - Obtener categorías

### Módulos Futuros
- **Categorías**: `/categories/`
- **Proveedores**: `/suppliers/`
- **Insumos**: `/supplies/`
- **Movimientos**: `/movements/`

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

### 🛍️ Gestión de Productos
- [x] Listado con paginación
- [x] Búsqueda en tiempo real
- [x] Filtros avanzados
- [x] CRUD completo
- [x] Validación de formularios
- [x] Notificaciones de éxito/error

### 🎨 Componentes UI
- [x] Modal dinámico y reutilizable
- [x] Sistema de notificaciones
- [x] Tabla de datos con funcionalidades avanzadas
- [x] Formularios con validación

## 🚧 Estado del Desarrollo

### ✅ Completado
- Sistema de autenticación completo
- Dashboard principal funcional
- Gestión completa de productos
- Componentes UI base
- Integración con API backend

### 🔄 En Desarrollo
- Optimización del responsive design
- Mejoras en la experiencia de usuario
- Validaciones adicionales

### 📋 Pendiente
- [ ] Módulo de Categorías
- [ ] Módulo de Insumos
- [ ] Módulo de Proveedores
- [ ] Módulo de Movimientos
- [ ] Módulo de Documentos
- [ ] Sistema de reportes
- [ ] Optimización completa del responsive design
- [ ] Testing automatizado
- [ ] Documentación de API

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
- Comentarios en español
- Estructura de componentes modular
- Validación de formularios
- Manejo de errores consistente

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👥 Equipo

- **Desarrollador Principal**: [Tu Nombre]
- **Backend**: [Equipo Backend]
- **Diseño**: [Equipo de Diseño]

## 📞 Contacto

- **Email**: [tu-email@ejemplo.com]
- **Proyecto**: [URL del repositorio]
- **Issues**: [URL de issues del proyecto]

---

**Desarrollado con ❤️ para StayAwayCo - PICM System**

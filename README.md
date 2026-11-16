# SIGA Frontend

**Sistema Integral de Gestión de Activos — Milagros Group S.A.S.**

Evidencia grupal **GA7-220501096-AA4-EV03** · Componente frontend del proyecto formativo y proyectos de clase.

Aplicación web para gestionar activos, préstamos, devoluciones, órdenes de trabajo, reportes de daño, consulta por QR, usuarios y perfil. **No usa backend**: los datos son de prueba y se guardan en el `localStorage` del navegador.

---

## Integrantes

- Ángela Criollo Ruiz
- Veronica Pabon Muñoz
- Sergio Alejandro Rey Álvarez

---

## Tecnologías

- React 19
- Vite 8
- React Router 7
- CSS3
- `localStorage` para la persistencia de datos mock

---

## Cómo ejecutar el proyecto

```bash
npm install
npm run dev
```

Abre la dirección que muestra Vite, normalmente:

```text
http://localhost:5173
```

Para comprobar que el proyecto compila:

```bash
npm run build
```

---

## Credenciales de prueba

| Rol | Correo | Contraseña |
|---|---|---|
| Administrador | `admin@siga.com` | `admin123` |
| Técnico | `tecnico@siga.com` | `tecnico123` |
| Operario | `operario@siga.com` | `operario123` |

El usuario **Administrador** puede recorrer todos los módulos. La ruta `/usuarios` está restringida a ese rol.

---

## Rutas de la aplicación

| Ruta | Componente | Acceso |
|---|---|---|
| `/login` | `LoginPage` | Pública |
| `/` | `DashboardPage` | Protegida |
| `/activos` | `ActivosPage` | Protegida |
| `/activos/nuevo` | `ActivoForm` | Protegida |
| `/activos/:id` | `ActivoDetail` | Protegida |
| `/activos/:id/editar` | `ActivoForm` | Protegida |
| `/prestamos` | `PrestamosPage` | Protegida |
| `/devoluciones` | `DevolucionesPage` | Protegida |
| `/ordenes` | `OrdenesPage` | Protegida |
| `/reportes-dano` | `ReportesDanoPage` | Protegida |
| `/qr` | `QrPage` | Protegida |
| `/usuarios` | `UsuariosPage` | Solo Administrador |
| `/perfil` | `PerfilPage` | Protegida |

---

## Tabla de los 35 componentes

| # | Componente | Archivo | Dónde se usa |
|---|---|---|---|
| 1 | `Layout` | `src/components/layout/Layout.jsx` | Envuelve las páginas protegidas con navbar, sidebar y contenido |
| 2 | `Navbar` | `src/components/layout/Navbar.jsx` | Barra superior con título, usuario y cierre de sesión |
| 3 | `Sidebar` | `src/components/layout/Sidebar.jsx` | Menú lateral de módulos y accesos |
| 4 | `AuthContext` | `src/context/AuthContext.jsx` | Sesión, login, logout y usuario actual |
| 5 | `LoginForm` | `src/components/auth/LoginForm.jsx` | Formulario de correo y contraseña |
| 6 | `ProtectedRoute` | `src/components/auth/ProtectedRoute.jsx` | Protección de rutas y validación de roles |
| 7 | `LoginPage` | `src/pages/LoginPage.jsx` | Pantalla pública de inicio de sesión |
| 8 | `Button` | `src/components/ui/Button.jsx` | Acciones de todos los módulos |
| 9 | `Input` | `src/components/ui/Input.jsx` | Campos de texto, fechas y contraseña |
| 10 | `Select` | `src/components/ui/Select.jsx` | Categorías, estados, roles y activos |
| 11 | `Table` | `src/components/ui/Table.jsx` | Tablas con estados de carga y vacío |
| 12 | `Modal` | `src/components/ui/Modal.jsx` | Confirmaciones y formularios emergentes |
| 13 | `Badge` | `src/components/ui/Badge.jsx` | Estados, prioridades y roles |
| 14 | `Loader` | `src/components/ui/Loader.jsx` | Indicadores de carga |
| 15 | `EmptyState` | `src/components/ui/EmptyState.jsx` | Listados sin resultados |
| 16 | `DashboardPage` | `src/pages/DashboardPage.jsx` | Panel principal con estadísticas y actividad |
| 17 | `StatsGrid` | `src/components/dashboard/StatsGrid.jsx` | Tarjetas de totales del inventario |
| 18 | `ActivosPage` | `src/pages/ActivosPage.jsx` | Página del inventario, filtros y acciones |
| 19 | `ActivosTable` | `src/components/activos/ActivosTable.jsx` | Tabla del inventario dentro de `ActivosPage` |
| 20 | `ActivoFilters` | `src/components/activos/ActivoFilters.jsx` | Buscador y filtros dentro de `ActivosPage` |
| 21 | `ActivoForm` | `src/components/activos/ActivoForm.jsx` | Crear y editar activos |
| 22 | `ActivoDetail` | `src/components/activos/ActivoDetail.jsx` | Ficha detallada del activo y su código QR |
| 23 | `PrestamosPage` | `src/pages/PrestamosPage.jsx` | Lista de préstamos y apertura del formulario |
| 24 | `PrestamoForm` | `src/components/prestamos/PrestamoForm.jsx` | Formulario de préstamo dentro del modal |
| 25 | `DevolucionesPage` | `src/pages/DevolucionesPage.jsx` | Lista de devoluciones y apertura del formulario |
| 26 | `DevolucionForm` | `src/components/prestamos/DevolucionForm.jsx` | Registro de la devolución y estado del activo |
| 27 | `OrdenesPage` | `src/pages/OrdenesPage.jsx` | Lista y seguimiento de órdenes de trabajo |
| 28 | `OrdenForm` | `src/components/ordenes/OrdenForm.jsx` | Creación y asignación de una orden |
| 29 | `ReportesDanoPage` | `src/pages/ReportesDanoPage.jsx` | Lista y cierre de reportes de daño |
| 30 | `ReporteDanoForm` | `src/components/reportes/ReporteDanoForm.jsx` | Registro de un daño sobre un activo |
| 31 | `QrPage` | `src/pages/QrPage.jsx` | Consulta de activos por código QR o interno |
| 32 | `UsuariosPage` | `src/pages/UsuariosPage.jsx` | Administración de usuarios |
| 33 | `UsuariosTable` | `src/components/usuarios/UsuariosTable.jsx` | Tabla de usuarios dentro de `UsuariosPage` |
| 34 | `UsuarioForm` | `src/components/usuarios/UsuarioForm.jsx` | Crear y editar usuarios |
| 35 | `PerfilPage` | `src/pages/PerfilPage.jsx` | Datos del usuario en sesión y cambio de contraseña |

> `SigaContext`, los servicios y las rutas son componentes internos de apoyo. No reemplazan los 35 componentes de la lista; solo hacen que la aplicación funcione.

---

## Datos de prueba y persistencia

- Los datos iniciales están en `src/data/mockData.js`.
- `SigaContext` los carga y los guarda en `localStorage` con el prefijo `siga-frontend:`.
- El menú lateral incluye **Restablecer datos demo** para volver a los valores iniciales.
- No hay peticiones a un backend, MySQL, Express ni servicios externos.

---

## Estructura del proyecto

```text
siga-frontend/
├── index.html
├── package.json
├── vite.config.js
├── README.md
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── styles.css
    ├── components/
    │   ├── auth/          # LoginForm, ProtectedRoute
    │   ├── common/        # Icon
    │   ├── dashboard/     # StatsGrid
    │   ├── layout/        # Layout, Navbar, Sidebar
    │   ├── ui/            # Button, Input, Select, Table, Modal, Badge, Loader, EmptyState
    │   ├── activos/       # ActivosTable, ActivoFilters, ActivoForm, ActivoDetail
    │   ├── prestamos/     # PrestamoForm, DevolucionForm
    │   ├── ordenes/       # OrdenForm
    │   ├── reportes/      # ReporteDanoForm
    │   └── usuarios/      # UsuariosTable, UsuarioForm
    ├── context/           # AuthContext, SigaContext
    ├── data/              # Datos mock iniciales
    ├── pages/             # Páginas de cada módulo
    ├── routes/            # AppRoutes
    ├── services/          # authService, storage
    └── utils/             # Formatos, estados y prioridades
```

# SIGA Frontend

**Sistema Integral de Gestión de Activos — Milagros Group S.A.S.**

Evidencia grupal **GA7-220501096-AA4-EV03** · Componente frontend del proyecto formativo y proyectos de clase (listas de chequeo).

Aplicación frontend desarrollada con **React + Vite** para gestionar activos, préstamos, devoluciones, órdenes de trabajo, reportes de daño, consulta por QR, usuarios y perfil. **No usa backend**: los datos son de prueba y se guardan en `localStorage`.

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
- CSS3 (sin frameworks de estilos)
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
| `/prestamos` | `PrestamosPage` | Protegida |
| `/devoluciones` | `DevolucionesPage` | Protegida |
| `/ordenes` | `OrdenesPage` | Protegida |
| `/reportes-dano` | `ReportesDanoPage` | Protegida |
| `/qr` | `QrPage` | Protegida |
| `/usuarios` | `UsuariosPage` | Solo Administrador |
| `/perfil` | `PerfilPage` | Protegida |

---

## Tabla de los 35 componentes

| # | Componente | Archivo | Dónde se usa | Estado |
|---|---|---|---|---|
| 1 | `Layout` | `src/components/layout/Layout.jsx` | Envuelve las páginas protegidas con navbar, sidebar y contenido | Listo |
| 2 | `Navbar` | `src/components/layout/Navbar.jsx` | Barra superior con título, usuario y cierre de sesión | Listo |
| 3 | `Sidebar` | `src/components/layout/Sidebar.jsx` | Menú lateral de módulos y accesos | Listo |
| 4 | `AuthContext` | `src/context/AuthContext.jsx` | Sesión, login, logout y usuario actual | Listo |
| 5 | `LoginForm` | `src/components/auth/LoginForm.jsx` | Formulario de correo y contraseña | Listo |
| 6 | `ProtectedRoute` | `src/components/auth/ProtectedRoute.jsx` | Protección de rutas y validación de roles | Listo |
| 7 | `LoginPage` | `src/pages/LoginPage.jsx` | Pantalla pública de inicio de sesión | Listo |
| 8 | `Button` | `src/components/ui/Button.jsx` | Acciones de todos los módulos | Listo |
| 9 | `Input` | `src/components/ui/Input.jsx` | Campos de texto y contraseña | Listo |
| 10 | `Select` | `src/components/ui/Select.jsx` | Listas de categorías, estados, roles y activos | Listo |
| 11 | `Table` | `src/components/ui/Table.jsx` | Tablas de datos con estados de carga y vacío | Listo |
| 12 | `Modal` | `src/components/ui/Modal.jsx` | Confirmaciones y formularios emergentes | Listo |
| 13 | `Badge` | `src/components/ui/Badge.jsx` | Estados y prioridades | Listo |
| 14 | `Loader` | `src/components/ui/Loader.jsx` | Indicadores de carga | Listo |
| 15 | `EmptyState` | `src/components/ui/EmptyState.jsx` | Listados sin resultados | Listo |
| 16 | `DashboardPage` | `src/pages/DashboardPage.jsx` | Panel principal con estadísticas y actividad | Listo |
| 17 | `StatsGrid` | `src/components/dashboard/StatsGrid.jsx` | Tarjetas de totales del inventario | Listo |
| 18 | `ActivosPage` | `src/pages/ActivosPage.jsx` | Módulo de activos | Pendiente · Ángela |
| 19 | `ActivosTable` | `src/components/activos/ActivosTable.jsx` | Tabla del inventario | Pendiente · Ángela |
| 20 | `ActivoFilters` | `src/components/activos/ActivoFilters.jsx` | Búsqueda y filtros de activos | Pendiente · Ángela |
| 21 | `ActivoForm` | `src/components/activos/ActivoForm.jsx` | Crear y editar activos | Pendiente · Ángela |
| 22 | `ActivoDetail` | `src/components/activos/ActivoDetail.jsx` | Ficha detallada del activo | Pendiente · Ángela |
| 23 | `PrestamosPage` | `src/pages/PrestamosPage.jsx` | Módulo de préstamos | Pendiente · Veronica |
| 24 | `PrestamoForm` | `src/components/prestamos/PrestamoForm.jsx` | Registro de préstamos | Pendiente · Veronica |
| 25 | `DevolucionesPage` | `src/pages/DevolucionesPage.jsx` | Módulo de devoluciones | Pendiente · Veronica |
| 26 | `DevolucionForm` | `src/components/prestamos/DevolucionForm.jsx` | Registro de devoluciones | Pendiente · Veronica |
| 27 | `OrdenesPage` | `src/pages/OrdenesPage.jsx` | Módulo de órdenes de trabajo | Pendiente · Veronica |
| 28 | `OrdenForm` | `src/components/ordenes/OrdenForm.jsx` | Crear y asignar órdenes | Pendiente · Veronica |
| 29 | `ReportesDanoPage` | `src/pages/ReportesDanoPage.jsx` | Módulo de reportes de daño | Pendiente · Veronica |
| 30 | `ReporteDanoForm` | `src/components/reportes/ReporteDanoForm.jsx` | Registro de daños | Pendiente · Veronica |
| 31 | `QrPage` | `src/pages/QrPage.jsx` | Consulta de activos por QR | Pendiente · Veronica |
| 32 | `UsuariosPage` | `src/pages/UsuariosPage.jsx` | Administración de usuarios | Pendiente · Ángela |
| 33 | `UsuariosTable` | `src/components/usuarios/UsuariosTable.jsx` | Tabla de usuarios | Pendiente · Ángela |
| 34 | `UsuarioForm` | `src/components/usuarios/UsuarioForm.jsx` | Crear y editar usuarios | Pendiente · Ángela |
| 35 | `PerfilPage` | `src/pages/PerfilPage.jsx` | Perfil del usuario en sesión | Pendiente · Ángela |

> `SigaContext`, los servicios y las rutas son componentes internos de apoyo. No reemplazan los 35 componentes de la lista; solo hacen que la aplicación funcione.

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
    │   ├── common/        # Icon, PendingModule
    │   ├── dashboard/     # StatsGrid
    │   ├── layout/        # Layout, Navbar, Sidebar
    │   ├── ui/            # Button, Input, Select, Table, Modal, Badge, Loader, EmptyState
    │   ├── activos/       # Componentes del módulo de activos
    │   ├── prestamos/     # Componentes de préstamos y devoluciones
    │   ├── ordenes/       # Componentes de órdenes
    │   ├── reportes/      # Componentes de reportes de daño
    │   └── usuarios/      # Componentes de usuarios
    ├── context/           # AuthContext, SigaContext
    ├── data/              # Datos mock iniciales
    ├── pages/             # Páginas de cada módulo
    ├── routes/            # AppRoutes
    ├── services/          # authService, storage
    └── utils/             # Tonos de estados y prioridades
```

---

## Datos de prueba y persistencia

- Los datos iniciales están en `src/data/mockData.js`.
- `SigaContext` los carga y los guarda en `localStorage` con el prefijo `siga-frontend:`.
- El menú lateral incluye **Restablecer datos demo** para volver a los valores iniciales.
- No hay peticiones a un backend, MySQL, Express ni servicios externos.

---

## Estado actual y reparto de trabajo

### Listo (base)

- Proyecto React + Vite configurado.
- Login con roles y sesión persistente.
- Layout con navbar, sidebar responsive y cierre de sesión.
- Componentes compartidos de interfaz (`Button`, `Input`, `Select`, `Table`, `Modal`, `Badge`, `Loader`, `EmptyState`).
- Dashboard con estadísticas, actividad reciente y estado del proyecto.
- Rutas protegidas y ruta de usuarios restringida a Administrador.
- Datos mock y persistencia en `localStorage`.
- Páginas de los módulos conectadas con tarjetas de "pendiente" para facilitar el trabajo de las compañeras.

### Pendiente

| Integrante | Módulos / componentes |
|---|---|
| **Ángela Criollo Ruiz** | `ActivosPage`, `ActivosTable`, `ActivoFilters`, `ActivoForm`, `ActivoDetail`, `UsuariosPage`, `UsuariosTable`, `UsuarioForm`, `PerfilPage` |
| **Veronica Pabon Muñoz** | `PrestamosPage`, `PrestamoForm`, `DevolucionesPage`, `DevolucionForm`, `OrdenesPage`, `OrdenForm`, `ReportesDanoPage`, `ReporteDanoForm`, `QrPage` |

Las páginas pendientes ya tienen su ruta y su tarjeta informativa. Para implementarlas, reemplaza el contenido de `PendingModule` por la interfaz real y usa los componentes compartidos y `useSiga()`.

### Ramas de trabajo

```text
feature/activos-usuarios
feature/prestamos-ordenes-reportes-qr
```

Flujo recomendado:

```bash
git clone https://github.com/SergioAlejandroRey/siga-frontend.git
cd siga-frontend
npm install
git checkout -b feature/activos-usuarios
# o
git checkout -b feature/prestamos-ordenes-reportes-qr
```

Después de trabajar:

```bash
git add .
git commit -m "feat: descripción del avance"
git push -u origin nombre-de-la-rama
```

Y abrir un Pull Request hacia `main`.

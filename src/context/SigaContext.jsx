import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  ACTIVOS_INICIALES,
  DEVOLUCIONES_INICIALES,
  ORDENES_INICIALES,
  PRESTAMOS_INICIALES,
  REPORTES_INICIALES,
  USUARIOS_INICIALES,
} from '../data/mockData';
import {
  readStorage,
  STORAGE_KEYS,
  writeStorage,
} from '../services/storage';

const SigaContext = createContext(null);

function usePersistentState(key, initialValue) {
  const [value, setValue] = useState(() => readStorage(key, initialValue));

  useEffect(() => {
    writeStorage(key, value);
  }, [key, value]);

  return [value, setValue];
}

function nuevoId(prefijo) {
  return `${prefijo}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

function siguienteCodigo(prefijo, lista) {
  const maximo = lista.reduce((max, item) => {
    const numero = Number(String(item.codigo ?? '').split('-').pop());
    return Number.isFinite(numero) ? Math.max(max, numero) : max;
  }, 0);

  return `${prefijo}-${String(maximo + 1).padStart(3, '0')}`;
}

function inicialesDe(nombre = '') {
  return nombre
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((parte) => parte.charAt(0).toUpperCase())
    .join('');
}

/**
 * Estado global del SIGA: activos, préstamos, devoluciones, órdenes, reportes
 * y usuarios. Cada colección se guarda en localStorage. Los módulos consumen
 * este contexto en lugar de hablar con un backend.
 */
export function SigaProvider({ children }) {
  const [activos, setActivos] = usePersistentState(
    STORAGE_KEYS.activos,
    ACTIVOS_INICIALES,
  );
  const [prestamos, setPrestamos] = usePersistentState(
    STORAGE_KEYS.prestamos,
    PRESTAMOS_INICIALES,
  );
  const [devoluciones, setDevoluciones] = usePersistentState(
    STORAGE_KEYS.devoluciones,
    DEVOLUCIONES_INICIALES,
  );
  const [ordenes, setOrdenes] = usePersistentState(
    STORAGE_KEYS.ordenes,
    ORDENES_INICIALES,
  );
  const [reportes, setReportes] = usePersistentState(
    STORAGE_KEYS.reportes,
    REPORTES_INICIALES,
  );
  const [usuarios, setUsuarios] = usePersistentState(
    STORAGE_KEYS.usuarios,
    USUARIOS_INICIALES,
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timer);
  }, []);

  const stats = useMemo(
    () => ({
      totalActivos: activos.length,
      disponibles: activos.filter((activo) => activo.estado === 'Disponible').length,
      prestados: activos.filter((activo) => activo.estado === 'Prestado').length,
      mantenimiento: activos.filter(
        (activo) => activo.estado === 'En mantenimiento',
      ).length,
      usuarios: usuarios.length,
      prestamosActivos: prestamos.filter(
        (prestamo) => prestamo.estado === 'Activo' || prestamo.estado === 'Vencido',
      ).length,
      ordenesAbiertas: ordenes.filter(
        (orden) => orden.estado !== 'Finalizada',
      ).length,
      reportesAbiertos: reportes.filter(
        (reporte) => reporte.estado !== 'Cerrado',
      ).length,
    }),
    [activos, usuarios, prestamos, ordenes, reportes],
  );

  const addActivo = useCallback(
    (data) => {
      setActivos((prev) => {
        const codigoActivo = data.codigo?.trim() || siguienteCodigo('ACT', prev);
        return [
          {
            id: nuevoId('a'),
            estado: 'Disponible',
            responsable: '',
            ...data,
            codigo: codigoActivo,
            codigoQr: data.codigoQr?.trim() || `QR-${codigoActivo}`,
          },
          ...prev,
        ];
      });
    },
    [setActivos],
  );

  const updateActivo = useCallback(
    (id, data) => {
      setActivos((prev) =>
        prev.map((activo) =>
          activo.id === id ? { ...activo, ...data } : activo,
        ),
      );
    },
    [setActivos],
  );

  const deleteActivo = useCallback(
    (id) => {
      setActivos((prev) => prev.filter((activo) => activo.id !== id));
    },
    [setActivos],
  );

  const addPrestamo = useCallback(
    (data) => {
      setPrestamos((prev) => {
        const activo = activos.find((item) => item.id === data.activoId);
        return [
          {
            id: nuevoId('p'),
            codigo: siguienteCodigo('PRE', prev),
            estado: 'Activo',
            activoNombre: activo?.nombre ?? data.activoNombre ?? 'Activo',
            activoCodigo: activo?.codigo ?? data.activoCodigo ?? '',
            ...data,
          },
          ...prev,
        ];
      });

      if (data.activoId) {
        setActivos((prev) =>
          prev.map((activo) =>
            activo.id === data.activoId
              ? {
                  ...activo,
                  estado: 'Prestado',
                  responsable: data.solicitante || activo.responsable,
                }
              : activo,
          ),
        );
      }
    },
    [activos, setActivos, setPrestamos],
  );

  const registrarDevolucion = useCallback(
    (prestamoId, data) => {
      const prestamo = prestamos.find((item) => item.id === prestamoId);
      if (!prestamo) return;

      setDevoluciones((prev) => [
        {
          id: nuevoId('d'),
          codigo: siguienteCodigo('DEV', prev),
          prestamoId,
          activoId: prestamo.activoId,
          activoNombre: prestamo.activoNombre,
          activoCodigo: prestamo.activoCodigo,
          fechaDevolucion:
            data.fechaDevolucion || new Date().toISOString().slice(0, 10),
          estadoActivo: data.estadoActivo || 'Disponible',
          recibidoPor: data.recibidoPor || 'Administrador',
          observaciones: data.observaciones || '',
        },
        ...prev,
      ]);

      setPrestamos((prev) =>
        prev.map((item) =>
          item.id === prestamoId ? { ...item, estado: 'Devuelto' } : item,
        ),
      );

      setActivos((prev) =>
        prev.map((activo) =>
          activo.id === prestamo.activoId
            ? {
                ...activo,
                estado: data.estadoActivo || 'Disponible',
                responsable: '',
              }
            : activo,
        ),
      );
    },
    [prestamos, setActivos, setDevoluciones, setPrestamos],
  );

  const addOrden = useCallback(
    (data) => {
      setOrdenes((prev) => [
        {
          id: nuevoId('o'),
          codigo: siguienteCodigo('OT', prev),
          estado: 'Pendiente',
          ...data,
        },
        ...prev,
      ]);
    },
    [setOrdenes],
  );

  const addReporte = useCallback(
    (data) => {
      setReportes((prev) => [
        {
          id: nuevoId('r'),
          codigo: siguienteCodigo('RD', prev),
          estado: 'Abierto',
          ...data,
        },
        ...prev,
      ]);
    },
    [setReportes],
  );

  const addUsuario = useCallback(
    (data) => {
      setUsuarios((prev) => [
        {
          id: nuevoId('u'),
          estado: 'Activo',
          iniciales: inicialesDe(data.nombre),
          ...data,
        },
        ...prev,
      ]);
    },
    [setUsuarios],
  );

  const updateUsuario = useCallback(
    (id, data) => {
      setUsuarios((prev) =>
        prev.map((usuario) =>
          usuario.id === id ? { ...usuario, ...data } : usuario,
        ),
      );
    },
    [setUsuarios],
  );

  const resetDemo = useCallback(() => {
    setActivos(ACTIVOS_INICIALES);
    setPrestamos(PRESTAMOS_INICIALES);
    setDevoluciones(DEVOLUCIONES_INICIALES);
    setOrdenes(ORDENES_INICIALES);
    setReportes(REPORTES_INICIALES);
    setUsuarios(USUARIOS_INICIALES);
  }, [
    setActivos,
    setDevoluciones,
    setOrdenes,
    setPrestamos,
    setReportes,
    setUsuarios,
  ]);

  const value = useMemo(
    () => ({
      activos,
      prestamos,
      devoluciones,
      ordenes,
      reportes,
      usuarios,
      loading,
      stats,
      addActivo,
      updateActivo,
      deleteActivo,
      addPrestamo,
      registrarDevolucion,
      addOrden,
      addReporte,
      addUsuario,
      updateUsuario,
      resetDemo,
    }),
    [
      activos,
      prestamos,
      devoluciones,
      ordenes,
      reportes,
      usuarios,
      loading,
      stats,
      addActivo,
      updateActivo,
      deleteActivo,
      addPrestamo,
      registrarDevolucion,
      addOrden,
      addReporte,
      addUsuario,
      updateUsuario,
      resetDemo,
    ],
  );

  return <SigaContext.Provider value={value}>{children}</SigaContext.Provider>;
}

export function useSiga() {
  const context = useContext(SigaContext);
  if (!context) {
    throw new Error('useSiga debe usarse dentro de SigaProvider');
  }
  return context;
}

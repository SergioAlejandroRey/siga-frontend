/**
 * Pequeña capa de persistencia sobre localStorage.
 *
 * Todos los datos del SIGA viven en el navegador. El prefijo evita choques con
 * otras aplicaciones y facilita borrar la información de prueba.
 */

const PREFIX = 'siga-frontend:';

export const STORAGE_KEYS = {
  session: 'session',
  activos: 'activos',
  prestamos: 'prestamos',
  devoluciones: 'devoluciones',
  ordenes: 'ordenes',
  reportes: 'reportes',
  usuarios: 'usuarios',
};

export function readStorage(key, fallback) {
  try {
    const raw = window.localStorage.getItem(PREFIX + key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function writeStorage(key, value) {
  try {
    window.localStorage.setItem(PREFIX + key, JSON.stringify(value));
  } catch {
    // Si el navegador bloquea localStorage, la aplicación sigue funcionando
    // en memoria durante la sesión actual.
  }
}

export function removeStorage(key) {
  try {
    window.localStorage.removeItem(PREFIX + key);
  } catch {
    // Sin acción: el dato simplemente no se puede borrar del almacenamiento.
  }
}

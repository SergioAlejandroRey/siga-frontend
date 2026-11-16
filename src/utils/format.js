/**
 * Formatos y ayudas compartidas por los módulos.
 */

export function formatCurrency(value) {
  const numero = Number(value);
  if (!Number.isFinite(numero)) return '—';
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(numero);
}

export function formatDate(value) {
  if (!value) return '—';
  const fecha = new Date(`${value}T00:00:00`);
  if (Number.isNaN(fecha.getTime())) return value;
  return new Intl.DateTimeFormat('es-CO', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(fecha);
}

export function hoyISO() {
  const ahora = new Date();
  const local = new Date(ahora.getTime() - ahora.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 10);
}

export function inicialesDe(nombre = '') {
  return String(nombre)
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((parte) => parte.charAt(0).toUpperCase())
    .join('');
}

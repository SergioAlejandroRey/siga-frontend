/**
 * Tonos de Badge asociados a los estados del SIGA.
 * Centralizarlos evita que cada módulo invente colores distintos.
 */
const TONOS_ESTADO = {
  Disponible: 'green',
  Activo: 'green',
  Prestado: 'blue',
  'En mantenimiento': 'amber',
  'En proceso': 'blue',
  Pendiente: 'amber',
  Vencido: 'red',
  Devuelto: 'gray',
  'Dado de baja': 'red',
  Abierto: 'red',
  'En revisión': 'amber',
  Cerrado: 'green',
  Finalizada: 'green',
  Inactivo: 'gray',
};

const TONOS_PRIORIDAD = {
  Alta: 'red',
  Media: 'amber',
  Baja: 'green',
};

export function tonoEstado(estado) {
  return TONOS_ESTADO[estado] || 'gray';
}

export function tonoPrioridad(prioridad) {
  return TONOS_PRIORIDAD[prioridad] || 'gray';
}

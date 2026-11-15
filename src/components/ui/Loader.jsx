/**
 * Indicador de carga. Se usa mientras se valida la sesión o se consultan datos.
 */
export default function Loader({
  label = 'Cargando...',
  fullScreen = false,
  size = 'md',
}) {
  return (
    <div
      className={`loader ${fullScreen ? 'loader--full' : ''} loader--${size}`.trim()}
      role="status"
      aria-live="polite"
    >
      <span className="loader__spinner" aria-hidden="true" />
      <span className="loader__label">{label}</span>
    </div>
  );
}

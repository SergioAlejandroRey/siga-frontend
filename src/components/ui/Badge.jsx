const TONOS = ['blue', 'green', 'amber', 'red', 'gray', 'purple', 'teal', 'pink'];

/**
 * Etiqueta de estado reutilizable. El tono se elige con la prop `tone`.
 */
export default function Badge({ children, tone = 'gray', dot = false, className = '' }) {
  const tonoSeguro = TONOS.includes(tone) ? tone : 'gray';

  return (
    <span className={`badge badge--${tonoSeguro} ${className}`.trim()}>
      {dot ? <span className="badge__dot" aria-hidden="true" /> : null}
      {children}
    </span>
  );
}

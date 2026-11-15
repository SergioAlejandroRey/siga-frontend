import { useEffect } from 'react';
import { createPortal } from 'react-dom';

/**
 * Ventana modal reutilizable. Cierra con la tecla Escape o al hacer clic
 * fuera del panel. Bloquea el scroll del cuerpo mientras está abierta.
 */
export default function Modal({
  open,
  title,
  children,
  onClose,
  footer = null,
  size = 'md',
}) {
  useEffect(() => {
    if (!open) return undefined;

    const manejarTecla = (event) => {
      if (event.key === 'Escape') onClose?.();
    };
    const overflowAnterior = document.body.style.overflow;

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', manejarTecla);

    return () => {
      document.body.style.overflow = overflowAnterior;
      document.removeEventListener('keydown', manejarTecla);
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div
      className="modal-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose?.();
      }}
    >
      <div
        className={`modal modal--${size}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <header className="modal__header">
          <div>
            <span className="modal__eyebrow">SIGA</span>
            <h2 id="modal-title">{title}</h2>
          </div>
          <button
            type="button"
            className="modal__close"
            onClick={onClose}
            aria-label="Cerrar ventana"
          >
            ×
          </button>
        </header>
        <div className="modal__body">{children}</div>
        {footer ? <footer className="modal__footer">{footer}</footer> : null}
      </div>
    </div>,
    document.body,
  );
}

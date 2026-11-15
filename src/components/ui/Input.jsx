/**
 * Campo de texto con etiqueta, ayuda y mensaje de error.
 */
export default function Input({
  label,
  name,
  error = '',
  help = '',
  id,
  className = '',
  ...props
}) {
  const inputId = id || (name ? `field-${name}` : undefined);
  const describedBy = error
    ? `${inputId}-error`
    : help
      ? `${inputId}-help`
      : undefined;

  return (
    <div className={`field ${error ? 'field--error' : ''} ${className}`.trim()}>
      {label ? <label htmlFor={inputId}>{label}</label> : null}
      <input
        id={inputId}
        name={name}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={describedBy}
        {...props}
      />
      {error ? (
        <small id={`${inputId}-error`} className="field__error">
          {error}
        </small>
      ) : help ? (
        <small id={`${inputId}-help`} className="field__help">
          {help}
        </small>
      ) : null}
    </div>
  );
}

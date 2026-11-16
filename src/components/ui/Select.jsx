/**
 * Lista desplegable reutilizable.
 * `options` acepta strings o pares { value, label }.
 */
export default function Select({
  label,
  name,
  options = [],
  placeholder = '',
  error = '',
  id,
  className = '',
  ...props
}) {
  const selectId = id || (name ? `select-${name}` : undefined);

  return (
    <div className={`field ${error ? 'field--error' : ''} ${className}`.trim()}>
      {label ? <label htmlFor={selectId}>{label}</label> : null}
      <select
        id={selectId}
        name={name}
        aria-invalid={error ? 'true' : undefined}
        {...props}
      >
        {placeholder ? <option value="">{placeholder}</option> : null}
        {options.map((option) => {
          const value = typeof option === 'string' ? option : option.value;
          const text = typeof option === 'string' ? option : option.label;
          return (
            <option key={value} value={value}>
              {text}
            </option>
          );
        })}
      </select>
      {error ? <small className="field__error">{error}</small> : null}
    </div>
  );
}

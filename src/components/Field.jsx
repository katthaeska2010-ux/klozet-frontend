// Field: campo de formulário completo (rótulo + campo + erro).
// Liga o erro ao campo com aria-describedby, assim o leitor de tela
// avisa o problema quando a pessoa chega no campo.
export default function Field({ id, label, error, hint, ...inputProps }) {
  const describedBy = error ? `${id}-erro` : hint ? `${id}-dica` : undefined;
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <input id={id} aria-invalid={error ? "true" : undefined} aria-describedby={describedBy} {...inputProps} />
      {hint && !error && <p id={`${id}-dica`} className="field-hint">{hint}</p>}
      {error && <p id={`${id}-erro`} className="field-error">{error}</p>}
    </div>
  );
}
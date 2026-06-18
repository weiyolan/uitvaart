import type { ReactNode } from "react";

/* Label + control + hint/error wrapper. Presentational; the control is passed
   as children and owns its own id (matched by htmlFor here). */
export function Field({
  id,
  label,
  required,
  error,
  hint,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div className="fm-field">
      <label className="fm-label" htmlFor={id}>
        {label}
        {required ? <span aria-hidden="true"> *</span> : null}
      </label>
      {children}
      {hint ? <p className="fm-hint">{hint}</p> : null}
      {error ? (
        <p className="fm-err" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

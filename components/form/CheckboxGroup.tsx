"use client";

export function CheckboxGroup({
  name,
  legend,
  options,
  values,
  onChange,
  hint,
  invalid,
}: {
  name: string;
  legend: string;
  options: { value: string; label: string }[];
  values: string[];
  onChange: (values: string[]) => void;
  hint?: string;
  invalid?: boolean;
}) {
  const toggle = (v: string) =>
    onChange(values.includes(v) ? values.filter((x) => x !== v) : [...values, v]);
  return (
    <fieldset className="fm-group" aria-invalid={invalid || undefined}>
      <legend className="fm-label">{legend}</legend>
      <div className="fm-options">
        {options.map((o) => (
          <label className="fm-check" key={o.value}>
            <input
              type="checkbox"
              name={name}
              value={o.value}
              checked={values.includes(o.value)}
              onChange={() => toggle(o.value)}
            />
            <span>{o.label}</span>
          </label>
        ))}
      </div>
      {hint ? <p className="fm-hint">{hint}</p> : null}
    </fieldset>
  );
}

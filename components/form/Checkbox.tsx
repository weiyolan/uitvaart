"use client";

/* Single boolean checkbox (used for the leather-book add-on and the consent
   tick). */
export function Checkbox({
  id,
  name,
  label,
  checked,
  onChange,
  note,
}: {
  id: string;
  name: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  note?: string;
}) {
  return (
    <div className="fm-field">
      <label className="fm-check fm-check--single" htmlFor={id}>
        <input
          id={id}
          name={name}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <span>
          {label}
          {note ? <span className="fm-check-note"> {note}</span> : null}
        </span>
      </label>
    </div>
  );
}

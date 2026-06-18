"use client";

export function TextInput({
  id,
  name,
  type = "text",
  value,
  onChange,
  required,
  placeholder,
  autoComplete,
  invalid,
}: {
  id: string;
  name: string;
  type?: "text" | "email" | "tel" | "date" | "time";
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
  invalid?: boolean;
}) {
  return (
    <input
      id={id}
      name={name}
      type={type}
      className="fm-input"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required={required}
      placeholder={placeholder}
      autoComplete={autoComplete}
      aria-invalid={invalid || undefined}
    />
  );
}

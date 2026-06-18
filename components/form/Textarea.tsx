"use client";

export function Textarea({
  id,
  name,
  value,
  onChange,
  placeholder,
  rows = 5,
}: {
  id: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <textarea
      id={id}
      name={name}
      className="fm-input fm-textarea"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
    />
  );
}

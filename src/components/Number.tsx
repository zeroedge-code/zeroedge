
export function NumberFmt({ value, prefix = "", suffix = "", digits = 2 }: { value: number; prefix?: string; suffix?: string; digits?: number; }) {
  const f = new Intl.NumberFormat("de-DE", { minimumFractionDigits: digits, maximumFractionDigits: digits }).format(value);
  return <span>{prefix}{f}{suffix}</span>;
}

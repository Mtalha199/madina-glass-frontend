export const displayValue = (value?: string | null) => {
  return value && value.trim() !== "" ? value : "-";
}; 
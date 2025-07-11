export function formatDate(date?: string): string | undefined {
  if (!date || date.length === 0) return undefined;
  const newValue = date.slice(0, 10).split("-");
  return `${newValue[2]}/${newValue[1]}/${newValue[0]}`;
}

export function formatDateComHoras(date?: string): string | undefined {
  if (!date || date.length === 0) return undefined;
  const data = date.split("T");
  const newValue = data[0].slice(0, 10).split("-");
  const horas = data[1].slice(0, 5);
  return `${newValue[2]}/${newValue[1]}/${newValue[0]} ${horas}`;
}

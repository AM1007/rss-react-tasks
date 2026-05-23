import type { Character } from '../../types/character';

const CSV_HEADERS = ['id', 'name', 'description', 'detailsUrl'];

function escapeCsvValue(value: string): string {
  if (/[",\n\r]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

export function buildCsv(items: Character[], origin: string): string {
  const headerRow = CSV_HEADERS.join(',');
  const dataRows = items.map((item) =>
    [item.id, item.name, item.description, `${origin}/details/${item.id}`]
      .map(escapeCsvValue)
      .join(','),
  );
  return [headerRow, ...dataRows].join('\n');
}

export function downloadCsv(items: Character[]): void {
  const csv = buildCsv(items, window.location.origin);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = `${items.length}_items.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

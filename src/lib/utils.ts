export function isDue(isoDate: string): boolean {
  return new Date(isoDate).getTime() <= Date.now();
}

export function formatDate(isoDate: string): string {
  return new Intl.DateTimeFormat('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(isoDate));
}

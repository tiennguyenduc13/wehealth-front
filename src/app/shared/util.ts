export function getTimeFormat(date: Date): string {
  if (typeof date === 'string') {
    date = new Date(date);
  }
  return date.getHours() + ':' + date.getMinutes();
}

export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ');
}

const MONTHS_PT = [
  'JAN',
  'FEV',
  'MAR',
  'ABR',
  'MAI',
  'JUN',
  'JUL',
  'AGO',
  'SET',
  'OUT',
  'NOV',
  'DEZ',
] as const;

export function formatShowDateParts(isoDate: string): {
  day: string;
  month: string;
  year: string;
} {
  const [year = '', monthStr = '01', dayStr = '01'] = isoDate.split('-');
  const monthIdx = Math.max(0, Math.min(11, Number(monthStr) - 1));
  return {
    day: dayStr.padStart(2, '0'),
    month: MONTHS_PT[monthIdx] ?? 'JAN',
    year,
  };
}


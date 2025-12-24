import { format } from 'date-fns';
import { th } from 'date-fns/locale';

export function formatDate(date: Date) {
  return format(date, 'dd MMM yyyy', { locale: th });
}

export function formatDateBE(date: Date) {
  const buddhistYear = date.getFullYear() + 543;
  return format(date, `dd MMM ${buddhistYear}`, { locale: th });
}

export function formatDateBEWithTime(date: Date) {
  const buddhistYear = date.getFullYear() + 543;
  return format(date, `dd MMM ${buddhistYear} HH:mm`, { locale: th });
}

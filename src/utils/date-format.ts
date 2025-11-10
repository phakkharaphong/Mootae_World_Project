import dayjs from 'dayjs';
import buddhistEra from 'dayjs/plugin/buddhistEra';
import 'dayjs/locale/th';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import utc from 'dayjs/plugin/utc';
import tz from 'dayjs/plugin/timezone';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(localizedFormat);
dayjs.extend(customParseFormat);
dayjs.extend(utc);
dayjs.extend(tz);
dayjs.extend(buddhistEra);
dayjs.locale('th');

export function formatDateToBuddhistEra(
  dateString: string,
  format: string,
): string {
  const date = dayjs(dateString);
  if (!date.isValid()) {
    return '-';
  }
  return dayjs(dateString).format(format.replace('YYYY', 'BBBB'));
}

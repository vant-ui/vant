import { createNamespace } from '../utils';
import { padZero } from '../utils/format/string';

const [createComponent, bem, t] = createNamespace('calendar');

export { createComponent, bem, t };

export const ROW_HEIGHT = 64;
export const RENDER_OFFSET = 150;

export function formatMonthTitle(date: Date) {
  return t('monthTitle', date.getFullYear(), padZero(date.getMonth() + 1));
}

export function compareMonth(date1: Date, date2: Date) {
  const year1 = date1.getFullYear();
  const year2 = date2.getFullYear();
  const month1 = date1.getMonth();
  const month2 = date2.getMonth();

  if (year1 === year2) {
    return month1 === month2 ? 0 : month1 > month2 ? 1 : -1;
  }

  return year1 > year2 ? 1 : -1;
}

export function compareDay(day1: Date, day2: Date) {
  const compareMonthResult = compareMonth(day1, day2);

  if (compareMonthResult === 0) {
    const date1 = day1.getDate();
    const date2 = day2.getDate();

    return date1 === date2 ? 0 : date1 > date2 ? 1 : -1;
  }

  return compareMonthResult;
}

export function getNextDay(date: Date) {
  date = new Date(date);
  date.setDate(date.getDate() + 1);

  return date;
}

import format from 'date-fns/format';
import isSameDay from 'date-fns/is_same_day';
import differenceInMinutes from 'date-fns/difference_in_minutes';

export function camelize(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) => {
    if (+match === 0) return ''; // or if (/\s+/.test(match)) for white spaces
    return index === 0 ? match.toLowerCase() : match.toUpperCase();
  });
}

export function getFormattedDate(start, end) {
  if (isSameDay(start, end)) {
    return format(start, 'MMM Do');
  }
  return `${format(start, 'MMM Do')} - ${format(end, 'MMM Do')}`;
}

export function getFormattedDuration(start, end) {
  const totalMinutes = differenceInMinutes(end, start);
  const hours = totalMinutes / 60;
  const minutes = totalMinutes % 60;
  return minutes < 10 ? `${hours} h 0${minutes} m` : `${hours} h ${minutes} m`;
}

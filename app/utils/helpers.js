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
  if (!end || isSameDay(start, end)) {
    return format(start, 'DD/MM/YYYY');
  }
  return `${format(start, 'DD')} - ${format(end, 'DD/MM/YYYY')}`;
}

export function getFormattedDuration(start, end) {
  const totalMinutes = differenceInMinutes(end, start);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return minutes < 10 ? `${hours} h 0${minutes} m` : `${hours} h ${minutes} m`;
}

export function getUserType(index) {
  const dictionary = {
    1: 'member',
    2: 'admin',
    3: 'superUser',
  };
  return dictionary[index];
}

export function getNavIconColor(currentPath, pathNames) {
  if (pathNames.indexOf(currentPath) !== -1) {
    return '#FFFFFF';
  }
  return 'rgba(255, 255, 255, 0.5)';
}

export function mapToRoomStatus(status) {
  const dictionary = {
    AVAILABLE: 'available',
    BOOKED: 'reserved',
    CHECKED_IN: 'occupied',
  };
  return dictionary[status];
}

export function formNotReady(formReducer, key) {
  return formReducer.size === 0 || !formReducer.get(key);
}

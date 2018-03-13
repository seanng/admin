export const normalizePhone = (value, previousValue) => {
  if (value === null || value === undefined) {
    return '';
  }
  const onlyNums = value.replace(/[^\d]/g, '');
  if (!previousValue || value.length > previousValue.length) {
    // typing forward
    if (onlyNums.length === 4) {
      return `${onlyNums} `;
    }
  }
  if (onlyNums.length <= 4) {
    return onlyNums;
  }
  return `${onlyNums.slice(0, 4)} ${onlyNums.slice(4, 8)}`;
};

export const normalizeName = value =>
  value.length === 1 ? value.toUpperCase() : value;

const emailRegex = new RegExp('^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$', 'i');

export const required = val =>
  val === undefined || val == null || val.length === 0
    ? 'validateRequiredField'
    : null;

export const email = val =>
  emailRegex.test(val) ? null : 'validateInvalidEmail';

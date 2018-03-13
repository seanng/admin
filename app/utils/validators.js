const emailRegex = new RegExp('^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$', 'i');

export const validateRequired = val =>
  val === undefined || val == null || val.length === 0
    ? 'validateRequiredField'
    : null;

export const validateEmail = val =>
  emailRegex.test(val) ? null : 'validateInvalidEmail';

export const validatePhoneLength = val =>
  val && val.length < 9 ? 'validatePhoneLength' : null;

export const validateMinLength = min => val =>
  val && val.length < min ? 'validateMinLength' : null;

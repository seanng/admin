/*
 * App Messages
 *
 * This contains all the text for the App Container.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  '/hotelprofile': {
    id: 'app.containers.App./hotelprofile',
    defaultMessage: 'Hotel',
  },
  '/teammanagement': {
    id: 'app.containers.App./teammanagement',
    defaultMessage: 'Team',
  },
  '/earnings': {
    id: 'app.containers.App./earnings',
    defaultMessage: 'Earnings',
  },
  '/settings': {
    id: 'app.containers.App./settings',
    defaultMessage: 'Settings',
  },
  validateInvalidEmail: {
    id: 'app.Validation.validateInvalidEmail',
    defaultMessage: 'Enter a valid email address',
  },
  validateMinLength: {
    id: 'app.Validation.validateMinLength',
    defaultMessage: 'This input is far too short',
  },
  validatePhoneLength: {
    id: 'app.Validation.validatePhoneLength',
    defaultMessage: 'Enter a valid phone number',
  },
  validateRequiredField: {
    id: 'app.Validation.validateRequiredField',
    defaultMessage: 'This field is required',
  },
});

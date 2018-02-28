/*
 * Settings Messages
 *
 * This contains all the text for the Settings component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  confirmDiscardBody: {
    id: 'app.containers.Settings.confirmDiscardBody',
    defaultMessage: 'Are you sure you want to discard your changes?',
  },
  confirmDiscardHeader: {
    id: 'app.containers.Settings.confirmDiscardHeader',
    defaultMessage: 'DISCARD CHANGES',
  },
  confirmDiscardAction: {
    id: 'app.containers.Settings.confirmDiscardAction',
    defaultMessage: 'YES, DISCARD CHANGES',
  },
  discard: {
    id: 'app.containers.Settings.discard',
    defaultMessage: 'DISCARD',
  },
  save: {
    id: 'app.containers.Settings.save',
    defaultMessage: 'SAVE',
  },
});

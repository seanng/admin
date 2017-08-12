/*
 * ChargesModal Messages
 *
 * This contains all the text for the ChargesModal component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  header: {
    id: 'app.components.ChargesModal.header',
    defaultMessage: 'Surcharges for {name} on {date}',
  },
  addCharge: {
    id: 'app.components.ChargesModal.addCharge',
    defaultMessage: 'Add Charge',
  },
  service: {
    id: 'app.components.ChargesModal.service',
    defaultMessage: 'Service',
  },
  hasItBeenUpdated: {
    id: 'app.components.ChargesModal.hasItBeenUpdated',
    defaultMessage: 'Updated?',
  },
  hasItBeenSettled: {
    id: 'app.components.ChargesModal.hasItBeenSettled',
    defaultMessage: 'Settled?',
  },
  price: {
    id: 'app.components.ChargesModal.price',
    defaultMessage: 'Price ({currency})',
  },
  yes: {
    id: 'app.components.ChargesModal.yes',
    defaultMessage: 'Yes',
  },
  no: {
    id: 'app.components.ChargesModal.no',
    defaultMessage: 'No',
  },
  total: {
    id: 'app.components.ChargesModal.total',
    defaultMessage: 'Total',
  },
  updateCharges: {
    id: 'app.components.ChargesModal.updateCharges',
    defaultMessage: 'Save Charges',
  },
  cancel: {
    id: 'app.components.ChargesModal.cancel',
    defaultMessage: 'Cancel',
  },
});

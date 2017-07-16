/*
 * SummaryPanel Messages
 *
 * This contains all the text for the SummaryPanel component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  header: {
    id: 'app.components.SummaryPanel.header',
    defaultMessage: 'Room Statuses',
  },
  occupied: {
    id: 'app.components.SummaryPanel.occupied',
    defaultMessage: 'Occupied',
  },
  notReady: {
    id: 'app.components.SummaryPanel.notReady',
    defaultMessage: 'Not Ready',
  },
  available: {
    id: 'app.components.SummaryPanel.available',
    defaultMessage: 'Available',
  },
  reserved: {
    id: 'app.components.SummaryPanel.reserved',
    defaultMessage: 'Reserved',
  },
});

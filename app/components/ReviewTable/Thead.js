import React from 'react';
import { FormattedMessage } from 'react-intl';
import TH from './TH';
import messages from './messages';

function Thead() {
  return (
    <thead>
      <tr>
        <TH>
          <FormattedMessage {...messages.date} />
        </TH>
        <TH>
          <FormattedMessage {...messages.guest} />
        </TH>
        <TH>
          <FormattedMessage {...messages.roomNumber} />
        </TH>
        <TH>
          <FormattedMessage {...messages.checkIn} />
        </TH>
        <TH>
          <FormattedMessage {...messages.checkOut} />
        </TH>
        <TH>
          <FormattedMessage {...messages.duration} />
        </TH>
        <TH>
          <FormattedMessage {...messages.roomCharge} />
        </TH>
        <TH>
          <FormattedMessage {...messages.surcharges} />
        </TH>
        <TH>
          <FormattedMessage {...messages.totalAmount} />
        </TH>
      </tr>
    </thead>
  );
}

export default Thead;

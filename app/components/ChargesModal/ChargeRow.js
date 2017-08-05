import React from 'react';
import { FormattedMessage } from 'react-intl';
import TD from './TD';
import messages from './messages';

function ChargeRow({ charge: { service, updated, status, charge } }) {
  const Yes = <FormattedMessage {...messages.yes} />;
  const No = <FormattedMessage {...messages.no} />;
  return (
    <tr>
      <TD>
        {service}
      </TD>
      <TD>
        {updated ? Yes : No}
      </TD>
      <TD>
        {status === 'Settled' ? Yes : No}
      </TD>
      <TD>
        {charge}
      </TD>
    </tr>
  );
}

export default ChargeRow;

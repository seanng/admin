import React from 'react';
import { FormattedMessage } from 'react-intl';
import TH from './TH';
import messages from './messages';

function Thead() {
  return (
    <thead>
      <tr>
        <TH>#</TH>
        <TH>
          <FormattedMessage {...messages.room} />
        </TH>
        <TH>
          <FormattedMessage {...messages.guest} />
        </TH>
        <TH>
          <FormattedMessage {...messages.status} />
        </TH>
        <TH>
          <FormattedMessage {...messages.action} />
        </TH>
      </tr>
    </thead>
  );
}

export default Thead;

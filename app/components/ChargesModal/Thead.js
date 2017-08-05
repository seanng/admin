import React from 'react';
import { FormattedMessage } from 'react-intl';
import TH from './TH';
import messages from './messages';

function Thead({ currency }) {
  return (
    <thead>
      <tr>
        <TH>
          <FormattedMessage {...messages.service} />
        </TH>
        <TH>
          <FormattedMessage {...messages.hasItBeenUpdated} />
        </TH>
        <TH>
          <FormattedMessage {...messages.hasItBeenSettled} />
        </TH>
        <TH>
          <FormattedMessage {...messages.price} values={{ currency }} />
        </TH>
      </tr>
    </thead>
  );
}

export default Thead;

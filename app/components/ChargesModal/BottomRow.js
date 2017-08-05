import React from 'react';
import { FormattedMessage } from 'react-intl';
import TD from './TD';
import messages from './messages';

function BottomRow({ charges }) {
  return (
    <tr>
      <TD>
        <b>
          <FormattedMessage {...messages.total} />
        </b>
      </TD>
      <TD />
      <TD />
      <TD>
        <b>
          {charges.reduce(
            (prev, current) => (prev * 1 + current.charge * 1).toFixed(2),
            0
          )}
        </b>
      </TD>
    </tr>
  );
}

export default BottomRow;

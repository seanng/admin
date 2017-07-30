import React from 'react';
import format from 'date-fns/format';
import { getFormattedDate, getFormattedDuration } from 'utils/helpers';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import Button from '../Button';
import TD from './TD';

function ReviewEntryRow({ stay, handleOpenSurcharges }) {
  const { id, customerName, roomNumber, roomCharge, totalCharge } = stay;
  const [checkInTime, checkOutTime] = [
    new Date(stay.checkInTime),
    new Date(stay.checkOutTime),
  ];
  return (
    <tr>
      <TD>
        {getFormattedDate(checkInTime, checkOutTime)}
      </TD>
      <TD>
        {customerName}
      </TD>
      <TD>
        {roomNumber}
      </TD>
      <TD>
        {format(checkInTime, 'h:mm a')}
      </TD>
      <TD>
        {format(checkOutTime, 'h:mm a')}
      </TD>
      <TD>
        {getFormattedDuration(checkInTime, checkOutTime)}
      </TD>
      <TD>
        $ {roomCharge}
      </TD>
      <TD>
        $ {totalCharge}
      </TD>
      <TD>
        <Button onClick={() => handleOpenSurcharges(id)}>
          <FormattedMessage {...messages.addCharges} />
        </Button>
      </TD>
    </tr>
  );
}

export default ReviewEntryRow;

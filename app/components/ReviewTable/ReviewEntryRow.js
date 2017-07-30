import React from 'react';
import format from 'date-fns/format';
import { getFormattedDate, getFormattedDuration } from 'utils/helpers';
import TD from './TD';

function ReviewEntryRow({ stay }) {
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
        {stay.customerName}
      </TD>
      <TD>
        {stay.roomNumber}
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
        $ {stay.roomCharge}
      </TD>
      <TD>
        $ {stay.totalCharge}
      </TD>
      <TD>handle surcharge button.</TD>
    </tr>
  );
}

export default ReviewEntryRow;

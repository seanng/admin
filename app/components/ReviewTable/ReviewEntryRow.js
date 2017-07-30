import React from 'react';
import TD from './TD';

function ReviewEntryRow({ stay }) {
  console.log('whats in the stay?', stay);
  return (
    <tr>
      <TD>
        {stay.bookingTime}
      </TD>
      <TD>
        {stay.customerName}
      </TD>
      <TD>
        {stay.roomNumber}
      </TD>
      <TD>
        {stay.checkInTime}
      </TD>
      <TD>
        {stay.checkOutTime}
      </TD>
      <TD>duration (todo)</TD>
      <TD>
        {stay.roomCharge}
      </TD>
      <TD>handle surcharge button.</TD>
      <TD>
        {stay.totalCharge}
      </TD>
    </tr>
  );
}

export default ReviewEntryRow;

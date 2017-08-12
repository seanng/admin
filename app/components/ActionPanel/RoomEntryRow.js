import React from 'react';
import { camelize } from 'utils/helpers';
import format from 'date-fns/format';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import ActionButton from './ActionButton';
import TD from './TD';

function RoomEntryRow({ room, index, handleActionClick }) {
  const {
    status,
    roomNumber,
    customerName,
    bookingTime,
    checkInTime,
    checkOutTime,
  } = room;
  const camelizedStatus = camelize(status);
  return (
    <tr>
      <TD>
        {index + 1}
      </TD>
      <TD>
        {roomNumber}
      </TD>
      <TD>
        <FormattedMessage {...messages[camelizedStatus]} />
      </TD>
      <TD>
        {customerName}
      </TD>
      <TD>
        {(bookingTime && format(new Date(bookingTime * 1), 'h:mm a')) || '---'}
      </TD>
      <TD>
        {(checkInTime && format(new Date(checkInTime * 1), 'h:mm a')) || '---'}
      </TD>
      <TD>
        {(checkOutTime && format(new Date(checkOutTime * 1), 'h:mm a')) ||
          '---'}
      </TD>
      <TD>
        <ActionButton
          status={status}
          roomNumber={roomNumber}
          handleClick={handleActionClick}
          index={index}
        />
      </TD>
    </tr>
  );
}

export default RoomEntryRow;

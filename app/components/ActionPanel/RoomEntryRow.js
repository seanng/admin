import React from 'react';
import camelize from 'utils/camelize';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import ActionButton from './ActionButton';
import TD from './TD';

function RoomEntryRow({ room, index, handleActionClick }) {
  const { status, roomNumber, customerName } = room;
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
        {customerName}
      </TD>
      <TD>
        <FormattedMessage {...messages[camelizedStatus]} />
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

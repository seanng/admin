import React from 'react';
import ActionButton from './ActionButton';
import TD from './TD';

function RoomEntryRow({ room, index, handleActionClick }) {
  const { roomNumber, status, customerName } = room;
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
        {status}
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

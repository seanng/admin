import React from 'react';
import format from 'date-fns/format';
import { getFormattedDate, getFormattedDuration } from 'utils/helpers';
import BodyRow from '../Table/BodyRow';
import BodyRowLayer from '../Table/BodyRowLayer';
import BodyCol from '../Table/BodyCol';
import Link from './Link';

function ReviewEntryRow({ stay, handleOpenSurcharges, mapColToWidth }) {
  const { id, customerName, roomNumber, roomCharge, totalCharge } = stay;
  const [checkInTime, checkOutTime] = [
    new Date(stay.checkInTime),
    new Date(stay.checkOutTime),
  ];

  return (
    <BodyRow key={id}>
      <BodyRowLayer>
        <BodyCol width={mapColToWidth.date}>
          {getFormattedDate(checkInTime, checkOutTime)}
        </BodyCol>
        <BodyCol width={mapColToWidth.guest}>
          {customerName}
        </BodyCol>
        <BodyCol width={mapColToWidth.roomNumber}>
          {roomNumber}
        </BodyCol>
        <BodyCol width={mapColToWidth.checkIn}>
          {format(checkInTime, 'h:mm a')}
        </BodyCol>
        <BodyCol width={mapColToWidth.checkOut}>
          {format(checkOutTime, 'h:mm a')}
        </BodyCol>
        <BodyCol width={mapColToWidth.duration}>
          {getFormattedDuration(checkInTime, checkOutTime)}
        </BodyCol>
        <BodyCol width={mapColToWidth.roomRate}>
          $ {roomCharge}
        </BodyCol>
        <BodyCol width={mapColToWidth.surcharges}>
          <Link onClick={() => handleOpenSurcharges(id)}>
            $ {(totalCharge * 1 - roomCharge * 1).toFixed(2)}
          </Link>
        </BodyCol>
        <BodyCol width={mapColToWidth.totalAmount}>
          $ {totalCharge}
        </BodyCol>
      </BodyRowLayer>
    </BodyRow>
  );
}

export default ReviewEntryRow;

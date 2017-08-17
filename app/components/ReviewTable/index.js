/**
*
* ReviewTable
*
*/

import React from 'react';
import { FormattedMessage } from 'react-intl';
import ReviewEntryRow from './ReviewEntryRow';
import messages from './messages';
import TableFrame from '../Table/Frame';
import HeaderRow from '../Table/HeaderRow';
import HeaderCol from '../Table/HeaderCol';

const mapColToWidth = {
  date: '10%',
  guest: '15%',
  roomNumber: '8%',
  checkIn: '11%',
  checkOut: '11%',
  duration: '13%',
  roomRate: '10%',
  surcharges: '12%',
  totalAmount: '10%',
};

function ReviewTable({ stays, handleOpenSurcharges }) {
  return (
    <TableFrame>
      <HeaderRow mb={1}>
        <HeaderCol width={mapColToWidth.date}>
          <FormattedMessage {...messages.date} />
        </HeaderCol>
        <HeaderCol width={mapColToWidth.guest}>
          <FormattedMessage {...messages.guest} />
        </HeaderCol>
        <HeaderCol width={mapColToWidth.roomNumber}>
          <FormattedMessage {...messages.roomNumber} />
        </HeaderCol>
        <HeaderCol width={mapColToWidth.checkIn}>
          <FormattedMessage {...messages.checkIn} />
        </HeaderCol>
        <HeaderCol width={mapColToWidth.checkOut}>
          <FormattedMessage {...messages.checkOut} />
        </HeaderCol>
        <HeaderCol width={mapColToWidth.duration}>
          <FormattedMessage {...messages.duration} />
        </HeaderCol>
        <HeaderCol width={mapColToWidth.roomRate}>
          <FormattedMessage {...messages.roomRate} />
        </HeaderCol>
        <HeaderCol width={mapColToWidth.surcharges}>
          <FormattedMessage {...messages.surcharges} />
        </HeaderCol>
        <HeaderCol width={mapColToWidth.totalAmount}>
          <FormattedMessage {...messages.totalAmount} />
        </HeaderCol>
      </HeaderRow>
      {stays.map(stay =>
        <ReviewEntryRow
          stay={stay}
          handleOpenSurcharges={handleOpenSurcharges}
          mapColToWidth={mapColToWidth}
        />
      )}
    </TableFrame>
  );
}

export default ReviewTable;

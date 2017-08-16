import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { camelize } from 'utils/helpers';
import format from 'date-fns/format';
import TableFrame from '../Table/Frame';
import HeaderRow from '../Table/HeaderRow';
import HeaderCol from '../Table/HeaderCol';
import BodyRow from '../Table/BodyRow';
import BodyCol from '../Table/BodyCol';
import BodyRowLayer from '../Table/BodyRowLayer';
import ButtonWrapper from './ButtonWrapper';
import messages from './messages';
import getIconButton from '../IconButton';

const Placeholder = styled.div`width: 5%;`;

const mapColToWidth = {
  '#': '7%',
  room: '10%',
  status: '15%',
  guest: '23%',
  bookingTime: '15%',
  checkInTime: '15%',
  checkOutTime: '15%',
};

function FrontDeskTable({ handleActionClick, rooms }) {
  return (
    <TableFrame>
      <HeaderRow mb={1}>
        <HeaderRow>
          <HeaderCol width={mapColToWidth['#']}>#</HeaderCol>
          <HeaderCol width={mapColToWidth.room}>
            <FormattedMessage {...messages.room} />
          </HeaderCol>
          <HeaderCol width={mapColToWidth.status}>
            <FormattedMessage {...messages.status} />
          </HeaderCol>
          <HeaderCol alignLeft width={mapColToWidth.guest}>
            <FormattedMessage {...messages.guest} />
          </HeaderCol>
          <HeaderCol width={mapColToWidth.bookingTime}>
            <FormattedMessage {...messages.bookingTime} />
          </HeaderCol>
          <HeaderCol width={mapColToWidth.checkInTime}>
            <FormattedMessage {...messages.checkInTime} />
          </HeaderCol>
          <HeaderCol width={mapColToWidth.checkOutTime}>
            <FormattedMessage {...messages.checkOutTime} />
          </HeaderCol>
        </HeaderRow>
        <Placeholder />
      </HeaderRow>
      {rooms.map(
        (
          {
            roomNumber,
            status,
            customerName,
            bookingTime,
            checkInTime,
            checkOutTime,
          },
          index
        ) =>
          <BodyRow key={index}>
            <BodyRowLayer>
              <BodyCol width={mapColToWidth['#']}>
                {index + 1}
              </BodyCol>
              <BodyCol width={mapColToWidth.room}>
                {roomNumber}
              </BodyCol>
              <BodyCol width={mapColToWidth.status}>
                <FormattedMessage {...messages[camelize(status)]} />
              </BodyCol>
              <BodyCol alignLeft width={mapColToWidth.guest}>
                {customerName}
              </BodyCol>
              <BodyCol width={mapColToWidth.bookingTime}>
                {(bookingTime && format(new Date(bookingTime * 1), 'h:mm a')) ||
                  '---'}
              </BodyCol>
              <BodyCol width={mapColToWidth.checkInTime}>
                {(checkInTime && format(new Date(checkInTime * 1), 'h:mm a')) ||
                  '---'}
              </BodyCol>
              <BodyCol width={mapColToWidth.checkOutTime}>
                {(checkOutTime &&
                  format(new Date(checkOutTime * 1), 'h:mm a')) ||
                  '---'}
              </BodyCol>
            </BodyRowLayer>
            <ButtonWrapper>
              {getIconButton(camelize(status), () =>
                handleActionClick(roomNumber, status, index)
              )}
            </ButtonWrapper>
          </BodyRow>
      )}
    </TableFrame>
  );
}

export default FrontDeskTable;

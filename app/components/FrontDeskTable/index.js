import React from 'react';
import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import { camelize } from 'utils/helpers';
import format from 'date-fns/format';
import Table from './Table';
import RowTop from './RowTop';
import Row from './Row';
import Col from './Col';
import ContentWrapper from './ContentWrapper';
import ContentWrapperTop from './ContentWrapperTop';
import ButtonWrapper from './ButtonWrapper';
import ColTop from './ColTop';
import messages from './messages';
import getIconButton from '../IconButton';

const Placeholder = styled.div`width: 3rem;`;

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
    <Table>
      <RowTop>
        <ContentWrapperTop>
          <ColTop width={mapColToWidth['#']}>#</ColTop>
          <ColTop width={mapColToWidth.room}>
            <FormattedMessage {...messages.room} />
          </ColTop>
          <ColTop width={mapColToWidth.status}>
            <FormattedMessage {...messages.status} />
          </ColTop>
          <ColTop alignLeft width={mapColToWidth.guest}>
            <FormattedMessage {...messages.guest} />
          </ColTop>
          <ColTop width={mapColToWidth.bookingTime}>
            <FormattedMessage {...messages.bookingTime} />
          </ColTop>
          <ColTop width={mapColToWidth.checkInTime}>
            <FormattedMessage {...messages.checkInTime} />
          </ColTop>
          <ColTop width={mapColToWidth.checkOutTime}>
            <FormattedMessage {...messages.checkOutTime} />
          </ColTop>
        </ContentWrapperTop>
        <Placeholder />
      </RowTop>
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
          <Row key={index}>
            <ContentWrapper>
              <Col width={mapColToWidth['#']}>
                {index + 1}
              </Col>
              <Col width={mapColToWidth.room}>
                {roomNumber}
              </Col>
              <Col width={mapColToWidth.status}>
                <FormattedMessage {...messages[camelize(status)]} />
              </Col>
              <Col alignLeft width={mapColToWidth.guest}>
                {customerName}
              </Col>
              <Col width={mapColToWidth.bookingTime}>
                {(bookingTime && format(new Date(bookingTime * 1), 'h:mm a')) ||
                  '---'}
              </Col>
              <Col width={mapColToWidth.checkInTime}>
                {(checkInTime && format(new Date(checkInTime * 1), 'h:mm a')) ||
                  '---'}
              </Col>
              <Col width={mapColToWidth.checkOutTime}>
                {(checkOutTime &&
                  format(new Date(checkOutTime * 1), 'h:mm a')) ||
                  '---'}
              </Col>
            </ContentWrapper>
            <ButtonWrapper>
              {getIconButton(camelize(status), () =>
                handleActionClick(roomNumber, status, index)
              )}
            </ButtonWrapper>
          </Row>
      )}
    </Table>
  );
}

export default FrontDeskTable;

import React from 'react';
import Modal from 'react-modal';
import { FormattedMessage } from 'react-intl';
import { getFormattedDate, hasNewCharge } from 'utils/helpers';
import colors from 'themes/colors';
import Button from '../Button';
import Input from '../Input';
import modalStyle from './modalStyle';
import Header from './Header';
import Details from './Details';
import GuestName from './GuestName';
import RoomNumber from './RoomNumber';
import DateOfStay from './DateOfStay';
import AddChargeRow from './AddChargeRow';
import Currency from './Currency';
import AddChargeButton from './AddChargeButton';

import TableContainer from '../Table/Container';
import HeaderRow from '../Table/HeaderRow';
import HeaderCol from '../Table/HeaderCol';
import BodyRow from '../Table/BodyRow';
import BodyRowLayer from '../Table/BodyRowLayer';
import BodyCol from '../Table/BodyCol';
import Footer from './Footer';
import messages from './messages';

const mapColToWidth = {
  service: '40%',
  hasItBeenUpdated: '20%',
  hasItBeenSettled: '20%',
  price: '20%',
};

function ChargesModal({
  isOpen,
  closeModal,
  stay,
  handleInputChange,
  charges,
  serviceInput,
  updateCharges,
  priceInput,
  addCharge,
}) {
  const date = getFormattedDate(stay.checkInTime, stay.checkOutTime);
  return (
    <Modal
      contentLabel="chargesModal"
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={modalStyle}
      shouldCloseOnOverlayClick={false}
    >
      <Header>
        <FormattedMessage {...messages.header} />
      </Header>
      <Details>
        <GuestName>
          {stay.customerName}
        </GuestName>
        <RoomNumber>
          {stay.roomNumber}
        </RoomNumber>
        <DateOfStay>
          {date}
        </DateOfStay>
      </Details>
      <AddChargeRow>
        <Input
          name="serviceInput"
          type="text"
          value={serviceInput}
          placeholder="Enter Service"
          onChange={handleInputChange}
          width="420px"
        />
        <Currency>
          {stay.currency}
        </Currency>
        <Input
          name="priceInput"
          type="text"
          value={priceInput}
          placeholder="Price"
          onChange={handleInputChange}
          width="120px"
        />
        <AddChargeButton onClick={addCharge}>
          <FormattedMessage {...messages.addCharge} />
        </AddChargeButton>
      </AddChargeRow>
      <TableContainer>
        <HeaderRow mb={1}>
          <HeaderCol width={mapColToWidth.service}>
            <FormattedMessage {...messages.service} />
          </HeaderCol>
          <HeaderCol width={mapColToWidth.hasItBeenUpdated}>
            <FormattedMessage {...messages.hasItBeenUpdated} />
          </HeaderCol>
          <HeaderCol width={mapColToWidth.hasItBeenSettled}>
            <FormattedMessage {...messages.hasItBeenSettled} />
          </HeaderCol>
          <HeaderCol width={mapColToWidth.price}>
            <FormattedMessage
              {...messages.price}
              values={{ currency: stay.currency }}
            />
          </HeaderCol>
        </HeaderRow>
        {charges.map(({ service, updated, status, charge }, i) =>
          <BodyRow key={i}>
            <BodyRowLayer>
              <BodyCol width={mapColToWidth.service}>
                {service}
              </BodyCol>
              <BodyCol width={mapColToWidth.hasItBeenUpdated}>
                {updated
                  ? <FormattedMessage {...messages.yes} />
                  : <FormattedMessage {...messages.no} />}
              </BodyCol>
              <BodyCol width={mapColToWidth.hasItBeenSettled}>
                {status === 'Settled'
                  ? <FormattedMessage {...messages.yes} />
                  : <FormattedMessage {...messages.no} />}
              </BodyCol>
              <BodyCol width={mapColToWidth.price}>
                {charge}
              </BodyCol>
            </BodyRowLayer>
          </BodyRow>
        )}
        <HeaderRow>
          <HeaderCol width={mapColToWidth.service}>
            <FormattedMessage {...messages.total} />
          </HeaderCol>
          <HeaderCol width={mapColToWidth.hasItBeenUpdated} />
          <HeaderCol width={mapColToWidth.hasItBeenSettled} />
          <HeaderCol width={mapColToWidth.price}>
            {charges.reduce(
              (prev, current) => (prev * 1 + current.charge * 1).toFixed(2),
              0
            )}
          </HeaderCol>
        </HeaderRow>
      </TableContainer>
      <Footer>
        <Button
          bgColor={colors.base2}
          textColor={colors.lightGray}
          mr={1}
          ph={2}
          onClick={closeModal}
        >
          <FormattedMessage {...messages.cancel} />
        </Button>
        <Button
          bgColor={colors.support}
          textColor={colors.lightGray}
          onClick={updateCharges}
          ph={2}
          disabled={hasNewCharge(charges)}
        >
          <FormattedMessage {...messages.updateCharges} />
        </Button>
      </Footer>
    </Modal>
  );
}

export default ChargesModal;

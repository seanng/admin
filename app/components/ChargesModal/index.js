import React from 'react';
import Modal from 'react-modal';
import { FormattedMessage } from 'react-intl';
import { getFormattedDate, hasNewCharge } from 'utils/helpers';
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
import TH from './TH';
import TD from './TD';
import LTD from './LTD';
import Footer from './Footer';
import FooterButton from './FooterButton';
import messages from './messages';

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
      <table style={{ width: '100%' }}>
        <thead>
          <tr>
            <TH first alignLeft>
              <FormattedMessage {...messages.service} />
            </TH>
            <TH>
              <FormattedMessage {...messages.updatedOn} />
            </TH>
            <TH>
              <FormattedMessage {...messages.settledOn} />
            </TH>
            <TH>
              <FormattedMessage {...messages.charge} />
            </TH>
          </tr>
        </thead>
        <tbody>
          {charges.map(({ service, updated, updatedAt, status, charge }, i) =>
            <tr key={i}>
              <TD first alignLeft>
                {service}
              </TD>
              <TD>
                {updated ? getFormattedDate(updatedAt) : '-'}
              </TD>
              <TD>
                {status === 'Settled'
                  ? <FormattedMessage {...messages.yes} />
                  : '-'}
              </TD>
              <TD>
                {stay.currency + charge}
              </TD>
            </tr>
          )}
          <tr>
            <LTD label>
              <FormattedMessage {...messages.total} />
            </LTD>
            <LTD />
            <LTD />
            <LTD>
              {stay.currency +
                charges.reduce(
                  (prev, current) => (prev * 1 + current.charge * 1).toFixed(2),
                  0
                )}
            </LTD>
          </tr>
        </tbody>
      </table>
      <Footer>
        <FooterButton onClick={closeModal}>
          <FormattedMessage {...messages.cancel} />
        </FooterButton>
        <FooterButton
          primary
          onClick={updateCharges}
          disabled={hasNewCharge(charges)}
        >
          <FormattedMessage {...messages.updateCharges} />
        </FooterButton>
      </Footer>
    </Modal>
  );
}

export default ChargesModal;

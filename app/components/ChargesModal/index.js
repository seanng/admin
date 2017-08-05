/**
*
* ChargesModal
*
*/

import React from 'react';
import Modal from 'react-modal';
import { FormattedMessage } from 'react-intl';
import { getFormattedDate } from 'utils/helpers';
import colors from 'themes/colors';
import Button from '../Button';
import Input from '../Input';
import H2 from '../fonts/H2';
import InputWrapper from './InputWrapper';
import modalStyle from './modalStyle';
import Header from './Header';
import UpperBody from './UpperBody';
import LowerBody from './LowerBody';
import Table from './Table';
import Thead from './Thead';
import ChargeRow from './ChargeRow';
import BottomRow from './BottomRow';
import Footer from './Footer';
import messages from './messages';

function ChargesModal({
  isOpen,
  onClose,
  stay,
  handleInputChange,
  charges,
  serviceInput,
  priceInput,
}) {
  const date = getFormattedDate(stay.checkInTime, stay.checkOutTime);
  return (
    <Modal
      contentLabel="chargesModal"
      isOpen={isOpen}
      onRequestClose={onClose}
      style={modalStyle}
      shouldCloseOnOverlayClick
    >
      <Header>
        <H2>
          <FormattedMessage
            {...messages.header}
            values={{
              name: stay.customerName,
              date,
            }}
          />
        </H2>
      </Header>
      <UpperBody>
        <InputWrapper flex={4}>
          <Input
            name="serviceInput"
            type="text"
            value={serviceInput}
            placeholder="Service"
            onChange={handleInputChange}
          />
        </InputWrapper>
        <InputWrapper flex={1}>
          <Input
            name="priceInput"
            type="text"
            value={priceInput}
            placeholder="Price (HKD)"
            onChange={handleInputChange}
          />
        </InputWrapper>
        <Button bgColor={colors.bsSuccess} textColor={colors.white}>
          <FormattedMessage {...messages.addCharge} />
        </Button>
      </UpperBody>
      <LowerBody>
        <Table>
          <Thead currency={stay.currency} />
          <tbody>
            {charges.map(charge =>
              <ChargeRow key={charge.id} charge={charge} />
            )}
            <BottomRow charges={charges} />
          </tbody>
        </Table>
      </LowerBody>
      <Footer />
    </Modal>
  );
}

export default ChargesModal;

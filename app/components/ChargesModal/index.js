import React from 'react';
import Modal from 'react-modal';
import { FormattedMessage } from 'react-intl';
import { getFormattedDate, hasNewCharge } from 'utils/helpers';
import colors from 'themes/colors';
import Button from '../Button';
import Input from '../Input';
import H2 from '../fonts/H2';
import InputWrapper from './InputWrapper';
import modalStyle from './modalStyle';
import Header from './Header';
import UpperBody from './UpperBody';
import LowerBody from './LowerBody';

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
  console.log('charges ? ', charges);
  return (
    <Modal
      contentLabel="chargesModal"
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={modalStyle}
      shouldCloseOnOverlayClick={false}
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
        <Button
          bgColor={colors.support}
          textColor={colors.lightGray}
          onClick={addCharge}
        >
          <FormattedMessage {...messages.addCharge} />
        </Button>
      </UpperBody>
      <LowerBody>
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
      </LowerBody>
      <Footer>
        <Button
          bgColor={colors.base}
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

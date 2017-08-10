import React from 'react';
import Modal from 'react-modal';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import colors from 'themes/colors';
import modalStyle from './modalStyle';
import Header from './Header';
import Body from './Body';
import Footer from './Footer';
import Label from './Label';
import InputWrapper from './InputWrapper';
import Input from '../Input';
import Button from '../Button';
import H3 from '../fonts/H3';
import messages from './messages';

function AddRoomModal({
  isOpen,
  closeModal,
  addRoomInput,
  handleInputChange,
  addRoom,
}) {
  return (
    <Modal
      contentLabel="addRoomModal"
      isOpen={isOpen}
      style={modalStyle}
      onRequestClose={closeModal}
      shouldCloseOnOverlayClick
    >
      <Header>
        <H3>
          <FormattedMessage {...messages.header} />
        </H3>
      </Header>
      <Body>
        <Label>
          <FormattedMessage {...messages.roomNumber} />
        </Label>
        <InputWrapper>
          <Input
            name="addRoomInput"
            type="text"
            value={addRoomInput}
            onChange={handleInputChange}
          />
        </InputWrapper>
      </Body>
      <Footer>
        <Button
          bgColor={colors.bsDanger}
          textColor={colors.white}
          mr={2}
          ph={2}
          onClick={closeModal}
        >
          <FormattedMessage {...messages.cancel} />
        </Button>
        <Button
          bgColor={colors.bsInfo}
          textColor={colors.white}
          onClick={addRoom}
          ph={2}
        >
          <FormattedMessage {...messages.addRoom} />
        </Button>
      </Footer>
    </Modal>
  );
}

export default AddRoomModal;

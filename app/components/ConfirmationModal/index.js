import React from 'react';
import Modal from 'react-modal';
// import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import colors from 'themes/colors';
import messages from './messages';
import modalStyle from './modalStyle';
import H3 from '../fonts/H3';
import Button from '../Button';
import QuestionWrapper from './QuestionWrapper';
import ButtonsContainer from './ButtonsContainer';

function ConfirmationModal({
  isOpen,
  closeModal,
  confirmationText,
  promptText,
  onConfirmClick,
}) {
  return (
    <Modal
      contentLabel="confirmationModal"
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={modalStyle}
      shouldCloseOnOverlayClick
    >
      <QuestionWrapper>
        <H3 center mb="3">
          {promptText}
        </H3>
      </QuestionWrapper>
      <ButtonsContainer>
        <Button
          onClick={closeModal}
          bgColor={colors.danger}
          flex="1"
          sharp
          pv="1"
        >
          <FormattedMessage {...messages.cancel} />
        </Button>
        <Button
          onClick={onConfirmClick}
          bgColor={colors.support}
          flex="1"
          sharp
          pv="1"
        >
          {confirmationText}
        </Button>
      </ButtonsContainer>
    </Modal>
  );
}

export default ConfirmationModal;

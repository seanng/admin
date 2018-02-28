import React from 'react';
import Modal from 'react-modal';
import { FormattedMessage } from 'react-intl';
import Header from './Header';
import Body from './Body';
import Button from './Button';
import messages from './messages';
import modalStyle from './modalStyle';

function ConfirmationModal({
  isOpen,
  closeModal,
  headerMessage,
  confirmationMessage,
  actionMessage,
  onConfirmClick,
}) {
  console.log('is open? ', isOpen);
  return (
    <Modal
      contentLabel="confirmationModal"
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={modalStyle}
      shouldCloseOnOverlayClick
    >
      <Header>
        {headerMessage}
      </Header>
      <Body>
        {confirmationMessage}
      </Body>
      <Button primary onClick={onConfirmClick}>
        {actionMessage}
      </Button>
      <Button onClick={closeModal}>
        <FormattedMessage {...messages.cancel} />
      </Button>
    </Modal>
  );
}

export default ConfirmationModal;

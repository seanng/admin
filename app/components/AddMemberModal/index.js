/**
*
* AddMemberModal
*
*/

import React from 'react';
import Modal from 'react-modal';
// import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import modalStyle from './modalStyle';
import messages from './messages';

function AddMemberModal({ isOpen, closeModal }) {
  return (
    <Modal
      contentLabel="addMemberModal"
      isOpen={isOpen}
      style={modalStyle}
      onRequestClose={closeModal}
      shouldCloseOnOverlayClick
    >
      <FormattedMessage {...messages.header} />
    </Modal>
  );
}

export default AddMemberModal;

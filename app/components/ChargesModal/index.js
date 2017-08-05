/**
*
* ChargesModal
*
*/

import React from 'react';
import Modal from 'react-modal';
// import styled from 'styled-components';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

function ChargesModal({ isOpen, onClose, charges }) {
  console.log('the charges: ', charges);
  return (
    <Modal
      contentLabel="chargesModal"
      isOpen={isOpen}
      onRequestClose={onClose}
      shouldCloseOnOverlayClick
    />
  );
}

export default ChargesModal;

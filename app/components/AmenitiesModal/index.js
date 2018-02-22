import React from 'react';
import Modal from 'react-modal';
import { FormattedMessage } from 'react-intl';
import modalStyle from './modalStyle';
import messages from './messages';
import Header from './Header';
import Footer from './Footer';
import FooterButton from './FooterButton';

function AmenitiesModal({ isOpen, closeModal, saveAmenities }) {
  return (
    <Modal
      contentLabel="amenitiesModal"
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={modalStyle}
      shouldCloseOnOverlayClick={false}
    >
      <Header>
        <FormattedMessage {...messages.header} />
      </Header>
      <Footer>
        <FooterButton onClick={closeModal}>
          <FormattedMessage {...messages.cancel} />
        </FooterButton>
        <FooterButton primary onClick={saveAmenities}>
          <FormattedMessage {...messages.saveAmenities} />
        </FooterButton>
      </Footer>
    </Modal>
  );
}

export default AmenitiesModal;

import React from 'react';
import Modal from 'react-modal';
import { FormattedMessage } from 'react-intl';
import amenities from 'data/amenities';
import CheckIcon from 'react-icons/lib/md/check';
import modalStyle from './modalStyle';
import messages from './messages';
import Header from './Header';
import Body from './Body';
import AmenityEntry from './AmenityEntry';
import Checkbox from './Checkbox';
import Footer from './Footer';
import FooterButton from './FooterButton';

function AmenitiesModal({
  isOpen,
  closeModal,
  saveAmenities,
  selectedAmenities,
  selectAmenity,
}) {
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
      <Body>
        {Object.keys(amenities).map(amenity =>
          <AmenityEntry key={amenity}>
            <FormattedMessage {...amenities[amenity].message} />
            <Checkbox onClick={() => selectAmenity(amenity)}>
              {selectedAmenities.includes(amenity) && <CheckIcon size={20} />}
            </Checkbox>
          </AmenityEntry>
        )}
      </Body>
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

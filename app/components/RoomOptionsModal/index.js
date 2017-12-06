import React from 'react';
import Modal from 'react-modal';
import { FormattedMessage } from 'react-intl';
import colors from 'themes/colors';
import RoomStatus from './RoomStatus';
import RoomNumber from './RoomNumber';
import GuestName from './GuestName';
import Button from './Button';
import modalStyle from './modalStyle';
import messages from './messages';

function RoomOptionsModal({
  closeModal,
  isOpen,
  roomStatus,
  roomNumber,
  guestName,
}) {
  return (
    <Modal
      contentLabel="roomOptionsModal"
      isOpen={isOpen}
      style={modalStyle}
      onRequestClose={closeModal}
      shouldCloseOnOverlayClick
    >
      <RoomStatus>
        {roomStatus && <FormattedMessage {...messages[roomStatus]} />}
      </RoomStatus>
      <RoomNumber>
        {roomNumber}
      </RoomNumber>
      <GuestName>
        {guestName}
      </GuestName>
      {roomStatus === 'occupied' &&
        <div>
          <Button bg={colors.secondary} onClick={closeModal}>
            <FormattedMessage {...messages.cancel} />
          </Button>
        </div>}
      {roomStatus === 'reserved' &&
        <div>
          <Button bg={colors.secondary} onClick={closeModal}>
            <FormattedMessage {...messages.cancel} />
          </Button>
        </div>}
      {roomStatus === 'notReady' &&
        <div>
          <Button bg={colors.secondary} onClick={closeModal}>
            <FormattedMessage {...messages.cancel} />
          </Button>
        </div>}
      {roomStatus === 'available' &&
        <div>
          <Button bg={colors.secondary} onClick={closeModal}>
            <FormattedMessage {...messages.cancel} />
          </Button>
        </div>}
    </Modal>
  );
}

export default RoomOptionsModal;

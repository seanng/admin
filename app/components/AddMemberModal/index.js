/**
*
* AddMemberModal
*
*/

import React from 'react';
import Modal from 'react-modal';
import colors from 'themes/colors';
import { FormattedMessage } from 'react-intl';
import CrosshairIcon from 'react-icons/lib/md/add';
import Input from 'components/Input';
import Header from './Header';
import Body from './Body';
import AddPhotoCard from './AddPhotoCard';
import AddMemberDetails from './AddMemberDetails';
import AddMemberRow from './AddMemberRow';
import Footer from './Footer';
import Button from './Button';
import modalStyle from './modalStyle';
import messages from './messages';

function AddMemberModal({
  closeModal,
  handleInputChange,
  modalConfig,
  handleAddMember,
  handleAddPhoto,
}) {
  return (
    <Modal
      contentLabel="addMemberModal"
      isOpen={modalConfig.get('shouldDisplay')}
      style={modalStyle}
      onRequestClose={closeModal}
      shouldCloseOnOverlayClick
    >
      <Header>
        <FormattedMessage {...messages.header} />
      </Header>
      <Body>
        <AddPhotoCard onClick={handleAddPhoto}>
          <CrosshairIcon size={20} color={colors.primary} />
        </AddPhotoCard>
        <AddMemberDetails>
          <AddMemberRow>
            <FormattedMessage {...messages.firstName} />
            <Input
              name="firstName"
              type="text"
              placeholder="eg. Jack"
              value={modalConfig.get('firstName')}
              onChange={handleInputChange}
              width="265px"
            />
          </AddMemberRow>
          <AddMemberRow>
            <FormattedMessage {...messages.lastName} />
            <Input
              name="lastName"
              type="text"
              placeholder="eg. Johnson"
              value={modalConfig.get('lastName')}
              onChange={handleInputChange}
              width="265px"
            />
          </AddMemberRow>
          <AddMemberRow>
            <FormattedMessage {...messages.emailAddress} />
            <Input
              name="email"
              type="text"
              placeholder="eg. me@hotelname.com"
              value={modalConfig.get('email')}
              onChange={handleInputChange}
              width="265px"
            />
          </AddMemberRow>
          <AddMemberRow>
            <FormattedMessage {...messages.contactNumber} />
            <Input
              name="phoneNumber"
              type="text"
              placeholder="+852 9429 1029"
              value={modalConfig.get('phoneNumber')}
              onChange={handleInputChange}
              width="265px"
            />
          </AddMemberRow>
        </AddMemberDetails>
      </Body>
      <Footer>
        <Button onClick={closeModal}>
          <FormattedMessage {...messages.cancel} />
        </Button>
        <Button primary onClick={handleAddMember}>
          <FormattedMessage {...messages.sendInvite} />
        </Button>
      </Footer>
    </Modal>
  );
}

export default AddMemberModal;

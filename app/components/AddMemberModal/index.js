/**
*
* AddMemberModal
*
*/

import React from 'react';
import Modal from 'react-modal';
// import styled from 'styled-components';
import colors from 'themes/colors';
import { FormattedMessage } from 'react-intl';
import H4 from '../fonts/H4';
import Button from '../Button';
import FormGroup from './FormGroup';
import ButtonRow from './ButtonRow';
import modalStyle from './modalStyle';
import messages from './messages';

function AddMemberModal({
  closeModal,
  handleInputChange,
  modalConfig,
  handleAddMember,
}) {
  return (
    <Modal
      contentLabel="addMemberModal"
      isOpen={modalConfig.get('shouldDisplay')}
      style={modalStyle}
      onRequestClose={closeModal}
      shouldCloseOnOverlayClick
    >
      <H4 center>
        <FormattedMessage {...messages.header} />
      </H4>
      <FormGroup
        label="First Name"
        inputType="text"
        inputValue={modalConfig.get('firstName')}
        onInputChange={handleInputChange}
      />
      <FormGroup
        label="Last Name"
        inputType="text"
        inputValue={modalConfig.get('lastName')}
        onInputChange={handleInputChange}
      />
      <FormGroup
        label="Email"
        inputType="text"
        inputValue={modalConfig.get('email')}
        onInputChange={handleInputChange}
      />
      <ButtonRow>
        <Button
          mr={1}
          bgColor={colors.support}
          textColor={colors.lightGray}
          onClick={handleAddMember}
        >
          Send Invite
        </Button>
        <Button
          bgColor={colors.base}
          textColor={colors.lightGray}
          onClick={closeModal}
        >
          Cancel
        </Button>
      </ButtonRow>
    </Modal>
  );
}

export default AddMemberModal;

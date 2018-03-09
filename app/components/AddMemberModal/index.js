/**
*
* AddMemberModal
*
*/

import React from 'react';
import Modal from 'react-modal';
import colors from 'themes/colors';
import { FormattedMessage } from 'react-intl';
import { reduxForm, Field } from 'redux-form/immutable';
import CrosshairIcon from 'react-icons/lib/md/add';
import TrashIcon from 'react-icons/lib/md/delete';
import ImageFile from 'components/ImageFile';
import { required } from 'utils/validators';
import Header from './Header';
import Body from './Body';
import AddPhotoCard from '../AddPhotoCard';
import AddMemberDetails from './AddMemberDetails';
import AddMemberRow from './AddMemberRow';
import Footer from './Footer';
import Button from './Button';
import OpacityLayer from './OpacityLayer';
import modalStyle from './modalStyle';
import messages from './messages';

function AddMemberModal({
  closeModal,
  isOpen,
  handleAddMember,
  handlePhotoChange,
  handlePhotoRemove,
  photoUrl,
  dispatch,
  isValid,
}) {
  return (
    <Modal
      contentLabel="addMemberModal"
      isOpen={isOpen}
      style={modalStyle}
      onRequestClose={closeModal}
      shouldCloseOnOverlayClick
    >
      <Header>
        <FormattedMessage {...messages.header} />
      </Header>
      <Body>
        {photoUrl
          ? <AddPhotoCard src={photoUrl}>
              <OpacityLayer>
                <TrashIcon
                  color={colors.danger}
                  size={20}
                  style={{ cursor: 'pointer' }}
                  onClick={() => handlePhotoRemove(dispatch)}
                />
              </OpacityLayer>
            </AddPhotoCard>
          : <AddPhotoCard src={photoUrl}>
              <CrosshairIcon size={20} color={colors.primary} />
              <ImageFile
                onChange={e => handlePhotoChange(e, dispatch)}
                type="file"
                accept="image/png,image/gif,image/jpeg"
              />
            </AddPhotoCard>}
        <AddMemberDetails>
          <Field
            component={AddMemberRow}
            labelMessage={<FormattedMessage {...messages.firstName} />}
            name="firstName"
            type="text"
            placeholder="eg. Jack"
            width="265px"
            validate={required}
          />
          <Field
            component={AddMemberRow}
            labelMessage={<FormattedMessage {...messages.lastName} />}
            name="lastName"
            type="text"
            placeholder="eg. Bauer"
            width="265px"
            validate={required}
          />
          <Field
            component={AddMemberRow}
            labelMessage={<FormattedMessage {...messages.emailAddress} />}
            name="email"
            type="text"
            placeholder="eg. me@hotelname.com"
            width="265px"
            validate={required}
          />
          <Field
            component={AddMemberRow}
            labelMessage={<FormattedMessage {...messages.contactNumber} />}
            name="phoneNumber"
            type="text"
            placeholder="(optional)"
            width="265px"
          />
        </AddMemberDetails>
      </Body>
      <Footer>
        <Button onClick={() => closeModal(dispatch)}>
          <FormattedMessage {...messages.cancel} />
        </Button>
        <Button primary onClick={handleAddMember} disabled={!isValid}>
          <FormattedMessage {...messages.sendInvite} />
        </Button>
      </Footer>
    </Modal>
  );
}

export default reduxForm({
  form: 'addMember',
})(AddMemberModal);

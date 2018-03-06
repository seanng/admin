/*
 *
 * Settings
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import TrashIcon from 'react-icons/lib/md/delete';
import CrosshairIcon from 'react-icons/lib/md/add';
import AddPhotoCard from 'components/AddPhotoCard';
import ImageFile from 'components/ImageFile';
import ConfirmationModal from 'components/ConfirmationModal';
import Input from 'components/Input';
import colors from 'themes/colors';
import {
  init,
  editUser,
  resetUserTemporary,
  displayConfirmUndo,
} from './actions';
import {
  selectUserTemporary,
  selectHasLoaded,
  selectIsDirty,
  selectShouldDisplayConfirmationModal,
} from './selectors';
import { selectUser as selectUserPermanent } from '../App/selectors';
import messages from './messages';
import Container from './Container';
import Head from './Head';
import Heading from './Heading';
import HeadButton from './HeadButton';
import Body from './Body';
import OpacityLayer from './OpacityLayer';
import Details from './Details';
import FormRow from './FormRow';
import FormLabel from './FormLabel';
import ContactSupportContainer from './ContactSupportContainer';
import ContactLabel from './ContactLabel';

// eslint-disable-next-line react/prefer-stateless-function
export class Settings extends React.PureComponent {
  componentDidMount() {
    this.props.init(this.props.userPermanent);
  }

  handlePhotoRemove = () => {
    this.props.editUser('photoUrl', null);
  };

  handlePhotoChange = e => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onloadend = () => this.props.editUser('photoUrl', reader.result);
    reader.readAsDataURL(file);
  };

  handleConfirmUndoClose = () => {
    this.props.displayConfirmUndo(false);
  };

  handleConfirmUndoClick = () => {
    this.props.resetUserTemporary(this.props.userPermanent);
  };

  handleInputChange = ({ target: { name: key, value } }) =>
    this.props.editUser(key, value);

  handleUndoClick = () => {
    this.props.displayConfirmUndo(true);
  };

  handleSaveClick = () => {};

  render() {
    if (!this.props.hasLoaded) {
      return <Container />;
    }
    const fullName = `${this.props.userPermanent.get(
      'firstName'
    )} ${this.props.userPermanent.get('lastName')}`;
    return (
      <Container>
        <Head>
          <Heading isDirty={this.props.isDirty}>
            {fullName}
          </Heading>
          {this.props.isDirty &&
            <HeadButton onClick={this.handleUndoClick}>
              <FormattedMessage {...messages.undo} />
            </HeadButton>}
          {this.props.isDirty &&
            <HeadButton
              primary
              disabled={!this.props.isDirty}
              onClick={this.props.handleSaveClick}
            >
              <FormattedMessage {...messages.save} />
            </HeadButton>}
        </Head>
        <Body>
          {this.props.userTemporary.get('photoUrl')
            ? <AddPhotoCard src={this.props.userTemporary.get('photoUrl')}>
                <OpacityLayer>
                  <TrashIcon
                    color={colors.danger}
                    size={20}
                    style={{ cursor: 'pointer' }}
                    onClick={this.handlePhotoRemove}
                  />
                </OpacityLayer>
              </AddPhotoCard>
            : <AddPhotoCard src={this.props.userTemporary.get('photoUrl')}>
                <CrosshairIcon size={20} color={colors.primary} />
                <ImageFile
                  onChange={this.handlePhotoChange}
                  type="file"
                  accept="image/png,image/gif,image/jpeg"
                />
              </AddPhotoCard>}
          <div>
            <Details>
              <FormRow>
                <FormLabel>
                  <FormattedMessage {...messages.firstName} />
                </FormLabel>
                <Input
                  name="firstName"
                  type="text"
                  placeholder="eg. John"
                  onChange={this.handleInputChange}
                  value={this.props.userTemporary.get('firstName')}
                  width="548px"
                />
              </FormRow>
              <FormRow>
                <FormLabel>
                  <FormattedMessage {...messages.lastName} />
                </FormLabel>
                <Input
                  name="lastName"
                  type="text"
                  placeholder="eg. Doe"
                  onChange={this.handleInputChange}
                  value={this.props.userTemporary.get('lastName')}
                  width="548px"
                />
              </FormRow>
              <FormRow>
                <FormLabel>
                  <FormattedMessage {...messages.email} />
                </FormLabel>
                <Input
                  name="email"
                  type="text"
                  placeholder="eg. john@doe.com"
                  onChange={this.handleInputChange}
                  value={this.props.userTemporary.get('email')}
                  width="548px"
                />
              </FormRow>
              <FormRow>
                <FormLabel>
                  <FormattedMessage {...messages.contactNumber} />
                </FormLabel>
                <Input
                  name="phoneNumber"
                  type="text"
                  placeholder="eg. 6464 6464"
                  onChange={this.handleInputChange}
                  value={this.props.userTemporary.get('phoneNumber')}
                  width="548px"
                />
              </FormRow>
              <FormRow>
                <FormLabel>
                  <FormattedMessage {...messages.oldPassword} />
                </FormLabel>
                <Input
                  name="oldPassword"
                  type="password"
                  placeholder="Enter to confirm changes"
                  onChange={this.handleInputChange}
                  value={this.props.userTemporary.get('oldPassword')}
                  width="548px"
                />
              </FormRow>
              <FormRow>
                <FormLabel>
                  <FormattedMessage {...messages.newPassword} />
                </FormLabel>
                <Input
                  name="newPassword"
                  type="password"
                  placeholder="Enter a new password"
                  onChange={this.handleInputChange}
                  value={this.props.userTemporary.get('newPassword')}
                  width="548px"
                />
              </FormRow>
            </Details>
            <ContactSupportContainer>
              <ContactLabel>
                <FormattedMessage {...messages.contactSupport} />
              </ContactLabel>
              <ContactLabel regular>
                +808 3456 2121 | support@havenapp.co
              </ContactLabel>
            </ContactSupportContainer>
          </div>
        </Body>
        <ConfirmationModal
          isOpen={this.props.shouldDisplayConfirmUndo}
          closeModal={this.handleConfirmUndoClose}
          headerMessage={<FormattedMessage {...messages.confirmUndoHeader} />}
          confirmationMessage={
            <FormattedMessage {...messages.confirmUndoBody} />
          }
          actionMessage={<FormattedMessage {...messages.confirmUndoAction} />}
          onConfirmClick={this.handleConfirmUndoClick}
        />
      </Container>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  userPermanent: selectUserPermanent(),
  userTemporary: selectUserTemporary(),
  hasLoaded: selectHasLoaded(),
  isDirty: selectIsDirty(),
  shouldDisplayConfirmUndo: selectShouldDisplayConfirmationModal(),
});

const mapDispatchToProps = {
  init,
  editUser,
  resetUserTemporary,
  displayConfirmUndo,
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);

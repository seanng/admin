/*
 *
 * Settings
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { reduxForm, Field, change, reset } from 'redux-form/immutable';
import TrashIcon from 'react-icons/lib/md/delete';
import CrosshairIcon from 'react-icons/lib/md/add';
import AddPhotoCard from 'components/AddPhotoCard';
import ImageFile from 'components/ImageFile';
import ConfirmationModal from 'components/ConfirmationModal';
import colors from 'themes/colors';
import { required, email } from 'utils/validators';
import { displayConfirmUndo } from './actions';
import {
  selectIsFormDirty,
  selectFormDomain,
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
import InputFieldRow from './InputFieldRow';
import ContactSupportContainer from './ContactSupportContainer';
import ContactLabel from './ContactLabel';

// eslint-disable-next-line react/prefer-stateless-function
export class Settings extends React.PureComponent {
  shouldDisableSaveButton = () =>
    !this.props.formState.getIn(['settings', 'values', 'photoUrl']);

  handlePhotoRemove = () =>
    this.props.dispatch(change('settings', 'photoUrl', null));

  handlePhotoChange = e => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onloadend = () =>
      this.props.dispatch(change('settings', 'photoUrl', reader.result));
    reader.readAsDataURL(file);
  };

  handleConfirmUndoClose = () => {
    this.props.displayConfirmUndo(false);
  };

  handleConfirmUndoClick = () => {
    this.props.dispatch(reset('settings'));
    this.props.displayConfirmUndo(false);
  };

  handleUndoClick = () => {
    this.props.displayConfirmUndo(true);
  };

  handleSaveClick = () => {};

  render() {
    if (this.props.formState.size === 0) {
      return <Container />;
    }
    const photoUrl = this.props.formState.getIn([
      'settings',
      'values',
      'photoUrl',
    ]);
    const fullName = `${this.props.initialValues.get(
      'firstName'
    )} ${this.props.initialValues.get('lastName')}`;
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
              disabled={this.shouldDisableSaveButton}
              onClick={this.props.handleSaveClick}
            >
              <FormattedMessage {...messages.save} />
            </HeadButton>}
        </Head>
        <Body>
          {photoUrl
            ? <AddPhotoCard src={photoUrl}>
                <OpacityLayer>
                  <TrashIcon
                    color={colors.danger}
                    size={20}
                    style={{ cursor: 'pointer' }}
                    onClick={this.handlePhotoRemove}
                  />
                </OpacityLayer>
              </AddPhotoCard>
            : <AddPhotoCard src={photoUrl}>
                <CrosshairIcon size={20} color={colors.primary} />
                <ImageFile
                  onChange={this.handlePhotoChange}
                  type="file"
                  accept="image/png,image/gif,image/jpeg"
                />
              </AddPhotoCard>}
          <div>
            <Details>
              <Field
                name="firstName"
                component={InputFieldRow}
                placeholder="eg. John"
                labelMessage={<FormattedMessage {...messages.firstName} />}
                width="548px"
                type="text"
                validate={required}
              />
              <Field
                name="lastName"
                component={InputFieldRow}
                placeholder="eg. Doe"
                labelMessage={<FormattedMessage {...messages.lastName} />}
                width="548px"
                type="text"
                validate={required}
              />
              <Field
                name="email"
                component={InputFieldRow}
                placeholder="eg. johndoe@email.com"
                labelMessage={<FormattedMessage {...messages.email} />}
                width="548px"
                type="text"
                validate={[required, email]}
              />
              <Field
                name="phoneNumber"
                component={InputFieldRow}
                placeholder="eg. 6464 6464"
                labelMessage={<FormattedMessage {...messages.contactNumber} />}
                width="548px"
                type="text"
              />
              <Field
                name="oldPassword"
                component={InputFieldRow}
                placeholder="Enter password to save changes"
                labelMessage={<FormattedMessage {...messages.password} />}
                width="548px"
                validate={required}
              />
              <Field
                name="newPassword"
                component={InputFieldRow}
                placeholder="Enter a new password"
                labelMessage={<FormattedMessage {...messages.newPassword} />}
                width="548px"
                type="password"
              />
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
  initialValues: selectUserPermanent(),
  isDirty: selectIsFormDirty(),
  shouldDisplayConfirmUndo: selectShouldDisplayConfirmationModal(),
  formState: selectFormDomain(),
});

const mapDispatchToProps = {
  displayConfirmUndo,
};

export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({
    form: 'settings',
  })(Settings)
);

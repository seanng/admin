/*
 *
 * TeamManagement
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';
import { selectHotelId, selectUserId } from 'containers/App/selectors';
import colors from 'themes/colors';
import ConfirmationModal from 'components/ConfirmationModal';
import AddMemberModal from 'components/AddMemberModal';
import { change, reset } from 'redux-form/immutable';
import {
  getEmployees,
  setMemberToPreview,
  setAdmin,
  setConfirmationOptions,
  toggleAddMemberModal,
  deleteEmployee,
  addEmployee,
} from './actions';
import {
  selectHasLoaded,
  selectMembersList,
  selectPreviewedMember,
  selectConfirmationModalOptions,
  selectIsFormValid,
  selectShouldDisplayAddMemberModal,
  selectFormDomain,
} from './selectors';
import messages from './messages';
import Container from './Container';
import Head from './Head';
import Heading from './Heading';
import HeadButton from './HeadButton';
import Body from './Body';
import PreviewContainer from './PreviewContainer';
import PreviewPhoto from './PreviewPhoto';
import PreviewInfoCard from './PreviewInfoCard';
import PreviewInfoRow from './PreviewInfoRow';
import PreviewButton from './PreviewButton';
import MemberListContainer from './MemberListContainer';
import TeamMemberCard from './TeamMemberCard';
import OpacityLayer from './OpacityLayer';
import Label from './Label';

// eslint-disable-next-line react/prefer-stateless-function
export class TeamManagement extends React.PureComponent {
  componentDidMount() {
    const { hotelId } = this.props;
    this.props.getEmployees(hotelId);
  }

  setFormPhoto = (value, dispatch) => {
    dispatch(change('addMember', 'photoUrl', value));
  };

  mapPromptIdToAction = {
    upgradeToAdmin: () => this.handleUpgradeToAdmin(),
    deleteAccount: () => this.handleDeleteAccount(),
  };

  parseAdminLevel = adminLevel => ['member', 'admin'][adminLevel - 1];

  handleConfirmationModalClose = () => {
    this.props.setConfirmationOptions({
      shouldDisplay: false,
      modalPromptId: '',
    });
  };

  handleModalPhotoChange = (e, dispatch) => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onloadend = () => this.setFormPhoto(reader.result, dispatch);
    reader.readAsDataURL(file);
  };

  handleModalPhotoRemove = dispatch => this.setFormPhoto(null, dispatch);

  handleAddMember = () => {
    const { addMemberModalOptions, hotelId, userId } = this.props;
    const {
      firstName,
      lastName,
      email,
      contactNumber,
      imagePreviewUrl,
    } = addMemberModalOptions.toJS();
    // check if all fields have been filled
    this.props.addEmployee(
      { firstName, lastName, email, contactNumber, imagePreviewUrl },
      hotelId,
      userId
    );
  };

  handleConfirmClick = () => {
    const modalPromptId = this.props.confirmationModalOptions.get(
      'modalPromptId'
    );
    this.mapPromptIdToAction[modalPromptId]();
  };

  handleAddMemberModalClose = dispatch => {
    dispatch(reset('addMember'));
    this.props.toggleAddMemberModal(false);
  };

  handleSendInviteClick = () => {
    this.props.toggleAddMemberModal(true);
  };

  promptUpgradeToAdmin = () => {
    this.props.setConfirmationOptions({
      shouldDisplay: true,
      modalPromptId: 'upgradeToAdmin',
    });
  };

  handleUpgradeToAdmin = () => {
    const { previewedMember } = this.props;
    this.props.setAdmin(previewedMember.get('id'));
  };

  promptDeleteAccount = () => {
    this.props.setConfirmationOptions({
      shouldDisplay: true,
      modalPromptId: 'deleteAccount',
    });
  };

  handleDeleteAccount = () => {
    const { previewedMember } = this.props;
    this.props.deleteEmployee(previewedMember.get('id'));
  };

  render() {
    const {
      hasLoaded,
      membersList,
      previewedMember,
      confirmationModalOptions,
    } = this.props;
    const members = membersList.toJS();
    const previewedMemberJS = previewedMember ? previewedMember.toJS() : null;
    if (!hasLoaded) {
      return <div>loading...</div>;
    }
    return (
      <Container>
        <Head>
          <Heading>
            <FormattedMessage {...messages.teamManagement} />
          </Heading>
          <HeadButton onClick={this.handleSendInviteClick}>
            <FormattedMessage {...messages.invite} />
          </HeadButton>
        </Head>
        <Body>
          <PreviewContainer>
            <PreviewPhoto src={previewedMemberJS.photoUrl}>
              <OpacityLayer />
            </PreviewPhoto>
            <PreviewInfoCard>
              <PreviewInfoRow>
                {`${previewedMemberJS.firstName} ${previewedMemberJS.lastName}`}
              </PreviewInfoRow>
              <PreviewInfoRow>
                <FormattedMessage
                  {...messages[
                    this.parseAdminLevel(previewedMemberJS.adminLevel)
                  ]}
                />
              </PreviewInfoRow>
              <PreviewInfoRow>{previewedMemberJS.email}</PreviewInfoRow>
              <PreviewInfoRow>{previewedMemberJS.phoneNumber}</PreviewInfoRow>
            </PreviewInfoCard>
            {previewedMemberJS.adminLevel === 1 && (
              <PreviewButton
                color={colors.primary}
                onClick={this.promptUpgradeToAdmin}
              >
                <FormattedMessage {...messages.upgradeToAdmin} />
              </PreviewButton>
            )}
            <PreviewButton
              color={colors.danger}
              onClick={this.promptDeleteAccount}
            >
              <FormattedMessage {...messages.removeMember} />
            </PreviewButton>
          </PreviewContainer>
          <MemberListContainer>
            {members.map((member, index) => (
              <TeamMemberCard
                key={member.id}
                src={member.photoUrl}
                onClick={() => this.props.setMemberToPreview(index)}
              >
                <OpacityLayer
                  isHighlighted={previewedMemberJS.id === member.id}
                >
                  {`${member.firstName} ${member.lastName}`}
                  <Label>
                    <FormattedMessage
                      {...messages[this.parseAdminLevel(member.adminLevel)]}
                    />
                  </Label>
                </OpacityLayer>
              </TeamMemberCard>
            ))}
          </MemberListContainer>
        </Body>
        <ConfirmationModal
          isOpen={confirmationModalOptions.get('shouldDisplay')}
          closeModal={this.handleConfirmationModalClose}
          headerMessage={
            confirmationModalOptions.get('modalPromptId') && (
              <FormattedMessage
                {...messages[
                  `${confirmationModalOptions.get('modalPromptId')}Header`
                ]}
              />
            )
          }
          confirmationMessage={
            confirmationModalOptions.get('modalPromptId') && (
              <FormattedMessage
                {...messages[
                  `${confirmationModalOptions.get('modalPromptId')}Prompt`
                ]}
                values={{
                  name: `${previewedMemberJS.firstName} ${
                    previewedMemberJS.lastName
                  }`,
                }}
              />
            )
          }
          actionMessage={
            confirmationModalOptions.get('modalPromptId') && (
              <FormattedMessage
                {...messages[
                  `${confirmationModalOptions.get('modalPromptId')}Action`
                ]}
              />
            )
          }
          onConfirmClick={this.handleConfirmClick}
        />
        <AddMemberModal
          closeModal={this.handleAddMemberModalClose}
          isOpen={this.props.shouldDisplayAddMemberModal}
          handleAddMember={this.handleAddMember}
          photoUrl={this.props.formState.getIn([
            'addMember',
            'values',
            'photoUrl',
          ])}
          handlePhotoChange={this.handleModalPhotoChange}
          handlePhotoRemove={this.handleModalPhotoRemove}
          isValid={this.props.isFormValid}
        />
      </Container>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  hotelId: selectHotelId(),
  userId: selectUserId(),
  hasLoaded: selectHasLoaded(),
  membersList: selectMembersList(),
  previewedMember: selectPreviewedMember(),
  confirmationModalOptions: selectConfirmationModalOptions(),
  shouldDisplayAddMemberModal: selectShouldDisplayAddMemberModal(),
  formState: selectFormDomain(),
  isFormValid: selectIsFormValid(),
});

const mapDispatchToProps = {
  addEmployee,
  deleteEmployee,
  setMemberToPreview,
  setAdmin,
  toggleAddMemberModal,
  setConfirmationOptions,
  getEmployees,
};

export default connect(mapStateToProps, mapDispatchToProps)(TeamManagement);

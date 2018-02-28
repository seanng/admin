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
import {
  getEmployees,
  setMemberToPreview,
  setAdmin,
  setConfirmationOptions,
  setAddMemberOptions,
  deleteEmployee,
  addEmployee,
} from './actions';
import {
  selectHasLoaded,
  selectMembersList,
  selectPreviewedMember,
  selectConfirmationModalOptions,
  selectAddMemberModalOptions,
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
    const { fetchEmployees, hotelId } = this.props;
    fetchEmployees(hotelId);
  }

  mapPromptIdToAction = {
    upgradeToAdmin: () => this.upgradeToAdmin(),
    deleteAccount: () => this.deleteAccount(),
  };

  parseAdminLevel = adminLevel => ['member', 'admin'][adminLevel - 1];

  handleConfirmationModalClose = () => {
    this.props.setConfirmationOptions({
      shouldDisplay: false,
      modalPromptId: '',
    });
  };

  handleModalInputChange = e => {
    const options = { ...this.props.addMemberModalOptions.toJS() };
    options[e.target.name] = e.target.value;
    this.props.setAddMemberOptions(options);
  };

  handleModalPhotoChange = e => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    const options = { ...this.props.addMemberModalOptions.toJS() };
    reader.onloadend = () => {
      options.imagePreviewUrl = reader.result;
      this.props.setAddMemberOptions(options);
    };
    reader.readAsDataURL(file);
  };

  handleModalPhotoRemove = () => {
    const options = { ...this.props.addMemberModalOptions.toJS() };
    delete options.imagePreviewUrl;
    this.props.setAddMemberOptions(options);
  };

  handleAddMember = () => {
    const { addMemberModalOptions, addMember, hotelId, userId } = this.props;
    const {
      firstName,
      lastName,
      email,
      contactNumber,
      imagePreviewUrl,
    } = addMemberModalOptions.toJS();
    // check if all fields have been filled
    addMember(
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

  handleAddMemberModalClose = () => {
    this.props.setAddMemberOptions({
      shouldDisplay: false,
    });
  };

  handleSendInviteClick = () => {
    this.props.setAddMemberOptions({
      shouldDisplay: true,
    });
  };

  promptUpgradeToAdmin = () => {
    this.props.setConfirmationOptions({
      shouldDisplay: true,
      modalPromptId: 'upgradeToAdmin',
    });
  };

  upgradeToAdmin = () => {
    const { upgradeToAdmin, previewedMember } = this.props;
    upgradeToAdmin(previewedMember.get('id'));
  };

  promptDeleteAccount = () => {
    this.props.setConfirmationOptions({
      shouldDisplay: true,
      modalPromptId: 'deleteAccount',
    });
  };

  deleteAccount = () => {
    const { deleteAccount, previewedMember } = this.props;
    deleteAccount(previewedMember.get('id'));
  };

  shouldDisableAddMemberButton = () => {
    // need to do validation here.
    if (!this.props.addMemberModalOptions.get('lastName')) {
      return true;
    }
    return false;
  };

  render() {
    const {
      hasLoaded,
      membersList,
      previewedMember,
      confirmationModalOptions,
      addMemberModalOptions,
      setPreviewMember,
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
              <PreviewInfoRow>
                {previewedMemberJS.email}
              </PreviewInfoRow>
              <PreviewInfoRow>
                {previewedMemberJS.phoneNumber}
              </PreviewInfoRow>
            </PreviewInfoCard>
            {previewedMemberJS.adminLevel === 1 &&
              <PreviewButton
                color={colors.primary}
                onClick={this.promptUpgradeToAdmin}
              >
                <FormattedMessage {...messages.upgradeToAdmin} />
              </PreviewButton>}
            <PreviewButton
              color={colors.danger}
              onClick={this.promptDeleteAccount}
            >
              <FormattedMessage {...messages.removeMember} />
            </PreviewButton>
          </PreviewContainer>
          <MemberListContainer>
            {members.map((member, index) =>
              <TeamMemberCard
                key={member.id}
                src={member.photoUrl}
                onClick={() => setPreviewMember(index)}
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
            )}
          </MemberListContainer>
        </Body>
        <ConfirmationModal
          isOpen={confirmationModalOptions.get('shouldDisplay')}
          closeModal={this.handleConfirmationModalClose}
          headerMessage={
            <FormattedMessage
              {...messages[
                `${confirmationModalOptions.get('modalPromptId')}Header`
              ]}
            />
          }
          confirmationMessage={
            <FormattedMessage
              {...messages[
                `${confirmationModalOptions.get('modalPromptId')}Prompt`
              ]}
              values={{
                name: `${previewedMemberJS.firstName} ${previewedMemberJS.lastName}`,
              }}
            />
          }
          actionMessage={
            <FormattedMessage
              {...messages[
                `${confirmationModalOptions.get('modalPromptId')}Action`
              ]}
            />
          }
          onConfirmClick={this.handleConfirmClick}
        />
        <AddMemberModal
          closeModal={this.handleAddMemberModalClose}
          handleInputChange={this.handleModalInputChange}
          modalConfig={addMemberModalOptions}
          handleAddMember={this.handleAddMember}
          shouldDisableButton={this.shouldDisableAddMemberButton}
          handlePhotoChange={this.handleModalPhotoChange}
          handlePhotoRemove={this.handleModalPhotoRemove}
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
  addMemberModalOptions: selectAddMemberModalOptions(),
});

const mapDispatchToProps = dispatch => ({
  fetchEmployees: hotelId => dispatch(getEmployees(hotelId)),
  setPreviewMember: memberIndex => dispatch(setMemberToPreview(memberIndex)),
  setConfirmationOptions: options => dispatch(setConfirmationOptions(options)),
  setAddMemberOptions: options => dispatch(setAddMemberOptions(options)),
  upgradeToAdmin: memberId => dispatch(setAdmin(memberId)),
  deleteAccount: memberId => dispatch(deleteEmployee(memberId)),
  addMember: (memberDetails, hotelId, userId) =>
    dispatch(addEmployee(memberDetails, hotelId, userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TeamManagement);

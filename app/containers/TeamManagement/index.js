/*
 *
 * TeamManagement
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';
import { getUserType } from 'utils/helpers';
import colors from 'themes/colors';
import { selectHotelId } from 'containers/App/selectors';
import Card from 'components/Card';
import Button from 'components/Button';
import H3 from 'components/fonts/H3';
import H5 from 'components/fonts/H5';
import TeamMemberCard from 'components/TeamMemberCard';
import ConfirmationModal from 'components/ConfirmationModal';
import AddMemberModal from 'components/AddMemberModal';
import ProxyContainer from './ProxyContainer';
import {
  getEmployees,
  setMemberToPreview,
  setAdmin,
  setConfirmationOptions,
  setAddMemberOptions,
  deleteEmployee,
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
import ItemsContainer from './ItemsContainer';
import PreviewContainer from './PreviewContainer';
import PreviewPhotoContainer from './PreviewPhotoContainer';
import PreviewPhoto from './PreviewPhoto';
import PreviewBody from './PreviewBody';

// eslint-disable-next-line react/prefer-stateless-function
export class TeamManagement extends React.PureComponent {
  componentDidMount() {
    const { fetchEmployees, hotelId } = this.props;
    fetchEmployees(hotelId);
  }

  onConfirmClick = () => {
    const modalPromptId = this.props.confirmationModalOptions.get(
      'modalPromptId'
    );
    this.mapPromptIdToAction[modalPromptId]();
  };

  mapPromptIdToAction = {
    upgradeToAdmin: () => this.upgradeToAdmin(),
    deleteAccount: () => this.deleteAccount(),
  };

  resetConfirmationModal = () => {
    this.props.setConfirmationOptions({
      shouldDisplay: false,
      modalPromptId: '',
    });
  };

  handleModalInputChange = e => {
    const inputKey = e.target.name;
    const value = e.target.value;
    console.log('inputKey, value:', inputKey, value);
    // this.props.setAddMemberOptions({
    // inputKey: value
    // })
  };

  resetAddMemberModal = () => {
    this.props.setAddMemberOptions({
      shouldDisplay: false,
    });
  };

  promptAddMemberModal = () => {
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

  render() {
    const {
      hasLoaded,
      membersList,
      previewedMember,
      setPreviewMember,
      confirmationModalOptions,
      addMemberModalOptions,
    } = this.props;
    const members = membersList.toJS();
    const previewedMemberJS = previewedMember ? previewedMember.toJS() : null;
    if (!hasLoaded) {
      return <div>loading...</div>;
    }
    return (
      <Container>
        <ItemsContainer>
          <TeamMemberCard promptAddMemberModal={this.promptAddMemberModal} />
          {members.map((member, index) =>
            <TeamMemberCard
              member={member}
              index={index}
              previewedMember={previewedMemberJS}
              setPreviewMember={setPreviewMember}
              key={member.id}
            />
          )}
        </ItemsContainer>
        <PreviewContainer>
          {previewedMemberJS &&
            <Card noPadding>
              <PreviewPhotoContainer>
                <PreviewPhoto src={previewedMemberJS.photoUrl} />
                <ProxyContainer />
              </PreviewPhotoContainer>
              <PreviewBody>
                <H3 center mb={1.5}>
                  {previewedMemberJS.firstName} {previewedMemberJS.lastName}
                </H3>
                <H5 center mb={1.5}>
                  <FormattedMessage
                    {...messages[getUserType(previewedMemberJS.adminLevel)]}
                  />
                </H5>
                <H5 center mb={1.5}>
                  {previewedMemberJS.email || '-'}
                </H5>
                <H5 center>
                  {previewedMemberJS.phoneNumber || '-'}
                </H5>
              </PreviewBody>
              {previewedMemberJS.adminLevel === 1 &&
                <div>
                  <Button
                    width="100%"
                    sharp
                    pv="1"
                    bgColor={colors.support}
                    onClick={this.promptUpgradeToAdmin}
                  >
                    <H5 center color={colors.white} mb={0}>
                      <FormattedMessage {...messages.upgradeToAdmin} />
                    </H5>
                  </Button>
                  <Button
                    width="100%"
                    pv="1"
                    sharp
                    bgColor={colors.danger}
                    onClick={this.promptDeleteAccount}
                  >
                    <H5 center color={colors.white} mb={0}>
                      <FormattedMessage {...messages.remove} />
                    </H5>
                  </Button>
                </div>}
            </Card>}
        </PreviewContainer>
        {previewedMemberJS &&
          <ConfirmationModal
            isOpen={confirmationModalOptions.get('shouldDisplay')}
            closeModal={this.resetConfirmationModal}
            promptText={
              <FormattedMessage
                {...messages[
                  `${confirmationModalOptions.get('modalPromptId')}Prompt`
                ]}
                values={{
                  name: `${previewedMemberJS.firstName} ${previewedMemberJS.lastName}`,
                }}
              />
            }
            confirmationText={
              <FormattedMessage
                {...messages[
                  `${confirmationModalOptions.get('modalPromptId')}Confirm`
                ]}
              />
            }
            onConfirmClick={this.onConfirmClick}
          />}
        <AddMemberModal
          isOpen={addMemberModalOptions.get('shouldDisplay')}
          closeModal={this.resetAddMemberModal}
          handleInputChange={this.handleModalInputChange}
        />
      </Container>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  hotelId: selectHotelId(),
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
});

export default connect(mapStateToProps, mapDispatchToProps)(TeamManagement);

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
import colors from 'themes/colors';
import {
  init,
  editUser,
  resetUserTemporary,
  displayConfirmDiscard,
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

// eslint-disable-next-line react/prefer-stateless-function
export class Settings extends React.PureComponent {
  componentDidMount() {
    this.props.init(this.props.userPermanent);
  }

  handlePhotoRemove = () => {
    const options = { ...this.props.userTemporary.toJS() };
    delete options.photoUrl;
    this.props.editUser(options);
  };

  handlePhotoChange = e => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    const options = { ...this.props.userTemporary.toJS() };
    reader.onloadend = () => {
      options.photoUrl = reader.result;
      this.props.editUser(options);
    };
    reader.readAsDataURL(file);
  };

  handleConfirmDiscardClose = () => {
    this.props.displayConfirmDiscard(false);
  };

  handleConfirmDiscardClick = () => {
    this.props.resetUserTemporary(this.props.userPermanent);
  };

  handleDiscardClick = () => {
    this.props.displayConfirmDiscard(true);
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
            <HeadButton onClick={this.handleDiscardClick}>
              <FormattedMessage {...messages.discard} />
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
          <Details />
        </Body>
        <ConfirmationModal
          isOpen={this.props.shouldDisplayConfirmDiscard}
          closeModal={this.handleConfirmDiscardClose}
          headerMessage={
            <FormattedMessage {...messages.confirmDiscardHeader} />
          }
          confirmationMessage={
            <FormattedMessage {...messages.confirmDiscardBody} />
          }
          actionMessage={
            <FormattedMessage {...messages.confirmDiscardAction} />
          }
          onConfirmClick={this.handleConfirmDiscardClick}
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
  shouldDisplayConfirmDiscard: selectShouldDisplayConfirmationModal(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    init: user => dispatch(init(user)),
    editUser: options => dispatch(editUser(options)),
    resetUserTemporary: userPerm => dispatch(resetUserTemporary(userPerm)),
    displayConfirmDiscard: bool => dispatch(displayConfirmDiscard(bool)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);

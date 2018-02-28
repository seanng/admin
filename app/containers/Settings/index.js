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
import colors from 'themes/colors';
import { init, editUser } from './actions';
import { selectUserTemporary, selectHasLoaded } from './selectors';
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

  handleCancelClick = () => {
    // confirmation modal.
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
          <Heading>
            {fullName}
          </Heading>
          <HeadButton onClick={this.handleCancelClick}>
            <FormattedMessage {...messages.cancel} />
          </HeadButton>
          <HeadButton primary onClick={this.props.handleSaveClick}>
            <FormattedMessage {...messages.save} />
          </HeadButton>
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
      </Container>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  userPermanent: selectUserPermanent(),
  userTemporary: selectUserTemporary(),
  hasLoaded: selectHasLoaded(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    init: user => dispatch(init(user)),
    editUser: options => dispatch(editUser(options)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);

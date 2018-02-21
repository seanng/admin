/*
 *
 * HotelProfile
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { selectHotelId } from 'containers/App/selectors';
import TrashIcon from 'react-icons/lib/md/delete';
import CrosshairIcon from 'react-icons/lib/md/add';
import colors from 'themes/colors';
import Input from 'components/Input';
import {
  getHotelInfo,
  setEditingMode,
  rearrangePhotos,
  cancelEditingMode,
  saveHotelProfile,
  deletePhoto,
  editHotelInfo,
  removeAmenity,
} from './actions';
import {
  selectHotelInfo,
  selectEditedHotelInfo,
  selectHasLoaded,
  selectIsEditingMode,
} from './selectors';
import Container from './Container';
import Head from './Head';
import HotelName from './HotelName';
import HeadButton from './HeadButton';
import Body from './Body';
import PhotosContainer from './PhotosContainer';
import Photo from './Photo';
import OpacityLayer from './OpacityLayer';
import DroppableZone from './DroppableZone';
import DraggablePhoto from './DraggablePhoto';
import AddPhoto from './AddPhoto';
import DetailsContainer from './DetailsContainer';
import DetailsCard from './DetailsCard';
import RowWrapper from './RowWrapper';
import Label from './Label';
import RatesWrapper from './RatesWrapper';
import Description from './Description';
import Amenities from './Amenities';
import Amenity from './Amenity';
import CrosshairWrapper from './CrosshairWrapper';
import messages from './messages';

// eslint-disable-next-line react/prefer-stateless-function
export class HotelProfile extends React.PureComponent {
  componentDidMount() {
    const { fetchHotelInfo, hotelId } = this.props;
    fetchHotelInfo(hotelId);
  }

  handleSaveHotelProfile = () => {
    // 1. handle validation checks
    // 2. if pass, save hotel profile
    this.props.saveHotelProfile(this.props.editedHotelInfo);
  };

  handleInputChange = event => {
    const key = event.target.name.slice(0, -5);
    const value = event.target.value;
    this.props.editHotelInfo(key, value);
  };

  handleDeletePhoto = index => {
    // 1. TODO: confirmation - are you sure you want to delete?
    // 2. if okay, delete photo.
    this.props.deletePhoto(index);
  };

  handleRemoveAmenity = index => {
    console.log('the index: ', index);
    this.props.removeAmenity(index);
  };

  openAmenitiesModal = () => {
    // TODO: open amenities modal.
    console.log('should open amenities modal.');
  };

  movePhoto = (dragIndex, hoverIndex) => {
    const dragPhoto = this.props.editedHotelInfo.getIn(['photos', dragIndex]);
    this.props.rearrangePhotos(dragIndex, hoverIndex, dragPhoto);
  };

  renderDetailsEditing() {
    return (
      <div>
        <DetailsCard>
          <RowWrapper>
            <Label>
              <FormattedMessage {...messages.hotelName} />
            </Label>
            <Input
              name="nameInput"
              type="text"
              placeholder="Your Hotel Name Here"
              onChange={this.handleInputChange}
              value={this.props.editedHotelInfo.get('name')}
              width="380px"
            />
          </RowWrapper>
          <RowWrapper next>
            <Label>
              <FormattedMessage {...messages.ratePerHour} />
            </Label>
            <Input
              name="rateInput"
              type="number"
              placeholder="Input Desired Hourly Rate"
              onChange={this.handleInputChange}
              value={this.props.editedHotelInfo.get('rate')}
              width="380px"
            />
          </RowWrapper>
          <RowWrapper next>
            <Label>
              <FormattedMessage {...messages.minimum} />
            </Label>
            <Input
              name="minChargeInput"
              type="number"
              placeholder="Input Desired Minimum Charge"
              onChange={this.handleInputChange}
              value={this.props.editedHotelInfo.get('minCharge')}
              width="380px"
            />
          </RowWrapper>
          <RowWrapper next>
            <Label>
              <FormattedMessage {...messages.roomType} />
            </Label>
            <Input
              name="roomTypeInput"
              type="text"
              placeholder="Input Room Type"
              onChange={this.handleInputChange}
              value={this.props.editedHotelInfo.get('roomType')}
              width="380px"
            />
          </RowWrapper>
          <RowWrapper next>
            <Label>
              <FormattedMessage {...messages.description} />
            </Label>
          </RowWrapper>
          {/* TODO: CREATE DESCRIPTION TEXT EDITOR */}
          <RowWrapper next>
            <Label>
              <FormattedMessage {...messages.amenities} />
            </Label>
            <CrosshairIcon
              size={20}
              color={colors.primary}
              style={{ cursor: 'pointer' }}
              onClick={() => this.openAmenitiesModal()}
            />
          </RowWrapper>
          <Amenities>
            {this.props.editedHotelInfo
              .get('amenities')
              .map((amenity, i) =>
                <Amenity
                  isEditing
                  key={i}
                  index={i}
                  amenity={amenity}
                  removeAmenity={this.handleRemoveAmenity}
                />
              )}
          </Amenities>
        </DetailsCard>
      </div>
    );
  }

  renderDetailsPreview() {
    return (
      <div>
        <DetailsCard>
          <RowWrapper>
            <Label>
              <FormattedMessage {...messages.rate} />
            </Label>
            <RatesWrapper>
              <div>
                {this.props.hotelInfo.get('currency')}{' '}
                {Number(this.props.hotelInfo.get('rate')).toFixed()} /{' '}
                <FormattedMessage {...messages.hour} />
              </div>
              <div>
                {this.props.hotelInfo.get('currency')}{' '}
                {Number(this.props.hotelInfo.get('rate') / 60).toFixed()} /{' '}
                <FormattedMessage {...messages.minute} />
              </div>
            </RatesWrapper>
          </RowWrapper>
          <RowWrapper next>
            <Label>
              <FormattedMessage {...messages.minimum} />
            </Label>
            <div>
              {this.props.hotelInfo.get('currency')}{' '}
              {this.props.hotelInfo.get('minCharge')}
            </div>
          </RowWrapper>
        </DetailsCard>
        <DetailsCard>
          <RowWrapper>
            <Label>
              <FormattedMessage {...messages.roomType} />
            </Label>
            <div>
              {this.props.hotelInfo.get('roomType')}
            </div>
          </RowWrapper>
        </DetailsCard>
        <DetailsCard>
          <Label>
            <FormattedMessage {...messages.description} />
          </Label>
          <Description>
            {this.props.hotelInfo.get('policies')}
          </Description>
        </DetailsCard>
        <DetailsCard>
          <Label>
            <FormattedMessage {...messages.amenities} />
          </Label>
          <Amenities>
            {this.props.hotelInfo
              .get('amenities')
              .map((amenity, i) =>
                <Amenity key={i} index={i} amenity={amenity} />
              )}
          </Amenities>
        </DetailsCard>
      </div>
    );
  }

  render() {
    if (!this.props.hasLoaded) {
      return <div>loading...</div>;
    }
    const hotelPhotos = this.props.isEditingMode
      ? this.props.editedHotelInfo.get('photos')
      : this.props.hotelInfo.get('photos');
    return (
      <Container>
        <Head>
          <HotelName isEditingMode={this.props.isEditingMode}>
            {this.props.hotelInfo.get('name')}
          </HotelName>
          {this.props.isEditingMode &&
            <HeadButton onClick={() => this.props.cancelEditingMode()}>
              <FormattedMessage {...messages.cancel} />
            </HeadButton>}
          {this.props.isEditingMode &&
            <HeadButton primary onClick={() => this.handleSaveHotelProfile()}>
              <FormattedMessage {...messages.save} />
            </HeadButton>}
          {!this.props.isEditingMode &&
            <HeadButton primary onClick={() => this.props.setEditingMode()}>
              <FormattedMessage {...messages.edit} />
            </HeadButton>}
        </Head>
        <Body>
          <PhotosContainer>
            <Photo src={hotelPhotos.first()} height="190px">
              <OpacityLayer>
                <FormattedMessage {...messages.primary} />
              </OpacityLayer>
            </Photo>
            <DroppableZone>
              {hotelPhotos.valueSeq().map((photo, i) =>
                <DraggablePhoto
                  key={i}
                  index={i}
                  isEditingMode={this.props.isEditingMode}
                  movePhoto={this.movePhoto}
                >
                  <Photo src={photo}>
                    <OpacityLayer isEditingMode={this.props.isEditingMode}>
                      {i + 1}
                      {this.props.isEditingMode &&
                        <TrashIcon
                          size={20}
                          color={colors.danger}
                          style={{ cursor: 'pointer' }}
                          onClick={() => this.handleDeletePhoto(i)}
                        />}
                    </OpacityLayer>
                  </Photo>
                </DraggablePhoto>
              )}
              {this.props.isEditingMode &&
                <AddPhoto>
                  {hotelPhotos.size + 1}
                  <CrosshairWrapper>
                    <CrosshairIcon size={20} color={colors.primary} />
                  </CrosshairWrapper>
                </AddPhoto>}
            </DroppableZone>
          </PhotosContainer>
          <DetailsContainer>
            {this.props.isEditingMode
              ? this.renderDetailsEditing()
              : this.renderDetailsPreview()}
          </DetailsContainer>
        </Body>
      </Container>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  hotelInfo: selectHotelInfo(),
  editedHotelInfo: selectEditedHotelInfo(),
  hotelId: selectHotelId(),
  hasLoaded: selectHasLoaded(),
  isEditingMode: selectIsEditingMode(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    setEditingMode: () => dispatch(setEditingMode()),
    cancelEditingMode: () => dispatch(cancelEditingMode()),
    saveHotelProfile: hotelInfo => dispatch(saveHotelProfile(hotelInfo)),
    fetchHotelInfo: id => dispatch(getHotelInfo(id)),
    rearrangePhotos: (dragIndex, hoverIndex, dragPhoto) =>
      dispatch(rearrangePhotos(dragIndex, hoverIndex, dragPhoto)),
    deletePhoto: index => dispatch(deletePhoto(index)),
    editHotelInfo: (key, value) => dispatch(editHotelInfo(key, value)),
    removeAmenity: index => dispatch(removeAmenity(index)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HotelProfile);

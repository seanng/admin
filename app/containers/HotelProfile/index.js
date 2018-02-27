/*
 *
 * HotelProfile
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import PlacesAutocomplete, {
  geocodeByPlaceId,
  getLatLng,
} from 'react-places-autocomplete';
import { selectHotelId } from 'containers/App/selectors';
import TrashIcon from 'react-icons/lib/md/delete';
import CrosshairIcon from 'react-icons/lib/md/add';
import colors from 'themes/colors';
import Input from 'components/Input';
import ImageFile from 'components/ImageFile';
import AmenitiesModal from 'components/AmenitiesModal';
import {
  getHotelInfo,
  setEditingMode,
  rearrangePhotos,
  cancelEditingMode,
  saveHotelProfile,
  addPhoto,
  deletePhoto,
  editHotelInfo,
  selectAmenity,
  removeAmenity,
  openAmenitiesModal,
  closeAmenitiesModal,
  saveSelectedAmenities,
  setLatLng,
} from './actions';
import {
  selectHotelInfo,
  selectEditedHotelInfo,
  selectHasLoaded,
  selectIsEditingMode,
  selectIsAmenitiesModalOpen,
  selectSelectedAmenities,
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
import Placeholder from './Placeholder';
import CrosshairWrapper from './CrosshairWrapper';
import LocationMap from './LocationMap';
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

  handleAutocompleteChange = input => {
    this.props.editHotelInfo('address', input);
  };

  handleAutocompleteSelect = (address, placeId) => {
    this.props.editHotelInfo('address', address);
    geocodeByPlaceId(placeId)
      .then(results => getLatLng(results[0]))
      .then(({ lat, lng }) => this.props.setLatLng(lat, lng));
  };

  handleAddPhoto = e => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onloadend = () => {
      this.props.addPhoto(reader.result);
    };
    reader.readAsDataURL(file);
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

  movePhoto = (dragIndex, hoverIndex) => {
    const dragPhoto = this.props.editedHotelInfo.getIn(['photos', dragIndex]);
    this.props.rearrangePhotos(dragIndex, hoverIndex, dragPhoto);
  };

  renderDetailsEditing() {
    const autocompleteInput = {
      type: 'text',
      value: this.props.editedHotelInfo.get('address'),
      onChange: this.handleAutocompleteChange,
      name: 'addressInput',
    };
    const autocompleteStyles = {
      root: {
        marginTop: '10px',
      },
      input: {
        fontSize: '14px',
        fontWeight: 300,
        color: colors.base2,
        width: '100%',
        height: '40px',
        border: `1px solid ${colors.base4}`,
        paddingLeft: '10px',
      },
      autocompleteContainer: {
        zIndex: 10,
      },
      autocompleteItem: {
        fontSize: '14px',
        fontWeight: 300,
        color: colors.base2,
      },
      autocompleteItemActive: {
        backgroundColor: colors.base3,
        color: colors.white,
      },
    };
    const autocompleteOptions = {
      componentRestrictions: { country: 'hk' },
    };
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
              onClick={this.props.openAmenitiesModal}
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
            {this.props.editedHotelInfo.get('amenities').size === 0 &&
              <Placeholder>
                <FormattedMessage {...messages.addAmenities} />
              </Placeholder>}
          </Amenities>
          <RowWrapper next>
            <Label>
              <FormattedMessage {...messages.location} />
            </Label>
          </RowWrapper>
          <PlacesAutocomplete
            inputProps={autocompleteInput}
            styles={autocompleteStyles}
            onSelect={this.handleAutocompleteSelect}
            options={autocompleteOptions}
            highlightFirstSuggestion
          />
          <LocationMap
            lat={this.props.editedHotelInfo.get('lat') * 1}
            lng={this.props.editedHotelInfo.get('lng') * 1}
          />
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
            {this.props.hotelInfo.get('amenities').size === 0 &&
              <Placeholder>
                <FormattedMessage {...messages.addAmenities} />
              </Placeholder>}
          </Amenities>
        </DetailsCard>
        <DetailsCard>
          <Label>
            <FormattedMessage {...messages.location} />
          </Label>
          <Description>
            {this.props.hotelInfo.get('address')}
          </Description>
          <LocationMap
            lat={this.props.hotelInfo.get('lat') * 1}
            lng={this.props.hotelInfo.get('lng') * 1}
          />
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
            <HeadButton onClick={this.props.cancelEditingMode}>
              <FormattedMessage {...messages.cancel} />
            </HeadButton>}
          {this.props.isEditingMode &&
            <HeadButton primary onClick={this.handleSaveHotelProfile}>
              <FormattedMessage {...messages.save} />
            </HeadButton>}
          {!this.props.isEditingMode &&
            <HeadButton primary onClick={this.props.setEditingMode}>
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
                  <ImageFile
                    onChange={this.handleAddPhoto}
                    type="file"
                    accept="image/png,image/gif,image/jpeg"
                  />
                </AddPhoto>}
            </DroppableZone>
          </PhotosContainer>
          <DetailsContainer>
            {this.props.isEditingMode
              ? this.renderDetailsEditing()
              : this.renderDetailsPreview()}
          </DetailsContainer>
        </Body>
        <AmenitiesModal
          isOpen={this.props.isAmenitiesModalOpen}
          closeModal={this.props.closeAmenitiesModal}
          saveAmenities={this.props.saveSelectedAmenities}
          selectedAmenities={this.props.selectedAmenities}
          selectAmenity={this.props.selectAmenity}
        />
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
  isAmenitiesModalOpen: selectIsAmenitiesModalOpen(),
  selectedAmenities: selectSelectedAmenities(),
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
    selectAmenity: amenity => dispatch(selectAmenity(amenity)),
    openAmenitiesModal: () => dispatch(openAmenitiesModal()),
    closeAmenitiesModal: () => dispatch(closeAmenitiesModal()),
    saveSelectedAmenities: () => dispatch(saveSelectedAmenities()),
    setLatLng: (lat, lng) => dispatch(setLatLng(lat, lng)),
    addPhoto: imagePreviewUrl => dispatch(addPhoto(imagePreviewUrl)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HotelProfile);

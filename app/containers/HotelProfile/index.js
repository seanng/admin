/*
 *
 * HotelProfile
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { reduxForm, Field, change, reset } from 'redux-form/immutable';
import b64ToBlob from 'b64-to-blob';
import PlacesAutocomplete, {
  geocodeByPlaceId,
  getLatLng,
} from 'react-places-autocomplete';
import { validateRequired } from 'utils/validators';
import { selectHotelId } from 'containers/App/selectors';
import TrashIcon from 'react-icons/lib/md/delete';
import CrosshairIcon from 'react-icons/lib/md/add';
import colors from 'themes/colors';
import ImageFile from 'components/ImageFile';
import AmenitiesModal from 'components/AmenitiesModal';
import {
  getHotelInfo,
  saveHotelProfile,
  toggleEditingMode,
  selectAmenity,
  toggleAmenitiesModal,
  addRemovedPhoto,
  restoreRemovedPhotos,
  eraseHotelPhotos,
} from './actions';
import {
  selectFormDomain,
  selectHotelInfo,
  selectHasLoaded,
  selectIsEditingMode,
  selectIsAmenitiesModalOpen,
  selectSelectedAmenities,
  selectIsFormDirty,
  selectIsFormValid,
  selectRemovedPhotos,
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
import InputFieldRow from './InputFieldRow';
import messages from './messages';

// eslint-disable-next-line react/prefer-stateless-function
export class HotelProfile extends React.PureComponent {
  componentDidMount() {
    const { getHotelInfo: fetch, hotelId } = this.props;
    fetch(hotelId);
  }

  getFormValueOf = key =>
    this.props.formState.getIn(['hotelProfile', 'values', key]);

  updateForm = (key, value) =>
    this.props.dispatch(change('hotelProfile', key, value));

  compileRequestData = formState => {
    let shouldHandleImageBlobs = false;
    const costPerHour = formState.getIn([
      'hotelProfile',
      'values',
      'costPerHour',
    ]);
    const data = formState
      .setIn(['hotelProfile', 'values', 'costPerMinute'], costPerHour / 60)
      .getIn(['hotelProfile', 'values'])
      .map(el => (el === '' ? null : el))
      .update('photos', photos =>
        photos.map(photo => {
          if (photo.search('data:image') === -1) {
            return photo;
          }
          const base64ImageContent = photo.replace(
            /^data:image\/(png|jpg|jpeg);base64,/,
            ''
          );
          shouldHandleImageBlobs = true;
          return b64ToBlob(base64ImageContent, 'image/png');
        })
      );
    return {
      data,
      shouldHandleImageBlobs,
    };
  };

  handleSaveHotelProfile = () => {
    // 1. handle validation checks
    // 2. if pass, save hotel profile;
    const {
      formState,
      saveHotelProfile: saveProfile,
      removedPhotos,
      eraseRemovedPhotos: erasePhotos,
    } = this.props;
    const { data, shouldHandleImageBlobs } = this.compileRequestData(formState);
    removedPhotos.size > 0 && erasePhotos(removedPhotos);
    saveProfile(data, shouldHandleImageBlobs);
  };

  handleAutocompleteChange = input => {
    this.updateForm('locationAddress', input);
  };

  handleAutocompleteSelect = (address, placeId) => {
    this.updateForm('locationAddress', address);
    geocodeByPlaceId(placeId)
      .then(results => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        this.updateForm('locationLatitude', lat);
        this.updateForm('locationLongitude', lng);
      });
  };

  handleAddPhoto = e => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    const photos = this.getFormValueOf('photos');
    reader.onloadend = () => {
      this.updateForm('photos', photos.push(reader.result));
    };
    reader.readAsDataURL(file);
  };

  handleDeletePhoto = index => {
    // 1. TODO: confirmation - are you sure you want to delete?
    // 2. if okay, delete photo.
    const photos = this.getFormValueOf('photos');
    const photoUrl = photos.get(index);
    this.updateForm('photos', photos.delete(index));
    this.props.addRemovedPhoto(photoUrl);
  };

  handleOpenAmenitiesModal = () =>
    this.props.toggleAmenitiesModal(true, this.getFormValueOf('amenities'));

  handleRemoveAmenity = index => {
    const amenities = this.getFormValueOf('amenities');
    this.updateForm('amenities', amenities.delete(index));
  };

  handleSaveSelectedAmenities = () => {
    this.updateForm('amenities', this.props.selectedAmenities);
    this.handleCloseAmenitiesModal();
  };

  handleCloseAmenitiesModal = () => this.props.toggleAmenitiesModal(false, []);

  handleSetEditingMode = () => this.props.toggleEditingMode(true);

  handleCancelEditingMode = () => {
    this.props.dispatch(reset('hotelProfile'));
    this.props.restoreRemovedPhotos();
    this.props.toggleEditingMode(false);
  };

  movePhoto = (dragIndex, hoverIndex) => {
    const photos = this.getFormValueOf('photos');
    const newPhotos = photos.update(oldPhotos => {
      const dragPhoto = oldPhotos.get(dragIndex);
      const updatedPhotos = oldPhotos
        .splice(dragIndex, 1)
        .splice(hoverIndex, 0, dragPhoto);
      return updatedPhotos;
    });
    this.updateForm('photos', newPhotos);
  };

  renderDetailsEditing() {
    const autocompleteInput = {
      type: 'text',
      value: this.getFormValueOf('locationAddress'),
      onChange: this.handleAutocompleteChange,
      name: 'locationAddress',
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
          <Field
            name="costPerHour"
            component={InputFieldRow}
            labelMessage={<FormattedMessage {...messages.ratePerHour} />}
            placeholder="Input Desired Hourly Charge"
            validate={[validateRequired]}
            type="number"
            width="380px"
          />
          <Field
            component={InputFieldRow}
            labelMessage={<FormattedMessage {...messages.minimum} />}
            name="costMinCharge"
            type="number"
            placeholder="Input Desired Minimum Charge"
            validate={validateRequired}
            width="380px"
            next
          />
          <Field
            component={InputFieldRow}
            labelMessage={<FormattedMessage {...messages.roomType} />}
            name="roomType"
            type="text"
            placeholder="Input Room Type"
            width="380px"
            validate={validateRequired}
            next
          />
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
              onClick={this.handleOpenAmenitiesModal}
            />
          </RowWrapper>
          <Amenities>
            {this.getFormValueOf('amenities').map((amenity, i) =>
              <Amenity
                isEditing
                key={i}
                index={i}
                amenity={amenity}
                removeAmenity={this.handleRemoveAmenity}
              />
            )}
            {this.getFormValueOf('amenities').length === 0 &&
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
            lat={this.getFormValueOf('locationLatitude') * 1}
            lng={this.getFormValueOf('locationLongitude') * 1}
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
                {this.props.initialValues.get('costCurrency')}{' '}
                {Number(
                  this.props.initialValues.get('costPerHour')
                ).toFixed()}{' '}
                / <FormattedMessage {...messages.hour} />
              </div>
              <div>
                {this.props.initialValues.get('costCurrency')}{' '}
                {Number(this.props.initialValues.get('costPerMinute')).toFixed(
                  2
                )}{' '}
                / <FormattedMessage {...messages.minute} />
              </div>
            </RatesWrapper>
          </RowWrapper>
          <RowWrapper next>
            <Label>
              <FormattedMessage {...messages.minimum} />
            </Label>
            <div>
              {this.props.initialValues.get('costCurrency')}{' '}
              {this.props.initialValues.get('costMinCharge')}
            </div>
          </RowWrapper>
        </DetailsCard>
        <DetailsCard>
          <RowWrapper>
            <Label>
              <FormattedMessage {...messages.roomType} />
            </Label>
            <div>
              {this.props.initialValues.get('roomType')}
            </div>
          </RowWrapper>
        </DetailsCard>
        <DetailsCard>
          <Label>
            <FormattedMessage {...messages.description} />
          </Label>
          <Description>
            {this.props.initialValues.get('description')}
          </Description>
        </DetailsCard>
        <DetailsCard>
          <Label>
            <FormattedMessage {...messages.amenities} />
          </Label>
          <Amenities>
            {this.props.initialValues
              .get('amenities')
              .map((amenity, i) =>
                <Amenity key={i} index={i} amenity={amenity} />
              )}
            {this.props.initialValues.get('amenities').size === 0 &&
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
            {this.props.initialValues.get('address')}
          </Description>
          <LocationMap
            lat={this.props.initialValues.get('locationLatitude') * 1}
            lng={this.props.initialValues.get('locationLongitude') * 1}
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
      ? this.getFormValueOf('photos')
      : this.props.initialValues.get('photos');

    return (
      <Container>
        <Head>
          <HotelName isEditingMode={this.props.isEditingMode}>
            {this.props.initialValues.get('name')}
          </HotelName>
          {this.props.isEditingMode &&
            <HeadButton onClick={this.handleCancelEditingMode}>
              <FormattedMessage {...messages.cancel} />
            </HeadButton>}
          {this.props.isEditingMode &&
            <HeadButton
              primary
              onClick={this.handleSaveHotelProfile}
              disabled={!this.props.isFormDirty || !this.props.isFormValid}
            >
              <FormattedMessage {...messages.save} />
            </HeadButton>}
          {!this.props.isEditingMode &&
            <HeadButton primary onClick={this.handleSetEditingMode}>
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
          closeModal={this.handleCloseAmenitiesModal}
          saveAmenities={this.handleSaveSelectedAmenities}
          selectedAmenities={this.props.selectedAmenities}
          selectAmenity={this.props.selectAmenity}
        />
      </Container>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  initialValues: selectHotelInfo(),
  hotelId: selectHotelId(),
  hasLoaded: selectHasLoaded(),
  isEditingMode: selectIsEditingMode(),
  isAmenitiesModalOpen: selectIsAmenitiesModalOpen(),
  formState: selectFormDomain(),
  selectedAmenities: selectSelectedAmenities(),
  isFormDirty: selectIsFormDirty(),
  isFormValid: selectIsFormValid(),
  removedPhotos: selectRemovedPhotos(),
});

const mapDispatchToProps = {
  toggleEditingMode,
  saveHotelProfile,
  getHotelInfo,
  selectAmenity,
  toggleAmenitiesModal,
  addRemovedPhoto,
  restoreRemovedPhotos,
  eraseHotelPhotos,
};

export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({
    form: 'hotelProfile',
    enableReinitialize: true,
  })(HotelProfile)
);

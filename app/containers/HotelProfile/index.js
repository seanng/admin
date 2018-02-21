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
import colors from 'themes/colors';
import {
  getHotelInfo,
  setEditingMode,
  rearrangePhotos,
  cancelEditingMode,
  saveHotelProfile,
  deletePhoto,
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

  handleDeletePhoto = index => {
    // 1. TODO: confirmation - are you sure you want to delete?
    // 2. if okay, delete photo.
    this.props.deletePhoto(index);
  };

  movePhoto = (dragIndex, hoverIndex) => {
    const dragPhoto = this.props.editedHotelInfo.getIn(['photos', dragIndex]);
    this.props.rearrangePhotos(dragIndex, hoverIndex, dragPhoto);
  };

  render() {
    if (!this.props.hasLoaded) {
      return <div>loading...</div>;
    }
    const hotelPhotos = this.props.isEditingMode
      ? this.props.editedHotelInfo.get('photos')
      : this.props.hotelInfo.get('photos');
    const hotelAmenities = this.props.isEditingMode
      ? this.props.editedHotelInfo.get('amenities')
      : this.props.hotelInfo.get('amenities');
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
              <AddPhoto>
                {hotelPhotos.size + 1}
              </AddPhoto>
            </DroppableZone>
          </PhotosContainer>
          <DetailsContainer>
            {!this.props.isEditingMode &&
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
                        {Number(
                          this.props.hotelInfo.get('rate') / 60
                        ).toFixed()}{' '}
                        / <FormattedMessage {...messages.minute} />
                      </div>
                    </RatesWrapper>
                  </RowWrapper>
                  <RowWrapper next>
                    <Label>
                      <FormattedMessage {...messages.minimum} />
                    </Label>
                    <div>
                      {this.props.hotelInfo.get('currency')} 500
                    </div>
                  </RowWrapper>
                </DetailsCard>
                <DetailsCard>
                  <RowWrapper>
                    <Label>
                      <FormattedMessage {...messages.roomType} />
                    </Label>
                    <div>Deluxe Room</div>
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
                    {hotelAmenities.map((amenity, i) =>
                      <Amenity key={i} index={i} amenity={amenity} />
                    )}
                  </Amenities>
                </DetailsCard>
              </div>}
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
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HotelProfile);

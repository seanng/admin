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
import { getHotelInfo, setEditingMode, rearrangePhotos } from './actions';
import {
  selectHotelInfo,
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
import messages from './messages';

// eslint-disable-next-line react/prefer-stateless-function
export class HotelProfile extends React.PureComponent {
  componentDidMount() {
    const { fetchHotelInfo, hotelId } = this.props;
    fetchHotelInfo(hotelId);
  }

  movePhoto = (dragIndex, hoverIndex) => {
    const dragPhoto = this.props.hotel.getIn(['photos', dragIndex]);
    this.props.rearrangePhotos(dragIndex, hoverIndex, dragPhoto);
  };

  handleCancelClick() {
    this.props.setEditingMode(false);
  }

  render() {
    const { hotel, hasLoaded, isEditingMode } = this.props;
    if (!hasLoaded) {
      return <div>loading...</div>;
    }
    const hotelPhotos = hotel.get('photos');
    return (
      <Container>
        <Head>
          <HotelName isEditingMode={isEditingMode}>
            {hotel.get('name')}
          </HotelName>
          {isEditingMode &&
            <HeadButton onClick={() => this.handleCancelClick()}>
              <FormattedMessage {...messages.cancel} />
            </HeadButton>}
          {isEditingMode &&
            <HeadButton primary>
              <FormattedMessage {...messages.save} />
            </HeadButton>}
          {!isEditingMode &&
            <HeadButton primary onClick={() => this.props.setEditingMode(true)}>
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
                  isEditingMode={isEditingMode}
                  movePhoto={this.movePhoto}
                >
                  <Photo src={photo}>
                    <OpacityLayer>
                      {i + 1}
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
            {!isEditingMode &&
              <div>
                <DetailsCard>
                  <RowWrapper>
                    <Label>
                      <FormattedMessage {...messages.rate} />
                    </Label>
                    <RatesWrapper>
                      <div>
                        {hotel.get('currency')}{' '}
                        {Number(hotel.get('rate')).toFixed()} /{' '}
                        <FormattedMessage {...messages.hour} />
                      </div>
                      <div>
                        {hotel.get('currency')}{' '}
                        {Number(hotel.get('rate') / 60).toFixed()} /{' '}
                        <FormattedMessage {...messages.minute} />
                      </div>
                    </RatesWrapper>
                  </RowWrapper>
                  <RowWrapper next>
                    <Label>
                      <FormattedMessage {...messages.minimum} />
                    </Label>
                    <div>
                      {hotel.get('currency')} 500
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
                    {hotel.get('policies')}
                  </Description>
                </DetailsCard>
              </div>}
          </DetailsContainer>
        </Body>
      </Container>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  hotel: selectHotelInfo(),
  hotelId: selectHotelId(),
  hasLoaded: selectHasLoaded(),
  isEditingMode: selectIsEditingMode(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    setEditingMode: bool => dispatch(setEditingMode(bool)),
    fetchHotelInfo: id => dispatch(getHotelInfo(id)),
    rearrangePhotos: (dragIndex, hoverIndex, dragPhoto) =>
      dispatch(rearrangePhotos(dragIndex, hoverIndex, dragPhoto)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HotelProfile);

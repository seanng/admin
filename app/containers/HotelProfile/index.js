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
import HotelPhotos from 'components/HotelPhotos';
import HotelDescription from 'components/HotelDescription';
import { getHotelInfo, setEditingMode } from './actions';
import {
  selectHotelInfo,
  selectHasLoaded,
  selectIsEditingMode,
} from './selectors';
import Container from './Container';
import Head from './Head';
import HotelName from './HotelName';
import HeadButton from './HeadButton';
import messages from './messages';

// eslint-disable-next-line react/prefer-stateless-function
export class HotelProfile extends React.PureComponent {
  componentDidMount() {
    const { fetchHotelInfo, hotelId } = this.props;
    fetchHotelInfo(hotelId);
  }

  handleCancelClick() {
    this.props.setEditingMode(false);
  }

  render() {
    const { hotel, hasLoaded, isEditingMode } = this.props;
    if (!hasLoaded) {
      return <div>loading...</div>;
    }
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
        <HotelPhotos
          hotelName={hotel.get('name')}
          photos={hotel.get('photos')}
        />
        <HotelDescription />
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
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HotelProfile);

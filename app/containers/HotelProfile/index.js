/*
 *
 * HotelProfile
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectHotelId } from 'containers/App/selectors';
import HotelPhotos from 'components/HotelPhotos';
import HotelDescription from 'components/HotelDescription';
import { getHotelInfo } from './actions';
import { selectHotelInfo, selectHasLoaded } from './selectors';
import Container from './Container';
import SideWrapper from './SideWrapper';

// eslint-disable-next-line react/prefer-stateless-function
export class HotelProfile extends React.PureComponent {
  componentDidMount() {
    const { fetchHotelInfo, hotelId } = this.props;
    fetchHotelInfo(hotelId);
  }

  render() {
    const { hotel, hasLoaded } = this.props;
    if (!hasLoaded) {
      return <div>loading...</div>;
    }
    return (
      <Container>
        <SideWrapper flex={5}>
          <HotelPhotos
            hotelName={hotel.get('name')}
            photos={hotel.get('photos')}
          />
          <HotelDescription />
        </SideWrapper>
        <SideWrapper flex={3} right />
      </Container>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  hotel: selectHotelInfo(),
  hotelId: selectHotelId(),
  hasLoaded: selectHasLoaded(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    fetchHotelInfo: id => dispatch(getHotelInfo(id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HotelProfile);

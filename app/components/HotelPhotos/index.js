/**
*
* HotelPhotos
*
*/

import React from 'react';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import Card from '../Card';
import H5 from '../fonts/H5';
import messages from './messages';

// eslint-disable-next-line react/prefer-stateless-function
class HotelPhotos extends React.PureComponent {
  render() {
    // const photos = this.props.photos.toJS();
    return (
      <Card>
        <H5>
          {this.props.hotelName}
        </H5>
        <FormattedMessage {...messages.header} />
      </Card>
    );
  }
}

export default HotelPhotos;

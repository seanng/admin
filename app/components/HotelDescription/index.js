/**
*
* HotelDescription
*
*/

import React from 'react';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function HotelDescription() {
  return (
    <div>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

export default HotelDescription;

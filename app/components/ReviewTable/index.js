/**
*
* ReviewTable
*
*/

import React from 'react';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import Card from '../Card';
import messages from './messages';

function ReviewTable() {
  return (
    <Card>
      <FormattedMessage {...messages.header} />
    </Card>
  );
}

export default ReviewTable;

/**
*
* ActionPanel
*
*/

import React from 'react';
// import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import Card from 'components/Card';
import H5 from 'components/fonts/H5';
import messages from './messages';

function ActionPanel() {
  return (
    <Card>
      <H5>
        <FormattedMessage {...messages.header} />
      </H5>
    </Card>
  );
}

export default ActionPanel;

/**
*
* SummaryPanel
*
*/

import React from 'react';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import Card from 'components/Card';
import H3 from 'components/fonts/H3';
import messages from './messages';

function SummaryPanel() {
  return (
    <Card>
      <H3>
        <FormattedMessage {...messages.header} />
      </H3>
    </Card>
  );
}

export default SummaryPanel;

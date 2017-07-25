/**
*
* SummaryPanel
*
*/

import React from 'react';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import colors from 'themes/colors';
import Card from 'components/Card';
import H5 from 'components/fonts/H5';
import PieChart from './PieChart';
import Body from './Body';
import Legend from './Legend';
import messages from './messages';

function SummaryPanel({ rooms }) {
  const filteredRooms = {
    inbound: rooms.filter(stay => stay.status === 'Inbound').length,
    checkedIn: rooms.filter(stay => stay.status === 'Checked In').length,
    checkedOut: rooms.filter(stay => stay.status === 'Checked Out').length,
    available: rooms.filter(stay => stay.status === 'Available').length,
  };
  const roomsData = [
    {
      x: 1,
      y: filteredRooms.inbound,
      label: filteredRooms.inbound,
      fill: colors.bsWarning,
    },
    {
      x: 2,
      y: filteredRooms.checkedIn,
      label: filteredRooms.checkedIn,
      fill: colors.bsDanger,
    },
    {
      x: 3,
      y: filteredRooms.checkedOut,
      label: filteredRooms.checkedOut,
      fill: colors.bsPrimary,
    },
    {
      x: 3,
      y: filteredRooms.available,
      label: filteredRooms.available,
      fill: colors.bsSuccess,
    },
  ];

  return (
    <Card>
      <H5>
        <FormattedMessage {...messages.header} />
      </H5>
      <Body>
        <PieChart data={roomsData} />
        <Legend />
      </Body>
    </Card>
  );
}

export default SummaryPanel;

/**
*
* ActionPanel
*
*/

import React from 'react';
import { FormattedMessage } from 'react-intl';
import Card from '../Card';
import H5 from '../fonts/H5';
import Header from './Header';
import Table from './Table';
import FilterDropdown from './FilterDropdown';
import Thead from './Thead';
import RoomEntryRow from './RoomEntryRow';
import messages from './messages';

function ActionPanel({
  rooms,
  handleActionClick,
  handleFilterChange,
  activeFilter,
}) {
  return (
    <Card>
      <Header>
        <H5>
          <FormattedMessage {...messages.header} />
        </H5>
        <FilterDropdown
          onChange={handleFilterChange}
          activeFilter={activeFilter}
        />
      </Header>
      <Table>
        <Thead />
        <tbody>
          {rooms.map((room, index) =>
            <RoomEntryRow
              key={room.roomNumber}
              room={room}
              index={index}
              handleActionClick={handleActionClick}
            />
          )}
        </tbody>
      </Table>
    </Card>
  );
}

export default ActionPanel;

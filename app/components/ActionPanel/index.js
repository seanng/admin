/**
*
* ActionPanel
*
*/

import React from 'react';
import { FormattedMessage } from 'react-intl';
import colors from 'themes/colors';
import Card from '../Card';
import Button from '../Button';
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
  filterOptions,
  openAddRoomModal,
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
          options={filterOptions}
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
      <Button onClick={openAddRoomModal} bgColor={colors.bsSuccess}>
        <FormattedMessage {...messages.addRoom} />
      </Button>
    </Card>
  );
}

export default ActionPanel;

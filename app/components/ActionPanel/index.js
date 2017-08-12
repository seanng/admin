/**
*
* ActionPanel
*
*/

import React from 'react';
import Card from '../Card';
import Header from './Header';
import TableWrapper from './TableWrapper';
import Table from './Table';
import FilterDropdown from './FilterDropdown';
import Thead from './Thead';
import getIconButton from '../IconButton';
import RoomEntryRow from './RoomEntryRow';

function ActionPanel({
  rooms,
  handleActionClick,
  handleFilterChange,
  activeFilter,
  filterOptions,
  openAddRoomModal,
}) {
  return (
    <Card noPadding>
      <Header>
        <FilterDropdown
          onChange={handleFilterChange}
          activeFilter={activeFilter}
          options={filterOptions}
        />
        {getIconButton('addRoom', openAddRoomModal)}
      </Header>
      <TableWrapper>
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
      </TableWrapper>
    </Card>
  );
}

export default ActionPanel;

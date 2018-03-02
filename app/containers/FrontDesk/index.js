/*
 *
 * FrontDesk
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';
import format from 'date-fns/format';
import AddRoomModal from 'components/AddRoomModal';
import RoomOptionsModal from 'components/RoomOptionsModal';
import colors from 'themes/colors';
import TableContainer from 'components/Table/Container';
import TableHeaderRow from 'components/Table/HeaderRow';
import TableHeaderCol from 'components/Table/HeaderCol';
import TableBodyRow from 'components/Table/BodyRow';
import TableBodyCol from 'components/Table/BodyCol';
import {
  fetchRooms,
  deleteRoom,
  checkIn,
  setFilter,
  displayAddRoomModal,
  displayRoomOptionsModal,
  handleInputChange,
  createRoom,
  openRoomOptionsModal,
} from './actions';
import {
  selectRooms,
  selectHasLoaded,
  selectActiveFilter,
  selectShouldDisplayAddRoomModal,
  selectShouldDisplayRoomOptionsModal,
  selectActiveRoomStatus,
  selectActiveRoomNumber,
  selectActiveRoomGuest,
  selectActiveRoomIndex,
  selectActiveStayId,
  selectAddRoomInput,
} from './selectors';
import messages from './messages';
import Container from './Container';
import Header from './Header';
import Body from './Body';
import FiltersContainer from './FiltersContainer';
import FilterButton from './FilterButton';
import AddRoomButton from './AddRoomButton';

// eslint-disable-next-line react/prefer-stateless-function
export class FrontDesk extends React.PureComponent {
  componentDidMount() {
    this.props.fetchRooms();
  }

  filterOptions = ['all', 'available', 'reserved', 'occupied'];

  handleFilterChange = val => this.props.setFilter(val);

  handleAddRoomModalClose = () => {
    // clear fields
    this.props.handleInputChange('addRoomInput', '');
    this.props.closeAddRoomModal();
  };

  handleInputChange = event => {
    const inputKey = event.target.name;
    const value = event.target.value;
    this.props.handleInputChange(inputKey, value);
  };

  handleRemoveRoom = () => {
    const { activeStayId, closeRoomOptionsModal, removeRoom } = this.props;
    removeRoom(activeStayId);
    closeRoomOptionsModal();
  };

  handleAddRoom = () => {
    const { addRoom, addRoomInput } = this.props;
    addRoom(addRoomInput);
  };

  render() {
    const {
      hasLoaded,
      rooms,
      activeFilter,
      openAddRoomModal,
      shouldDisplayAddRoomModal,
      shouldDisplayRoomOptionsModal,
      addRoomInput,
      closeRoomOptionsModal,
      activeRoomStatus,
      activeRoomNumber,
      activeRoomGuest,
      viewRoomOptions,
    } = this.props;
    if (!hasLoaded) {
      return <Container />;
    }
    // massage rooms list to component requirements
    const roomsArr = rooms.toJS();
    const filteredRooms =
      activeFilter === 'all'
        ? roomsArr
        : roomsArr.filter(room => room.status === activeFilter);
    // rendered display
    return (
      <Container>
        <Header>
          <FiltersContainer>
            {this.filterOptions.map(option =>
              <FilterButton
                key={option}
                selected={option === activeFilter}
                onClick={() => this.handleFilterChange(option)}
              >
                <FormattedMessage {...messages[option]} />
              </FilterButton>
            )}
          </FiltersContainer>
          <AddRoomButton onClick={openAddRoomModal}>ADD ROOM</AddRoomButton>
        </Header>
        <Body>
          <TableContainer>
            <TableHeaderRow mb="10px">
              <TableHeaderCol width="80px" ml="20px">
                #
              </TableHeaderCol>
              <TableHeaderCol width="140px">
                <FormattedMessage {...messages.room} />
              </TableHeaderCol>
              <TableHeaderCol width="140px">
                <FormattedMessage {...messages.status} />
              </TableHeaderCol>
              <TableHeaderCol width="300px">
                <FormattedMessage {...messages.guest} />
              </TableHeaderCol>
              <TableHeaderCol width="120px" mr="50px">
                <FormattedMessage {...messages.booked} />
              </TableHeaderCol>
              <TableHeaderCol width="120px">
                <FormattedMessage {...messages.checkedIn} />
              </TableHeaderCol>
              {/* <TableHeaderCol width="120px">
                <FormattedMessage {...messages.checkedOut} />
              </TableHeaderCol> */}
            </TableHeaderRow>
            {filteredRooms.map(
              (
                {
                  roomNumber,
                  status,
                  customerName,
                  bookingTime,
                  checkInTime,
                  checkOutTime,
                  id,
                },
                index
              ) =>
                <TableBodyRow
                  key={index}
                  onClick={() =>
                    viewRoomOptions(
                      id,
                      status,
                      roomNumber,
                      customerName,
                      index
                    )}
                >
                  <TableBodyCol width="80px" ml="20px">
                    {index + 1}
                  </TableBodyCol>
                  <TableBodyCol width="140px" color={colors.primary}>
                    {roomNumber}
                  </TableBodyCol>
                  <TableBodyCol width="140px">
                    <FormattedMessage {...messages[status]} />
                  </TableBodyCol>
                  <TableBodyCol width="300px">
                    {customerName !== null ? customerName : '-'}
                  </TableBodyCol>
                  <TableBodyCol width="120px" mr="50px">
                    {(bookingTime && format(new Date(bookingTime), 'h:mm a')) ||
                      '-'}
                  </TableBodyCol>
                  <TableBodyCol width="120px">
                    {(checkInTime && format(new Date(checkInTime), 'h:mm a')) ||
                      '-'}
                  </TableBodyCol>
                  {/* <TableBodyCol width="120px">
                    {(checkOutTime &&
                      format(new Date(checkOutTime), 'h:mm a')) ||
                      '-'}
                  </TableBodyCol> */}
                </TableBodyRow>
            )}
          </TableContainer>
        </Body>
        <AddRoomModal
          isOpen={shouldDisplayAddRoomModal}
          closeModal={this.handleAddRoomModalClose}
          handleInputChange={this.handleInputChange}
          addRoom={this.handleAddRoom}
          addRoomInput={addRoomInput}
        />
        <RoomOptionsModal
          roomStatus={activeRoomStatus}
          roomNumber={activeRoomNumber}
          guestName={activeRoomGuest}
          isOpen={shouldDisplayRoomOptionsModal}
          closeModal={closeRoomOptionsModal}
          removeRoom={this.handleRemoveRoom}
        />
      </Container>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  rooms: selectRooms(),
  hasLoaded: selectHasLoaded(),
  activeFilter: selectActiveFilter(),
  shouldDisplayAddRoomModal: selectShouldDisplayAddRoomModal(),
  shouldDisplayRoomOptionsModal: selectShouldDisplayRoomOptionsModal(),
  addRoomInput: selectAddRoomInput(),
  activeRoomStatus: selectActiveRoomStatus(),
  activeRoomNumber: selectActiveRoomNumber(),
  activeRoomGuest: selectActiveRoomGuest(),
  activeRoomIndex: selectActiveRoomIndex(),
  activeStayId: selectActiveStayId(),
});

const mapDispatchToProps = {
  fetchRooms,
  removeRoom: stayId => deleteRoom(stayId),
  checkIn: roomNumber => checkIn(roomNumber),
  setFilter: filter => setFilter(filter),
  openAddRoomModal: () => displayAddRoomModal(true),
  closeAddRoomModal: () => displayAddRoomModal(false),
  closeRoomOptionsModal: () => displayRoomOptionsModal(false),
  addRoom: room => createRoom(room),
  handleInputChange: (key, value) => handleInputChange(key, value),
  viewRoomOptions: (stayId, status, room, guest, index) =>
    openRoomOptionsModal(stayId, status, room, guest, index),
};

export default connect(mapStateToProps, mapDispatchToProps)(FrontDesk);

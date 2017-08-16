/*
 *
 * FrontDesk
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Filters from 'components/FrontDeskFilters';
import Table from 'components/FrontDeskTable';
import AddRoomModal from 'components/AddRoomModal';
// import getIconButton from 'components/IconButton';
import {
  fetchRooms,
  deleteRoom,
  checkIn,
  makeAvailable,
  setFilter,
  displayAddRoomModal,
  handleInputChange,
  createRoom,
} from './actions';
import {
  selectRooms,
  selectHasLoaded,
  selectActiveFilter,
  selectShouldDisplayAddRoomModal,
  selectAddRoomInput,
} from './selectors';
import Container from './Container';
import Header from './Header';
import Body from './Body';

// eslint-disable-next-line react/prefer-stateless-function
export class FrontDesk extends React.PureComponent {
  componentDidMount() {
    this.props.fetchRooms();
  }

  filterOptions = ['All', 'Available', 'Reserved', 'Not Ready', 'Occupied'];

  handleActionClick = (roomNumber, status, index) => {
    switch (status) {
      case 'Available':
        return this.props.deleteRoom(roomNumber);
      case 'Not Ready':
        return this.props.makeAvailable(roomNumber, index);
      case 'Reserved':
        return this.props.checkIn(roomNumber);
      default:
        return null;
    }
  };

  handleFilterChange = val => this.props.setFilter(val);

  handleModalClose = () => {
    // clear fields
    this.props.handleInputChange('addRoomInput', '');
    this.props.closeAddRoomModal();
  };

  handleInputChange = event => {
    const inputKey = event.target.name;
    const value = event.target.value;
    this.props.handleInputChange(inputKey, value);
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
      // openAddRoomModal,
      shouldDisplayAddRoomModal,
      addRoomInput,
    } = this.props;
    if (!hasLoaded) {
      return <Container />;
    }
    // massage rooms list to component requirements
    const roomsArr = rooms.toJS();
    const filteredRooms =
      activeFilter === 'All'
        ? roomsArr
        : roomsArr.filter(room => room.status === activeFilter);
    // rendered display
    return (
      <Container>
        <Header>
          <Filters
            handleFilterChange={this.handleFilterChange}
            filterOptions={this.filterOptions}
            activeFilter={activeFilter}
          />
        </Header>
        <Body>
          <Table
            handleActionClick={this.handleActionClick}
            rooms={filteredRooms}
          />
        </Body>
        <AddRoomModal
          isOpen={shouldDisplayAddRoomModal}
          closeModal={this.handleModalClose}
          handleInputChange={this.handleInputChange}
          addRoom={this.handleAddRoom}
          addRoomInput={addRoomInput}
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
  addRoomInput: selectAddRoomInput(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    fetchRooms: () => dispatch(fetchRooms()),
    makeAvailable: (roomNumber, index) =>
      dispatch(makeAvailable(roomNumber, index)),
    deleteRoom: roomNumber => dispatch(deleteRoom(roomNumber)),
    checkIn: roomNumber => dispatch(checkIn(roomNumber)),
    setFilter: filter => dispatch(setFilter(filter)),
    openAddRoomModal: () => dispatch(displayAddRoomModal(true)),
    closeAddRoomModal: () => dispatch(displayAddRoomModal(false)),
    addRoom: room => dispatch(createRoom(room)),
    handleInputChange: (key, value) => dispatch(handleInputChange(key, value)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FrontDesk);

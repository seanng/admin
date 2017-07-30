/*
 *
 * FrontDesk
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import SummaryPanel from 'components/SummaryPanel';
import ActionPanel from 'components/ActionPanel';
import {
  fetchRooms,
  deleteRoom,
  checkIn,
  makeAvailable,
  setFilter,
} from './actions';
import { selectRooms, selectHasLoaded, selectActiveFilter } from './selectors';
import ContainerWrapper from './ContainerWrapper';
import SideWrapper from './SideWrapper';

// eslint-disable-next-line react/prefer-stateless-function
export class FrontDesk extends React.PureComponent {
  componentDidMount() {
    this.props.fetchRooms();
  }

  filterOptions = [
    { label: 'All', value: 'All' },
    { label: 'Available', value: 'Available' },
    { label: 'Reserved', value: 'Reserved' },
    { label: 'Not Ready', value: 'Not Ready' },
    { label: 'Occupied', value: 'Occupied' },
  ];

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

  render() {
    const { hasLoaded, rooms, activeFilter } = this.props;
    if (!hasLoaded) {
      return <ContainerWrapper />;
    }
    // massage rooms list to component requirements
    const roomsArr = rooms.toJS();
    const filteredRooms =
      activeFilter === 'All'
        ? roomsArr
        : roomsArr.filter(room => room.status === activeFilter);
    // rendered display
    return (
      <ContainerWrapper>
        <SideWrapper flex={3}>
          <SummaryPanel rooms={roomsArr} />
        </SideWrapper>
        <SideWrapper flex={4} right>
          <ActionPanel
            rooms={filteredRooms}
            handleActionClick={this.handleActionClick}
            activeFilter={activeFilter}
            handleFilterChange={this.handleFilterChange}
            filterOptions={this.filterOptions}
          />
        </SideWrapper>
      </ContainerWrapper>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  rooms: selectRooms(),
  hasLoaded: selectHasLoaded(),
  activeFilter: selectActiveFilter(),
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
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FrontDesk);

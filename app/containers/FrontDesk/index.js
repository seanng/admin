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
import { fetchRooms, deleteRoom, checkIn, makeAvailable } from './actions';
import { selectRooms, selectHasLoaded } from './selectors';
import ContainerWrapper from './ContainerWrapper';
import SideWrapper from './SideWrapper';

// eslint-disable-next-line react/prefer-stateless-function
export class FrontDesk extends React.PureComponent {
  componentDidMount() {
    this.props.fetchRooms();
  }

  handleActionClick = (roomNumber, status, index) => {
    switch (status) {
      case 'Available':
        return this.props.deleteRoom(roomNumber);
      case 'Checked Out':
        return this.props.makeAvailable(roomNumber, index);
      case 'Inbound':
        return this.props.checkIn(roomNumber);
      default:
        return null;
    }
  };

  render() {
    if (!this.props.hasLoaded) {
      return <ContainerWrapper />;
    }
    const rooms = this.props.rooms.toJS();
    return (
      <ContainerWrapper>
        <SideWrapper>
          <SummaryPanel rooms={rooms} />
        </SideWrapper>
        <SideWrapper right>
          <ActionPanel
            rooms={rooms}
            handleActionClick={this.handleActionClick}
          />
        </SideWrapper>
      </ContainerWrapper>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  rooms: selectRooms(),
  hasLoaded: selectHasLoaded(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    fetchRooms: () => dispatch(fetchRooms()),
    makeAvailable: (roomNumber, index) =>
      dispatch(makeAvailable(roomNumber, index)),
    deleteRoom: roomNumber => dispatch(deleteRoom(roomNumber)),
    checkIn: roomNumber => dispatch(checkIn(roomNumber)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FrontDesk);

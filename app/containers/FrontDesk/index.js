/*
 *
 * FrontDesk
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import SummaryPanel from 'components/SummaryPanel';
import { fetchRooms } from './actions';
import { selectRooms, selectHasLoaded } from './selectors';
import ContainerWrapper from './ContainerWrapper';
import SideWrapper from './SideWrapper';

// eslint-disable-next-line react/prefer-stateless-function
export class FrontDesk extends React.PureComponent {
  componentDidMount() {
    this.props.fetchRooms();
  }

  render() {
    if (!this.props.hasLoaded) {
      return <ContainerWrapper />;
    }
    return (
      <ContainerWrapper>
        <SideWrapper>
          <SummaryPanel rooms={this.props.rooms} />
        </SideWrapper>
        <SideWrapper right>
          <div />
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
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FrontDesk);

/*
 *
 * FrontDesk
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import SummaryPanel from 'components/SummaryPanel';
import makeSelectFrontDesk from './selectors';
import ContainerWrapper from './ContainerWrapper';
import SideWrapper from './SideWrapper';

// eslint-disable-next-line react/prefer-stateless-function
export class FrontDesk extends React.PureComponent {
  render() {
    return (
      <ContainerWrapper>
        <SideWrapper>
          <SummaryPanel />
        </SideWrapper>
        <SideWrapper right>
          <SummaryPanel />
        </SideWrapper>
      </ContainerWrapper>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  FrontDesk: makeSelectFrontDesk(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FrontDesk);

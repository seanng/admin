/*
 *
 * PastStays
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import ReviewTable from 'components/ReviewTable';
import { fetchStays } from './actions';
import { selectHasLoaded, selectStays } from './selectors';
import ContainerWrapper from './ContainerWrapper';
import ComponentWrapper from './ComponentWrapper';

// eslint-disable-next-line react/prefer-stateless-function
export class PastStays extends React.PureComponent {
  componentDidMount() {
    this.props.fetchStays();
  }

  render() {
    if (!this.props.hasLoaded) {
      return <ContainerWrapper />;
    }
    return (
      <ContainerWrapper>
        <ComponentWrapper>
          <ReviewTable />
        </ComponentWrapper>
      </ContainerWrapper>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  hasLoaded: selectHasLoaded(),
  stays: selectStays(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    fetchStays: () => dispatch(fetchStays()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PastStays);

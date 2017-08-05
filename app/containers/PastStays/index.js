/*
 *
 * PastStays
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import ChargesModal from 'components/ChargesModal';
import ReviewTable from 'components/ReviewTable';
import { fetchStays, fetchCharges, closeModal } from './actions';
import {
  selectHasLoaded,
  selectStays,
  selectIsModalOpen,
  selectCharges,
} from './selectors';
import ContainerWrapper from './ContainerWrapper';
import ComponentWrapper from './ComponentWrapper';

// eslint-disable-next-line react/prefer-stateless-function
export class PastStays extends React.PureComponent {
  componentDidMount() {
    this.props.fetchStays();
  }

  onModalClose = () => {
    // perform validation check prior to closing?
    this.props.closeModal();
  };

  render() {
    const { hasLoaded, stays, isModalOpen, getCharges, charges } = this.props;
    if (!hasLoaded) {
      return <ContainerWrapper />;
    }
    return (
      <ContainerWrapper>
        <ComponentWrapper>
          <ReviewTable stays={stays.toJS()} handleOpenSurcharges={getCharges} />
        </ComponentWrapper>
        <ChargesModal
          isOpen={isModalOpen}
          onClose={this.onModalClose}
          charges={charges}
        />
      </ContainerWrapper>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  hasLoaded: selectHasLoaded(),
  isModalOpen: selectIsModalOpen(),
  stays: selectStays(),
  charges: selectCharges(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    fetchStays: () => dispatch(fetchStays()),
    getCharges: stayId => dispatch(fetchCharges(stayId)),
    closeModal: () => dispatch(closeModal()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PastStays);

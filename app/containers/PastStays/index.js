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
import {
  fetchStays,
  fetchCharges,
  closeModal,
  changeInput,
  addCharge,
} from './actions';
import {
  selectHasLoaded,
  selectStays,
  selectStay,
  selectIsModalOpen,
  selectCharges,
  selectServiceInput,
  selectPriceInput,
} from './selectors';
import ContainerWrapper from './ContainerWrapper';
import ComponentWrapper from './ComponentWrapper';

// eslint-disable-next-line react/prefer-stateless-function
export class PastStays extends React.PureComponent {
  componentDidMount() {
    this.props.fetchStays();
  }

  onModalClose = () => {
    // perform some kind of check prior to closing?
    this.props.closeModal();
  };

  handleInputChange = event => {
    const key = event.target.name;
    const value = event.target.value;
    this.props.handleInputChange(key, value);
  };

  addCharge = () => {
    const {
      stay,
      serviceInput,
      priceInput,
      addNewCharge,
      handleInputChange,
    } = this.props;
    const charge = {
      stayId: stay.get('id'),
      service: serviceInput,
      charge: (priceInput * 1).toFixed(2),
      status: 'Unsettled',
      updated: false,
    };
    addNewCharge(charge);
    handleInputChange('serviceInput', '');
    handleInputChange('priceInput', '');
  };

  render() {
    const {
      hasLoaded,
      stays,
      stay,
      isModalOpen,
      getCharges,
      charges,
      serviceInput,
      priceInput,
    } = this.props;
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
          handleInputChange={this.handleInputChange}
          onClose={this.onModalClose}
          charges={charges.toJS()}
          stay={stay.toJS()}
          serviceInput={serviceInput}
          priceInput={priceInput}
          addCharge={this.addCharge}
        />
      </ContainerWrapper>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  hasLoaded: selectHasLoaded(),
  isModalOpen: selectIsModalOpen(),
  stay: selectStay(),
  stays: selectStays(),
  charges: selectCharges(),
  serviceInput: selectServiceInput(),
  priceInput: selectPriceInput(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    fetchStays: () => dispatch(fetchStays()),
    getCharges: stayId => dispatch(fetchCharges(stayId)),
    closeModal: () => dispatch(closeModal()),
    addNewCharge: charge => dispatch(addCharge(charge)),
    handleInputChange: (key, value) => dispatch(changeInput(key, value)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PastStays);

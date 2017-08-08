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
  saveCharges,
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

  handleAddCharge = () => {
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

  handleUpdateCharges = () => {
    const newCharges = this.props.charges
      .toJS()
      .filter(charge => charge.updated === false);
    const newTotal = newCharges.reduce(
      (prev, current) => (prev * 1 + current.charge * 1).toFixed(2),
      this.props.stay.get('totalCharge') * 1
    );
    const stayId = this.props.stay.get('id');
    this.props.updateCharges(newCharges, newTotal, stayId);
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
          closeModal={this.onModalClose}
          charges={charges.toJS()}
          stay={stay.toJS()}
          serviceInput={serviceInput}
          priceInput={priceInput}
          updateCharges={this.handleUpdateCharges}
          addCharge={this.handleAddCharge}
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
    updateCharges: (newCharges, newTotal, stayId) =>
      dispatch(saveCharges(newCharges, newTotal, stayId)),
    handleInputChange: (key, value) => dispatch(changeInput(key, value)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PastStays);

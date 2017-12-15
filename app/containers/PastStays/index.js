/*
 *
 * PastStays
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import format from 'date-fns/format';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { getFormattedDate, getFormattedDuration } from 'utils/helpers';
import colors from 'themes/colors';
import TableContainer from 'components/Table/Container';
import HeaderRow from 'components/Table/HeaderRow';
import HeaderCol from 'components/Table/HeaderCol';
import BodyRow from 'components/Table/BodyRow';
import BodyCol from 'components/Table/BodyCol';
import ChargesModal from 'components/ChargesModal';
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
import messages from './messages';
import Container from './Container';
import SearchContainer from './SearchContainer';

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
      selectedStay,
      serviceInput,
      priceInput,
      addNewCharge,
      handleInputChange,
    } = this.props;
    const charge = {
      stayId: selectedStay.get('id'),
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
      this.props.selectedStay.get('totalCharge') * 1
    );
    const stayId = this.props.selectedStay.get('id');
    this.props.updateCharges(newCharges, newTotal, stayId);
  };

  render() {
    const {
      hasLoaded,
      stays,
      selectedStay,
      isModalOpen,
      getCharges,
      charges,
      serviceInput,
      priceInput,
    } = this.props;
    if (!hasLoaded) {
      return <Container />;
    }
    return (
      <Container>
        <SearchContainer />
        <TableContainer>
          <HeaderRow mb="10px">
            <HeaderCol>
              <FormattedMessage {...messages.dates} />
            </HeaderCol>
            <HeaderCol width="204px">
              <FormattedMessage {...messages.guest} />
            </HeaderCol>
            <HeaderCol>
              <FormattedMessage {...messages.roomNumber} />
            </HeaderCol>
            <HeaderCol>
              <FormattedMessage {...messages.checkIn} />
            </HeaderCol>
            <HeaderCol>
              <FormattedMessage {...messages.checkOut} />
            </HeaderCol>
            <HeaderCol>
              <FormattedMessage {...messages.duration} />
            </HeaderCol>
            <HeaderCol>
              <FormattedMessage {...messages.roomRate} />
            </HeaderCol>
            <HeaderCol>
              <FormattedMessage {...messages.surcharges} />
            </HeaderCol>
            <HeaderCol>
              <FormattedMessage {...messages.totalAmount} />
            </HeaderCol>
          </HeaderRow>
          {stays.toJS().map(stay =>
            <BodyRow key={stay.id} onClick={() => getCharges(stay.id)}>
              <BodyCol>
                {getFormattedDate(
                  new Date(stay.checkInTime),
                  new Date(stay.checkOutTime)
                )}
              </BodyCol>
              <BodyCol width="204px">
                {stay.customerName}
              </BodyCol>
              <BodyCol>
                {stay.roomNumber}
              </BodyCol>
              <BodyCol>
                {format(new Date(stay.checkInTime), 'h:mm a')}
              </BodyCol>
              <BodyCol>
                {format(new Date(stay.checkOutTime), 'h:mm a')}
              </BodyCol>
              <BodyCol>
                {getFormattedDuration(
                  new Date(stay.checkInTime),
                  new Date(stay.checkOutTime)
                )}
              </BodyCol>
              <BodyCol>
                $ {stay.roomCharge}
              </BodyCol>
              <BodyCol color={colors.primary}>
                $ {(stay.totalCharge * 1 - stay.roomCharge * 1).toFixed(2)}
              </BodyCol>
              <BodyCol>
                $ {stay.totalCharge}
              </BodyCol>
            </BodyRow>
          )}
        </TableContainer>
        <ChargesModal
          isOpen={isModalOpen}
          handleInputChange={this.handleInputChange}
          closeModal={this.onModalClose}
          charges={charges.toJS()}
          stay={selectedStay.toJS()}
          serviceInput={serviceInput}
          priceInput={priceInput}
          updateCharges={this.handleUpdateCharges}
          addCharge={this.handleAddCharge}
        />
      </Container>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  hasLoaded: selectHasLoaded(),
  isModalOpen: selectIsModalOpen(),
  selectedStay: selectStay(),
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
